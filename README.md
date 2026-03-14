# japer-technology/an-overview

A living catalog of every public repository published by **Japer Technology**.

🔗 **Live site** — <https://japer-technology.github.io/an-overview/>

---

## What this repo does

This repository powers the **Public Fabric**, a GitHub Pages site that
automatically inventories the Japer Technology GitHub organization.

| Feature | Detail |
|---|---|
| **Live data** | Fetches repositories from the GitHub API on every page load |
| **Snapshot fallback** | Ships a local JSON snapshot so the page always renders |
| **Curated summaries** | Hand-written descriptions and featured repos via `data/site.json` |
| **Search & filter** | Full-text search, language filter, scope filter, and sort controls |

## Repository layout

```
.github-minimum-intelligence/
  public-fabric/          ← GitHub Pages site root
    index.html            Page shell
    styles.css            Styling (dark theme, responsive grid)
    app.js                Rendering, filtering, live API refresh
    data/
      site.json           Curated copy, featured repos, overrides
      repos-snapshot.json Fallback snapshot
    .nojekyll             Disables Jekyll processing
  …                       Other framework files (agent, docs, state)
PUBLIC-FABRIC-ONLINE.md   Step-by-step guide to enable GitHub Pages
```

## Maintaining the site

1. Edit `.github-minimum-intelligence/public-fabric/data/site.json` to change
   summaries, featured repositories, or tags.
2. Push to `main`.
3. The GitHub Actions workflow deploys the site automatically.

See [`PUBLIC-FABRIC-ONLINE.md`](PUBLIC-FABRIC-ONLINE.md) for first-time setup
instructions.

## License

[MIT](./.github-minimum-intelligence/LICENSE.md) — © 2026 Japer Technology
