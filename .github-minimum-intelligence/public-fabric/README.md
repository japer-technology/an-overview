# public-fabric

Static GitHub Pages site for this repository.

## Files

- `index.html` — page shell
- `styles.css` — site styling
- `app.js` — renders repo cards, filtering, and live GitHub API refresh
- `data/site.json` — hand-written curation: intro copy, featured repos, repo summaries, tags, statuses
- `data/repos-snapshot.json` — fallback repo snapshot used when the GitHub API is unavailable
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Maintenance

1. Edit `data/site.json` to improve summaries, tags, featured repos, or statuses.
2. Push to `main`.
3. The workflow deploys `.github-minimum-intelligence/public-fabric` to GitHub Pages.

The page tries to load live repo data from the GitHub API in the browser. If that fails, it uses `data/repos-snapshot.json`.
