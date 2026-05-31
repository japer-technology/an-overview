# Mode 10 — Third-Party CI/CD Execution

> **Master-model shape:** `vendor pipeline config → VCS event/webhook → external CI runner → vendor cloud or self-hosted agent → build/test/deploy outcome`

## What this mode is

Continuous integration and delivery driven by non-GitHub CI systems whose pipeline
definitions live in the repository. The repo is mirrored or webhook-connected to an
external platform that runs the pipeline.

## Mechanism

| #  | Path                     | Examples                        |
| -: | ------------------------ | ------------------------------- |
| 82 | Jenkins pipeline         | `Jenkinsfile`                   |
| 83 | GitLab CI mirror         | `.gitlab-ci.yml`                |
| 84 | CircleCI                 | `.circleci/config.yml`          |
| 85 | Buildkite                | `.buildkite/pipeline.yml`       |
| 86 | Travis CI                | `.travis.yml`                   |
| 87 | Azure Pipelines          | `azure-pipelines.yml`           |
| 88 | Bitbucket Pipelines      | `bitbucket-pipelines.yml`       |
| 89 | TeamCity                 | VCS build config                |
| 90 | Drone CI                 | `.drone.yml`                    |
| 91 | Woodpecker CI            | pipeline YAML                   |
| 92 | Semaphore/Codefresh/etc. | vendor-specific pipeline config |

## Uniqueness

- **External executor, repo-defined.** The pipeline logic ships in the repo, but the
  runner, secret store, and trust boundary belong to a third-party platform.
- **Vendor-specific semantics.** Each system has its own config schema, trigger
  model, and credential management — there is no single standard.
- **Parallel/redundant CI.** Often coexists with Mode 08, mirroring the same repo to
  multiple CI systems for migration, redundancy, or organisational reasons.
- **Separate secret estate.** Secrets live in the vendor's vault, not GitHub, so the
  security review surface is duplicated outside GitHub.

## Tracking schema

| Field             | Typical value                            |
| ----------------- | ---------------------------------------- |
| Repo artifact     | `Jenkinsfile`, `.gitlab-ci.yml`, etc.    |
| Trigger           | VCS event / webhook / schedule           |
| Executor          | Vendor CI runner / self-hosted agent     |
| Environment       | Vendor cloud or self-hosted              |
| Secrets available | Vendor CI secrets                        |
| Persistence       | Ephemeral (job lifetime)                 |
| Customer flavour  | Managed / self-hosted CI/CD              |
