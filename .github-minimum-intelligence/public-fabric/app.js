const state = {
  config: null,
  repos: [],
  sourceLabel: 'snapshot',
  lastUpdated: null,
  filters: {
    search: '',
    language: 'all',
  },
};

const elements = {
  heroCopy: document.getElementById('hero-copy'),
  introCopy: document.getElementById('intro-copy'),
  featuredGrid: document.getElementById('featured-grid'),
  repoGrid: document.getElementById('repo-grid'),
  languageFilter: document.getElementById('language-filter'),
  searchInput: document.getElementById('search-input'),
  resultsSummary: document.getElementById('results-summary'),
  emptyState: document.getElementById('empty-state'),
  featuredSection: document.getElementById('featured-section'),
  statRepos: document.getElementById('stat-repos'),
  statLanguages: document.getElementById('stat-languages'),
  statStars: document.getElementById('stat-stars'),
  statSource: document.getElementById('stat-source'),
};

bootstrap().catch((error) => {
  console.error(error);
  elements.resultsSummary.textContent = 'Unable to load repository data right now.';
  elements.statSource.textContent = 'Unavailable';
});

async function bootstrap() {
  const [config, snapshot] = await Promise.all([
    loadJson('./data/site.json'),
    loadJson('./data/repos-snapshot.json'),
  ]);

  state.config = config;
  state.repos = normalizeRepos(snapshot, config.repoOverrides || {});
  state.sourceLabel = 'Snapshot fallback';
  applyConfigCopy();
  populateLanguageOptions();
  updateStats();
  render();
  wireEvents();

  try {
    const liveRepos = await fetchLiveRepos(config.org);
    state.repos = normalizeRepos(liveRepos, config.repoOverrides || {});
    state.sourceLabel = 'Live GitHub API';
    populateLanguageOptions();
    updateStats();
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
}

function applyConfigCopy() {
  elements.heroCopy.textContent =
    state.config.tagline ||
    'A living catalog of public repositories published by Japer Technology.';
  elements.introCopy.textContent =
    state.config.intro ||
    'This public fabric is meant to become the durable front door for every public Japer Technology repository.';
}

function updateStats() {
  const repos = state.repos;
  const languageCount = new Set(
    repos.map((repo) => repo.language).filter(Boolean),
  ).size;
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const latestUpdate = repos
    .map((repo) => repo.updated_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  state.lastUpdated = latestUpdate;
  elements.statRepos.textContent = String(repos.length);
  elements.statLanguages.textContent = String(languageCount);
  elements.statStars.textContent = String(totalStars);
  elements.statSource.textContent = latestUpdate
    ? `${state.sourceLabel} · ${formatDate(latestUpdate)}`
    : state.sourceLabel;
}

function populateLanguageOptions() {
  const previousValue = state.filters.language;
  const languages = Array.from(
    new Set(state.repos.map((repo) => repo.language).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

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
  const filteredRepos = getFilteredRepos();
  const featuredRepos = getFeaturedRepos();

  renderFeatured(featuredRepos);
  renderCatalog(filteredRepos);

  const hasFilters = Boolean(state.filters.search) || state.filters.language !== 'all';
  const summary = hasFilters
    ? `Showing ${filteredRepos.length} of ${state.repos.length} repositories.`
    : `Showing all ${state.repos.length} repositories.`;
  elements.resultsSummary.textContent = summary;
  elements.emptyState.classList.toggle('hidden', filteredRepos.length !== 0);
}

function renderFeatured(repos) {
  elements.featuredSection.classList.toggle('hidden', repos.length === 0);
  elements.featuredGrid.innerHTML = repos.map((repo) => repoCard(repo, true)).join('');
}

function renderCatalog(repos) {
  elements.repoGrid.innerHTML = repos.map((repo) => repoCard(repo, false)).join('');
}

function getFeaturedRepos() {
  const featuredList = state.config.featured || [];
  const featuredNames = new Set(featuredList);

  return featuredList
    .map((name) => state.repos.find((repo) => repo.name === name))
    .filter(Boolean)
    .concat(
      state.repos.filter(
        (repo) => repo.isFeatured && !featuredNames.has(repo.name),
      ),
    );
}

function getFilteredRepos() {
  const search = state.filters.search;
  const language = state.filters.language;

  return state.repos.filter((repo) => {
    const matchesLanguage = language === 'all' || repo.language === language;
    const haystack = [
      repo.name,
      repo.summary,
      repo.description,
      repo.language,
      ...(repo.topics || []),
      ...(repo.tags || []),
      repo.status || '',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = !search || haystack.includes(search);
    return matchesLanguage && matchesSearch;
  });
}

function repoCard(repo, featured) {
  const badges = [
    repo.status ? badge(repo.status, `status-${slugify(repo.status)}`) : '',
    repo.fork ? badge('Fork') : '',
    repo.archived ? badge('Archived') : '',
    featured ? badge('Featured') : '',
  ]
    .filter(Boolean)
    .join('');

  const topics = [...(repo.tags || []), ...(repo.topics || [])]
    .slice(0, 8)
    .map((topic) => `<span class="topic">${escapeHtml(topic)}</span>`)
    .join('');

  const links = [
    `<a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">GitHub</a>`,
    repo.homepage
      ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer">Homepage</a>`
      : '',
  ]
    .filter(Boolean)
    .join('');

  return `
    <article class="repo-card ${featured ? 'featured' : ''}">
      <div class="repo-title-row">
        <h3 class="repo-title">
          <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a>
        </h3>
      </div>
      <div class="badges">${badges}</div>
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

function badge(text, extraClass = '') {
  return `<span class="badge ${extraClass}">${escapeHtml(text)}</span>`;
}

function normalizeRepos(repos, overrides) {
  return [...repos]
    .map((repo) => {
      const override = overrides[repo.name] || {};
      const topics = Array.from(new Set([...(repo.topics || []), ...(override.topics || [])]));
      const tags = Array.from(new Set(override.tags || []));
      const summary =
        override.summary ||
        repo.description ||
        'No curated summary yet. This repository still needs a public-facing description.';

      return {
        ...repo,
        homepage: override.homepage || repo.homepage || '',
        description: repo.description || '',
        summary,
        status: override.status || deriveStatus(repo),
        topics,
        tags,
        isFeatured: Boolean(override.featured),
      };
    })
    .sort((a, b) => {
      if (a.name === 'an-overview') return -1;
      if (b.name === 'an-overview') return 1;
      return String(b.updated_at || '').localeCompare(String(a.updated_at || ''));
    });
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

async function fetchLiveRepos(org) {
  const endpoints = [
    `https://api.github.com/orgs/${org}/repos?per_page=100&type=public&sort=updated`,
    `https://api.github.com/users/${org}/repos?per_page=100&type=public&sort=updated`,
  ];

  for (const endpoint of endpoints) {
    try {
      const repos = await fetchRepoPages(endpoint);
      if (repos.length > 0) {
        return repos;
      }
    } catch (error) {
      console.warn(`Failed endpoint ${endpoint}:`, error);
    }
  }

  throw new Error(`Unable to fetch repositories for ${org}`);
}

async function fetchRepoPages(baseUrl) {
  const all = [];

  for (let page = 1; page <= 10; page += 1) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const response = await fetch(`${baseUrl}${separator}page=${page}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const pageRepos = await response.json();
    all.push(...pageRepos);

    if (pageRepos.length < 100) {
      break;
    }
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
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function formatDate(value) {
  if (!value) return 'unknown';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
