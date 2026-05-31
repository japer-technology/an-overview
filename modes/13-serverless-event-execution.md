# Mode 13 — Serverless / Event Execution

> **Master-model shape:** `function code/config → API call, event, schedule, or message → managed function runtime → provider cloud/edge → per-invocation result`

## What this mode is

Functions defined in the repository that run on managed serverless platforms,
invoked per-event with no long-lived server to manage. Triggers are HTTP requests,
queue messages, storage events, schedules, or database changes.

## Mechanism

| #   | Path                                 | Examples                               |
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

## Uniqueness

- **Per-invocation, ephemeral.** Execution is created on demand for a single event
  and torn down — no persistent process between invocations.
- **Event-source diversity.** A single function can be wired to HTTP, queues, storage
  events, schedules, or DB changes, making the *trigger* the defining variable.
- **Platform-managed scaling.** Concurrency, scale-to-zero, and cold starts are
  intrinsic characteristics absent from daemon/service modes.
- **Fine-grained execution unit.** The deployable unit is a single function, smaller
  than a container or service, with provider-managed runtime and IAM scope.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | function source + handler/trigger config   |
| Trigger           | API call, event, schedule, message         |
| Executor          | Managed serverless runtime                 |
| Environment       | Provider cloud / edge                      |
| Secrets available | Function env vars / IAM role creds          |
| Persistence       | Ephemeral (per invocation)                 |
| Customer flavour  | Managed service / API                      |
