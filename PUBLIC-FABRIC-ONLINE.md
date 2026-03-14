# Bringing the public-fabric online

This repository now contains the GitHub Pages site at:

- `.github-minimum-intelligence/public-fabric`

## What you need to do

1. **Commit and push these files to the default branch**
   - The workflow in `.github/workflows/github-minimum-intelligence-agent.yml` deploys the site on pushes to `main`.
   - If your default branch is not `main`, update that workflow first.

2. **Make sure GitHub Pages is allowed for this repository**
   - Go to **Settings → Pages**.
   - If Pages is not already enabled, set the source to **GitHub Actions**.
   - The workflow tries to enable Pages automatically, but this setting is the manual fallback.

3. **Wait for the Actions workflow to deploy**
   - Go to **Actions**.
   - Open the `github-minimum-intelligence-agent` workflow.
   - On the next push to `main`, the `run-gitpages` job should upload and deploy `.github-minimum-intelligence/public-fabric`.

4. **Open the published site**
   - The GitHub Pages URL will usually be:
     - `https://japer-technology.github.io/an-overview/`
   - If the repository name changes, the URL changes with it.

## How to maintain the site

- Edit curated text here:
  - `.github-minimum-intelligence/public-fabric/data/site.json`
- Edit layout or styling here:
  - `.github-minimum-intelligence/public-fabric/index.html`
  - `.github-minimum-intelligence/public-fabric/styles.css`
  - `.github-minimum-intelligence/public-fabric/app.js`
- Push changes to `main` to redeploy.

## Notes

- The site loads a local snapshot first, then attempts to refresh from the live GitHub API in the browser.
- The snapshot fallback lives at:
  - `.github-minimum-intelligence/public-fabric/data/repos-snapshot.json`
- If you want a custom domain later, add a `CNAME` file inside `.github-minimum-intelligence/public-fabric/` and configure DNS to match.
