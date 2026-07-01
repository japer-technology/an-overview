# Mode 04 — Package-Manager Execution

> **Master-model shape:** `package manifest → install/run command → package manager → local or customer machine → installed CLI, library, or lifecycle side effect`

## What this mode is

Execution mediated by a language or OS package manager: lifecycle hooks that run on
install, CLI entry points exposed by a package, and — crucially — the case where the
repository is consumed as a dependency inside *someone else's* application.

## Mechanism

| #  | Path                           | Examples                                                        |
| -: | ------------------------------ | --------------------------------------------------------------- |
| 23 | npm / yarn / pnpm scripts      | `npm run build`, `npm test`, `postinstall`                      |
| 24 | npm lifecycle scripts          | `preinstall`, `install`, `postinstall`, `prepare`, `prepublish` |
| 25 | Python package installation    | `pip install .`, `pip install git+…`                            |
| 26 | Python console entry points    | `console_scripts` installed as CLI commands                     |
| 27 | Ruby gem executables           | Gem `executables`                                               |
| 28 | Java / Maven / Gradle plugins  | Build plugins, annotation processors                            |
| 29 | .NET tools / packages          | `dotnet tool install`, MSBuild targets                          |
| 30 | Go install / run from module   | `go install`, `go run module@version`                           |
| 31 | Rust cargo install / bin       | `cargo install`, `cargo run`                                    |
| 32 | Composer scripts               | PHP package scripts                                             |
| 33 | Package consumed as dependency | Customer app imports and executes library code                  |

npm's `scripts` field supports arbitrary scripts plus built-in lifecycle events and
`pre`/`post` conventions. Python entry-point groups such as `console_scripts` expose
installed functions as terminal commands.

## Uniqueness

- **Install-time code execution.** Lifecycle hooks (`postinstall`, MSBuild targets,
  gem extensions) run code merely because someone *installed* the package — a
  primary software supply-chain risk vector.
- **Reach beyond the author.** Path 33 means the repo executes inside arbitrary
  downstream applications the author never controls.
- **Identity as a CLI.** Entry points/executables turn a repo into an installed
  command on the user's `PATH`, blurring "library" and "tool".
- **Cross-ecosystem.** This mode spans every major language packaging system, each
  with its own hook semantics and trust model.

## Tracking schema

| Field             | Typical value                                     |
| ----------------- | ------------------------------------------------- |
| Repo artifact     | `package.json`, `pyproject.toml`, `*.gemspec`, …  |
| Trigger           | Install, import, CLI invocation                   |
| Executor          | Package manager / language runtime                |
| Environment       | Local or customer machine                         |
| Secrets available | Local env / customer env                          |
| Persistence       | Installed                                         |
| Customer flavour  | SDK / CLI / library                               |

## References

- [npm Docs — `scripts`](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [Python Packaging — entry points](https://packaging.python.org/en/latest/specifications/entry-points/)
