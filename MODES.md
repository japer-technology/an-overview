# MODES — Repository Execution-Path Taxonomy

This document outlines, clearly and comprehensively, **every mode by which a GitHub
repository can execute functionality**.

Not every mode is "GitHub-specific". Many are **repo-derived execution paths**: the
repository is the *source artifact*, but execution actually happens somewhere else —
locally, in CI, in the cloud, inside an application, on a customer's machine, or inside
another product.

---

## The master model

Every execution path follows the same shape:

> **repo artifact → trigger → executor → runtime environment → customer/service outcome**

Example:

> `.github/workflows/deploy.yml` → push to `main` → GitHub Actions runner → cloud VM/container → deploys customer service

---

## Tracking schema

For JAPER / customer-service mapping, every path should be tracked with this schema:

| Field             | Meaning                                                             |
| ----------------- | ------------------------------------------------------------------- |
| Path name         | e.g. GitHub Actions, VS Code task, Docker runtime                   |
| Repo artifact     | File/config/source that causes execution                            |
| Trigger           | Human, push, PR, schedule, webhook, install, import, boot, API call |
| Executor          | Shell, runtime, compiler, IDE, CI runner, cloud platform, agent     |
| Environment       | Local, GitHub cloud, customer cloud, on-prem, edge, browser         |
| Secrets available | None, local env, CI secrets, production creds, customer keys        |
| Persistence       | Ephemeral, installed, daemonised, deployed, embedded                |
| Customer flavour  | SaaS, self-hosted, SDK, CLI, managed service, appliance, etc.       |

---

# Complete execution-path taxonomy

## 1. Fetch / checkout-adjacent paths

|  # | Path                                       | What executes                                                  | Where         |
| -: | ------------------------------------------ | -------------------------------------------------------------- | ------------- |
|  1 | Plain `git clone`                          | Usually nothing from the repo                                  | Local machine |
|  2 | `git pull` / checkout                      | Usually nothing from the repo                                  | Local machine |
|  3 | Git hooks, if already installed/configured | Hook scripts such as `pre-commit`, `post-checkout`, `pre-push` | Local machine |
|  4 | Git hooks via configured `core.hooksPath`  | Hook scripts from configured path                              | Local machine |
|  5 | Git LFS / filters / smudge-clean filters   | Filter process configured in Git client                        | Local machine |
|  6 | Submodule checkout                         | Usually fetch/checkout only, not execution                     | Local machine |
|  7 | Sparse checkout / worktree                 | Usually checkout only, not execution                           | Local machine |

> **Important:** Git hooks **do not** automatically travel as executable tracked repo
> hooks on clone. Git's default hooks directory is `$GIT_DIR/hooks`, and it can be changed
> via `core.hooksPath`; hooks run only when configured/present in the user's Git
> environment.

---

## 2. Direct local source execution

|  # | Path                                 | Examples                                                         |
| -: | ------------------------------------ | ---------------------------------------------------------------- |
|  8 | Run interpreted source directly      | `python app.py`, `node index.js`, `ruby app.rb`, `php index.php` |
|  9 | Run shell scripts                    | `./install.sh`, `./deploy.sh`, `./run.sh`                        |
| 10 | Run PowerShell / batch scripts       | `.\setup.ps1`, `build.bat`                                       |
| 11 | Run notebook cells                   | Jupyter, VS Code notebooks, Colab-style notebooks                |
| 12 | Run REPL / imported module manually  | Python import, Node REPL, Ruby console                           |
| 13 | Run examples / demos                 | `examples/demo.py`, `sample-app`, `quickstart`                   |
| 14 | Run migrations / seed scripts manually | `rails db:migrate`, `prisma migrate`, `alembic upgrade`        |

---

## 3. Local build / compile / test execution

|  # | Path                          | Examples                                                      |
| -: | ----------------------------- | ------------------------------------------------------------- |
| 15 | Compile then execute binary   | C/C++, Go, Rust, Java, C#, Swift                              |
| 16 | Build system target           | `make`, `cmake --build`, `ninja`, `bazel`, `buck`             |
| 17 | Language build tool           | `cargo run`, `go run`, `mvn test`, `gradle run`, `dotnet run` |
| 18 | Test runner                   | `pytest`, `jest`, `mocha`, `go test`, `cargo test`            |
| 19 | Linter / formatter with plugins | ESLint, Prettier plugins, Ruff, RuboCop, Checkstyle         |
| 20 | Code generator                | OpenAPI generator, Prisma, protobuf, GraphQL codegen          |
| 21 | Static-site generator         | Jekyll, Hugo, Next.js build, Astro, Docusaurus                |
| 22 | Asset bundler                 | Webpack, Vite, Rollup, esbuild, Parcel                        |

---

## 4. Package-manager execution

|  # | Path                           | Examples                                                        |
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

> npm's `scripts` field supports arbitrary scripts, built-in lifecycle events, and
> `pre`/`post` script conventions. Python packaging entry points can expose installed
> functions as terminal commands through groups such as `console_scripts`.

---

## 5. IDE / developer-workbench execution

|  # | Path                                         | Examples                                            |
| -: | -------------------------------------------- | --------------------------------------------------- |
| 34 | VS Code tasks                                | `.vscode/tasks.json`                                |
| 35 | VS Code debug launch                         | `.vscode/launch.json`                               |
| 36 | VS Code Dev Container                        | `.devcontainer/devcontainer.json`                   |
| 37 | VS Code extension-triggered execution        | Extension runs task/build/test based on repo config |
| 38 | JetBrains run configuration                  | `.idea/runConfigurations`                           |
| 39 | Eclipse / IntelliJ / Xcode project execution | IDE project metadata                                |
| 40 | Local GitHub Actions from IDE                | VS Code + local Actions runner/emulator             |
| 41 | AI coding assistant execution                | Agent runs tests, build, scripts, migrations        |

> VS Code tasks can run external tools and detected project tasks; Dev Containers use repo
> configuration such as `devcontainer.json` to create or access a containerised development
> environment.

---

## 6. Container execution

|  # | Path                                | What executes                         |
| -: | ----------------------------------- | ------------------------------------- |
| 42 | Docker build                        | `Dockerfile RUN …`                    |
| 43 | Docker runtime                      | `CMD`, `ENTRYPOINT`                   |
| 44 | Docker Compose                      | `docker compose up`, service commands |
| 45 | Devcontainer build / run            | Dockerfile + devcontainer lifecycle   |
| 46 | Container image published from repo | Customer pulls and runs image         |
| 47 | Init container                      | Kubernetes init container command     |
| 48 | Sidecar container                   | Companion process/container           |
| 49 | Container healthcheck               | `HEALTHCHECK` command                 |
| 50 | BuildKit / custom build steps       | Advanced container build execution    |

> Dockerfiles are command documents used to assemble images; the Dockerfile reference
> includes instructions such as `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ARG`.

---

## 7. Local service / daemon execution

|  # | Path                     | Examples                                    |
| -: | ------------------------ | ------------------------------------------- |
| 51 | systemd service          | Linux daemon installed from repo            |
| 52 | launchd service          | macOS background service                    |
| 53 | Windows Service          | Installed `.exe` / service                  |
| 54 | Cron job                 | Scheduled script                            |
| 55 | Windows Task Scheduler   | Scheduled executable/script                 |
| 56 | Local agent              | Security agent, sync agent, telemetry agent |
| 57 | Local web server         | `localhost` server                          |
| 58 | Local database procedure | Migrations, stored procedures, triggers     |

---

## 8. GitHub-native execution

|  # | Path                                        | What executes                                 |
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

> GitHub Actions is GitHub's repository-native automation system for executing software
> workflows, and reusable workflows are invoked with `workflow_call`.

---

## 9. Local GitHub Actions emulation

|  # | Path                          | Examples                                    |
| -: | ----------------------------- | ------------------------------------------- |
| 78 | Local Actions runner/emulator | `act` or similar                            |
| 79 | VS Code Local Actions         | Run workflow from IDE                       |
| 80 | Preflight CI simulation       | Run `.github/workflows` locally before push |
| 81 | Local self-hosted runner      | Actual GitHub runner installed locally      |

> This is distinct from GitHub-hosted Actions because the same workflow file can execute
> against **local Docker, local filesystem, local secrets, and local network access**.

---

## 10. Third-party CI/CD execution

|  # | Path                     | Examples                        |
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

---

## 11. Cloud build / deploy platform execution

|   # | Path                         | Examples                            |
| --: | ---------------------------- | ----------------------------------- |
|  93 | PaaS buildpack               | Heroku-style buildpack              |
|  94 | Vercel build / deploy        | Frontend/serverless build           |
|  95 | Netlify build / deploy       | Static/serverless deployment        |
|  96 | Render/Railway/Fly.io deploy | App service/container deployment    |
|  97 | AWS CodeBuild/CodePipeline   | Cloud CI/CD                         |
|  98 | Google Cloud Build           | `cloudbuild.yaml`                   |
|  99 | Azure build / deploy         | Azure App Service, Container Apps   |
| 100 | Cloudflare Pages/Workers     | Edge function/static deploy         |
| 101 | Firebase deploy              | Hosting/functions/rules             |
| 102 | Supabase/Convex/etc. deploy  | Backend/platform-specific execution |

---

## 12. Infrastructure-as-code execution

|   # | Path                 | What executes                                 |
| --: | -------------------- | --------------------------------------------- |
| 103 | Terraform            | Providers create/update infra                 |
| 104 | Pulumi               | General-purpose language executes infra logic |
| 105 | AWS CDK              | Synth/deploy code                             |
| 106 | CloudFormation / SAM | Stack deployment                              |
| 107 | Azure Bicep / ARM    | Azure resource deployment                     |
| 108 | Kubernetes manifests | Cluster schedules workloads                   |
| 109 | Helm chart           | Template/render/install hooks                 |
| 110 | Kustomize            | Rendered manifests applied                    |
| 111 | Kubernetes Operator  | Controller reconciles custom resources        |
| 112 | Ansible playbook     | Remote commands/configuration                 |
| 113 | Chef / Puppet / Salt | Configuration management                      |
| 114 | Cloud-init / user-data | VM startup script                           |

---

## 13. Serverless / event execution

|   # | Path                                 | Examples                               |
| --: | ------------------------------------ | -------------------------------------- |
| 115 | AWS Lambda                           | Function invoked by API/event/schedule |
| 116 | Azure Functions                      | Triggered function                     |
| 117 | Google Cloud Functions/Run Functions | Event/API execution                    |
| 118 | Cloudflare Workers                   | Edge request/event execution           |
| 119 | Vercel/Netlify functions             | Serverless endpoint                    |
| 120 | Queue-triggered function             | SQS, Pub/Sub, RabbitMQ, Kafka consumer |
| 121 | Cron-triggered cloud job             | Scheduled cloud execution              |
| 122 | Object-storage trigger               | S3/GCS/Azure Blob event                |
| 123 | Database trigger / function          | DB event executes function             |
| 124 | Webhook-triggered function           | External event invokes code            |

---

## 14. Hosted application / service execution

|   # | Path                            | What customer experiences                           |
| --: | ------------------------------- | --------------------------------------------------- |
| 125 | Multi-tenant SaaS               | Shared hosted app                                   |
| 126 | Single-tenant SaaS              | Dedicated customer instance                         |
| 127 | Private SaaS                    | Isolated hosted deployment                          |
| 128 | Managed API                     | Customer calls hosted endpoint                      |
| 129 | Managed backend                 | Customer app uses your backend                      |
| 130 | Hosted web app                  | Browser UI                                          |
| 131 | Hosted admin console            | Customer controls service                           |
| 132 | White-label hosted service      | Your app under customer brand                       |
| 133 | Region-specific hosted service  | Regional compliance/runtime boundary                |
| 134 | Hybrid control-plane/data-plane | Control hosted by you, execution near customer data |

---

## 15. Customer infrastructure execution

|   # | Path                                    | Examples                    |
| --: | --------------------------------------- | --------------------------- |
| 135 | Customer on-prem server                 | Installed service           |
| 136 | Customer VM                             | App runs on their VM        |
| 137 | Customer Kubernetes                     | Helm/operator/manifests     |
| 138 | Customer cloud account                  | BYOC deployment             |
| 139 | Customer private cloud                  | VMware/OpenStack/etc.       |
| 140 | Customer air-gapped environment         | Offline install             |
| 141 | Customer edge gateway                   | Local site/device execution |
| 142 | Customer secure enclave/confidential VM | TEE/confidential compute    |
| 143 | Customer appliance                      | Hardware/software bundle    |

---

## 16. Browser-side execution

|   # | Path                      | Examples                            |
| --: | ------------------------- | ----------------------------------- |
| 144 | Static website JavaScript | Browser executes JS from built site |
| 145 | Single-page app           | React/Vue/Svelte/etc. in browser    |
| 146 | WebAssembly               | WASM module in browser/runtime      |
| 147 | Browser extension         | Chrome/Edge/Firefox extension       |
| 148 | Bookmarklet / snippet     | Customer embeds JS snippet          |
| 149 | Third-party widget        | Script tag loads widget             |
| 150 | Service worker            | Browser background worker           |
| 151 | PWA install               | Web app installed locally           |

---

## 17. Desktop / mobile / distributed app execution

|   # | Path                           | Examples                      |
| --: | ------------------------------ | ----------------------------- |
| 152 | Desktop installer              | Windows/macOS/Linux app       |
| 153 | Auto-updating desktop app      | Electron/Tauri/native updater |
| 154 | Mobile app                     | iOS/Android app               |
| 155 | Enterprise mobile deployment   | MDM/private store             |
| 156 | App Store / Play Store release | Store-distributed binary      |
| 157 | Desktop background helper      | Tray app/helper daemon        |
| 158 | Offline-first app              | Local runtime + sync          |

---

## 18. Plugin / embedded execution

|   # | Path                     | Host                                     |
| --: | ------------------------ | ---------------------------------------- |
| 159 | IDE plugin               | VS Code, JetBrains, Eclipse              |
| 160 | Browser plugin/extension | Chrome/Edge/Firefox                      |
| 161 | CMS plugin               | WordPress, Drupal                        |
| 162 | CRM / plugin app         | Salesforce, HubSpot                      |
| 163 | Atlassian app            | Jira/Confluence                          |
| 164 | Slack/Teams app          | Chat platform                            |
| 165 | Shopify app              | Commerce platform                        |
| 166 | Figma/Adobe plugin       | Design tool                              |
| 167 | Database extension       | Postgres extension, SQLite extension     |
| 168 | Runtime plugin           | Plugin loaded by customer's app          |
| 169 | Game / mod plugin        | Game engine or mod host                  |
| 170 | Compiler / build plugin  | Code executes inside build/compiler host |

---

## 19. Data, database, and analytics execution

|   # | Path                      | Examples                          |
| --: | ------------------------- | --------------------------------- |
| 171 | SQL migration             | Schema/data changes               |
| 172 | Stored procedure/function | DB-side execution                 |
| 173 | DB trigger                | Execution on insert/update/delete |
| 174 | ETL pipeline              | Airflow, Dagster, Prefect, dbt    |
| 175 | Data warehouse job        | BigQuery/Snowflake/Redshift job   |
| 176 | Notebook job              | Scheduled notebook                |
| 177 | Spark job                 | Batch/distributed processing      |
| 178 | Stream processor          | Kafka/Flink/Spark Streaming       |
| 179 | Report generator          | PDF/CSV/dashboard job             |

---

## 20. AI / agentic execution

|   # | Path                               | Examples                                    |
| --: | ---------------------------------- | ------------------------------------------- |
| 180 | AI coding agent runs repo commands | Build/test/lint/script execution            |
| 181 | GitHub Actions AI agent            | Agent runs inside CI workflow               |
| 182 | ChatOps agent                      | Comment/issue command triggers execution    |
| 183 | MCP tool server                    | Repo exposes tools callable by agents       |
| 184 | RAG / indexing pipeline            | Repo content processed into index           |
| 185 | Model training/fine-tuning job     | Repo defines training code/config           |
| 186 | Inference service                  | Model server built from repo                |
| 187 | Evaluation harness                 | Repo runs benchmark/tests                   |
| 188 | Prompt-to-script workflow          | LLM output becomes executable script/config |

> This category matters because the executor may be an agent that reads repo content, issue
> text, workflow output, or documentation, then decides which command to run.

---

## 21. Marketplace / package distribution execution

|   # | Path                          | Examples                           |
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

---

## 22. Release artifact execution

|   # | Path                      | Examples                                    |
| --: | ------------------------- | ------------------------------------------- |
| 199 | Downloaded release binary | `.exe`, `.dmg`, `.deb`, `.rpm`, `.AppImage` |
| 200 | Installer package         | MSI, PKG, DEB, RPM                          |
| 201 | Firmware image            | Device executes firmware                    |
| 202 | VM image                  | Customer boots image                        |
| 203 | ISO / appliance image     | Installed/booted system                     |
| 204 | Mobile binary             | APK/IPA                                     |
| 205 | Java archive              | `.jar`                                      |
| 206 | WASM artifact             | Browser/server runtime                      |
| 207 | Signed updater package    | Auto-update execution                       |

---

## 23. Hardware / edge / embedded execution

|   # | Path                               | Examples                      |
| --: | ---------------------------------- | ----------------------------- |
| 208 | Firmware                           | MCU/device code               |
| 209 | IoT edge agent                     | Gateway/device runtime        |
| 210 | Kiosk / appliance app              | Dedicated hardware            |
| 211 | Router/network appliance module    | Network-side execution        |
| 212 | AR/VR device app                   | Headset/device runtime        |
| 213 | Robotics control software          | Robot/controller runtime      |
| 214 | Secure hardware module integration | HSM/TEE/enclave-adjacent code |

---

## 24. Blockchain / distributed-runtime execution

|   # | Path                     | Examples                                        |
| --: | ------------------------ | ----------------------------------------------- |
| 215 | Smart contract deploy    | Solidity/Rust/etc. compiled/deployed            |
| 216 | Smart contract execution | Chain executes deployed bytecode                |
| 217 | Off-chain worker         | Keeper/oracle/indexer                           |
| 218 | Node / validator plugin  | Blockchain node extension                       |
| 219 | Wallet integration       | Browser/mobile wallet executes integration code |

---

# Compressed master list

If you need the answer as a single checklist, use this:

1. Clone/fetch/checkout-adjacent mechanisms
2. Git hooks
3. Git filters/LFS/smudge-clean mechanisms
4. Manual local script execution
5. Interpreted runtime execution
6. Compile/build/run execution
7. Test runner execution
8. Task runner execution
9. Package-manager scripts
10. Package install hooks
11. Package CLI entry points
12. Dependency import/runtime execution
13. IDE tasks/debug configs
14. VS Code Dev Containers
15. VS Code / IDE extension-mediated execution
16. Local GitHub Actions emulation
17. Docker build execution
18. Docker/container runtime execution
19. Docker Compose execution
20. Local services/daemons
21. Local scheduled jobs
22. GitHub Actions cloud execution
23. GitHub Actions self-hosted runner execution
24. Repo used as GitHub Action
25. Reusable GitHub workflow
26. GitHub Pages build/deploy
27. GitHub App/webhook-triggered execution
28. Third-party CI/CD execution
29. Cloud build/deploy platform execution
30. Infrastructure-as-code execution
31. Kubernetes/Helm/operator execution
32. Serverless/function execution
33. Queue/event/webhook execution
34. Hosted SaaS execution
35. Hosted API execution
36. Customer-cloud execution
37. On-prem execution
38. Air-gapped execution
39. Browser-side JavaScript execution
40. WebAssembly execution
41. Browser extension execution
42. Desktop app execution
43. Mobile app execution
44. Plugin/embedded host execution
45. Database/stored-procedure/trigger execution
46. ETL/data-pipeline execution
47. AI/agentic execution
48. Marketplace/package distribution execution
49. Release artifact execution
50. Hardware/edge/firmware execution
51. Blockchain/smart-contract execution

---

# The tight answer

A GitHub repo can execute functionality through **roughly 50 distinct execution-path
classes** and **200+ concrete subpaths**. The exact number is unbounded because any
external system can clone/read the repo and decide to run something from it.

---

## References

- [Git — `core.hooksPath` and hooks](https://git-scm.com/docs/githooks)
- [npm Docs — `scripts`](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [Python Packaging — entry points](https://packaging.python.org/en/latest/specifications/entry-points/)
- [Visual Studio Code — Tasks & Dev Containers](https://code.visualstudio.com/docs/editor/tasks)
- [Docker Documentation — Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [GitHub Docs — GitHub Actions & reusable workflows](https://docs.github.com/en/actions)
