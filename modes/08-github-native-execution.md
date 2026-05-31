# Mode 08 — GitHub-Native Execution

> **Master-model shape:** `.github/workflows or app config → repo event → GitHub Actions runner / App → GitHub cloud (or self-hosted runner) → CI/CD outcome`

## What this mode is

The repository's native automation system: GitHub Actions workflows, the actions
they consume, GitHub Apps, and webhooks. Repo events (push, PR, schedule, release,
issue activity) trigger execution managed directly by GitHub.

## Mechanism

| #  | Path                                        | What executes                                 |
| -: | ------------------------------------------- | --------------------------------------------- |
| 59 | GitHub Actions workflow                     | `.github/workflows/*.yml`                     |
| 60 | GitHub-hosted runner                        | Workflow job on GitHub-managed runner         |
| 61 | Self-hosted GitHub Actions runner           | Workflow job on customer/your machine         |
| 62 | Manual workflow dispatch                    | User-triggered Actions run                    |
| 63 | Scheduled workflow                          | Cron-triggered Actions run                    |
| 64 | Push-triggered workflow                     | Runs on push                                  |
| 65 | Pull-request workflow                       | Runs on PR events                             |
| 66 | Issue/comment/discussion-triggered workflow | Event-driven automation                       |
| 67 | Release-triggered workflow                  | Build/publish on release                      |
| 68 | GitHub Action used by another repo          | `uses: owner/repo@ref`                        |
| 69 | Composite Action                            | Action defined by repo metadata/scripts       |
| 70 | JavaScript Action                           | Node-based action                             |
| 71 | Docker Action                               | Container-based action                        |
| 72 | Reusable workflow                           | `workflow_call`                               |
| 73 | GitHub Pages build / deploy                 | Static-site build/deploy                      |
| 74 | CodeQL / code scanning workflow             | Analysis workflow, sometimes with build steps |
| 75 | Dependabot-triggered downstream workflow    | Dependency PR causes CI execution             |
| 76 | GitHub App automation                       | App reacts to repo events                     |
| 77 | GitHub webhook consumer                     | External service executes on GitHub event     |

GitHub Actions is GitHub's repository-native automation system; reusable workflows
are invoked with `workflow_call`.

## Uniqueness

- **Event-native to the repo.** The repository *is* the trigger source — pushes, PRs,
  releases, and comments drive execution with no external CI to wire up.
- **CI secrets and tokens.** Workflows run with access to repository/organisation
  secrets and the `GITHUB_TOKEN`, making this a high-value trust boundary.
- **Reusable and shareable units.** A repo can both *run* workflows and *be* an
  action consumed by other repos (`uses:`), forming a reuse network.
- **Hosted vs self-hosted split.** The same workflow file can run on GitHub-managed
  runners or on machines you control (Path 61), changing the environment and
  available secrets — and bridging into Mode 09.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | `.github/workflows/*.yml`, action metadata   |
| Trigger           | Push, PR, schedule, dispatch, release, event |
| Executor          | GitHub Actions runner / GitHub App           |
| Environment       | GitHub cloud or self-hosted runner           |
| Secrets available | CI secrets, `GITHUB_TOKEN`                    |
| Persistence       | Ephemeral (job lifetime)                      |
| Customer flavour  | Managed CI/CD / automation                    |

## References

- [GitHub Docs — GitHub Actions & reusable workflows](https://docs.github.com/en/actions)
