#!/usr/bin/env python3
"""Refresh the public-fabric repository snapshot from the GitHub API."""

from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

ORG = "japer-technology"
OUTPUT = Path("an-overview/public-fabric/data/repos-snapshot.json")
API_URLS = [
    f"https://api.github.com/orgs/{ORG}/repos?per_page=100&type=public&sort=updated",
    f"https://api.github.com/users/{ORG}/repos?per_page=100&type=public&sort=updated",
]
HEADERS = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "public-fabric-snapshot-refresh",
}


def fetch_json(url: str):
    request = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def fetch_repos():
    last_error = None
    for url in API_URLS:
        try:
            repos = fetch_json(url)
            if repos:
                return repos
        except Exception as exc:  # pragma: no cover - CLI script
            last_error = exc
    raise RuntimeError(f"Unable to fetch repositories for {ORG}: {last_error}")


def normalize(repo: dict) -> dict:
    return {
        "name": repo["name"],
        "full_name": repo["full_name"],
        "html_url": repo["html_url"],
        "description": repo.get("description"),
        "homepage": repo.get("homepage"),
        "language": repo.get("language"),
        "stargazers_count": repo.get("stargazers_count", 0),
        "fork": repo.get("fork", False),
        "archived": repo.get("archived", False),
        "topics": repo.get("topics", []),
        "updated_at": repo.get("updated_at"),
    }


def main() -> int:
    repos = [normalize(repo) for repo in fetch_repos()]
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(repos, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(repos)} repositories to {OUTPUT}")
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI script
    sys.exit(main())
