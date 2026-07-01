# Mode 09 — Local GitHub Actions Emulation

> **Master-model shape:** `.github/workflows → developer runs emulator → local runner (act/self-hosted) → local Docker/filesystem → pre-push CI result`

## What this mode is

Running the *same* GitHub Actions workflow files, but locally — via an emulator like
`act`, an IDE integration, or an actually-installed self-hosted runner — to simulate
CI before pushing.

## Mechanism

| #  | Path                          | Examples                                    |
| -: | ----------------------------- | ------------------------------------------- |
| 78 | Local Actions runner/emulator | `act` or similar                            |
| 79 | VS Code Local Actions         | Run workflow from IDE                       |
| 80 | Preflight CI simulation       | Run `.github/workflows` locally before push |
| 81 | Local self-hosted runner      | Actual GitHub runner installed locally      |

## Uniqueness

- **Same artifact, different environment.** The defining trait: the identical
  workflow file executes against **local Docker, local filesystem, local secrets,
  and local network access** instead of GitHub's cloud.
- **Pre-push feedback loop.** It exists to shorten the CI cycle — catch failures
  before they consume hosted-runner minutes or block a PR.
- **Local secret/network exposure.** Because it runs locally, workflows gain access
  to the developer's environment, which differs sharply from the isolated
  GitHub-hosted runner trust model.
- **Fidelity gap.** Emulators approximate GitHub's environment; subtle differences
  from the hosted runner are an inherent characteristic of this mode.

## Tracking schema

| Field             | Typical value                          |
| ----------------- | -------------------------------------- |
| Repo artifact     | `.github/workflows/*.yml`              |
| Trigger           | Human (pre-push) / IDE                  |
| Executor          | `act` / local self-hosted runner       |
| Environment       | Local machine + local Docker           |
| Secrets available | Local env / local secret files         |
| Persistence       | Ephemeral                              |
| Customer flavour  | Developer tooling                      |

## References

- [GitHub Docs — GitHub Actions](https://docs.github.com/en/actions)
