# Mode 21 — Marketplace / Package Distribution Execution

> **Master-model shape:** `repo published to registry/marketplace → customer installs → customer's runtime/platform → customer environment → installed code runs`

## What this mode is

The repository published as a distributable unit on a registry or marketplace, which
customers then install and run. Distribution is the mechanism; execution happens
later in the consumer's environment.

## Mechanism

| #   | Path                          | Examples                           |
| --: | ----------------------------- | ---------------------------------- |
| 189 | GitHub Marketplace Action/App | Customer installs action/app       |
| 190 | npm package                   | Installed/required by customer app |
| 191 | PyPI package                  | Installed/imported/CLI entry point |
| 192 | Docker Hub / GHCR image       | Pulled and run                     |
| 193 | Maven Central artifact        | Java dependency/plugin             |
| 194 | NuGet package                 | .NET dependency/tool               |
| 195 | RubyGems package              | Ruby gem/executable                |
| 196 | Homebrew formula              | Local install/build/run            |
| 197 | Chocolatey/Winget package     | Windows install/run                |
| 198 | App marketplace plugin        | Platform loads app/plugin          |

## Uniqueness

- **Publish once, execute everywhere.** A single published artifact fans out to many
  unknown consumers, each running it in their own environment.
- **Registry as the trust intermediary.** The marketplace/registry mediates
  discovery, versioning, and (sometimes) signing between author and consumer.
- **Defers execution to install/import time.** This mode is about *distribution*;
  actual execution is delegated to Modes 04, 06, 08, or 18 in the consumer's context.
- **Supply-chain leverage point.** Because consumers trust the registry name and
  version, it is a high-impact target for typosquatting and compromise.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | package/image/action manifest + metadata   |
| Trigger           | Customer install / pull / `uses:`           |
| Executor          | Consumer's package manager / platform       |
| Environment       | Customer environment (varies)              |
| Secrets available | Consumer's secrets (not author's)          |
| Persistence       | Installed                                  |
| Customer flavour  | SDK / CLI / action / image / plugin        |
