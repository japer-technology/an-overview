# public-fabric

Static GitHub Pages site for this repository.

## Files

- `index.html` — page shell
- `styles.css` — site styling
- `app.js` — rendering, filtering, and live GitHub API refresh
- `data/site.json` — curated copy, featured repos, and overrides
- `data/repos-snapshot.json` — fallback snapshot used when live API access fails
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Maintenance

1. Edit `data/site.json` to improve summaries, tags, or featured repos.
2. Push to `main`.
3. The workflow deploys `.github-minimum-intelligence/public-fabric` to GitHub Pages.
