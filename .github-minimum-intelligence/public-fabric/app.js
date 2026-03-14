const DEFAULT_FILTERS = {
  search: '',
  language: 'all',
  scope: 'all',
  sort: 'updated-desc',
};

const state = {
  config: null,
  repos: [],
  sourceLabel: 'Snapshot fallback',
  filters: { ...DEFAULT_FILTERS },
};

const elements = {
  siteTitle: document.getElementById('site-title'),
  heroCopy: document.getElementById('hero-copy'),
  introCopy: document.getElementById('intro-copy'),
  livePill: document.getElementById('live-pill'),
  featuredGrid: document.getElementById('featured-grid'),
  repoGrid: document.getElementById('repo-grid'),
  languageFilter: document.getElementById('language-filter'),
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

bootstrap().catch((error) => {
  console.error(error);
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

  state.repos = normalizeRepos(snapshot, config.repoOverrides || {});
  state.sourceLabel = 'Snapshot fallback';
  populateLanguageOptions();
  updatePortfolioMetrics();
  render();
  elements.repoGrid.removeAttribute('aria-busy');

  try {
    const liveRepos = await fetchLiveRepos(config.org);
    state.repos = normalizeRepos(liveRepos, config.repoOverrides || {});
    state.sourceLabel = 'Live GitHub API';
    populateLanguageOptions();
    updatePortfolioMetrics();
    render();
  } catch (error) {
    console.warn('Using snapshot fallback:', error);
  }
}

function wireEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.languageFilter.addEventListener('change', (event) => {
    state.filters.language = event.target.value;
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
    elements.scopeFilter.value = 'all';
    elements.sortFilter.value = 'updated-desc';
    render();
  });
}

function applyConfigCopy() {
  document.title = state.config.title || 'Public Fabric';
  elements.siteTitle.textContent = state.config.title || 'Public Fabric';
  elements.heroCopy.textContent =
    state.config.tagline ||
    'A living catalog of public repositories published by Japer Technology.';
  elements.introCopy.textContent =
    state.config.intro ||
    'This public fabric is meant to become the durable front door for every public Japer Technology repository.';
}

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
    ? `${state.sourceLabel} · ${formatDate(latestUpdate)}`
    : state.sourceLabel;

  elements.snapshotFeatured.textContent = String(featuredCount);
  elements.snapshotExperimental.textContent = String(experimentalCount);
  elements.snapshotLanguages.textContent = String(languageCount);
  elements.snapshotStars.textContent = String(totalStars);

  const isLive = state.sourceLabel === 'Live GitHub API';
  elements.livePill.textContent = isLive ? 'Live GitHub data' : 'Snapshot fallback';
  elements.livePill.className = `live-pill ${isLive ? 'is-live' : 'is-fallback'}`;
}

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

function render() {
  const featuredRepos = getFeaturedRepos();
  const filteredRepos = getFilteredRepos();

  renderFeatured(featuredRepos);
  renderCatalog(filteredRepos);
  renderActiveFilters();

  const searchLabel = elements.searchInput.value.trim();
  const summaryParts = [`Showing ${filteredRepos.length} of ${state.repos.length} repositories`];
  if (state.filters.scope !== 'all') summaryParts.push(`scope: ${labelForScope(state.filters.scope)}`);
  if (state.filters.language !== 'all') summaryParts.push(`language: ${state.filters.language}`);
  if (state.filters.search) summaryParts.push(`search: “${searchLabel}”`);

  elements.resultsSummary.textContent = `${summaryParts.join(' · ')}.`;
  elements.emptyState.classList.toggle('hidden', filteredRepos.length !== 0);
}

function renderFeatured(repos) {
  elements.featuredSection.classList.toggle('hidden', repos.length === 0);
  elements.featuredGrid.innerHTML = repos.map((repo) => repoCard(repo, true)).join('');
}

function renderCatalog(repos) {
  elements.repoGrid.innerHTML = repos.map((repo) => repoCard(repo, false)).join('');
}

function renderActiveFilters() {
  const chips = [];
  if (state.filters.search) chips.push(filterChip(`Search: ${elements.searchInput.value.trim()}`));
  if (state.filters.language !== 'all') chips.push(filterChip(`Language: ${state.filters.language}`));
  if (state.filters.scope !== 'all') chips.push(filterChip(`Scope: ${labelForScope(state.filters.scope)}`));
  if (state.filters.sort !== DEFAULT_FILTERS.sort) chips.push(filterChip(`Sort: ${labelForSort(state.filters.sort)}`));

  elements.activeFilters.classList.toggle('hidden', chips.length === 0);
  elements.activeFilters.innerHTML = chips.join('');
}

function getFeaturedRepos() {
  const featuredList = state.config.featured || [];
  const featuredNames = new Set(featuredList);

  return featuredList
    .map((name) => state.repos.find((repo) => repo.name === name))
    .filter(Boolean)
    .concat(state.repos.filter((repo) => repo.isFeatured && !featuredNames.has(repo.name)));
}

function getFilteredRepos() {
  const { search, language, scope, sort } = state.filters;

  const filtered = state.repos.filter((repo) => {
    const matchesLanguage = language === 'all' || repo.language === language;
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
      ...(repo.topics || []),
      ...(repo.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = !search || haystack.includes(search);
    return matchesLanguage && matchesScope && matchesSearch;
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

  const links = [
    `<a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">GitHub</a>`,
    repo.homepage ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer">Homepage</a>` : '',
  ]
    .filter(Boolean)
    .join('');

  return `
    <article class="repo-card ${featuredContext ? 'featured' : ''}">
      <div>
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
        <span>${repo.stargazers_count || 0} ★</span>
        <span>Updated ${escapeHtml(formatDate(repo.updated_at))}</span>
      </div>
      <div class="repo-links">${links}</div>
    </article>
  `;
}

function filterChip(text) {
  return `<span class="filter-chip">${escapeHtml(text)}</span>`;
}

function badge(text, extraClass = '') {
  return `<span class="badge ${extraClass}">${escapeHtml(text)}</span>`;
}

function normalizeRepos(repos, overrides) {
  return [...repos]
    .map((repo) => {
      const override = overrides[repo.name] || {};
      const isFeatured = Boolean(override.featured || (state.config.featured || []).includes(repo.name));
      return {
        ...repo,
        homepage: override.homepage || repo.homepage || '',
        description: repo.description || '',
        summary: deriveSummary(repo, override),
        status: override.status || deriveStatus(repo),
        topics: Array.from(new Set([...(repo.topics || []), ...(override.topics || []), ...inferTags(repo)])),
        tags: Array.from(new Set(override.tags || [])),
        isFeatured,
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

function labelForSort(sort) {
  return {
    'updated-desc': 'Recently updated',
    'stars-desc': 'Most stars',
    'name-asc': 'Name A–Z',
  }[sort] || sort;
}

function looksStatusOnlyDescription(description) {
  return /under\s+(githubification|development|dvelopment|dbveleopment)/i.test(description);
}

function cleanDescription(description) {
  return String(description || '').replace(/\s+/g, ' ').trim();
}

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
    topics: repo.topics || [],
    updated_at: repo.updated_at,
  }));
}

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
