# 🛰️ [japer-technology/an-overview](https://japer-technology.github.io/an-overview/)

An overview of all public repositories published by **Japer Technology Pty. Ltd.**

<p align="center">
  <picture>
    <img src="https://raw.githubusercontent.com/japer-technology/an-overview/main/an-overview/GITHUB-OVERVIEW.png" alt="GitHub Intelligence Dashboard" width="500">
  </picture>
</p>

🔗 **Live site** — <https://japer-technology.github.io/an-overview/>

---

## What this repository is

This repository powers the **Public Fabric**: a GitHub Pages site that catalogs the public `japer-technology` GitHub footprint in one place.

It is intended to be the maintained front door for:

- flagship repositories
- experimental repositories
- GitHub-native forks
- published sites and developer portals

## What the site does

| Feature | Detail |
|---|---|
| **Live data** | Fetches repositories from the GitHub API in the browser |
| **Snapshot fallback** | Ships a committed JSON snapshot so the page always renders |
| **Curated summaries** | Uses hand-written summaries and featured-repo metadata from `data/site.json` |
| **Search & filters** | Supports full-text search, language filtering, scope filtering, and sort options |
| **GitHub Pages ready** | Deploys from `an-overview/public-fabric` |

## Repository layout

```text
an-overview/
  public-fabric/                  GitHub Pages site root
    index.html                    Page shell
    styles.css                    Styling and responsive layout
    app.js                        Rendering, filtering, live API refresh, URL-state sync
    data/
      site.json                   Curated copy, featured repos, overrides
      repos-snapshot.json         Fallback snapshot
    404.html                      Friendly not-found page
    robots.txt                    Simple crawler allow-list
    .nojekyll                     Disables Jekyll processing
  script/
    refresh-public-fabric-snapshot.py
                                  Refreshes the snapshot from the GitHub API
PUBLIC-FABRIC-ONLINE.md           Go-live and deployment checklist
```

## Maintaining the catalog

### Update curated content

Edit:

- `an-overview/public-fabric/data/site.json`

### Refresh the snapshot fallback

Run:

```bash
python an-overview/script/refresh-public-fabric-snapshot.py
```

### Deploy

Push changes to `main`.

The GitHub Actions workflow deploys the Pages site automatically.

For first-time setup, see:

- [`PUBLIC-FABRIC-ONLINE.md`](PUBLIC-FABRIC-ONLINE.md)

## License

[MIT](./.github-minimum-intelligence/LICENSE.md) — © 2026 Japer Technology
