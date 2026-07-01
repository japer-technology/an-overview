# Mode 05 — IDE / Developer-Workbench Execution

> **Master-model shape:** `IDE/repo config → developer action in editor → IDE-invoked tool/runner → local machine or dev container → run/debug/test result`

## What this mode is

Execution mediated by the developer's editor or IDE. Repository-tracked
configuration (`.vscode/`, `.idea/`, `.devcontainer/`) tells the IDE how to run,
debug, build, or containerise the project, and the IDE invokes those tools on the
developer's behalf.

## Mechanism

| #  | Path                                         | Examples                                            |
| -: | -------------------------------------------- | --------------------------------------------------- |
| 34 | VS Code tasks                                | `.vscode/tasks.json`                                |
| 35 | VS Code debug launch                         | `.vscode/launch.json`                               |
| 36 | VS Code Dev Container                        | `.devcontainer/devcontainer.json`                   |
| 37 | VS Code extension-triggered execution        | Extension runs task/build/test based on repo config |
| 38 | JetBrains run configuration                  | `.idea/runConfigurations`                           |
| 39 | Eclipse / IntelliJ / Xcode project execution | IDE project metadata                                |
| 40 | Local GitHub Actions from IDE                | VS Code + local Actions runner/emulator             |
| 41 | AI coding assistant execution                | Agent runs tests, build, scripts, migrations        |

VS Code tasks can run external tools and detected project tasks; Dev Containers use
repo configuration such as `devcontainer.json` to create or access a containerised
development environment.

## Uniqueness

- **The repo configures the editor.** Tracked IDE config means *checking out the
  repo* can pre-wire run/debug/build/container behaviour for anyone who opens it.
- **Extension- and agent-mediated.** Execution may be triggered by an installed
  extension or an AI assistant reading repo config — not a direct human command.
- **Environment provisioning.** Dev Containers blur into Mode 06 by standing up a
  full containerised workbench from repo files.
- **Convenience-driven trust.** Auto-detected tasks and "trust this workspace"
  prompts make this a quiet execution surface developers rarely scrutinise.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | `.vscode/*`, `.idea/*`, `devcontainer.json`|
| Trigger           | Developer action / extension / agent       |
| Executor          | IDE, extension, dev container, agent        |
| Environment       | Local machine / dev container              |
| Secrets available | Local env                                  |
| Persistence       | Ephemeral / installed (dev container)      |
| Customer flavour  | Developer tooling                          |

## References

- [Visual Studio Code — Tasks & Dev Containers](https://code.visualstudio.com/docs/editor/tasks)
