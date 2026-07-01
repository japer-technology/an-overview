# Modes — Per-Mode Reference

This folder expands [`../MODES.md`](../MODES.md) into one file per **execution-path
mode**. Each file fully describes a mode's **mechanism** (how the repository causes
execution, including every concrete subpath) and its **uniqueness** (what
distinguishes it from the other modes).

## Shared model

Every mode follows the same shape:

> **repo artifact → trigger → executor → runtime environment → customer/service outcome**

Each file tracks a mode against this schema: repo artifact, trigger, executor,
environment, secrets available, persistence, and customer flavour.

## The 24 modes

| #  | Mode | File |
| -: | ---- | ---- |
| 1  | Fetch / checkout-adjacent paths            | [01-fetch-checkout-adjacent.md](01-fetch-checkout-adjacent.md) |
| 2  | Direct local source execution              | [02-direct-local-source-execution.md](02-direct-local-source-execution.md) |
| 3  | Local build / compile / test execution     | [03-local-build-compile-test.md](03-local-build-compile-test.md) |
| 4  | Package-manager execution                  | [04-package-manager-execution.md](04-package-manager-execution.md) |
| 5  | IDE / developer-workbench execution        | [05-ide-developer-workbench.md](05-ide-developer-workbench.md) |
| 6  | Container execution                        | [06-container-execution.md](06-container-execution.md) |
| 7  | Local service / daemon execution           | [07-local-service-daemon.md](07-local-service-daemon.md) |
| 8  | GitHub-native execution                    | [08-github-native-execution.md](08-github-native-execution.md) |
| 9  | Local GitHub Actions emulation             | [09-local-actions-emulation.md](09-local-actions-emulation.md) |
| 10 | Third-party CI/CD execution                | [10-third-party-cicd.md](10-third-party-cicd.md) |
| 11 | Cloud build / deploy platform execution    | [11-cloud-build-deploy-platform.md](11-cloud-build-deploy-platform.md) |
| 12 | Infrastructure-as-code execution           | [12-infrastructure-as-code.md](12-infrastructure-as-code.md) |
| 13 | Serverless / event execution               | [13-serverless-event-execution.md](13-serverless-event-execution.md) |
| 14 | Hosted application / service execution     | [14-hosted-application-service.md](14-hosted-application-service.md) |
| 15 | Customer infrastructure execution          | [15-customer-infrastructure.md](15-customer-infrastructure.md) |
| 16 | Browser-side execution                     | [16-browser-side-execution.md](16-browser-side-execution.md) |
| 17 | Desktop / mobile / distributed app         | [17-desktop-mobile-distributed-app.md](17-desktop-mobile-distributed-app.md) |
| 18 | Plugin / embedded execution                | [18-plugin-embedded-execution.md](18-plugin-embedded-execution.md) |
| 19 | Data, database, and analytics execution    | [19-data-database-analytics.md](19-data-database-analytics.md) |
| 20 | AI / agentic execution                     | [20-ai-agentic-execution.md](20-ai-agentic-execution.md) |
| 21 | Marketplace / package distribution         | [21-marketplace-package-distribution.md](21-marketplace-package-distribution.md) |
| 22 | Release artifact execution                 | [22-release-artifact-execution.md](22-release-artifact-execution.md) |
| 23 | Hardware / edge / embedded execution       | [23-hardware-edge-embedded.md](23-hardware-edge-embedded.md) |
| 24 | Blockchain / distributed-runtime execution | [24-blockchain-distributed-runtime.md](24-blockchain-distributed-runtime.md) |

> The 24 modes here mirror the 24 thematic categories in `MODES.md`, which together
> span **200+ concrete subpaths**. The count is effectively unbounded because any
> external system can read the repo and decide to run something from it.
