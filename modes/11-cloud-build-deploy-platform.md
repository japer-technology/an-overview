# Mode 11 — Cloud Build / Deploy Platform Execution

> **Master-model shape:** `repo connected to PaaS → git push/webhook → platform build pipeline → provider cloud → deployed app/site/function`

## What this mode is

Platform-as-a-service and managed deploy providers that watch the repository and,
on push, build and deploy it automatically. The platform owns both the build step
and the resulting hosted runtime.

## Mechanism

| #   | Path                         | Examples                            |
| --: | ---------------------------- | ----------------------------------- |
| 93  | PaaS buildpack               | Heroku-style buildpack              |
| 94  | Vercel build / deploy        | Frontend/serverless build           |
| 95  | Netlify build / deploy       | Static/serverless deployment        |
| 96  | Render/Railway/Fly.io deploy | App service/container deployment    |
| 97  | AWS CodeBuild/CodePipeline   | Cloud CI/CD                         |
| 98  | Google Cloud Build           | `cloudbuild.yaml`                   |
| 99  | Azure build / deploy         | Azure App Service, Container Apps   |
| 100 | Cloudflare Pages/Workers     | Edge function/static deploy         |
| 101 | Firebase deploy              | Hosting/functions/rules             |
| 102 | Supabase/Convex/etc. deploy  | Backend/platform-specific execution |

## Uniqueness

- **Build *and* host in one platform.** Unlike pure CI (Modes 08/10), the same
  provider both builds the artifact and runs it as a live service — deploy is the
  point, not just testing.
- **Git-connected automation.** Push-to-deploy is the canonical trigger; the
  platform infers build steps via buildpacks or convention with minimal config.
- **Provider-managed runtime.** Scaling, TLS, routing, and the runtime environment
  are abstracted away by the platform.
- **Opinionated conventions.** Buildpacks and framework detection mean execution can
  happen with little or no explicit pipeline file in the repo.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | framework config, `cloudbuild.yaml`, manifests|
| Trigger           | Git push / webhook                           |
| Executor          | PaaS build + runtime platform                |
| Environment       | Provider cloud / edge                        |
| Secrets available | Platform-managed env vars / production creds |
| Persistence       | Deployed                                     |
| Customer flavour  | SaaS / managed service                       |
