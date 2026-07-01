# Mode 03 — Local Build / Compile / Test Execution

> **Master-model shape:** `source → build/test tool → compiler/runner → local machine → binary, report, or generated assets`

## What this mode is

Transforming repository source into something else — a binary, a test report,
generated code, a bundled site — by running build systems, compilers, test runners,
and generators on a developer machine.

## Mechanism

| #  | Path                            | Examples                                                      |
| -: | ------------------------------- | ------------------------------------------------------------- |
| 15 | Compile then execute binary     | C/C++, Go, Rust, Java, C#, Swift                              |
| 16 | Build system target             | `make`, `cmake --build`, `ninja`, `bazel`, `buck`            |
| 17 | Language build tool             | `cargo run`, `go run`, `mvn test`, `gradle run`, `dotnet run` |
| 18 | Test runner                     | `pytest`, `jest`, `mocha`, `go test`, `cargo test`           |
| 19 | Linter / formatter with plugins | ESLint, Prettier plugins, Ruff, RuboCop, Checkstyle           |
| 20 | Code generator                  | OpenAPI generator, Prisma, protobuf, GraphQL codegen          |
| 21 | Static-site generator           | Jekyll, Hugo, Next.js build, Astro, Docusaurus                |
| 22 | Asset bundler                   | Webpack, Vite, Rollup, esbuild, Parcel                        |

The executor is a build tool, compiler, or test runner. Triggered by a human (or a
watch process), it runs locally and emits derived artifacts.

## Uniqueness

- **Produces derived artifacts.** Unlike direct source execution, the defining
  output is a *new* artifact (binary, bundle, generated code, coverage report).
- **Plugin-driven code execution.** Linters, build plugins, and generators execute
  third-party plugin code as a side effect of "just building" — a subtle execution
  surface.
- **Determinism focus.** This mode is where reproducibility, lockfiles, and
  toolchain pinning matter most, because the artifact must match what CI/production
  will later produce.
- **Bridge to CI.** It is the local mirror of what Modes 08–11 do remotely; the same
  commands run here and in cloud pipelines.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | `Makefile`, `Cargo.toml`, `package.json`, etc.|
| Trigger           | Human / file-watch                           |
| Executor          | Compiler / build tool / test runner          |
| Environment       | Local machine                                |
| Secrets available | Local env                                    |
| Persistence       | Ephemeral (artifacts may be installed later) |
| Customer flavour  | Developer tooling                            |
