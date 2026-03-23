# an-overview

This folder contains the tools and the deployable site for the Japer Technology public repository catalog.

## Contents

- `public-fabric/` — Static GitHub Pages site root (HTML, CSS, JS, data)
- `refresh-public-fabric-snapshot.py` — Script to refresh the fallback repo snapshot from the GitHub API

## Usage

### Refresh the snapshot fallback

```bash
python an-overview/refresh-public-fabric-snapshot.py
```

### Site

The `public-fabric/` directory is deployed to GitHub Pages automatically when changes are pushed to `main`.
