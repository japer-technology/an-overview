/* ── Repository group definitions ──────────────────────────────────── */

const REPO_GROUPS = [
  { key: 'hidden', label: 'Hidden', description: 'Repositories excluded from the public catalog.', match: (n) => n.startsWith('zzz') },
  { key: 'this-repo', label: 'This Repository', description: 'The repository that powers this public fabric site.', match: (n) => n === 'an-overview' },
  { key: 'japer', label: 'JAPER Technology', description: 'Augmenting japer.technology, japer.cloud, and japer.xyz.', match: (n) => n.includes('japer') },
  { key: 'intelligence', label: 'GitHub Intelligence', description: 'Local AI Agents running in repos.', match: (n) => n.startsWith('github') && n.includes('intelligence') },
  { key: 'fabric', label: 'GitHub Fabric', description: 'Local execution in repo space.', match: (n) => n.startsWith('github-fabric') },
  { key: 'githubification', label: 'GitHubification', description: 'Local execution in repo space via GitHubification forks.', match: (n) => n.startsWith('githubification') },
  { key: 'gmi', label: 'GitHub Minimum Intelligences', description: 'GMI instances running various LLM models.', match: (n) => n.startsWith('gmi-') },
  { key: 'rnd', label: 'Research & Development', description: 'Experimental and research projects.', match: () => true },
];

const VISIBLE_GROUPS = REPO_GROUPS.filter((g) => g.key !== 'hidden');

function categorizeRepo(name) {
  const n = name.toLowerCase();
  for (const group of REPO_GROUPS) {
    if (group.match(n)) return group.key;
  }
  return 'rnd';
}

/* ── Defaults ──────────────────────────────────────────────────────── */

const DEFAULT_FILTERS = {
  search: '',
  language: 'all',
  group: 'all',
  scope: 'all',
  sort: 'updated-desc',
};

const VALID_SCOPE_VALUES = new Set(['all', 'first-party', 'forks', 'featured', 'experimental']);
const VALID_SORT_VALUES = new Set(['updated-desc', 'stars-desc', 'name-asc']);
/* Max concurrent GitHub API calls when resolving fork parent info.
   Kept low to stay well within unauthenticated rate limits (60 req/hr). */
const PARENT_FETCH_CONCURRENCY = 5;

/* ── App state ─────────────────────────────────────────────────────── */

const state = {
  config: null,
  repos: [],
  sourceLabel: 'Snapshot fallback',
  filters: { ...DEFAULT_FILTERS },
};

/* ── DOM handles ───────────────────────────────────────────────────── */

const elements = {
  siteTitle: document.getElementById('site-title'),
  heroCopy: document.getElementById('hero-copy'),
  introCopy: document.getElementById('intro-copy'),
  livePill: document.getElementById('live-pill'),
  featuredGrid: document.getElementById('featured-grid'),
  repoGrid: document.getElementById('repo-grid'),
  languageFilter: document.getElementById('language-filter'),
  groupFilter: document.getElementById('group-filter'),
  scopeFilter: document.getElementById('scope-filter'),
  sortFilter: document.getElementById('sort-filter'),
  searchInput: document.getElementById('search-input'),
  resetFilters: document.getElementById('reset-filters'),
  resultsSummary: document.getElementById('results-summary'),
  activeFilters: document.getElementById('active-filters'),
  emptyState: document.getElementById('empty-state'),
  featuredSection: document.getElementById('featured-section'),
  statRepos: document.getElementById('stat-repos'),
  statFirstParty: document.getElementById('stat-first-party'),
  statForks: document.getElementById('stat-forks'),
  statSource: document.getElementById('stat-source'),
  snapshotFeatured: document.getElementById('snapshot-featured'),
  snapshotExperimental: document.getElementById('snapshot-experimental'),
  snapshotLanguages: document.getElementById('snapshot-languages'),
  snapshotStars: document.getElementById('snapshot-stars'),
};

/* ── Bootstrap ─────────────────────────────────────────────────────── */

bootstrap().catch((error) => {
  console.error(error);
  elements.repoGrid.removeAttribute('aria-busy');
  elements.resultsSummary.textContent = 'Unable to load repository data right now.';
  elements.statSource.textContent = 'Unavailable';
  elements.livePill.textContent = 'Catalog unavailable';
  elements.livePill.className = 'live-pill is-fallback';
});

async function bootstrap() {
  elements.repoGrid.setAttribute('aria-busy', 'true');

  const [config, snapshot] = await Promise.all([
    loadJson('./data/site.json'),
    loadJson('./data/repos-snapshot.json'),
  ]);

  state.config = config;
  applyConfigCopy();
  wireEvents();
  loadFiltersFromUrl();

  state.repos = normalizeRepos(snapshot, config.repoOverrides || {});
  state.sourceLabel = 'Snapshot fallback';
  populateLanguageOptions();
  populateGroupOptions();
  updatePortfolioMetrics();
  render();
  elements.repoGrid.removeAttribute('aria-busy');

  try {
    const liveRepos = await fetchLiveRepos(config.org);
    state.repos = normalizeRepos(liveRepos, config.repoOverrides || {});
    state.sourceLabel = 'Live GitHub API';
    populateLanguageOptions();
    populateGroupOptions();
    updatePortfolioMetrics();
    render();

    fetchParentInfo(state.repos, config.org)
      .then(() => render())
      .catch((err) => console.warn('Parent info fetch incomplete:', err));
  } catch (error) {
    console.warn('Using snapshot fallback:', error);
  }
}

/* ── Event wiring ──────────────────────────────────────────────────── */

function wireEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.languageFilter.addEventListener('change', (event) => {
    state.filters.language = event.target.value;
    render();
  });

  elements.groupFilter.addEventListener('change', (event) => {
    state.filters.group = event.target.value;
    render();
  });

  elements.scopeFilter.addEventListener('change', (event) => {
    state.filters.scope = event.target.value;
    render();
  });

  elements.sortFilter.addEventListener('change', (event) => {
    state.filters.sort = event.target.value;
    render();
  });

  elements.resetFilters.addEventListener('click', () => {
    state.filters = { ...DEFAULT_FILTERS };
    elements.searchInput.value = '';
    elements.languageFilter.value = 'all';
    elements.groupFilter.value = 'all';
    elements.scopeFilter.value = 'all';
    elements.sortFilter.value = 'updated-desc';
    render();
  });
}

/* ── Config-driven copy ────────────────────────────────────────────── */

function applyConfigCopy() {
  document.title = state.config.title || 'Public GitHub';
  elements.siteTitle.textContent = state.config.title || 'Public GitHub';
  elements.heroCopy.textContent =
    state.config.tagline ||
    'A catalog of public repositories published by Japer Technology Pty. Ltd.';
  elements.introCopy.textContent =
    state.config.intro ||
    'This public fabric is meant to become the durable front door for every public Japer Technology repository.';
}

/* ── URL sync ──────────────────────────────────────────────────────── */

function loadFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const search = (params.get('q') || '').trim();
  const language = params.get('language') || 'all';
  const group = params.get('group') || 'all';
  const scope = params.get('scope') || 'all';
  const sort = params.get('sort') || DEFAULT_FILTERS.sort;

  const validGroupKeys = new Set(VISIBLE_GROUPS.map((g) => g.key));
  state.filters.search = search.toLowerCase();
  state.filters.language = language;
  state.filters.group = group === 'all' || validGroupKeys.has(group) ? group : 'all';
  state.filters.scope = VALID_SCOPE_VALUES.has(scope) ? scope : 'all';
  state.filters.sort = VALID_SORT_VALUES.has(sort) ? sort : DEFAULT_FILTERS.sort;

  elements.searchInput.value = search;
  elements.groupFilter.value = state.filters.group;
  elements.scopeFilter.value = state.filters.scope;
  elements.sortFilter.value = state.filters.sort;
}

function syncFiltersToUrl() {
  const params = new URLSearchParams();
  const search = elements.searchInput.value.trim();

  if (search) params.set('q', search);
  if (state.filters.language !== 'all') params.set('language', state.filters.language);
  if (state.filters.group !== 'all') params.set('group', state.filters.group);
  if (state.filters.scope !== 'all') params.set('scope', state.filters.scope);
  if (state.filters.sort !== DEFAULT_FILTERS.sort) params.set('sort', state.filters.sort);

  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', nextUrl);
}

/* ── Metrics ───────────────────────────────────────────────────────── */

function updatePortfolioMetrics() {
  const repos = state.repos;
  const forkCount = repos.filter((repo) => repo.fork).length;
  const firstPartyCount = repos.length - forkCount;
  const featuredCount = repos.filter((repo) => repo.isFeatured).length;
  const experimentalCount = repos.filter((repo) => repo.status === 'experimental').length;
  const languageCount = new Set(repos.map((repo) => repo.language).filter(Boolean)).size;
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const latestUpdate = repos.map((repo) => repo.updated_at).filter(Boolean).sort().at(-1);

  elements.statRepos.textContent = String(repos.length);
  elements.statFirstParty.textContent = String(firstPartyCount);
  elements.statForks.textContent = String(forkCount);
  elements.statSource.textContent = latestUpdate
    ? `${state.sourceLabel} \u00b7 ${formatDate(latestUpdate)}`
    : state.sourceLabel;

  elements.snapshotFeatured.textContent = String(featuredCount);
  elements.snapshotExperimental.textContent = String(experimentalCount);
  elements.snapshotLanguages.textContent = String(languageCount);
  elements.snapshotStars.textContent = String(totalStars);

  const isLive = state.sourceLabel === 'Live GitHub API';
  elements.livePill.textContent = isLive ? 'Live GitHub data' : 'Snapshot fallback';
  elements.livePill.className = `live-pill ${isLive ? 'is-live' : 'is-fallback'}`;
}

/* ── Populate filter dropdowns ─────────────────────────────────────── */

function populateLanguageOptions() {
  const previousValue = state.filters.language;
  const languages = Array.from(new Set(state.repos.map((repo) => repo.language).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );

  elements.languageFilter.innerHTML = '<option value="all">All languages</option>';
  for (const language of languages) {
    const option = document.createElement('option');
    option.value = language;
    option.textContent = language;
    elements.languageFilter.appendChild(option);
  }

  const nextValue = languages.includes(previousValue) ? previousValue : 'all';
  state.filters.language = nextValue;
  elements.languageFilter.value = nextValue;
}

function populateGroupOptions() {
  const previousValue = state.filters.group;

  elements.groupFilter.innerHTML = '<option value="all">All groups</option>';
  for (const group of VISIBLE_GROUPS) {
    const count = state.repos.filter((r) => r.group === group.key).length;
    if (count === 0) continue;
    const option = document.createElement('option');
    option.value = group.key;
    option.textContent = `${group.label} (${count})`;
    elements.groupFilter.appendChild(option);
  }

  const validGroupKeys = new Set(VISIBLE_GROUPS.map((g) => g.key));
  const nextValue = previousValue === 'all' || validGroupKeys.has(previousValue) ? previousValue : 'all';
  state.filters.group = nextValue;
  elements.groupFilter.value = nextValue;
}

/* ── Render pipeline ───────────────────────────────────────────────── */

function render() {
  const featuredRepos = getFeaturedRepos();
  const filteredRepos = getFilteredRepos();

  renderFeatured(featuredRepos);
  renderCatalog(filteredRepos);
  renderActiveFilters();

  const searchLabel = elements.searchInput.value.trim();
  const summaryParts = [`Showing ${filteredRepos.length} of ${state.repos.length} repositories`];
  if (state.filters.group !== 'all') summaryParts.push(`group: ${labelForGroup(state.filters.group)}`);
  if (state.filters.scope !== 'all') summaryParts.push(`scope: ${labelForScope(state.filters.scope)}`);
  if (state.filters.language !== 'all') summaryParts.push(`language: ${state.filters.language}`);
  if (state.filters.search) summaryParts.push(`search: "${searchLabel}"`);

  elements.resultsSummary.textContent = `${summaryParts.join(' \u00b7 ')}.`;
  elements.emptyState.classList.toggle('hidden', filteredRepos.length !== 0);
  syncFiltersToUrl();
}

function renderFeatured(repos) {
  elements.featuredSection.classList.toggle('hidden', repos.length === 0);
  elements.featuredGrid.innerHTML = repos.map((repo) => repoCard(repo, true)).join('');
}

function renderCatalog(repos) {
  const grouped = new Map();
  for (const group of VISIBLE_GROUPS) {
    grouped.set(group.key, []);
  }
  for (const repo of repos) {
    const list = grouped.get(repo.group);
    if (list) list.push(repo);
  }

  let html = '';
  for (const group of VISIBLE_GROUPS) {
    const groupRepos = grouped.get(group.key);
    if (!groupRepos || groupRepos.length === 0) continue;

    html += `
      <section class="group-section" id="group-${escapeHtml(group.key)}">
        <div class="group-header">
          <div class="group-header-text">
            <h3>${escapeHtml(group.label)}</h3>
            <p>${escapeHtml(group.description)}</p>
          </div>
          <span class="group-count">${groupRepos.length} repo${groupRepos.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="repo-grid">
          ${groupRepos.map((repo) => repoCard(repo, false)).join('')}
        </div>
      </section>
    `;
  }

  elements.repoGrid.innerHTML = html;
}

function renderActiveFilters() {
  const chips = [];
  if (state.filters.search) chips.push(filterChip(`Search: ${elements.searchInput.value.trim()}`));
  if (state.filters.language !== 'all') chips.push(filterChip(`Language: ${state.filters.language}`));
  if (state.filters.group !== 'all') chips.push(filterChip(`Group: ${labelForGroup(state.filters.group)}`));
  if (state.filters.scope !== 'all') chips.push(filterChip(`Scope: ${labelForScope(state.filters.scope)}`));
  if (state.filters.sort !== DEFAULT_FILTERS.sort) chips.push(filterChip(`Sort: ${labelForSort(state.filters.sort)}`));

  elements.activeFilters.classList.toggle('hidden', chips.length === 0);
  elements.activeFilters.innerHTML = chips.join('');
}

/* ── Data: featured & filtered ─────────────────────────────────────── */

function getFeaturedRepos() {
  const featuredList = state.config.featured || [];
  const featuredNames = new Set(featuredList);

  return featuredList
    .map((name) => state.repos.find((repo) => repo.name === name))
    .filter(Boolean)
    .concat(state.repos.filter((repo) => repo.isFeatured && !featuredNames.has(repo.name)));
}

function getFilteredRepos() {
  const { search, language, scope, group, sort } = state.filters;

  const filtered = state.repos.filter((repo) => {
    const matchesLanguage = language === 'all' || repo.language === language;
    const matchesGroup = group === 'all' || repo.group === group;
    const matchesScope =
      scope === 'all' ||
      (scope === 'first-party' && !repo.fork) ||
      (scope === 'forks' && repo.fork) ||
      (scope === 'featured' && repo.isFeatured) ||
      (scope === 'experimental' && repo.status === 'experimental');

    const haystack = [
      repo.name,
      repo.full_name,
      repo.summary,
      repo.description,
      repo.language,
      repo.status,
      repo.group,
      ...(repo.topics || []),
      ...(repo.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = !search || haystack.includes(search);
    return matchesLanguage && matchesGroup && matchesScope && matchesSearch;
  });

  return sortRepos(filtered, sort);
}

function sortRepos(repos, sortMode) {
  const sorted = [...repos];
  switch (sortMode) {
    case 'stars-desc':
      return sorted.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || a.name.localeCompare(b.name));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'updated-desc':
    default:
      return sorted.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
  }
}

/* ── Card rendering ────────────────────────────────────────────────── */

function repoCard(repo, featuredContext) {
  const badges = [];
  if (repo.status) badges.push(badge(labelForStatus(repo.status), `status-${slugify(repo.status)}`));
  badges.push(badge(repo.fork ? 'Fork' : 'First-party', repo.fork ? 'kind-fork' : 'kind-original'));
  if (repo.isFeatured && repo.status !== 'featured') badges.push(badge('Curated', 'status-featured'));
  if (repo.archived && repo.status !== 'archived') badges.push(badge('Archived', 'status-archived'));
  if (featuredContext) badges.push(badge('Priority view', 'priority-badge'));

  const topics = Array.from(new Set([...(repo.tags || []), ...(repo.topics || [])]))
    .slice(0, 8)
    .map((topic) => `<span class="topic">${escapeHtml(topic)}</span>`)
    .join('');

  const actions = [];
  actions.push(
    `<a class="action-btn btn-repo" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">Repo \u2197</a>`,
  );

  const pagesUrl = getPagesUrl(repo);
  if (pagesUrl) {
    actions.push(
      `<a class="action-btn btn-pages" href="${escapeHtml(pagesUrl)}" target="_blank" rel="noreferrer">Pages \u2197</a>`,
    );
  }

  if (repo.parentUrl) {
    actions.push(
      `<a class="action-btn btn-parent" href="${escapeHtml(repo.parentUrl)}" target="_blank" rel="noreferrer">Parent \u2197</a>`,
    );
  }

  return `
    <article class="repo-card ${featuredContext ? 'featured' : ''}">
      <div class="repo-card-header">
        <p class="repo-kicker">${escapeHtml(repo.full_name)}</p>
        <h3 class="repo-title">
          <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a>
        </h3>
      </div>
      <div class="badges">${badges.join('')}</div>
      <p class="repo-summary">${escapeHtml(repo.summary)}</p>
      ${topics ? `<div class="topics">${topics}</div>` : ''}
      <div class="meta-row">
        <span>${escapeHtml(repo.language || 'Unspecified language')}</span>
        <span>${repo.stargazers_count || 0} \u2605</span>
        <span>Updated ${escapeHtml(formatDate(repo.updated_at))}</span>
      </div>
      <div class="repo-actions">${actions.join('')}</div>
    </article>
  `;
}

function getPagesUrl(repo) {
  if (repo.homepage && repo.homepage.includes('github.io')) return repo.homepage;
  if (repo.has_pages) {
    if (repo.name.endsWith('.github.io')) return repo.homepage || `https://${repo.name}`;
    return repo.homepage || `https://${state.config.org}.github.io/${repo.name}/`;
  }
  return '';
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function filterChip(text) {
  return `<span class="filter-chip">${escapeHtml(text)}</span>`;
}

function badge(text, extraClass = '') {
  return `<span class="badge ${extraClass}">${escapeHtml(text)}</span>`;
}

/* ── Data normalization ────────────────────────────────────────────── */

function normalizeRepos(repos, overrides) {
  return [...repos]
    .filter((repo) => categorizeRepo(repo.name) !== 'hidden')
    .map((repo) => {
      const override = overrides[repo.name] || {};
      const isFeatured = Boolean(override.featured || (state.config.featured || []).includes(repo.name));
      const group = categorizeRepo(repo.name);
      return {
        ...repo,
        homepage: override.homepage || repo.homepage || '',
        description: repo.description || '',
        summary: deriveSummary(repo, override),
        status: override.status || deriveStatus(repo),
        topics: Array.from(new Set([...(repo.topics || []), ...(override.topics || []), ...inferTags(repo)])),
        tags: Array.from(new Set(override.tags || [])),
        isFeatured,
        group,
        parentUrl: '',
        parentFullName: '',
      };
    })
    .sort((a, b) => {
      if (a.name === 'an-overview') return -1;
      if (b.name === 'an-overview') return 1;
      return String(b.updated_at || '').localeCompare(String(a.updated_at || ''));
    });
}

function deriveSummary(repo, override) {
  if (override.summary) return override.summary;
  const description = cleanDescription(repo.description || '');
  if (description && !looksStatusOnlyDescription(description)) return description;

  if (repo.name.startsWith('gmi-')) {
    const agentMatch = (repo.description || '').match(/an ai agent called\s+(.+)/i);
    return agentMatch
      ? `A GitHub Minimum Intelligence agent repository centered on ${agentMatch[1].trim()}.`
      : 'A GitHub Minimum Intelligence repository in the Japer Technology portfolio.';
  }

  if (repo.name.startsWith('github-') && repo.fork) {
    return 'A GitHubification fork tracked by Japer Technology while the underlying project is adapted to GitHub-native workflows.';
  }

  if (repo.name.startsWith('github-')) return 'A GitHub-native repository in the Japer Technology portfolio.';
  if (repo.fork) return 'A public fork tracked in the Japer Technology portfolio.';
  if (repo.homepage) return 'A public Japer Technology repository with an associated homepage or published endpoint.';
  return 'A public Japer Technology repository that still needs a more specific curated summary.';
}

function inferTags(repo) {
  const inferred = [];
  if (repo.fork) inferred.push('fork');
  if (!repo.fork) inferred.push('first-party');
  if (repo.name.startsWith('gmi-')) inferred.push('gmi');
  if (repo.name.startsWith('github-')) inferred.push('github-native');
  if (repo.name.endsWith('.github.io') || String(repo.homepage || '').includes('github.io')) inferred.push('website');
  return inferred;
}

function deriveStatus(repo) {
  if (repo.archived) return 'archived';
  const description = (repo.description || '').toLowerCase();
  if (
    description.includes('under development') ||
    description.includes('under githubification') ||
    description.includes('under dvelopment') ||
    description.includes('under dbveleopment')
  ) {
    return 'experimental';
  }
  if (repo.fork) return 'watch';
  return 'active';
}

/* ── Label maps ────────────────────────────────────────────────────── */

function labelForStatus(status) {
  return {
    active: 'Active',
    featured: 'Featured',
    experimental: 'Experimental',
    watch: 'Watching',
    archived: 'Archived',
  }[status] || status;
}

function labelForScope(scope) {
  return {
    all: 'All repositories',
    'first-party': 'First-party',
    forks: 'Forks only',
    featured: 'Featured only',
    experimental: 'Experimental only',
  }[scope] || scope;
}

function labelForGroup(key) {
  const group = VISIBLE_GROUPS.find((g) => g.key === key);
  return group ? group.label : key;
}

function labelForSort(sort) {
  return {
    'updated-desc': 'Recently updated',
    'stars-desc': 'Most stars',
    'name-asc': 'Name A\u2013Z',
  }[sort] || sort;
}

/* ── Description helpers ───────────────────────────────────────────── */

function looksStatusOnlyDescription(description) {
  return /under\s+(githubification|development|dvelopment|dbveleopment)/i.test(description);
}

function cleanDescription(description) {
  return String(description || '').replace(/\s+/g, ' ').trim();
}

/* ── Fetch: live repos ─────────────────────────────────────────────── */

async function fetchLiveRepos(org) {
  const endpoints = [
    `https://api.github.com/orgs/${org}/repos?per_page=100&type=public&sort=updated`,
    `https://api.github.com/users/${org}/repos?per_page=100&type=public&sort=updated`,
  ];

  for (const endpoint of endpoints) {
    try {
      const repos = await fetchRepoPages(endpoint);
      if (repos.length > 0) return repos;
    } catch (error) {
      console.warn(`Failed endpoint ${endpoint}:`, error);
    }
  }
  throw new Error(`Unable to fetch repositories for ${org}`);
}

async function fetchRepoPages(baseUrl) {
  const all = [];
  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(`${baseUrl}&page=${page}`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
    const pageRepos = await response.json();
    all.push(...pageRepos);
    if (pageRepos.length < 100) break;
  }

  return all.map((repo) => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    homepage: repo.homepage,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    fork: repo.fork,
    archived: repo.archived,
    is_template: repo.is_template || false,
    has_pages: repo.has_pages || false,
    topics: repo.topics || [],
    updated_at: repo.updated_at,
  }));
}

/* ── Fetch: fork parent info ───────────────────────────────────────── */

async function fetchParentInfo(repos, org) {
  const forks = repos.filter((r) => r.fork);
  if (forks.length === 0) return;

  const CONCURRENCY = PARENT_FETCH_CONCURRENCY;
  for (let i = 0; i < forks.length; i += CONCURRENCY) {
    const batch = forks.slice(i, i + CONCURRENCY);
    await Promise.allSettled(
      batch.map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${encodeURIComponent(org)}/${encodeURIComponent(repo.name)}`,
            { headers: { Accept: 'application/vnd.github+json' } },
          );
          if (!res.ok) return;
          const data = await res.json();
          if (data.parent) {
            repo.parentUrl = data.parent.html_url;
            repo.parentFullName = data.parent.full_name;
          }
        } catch {
          /* silently skip on network errors */
        }
      }),
    );
  }
}

/* ── Utility ───────────────────────────────────────────────────────── */

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function formatDate(value) {
  if (!value) return 'unknown';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
