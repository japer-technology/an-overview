# Mode 20 — AI / Agentic Execution

> **Master-model shape:** `repo content/config → agent reads + decides → agent/LLM-driven executor → CI, local, or hosted runtime → commands run, tools called, models trained`

## What this mode is

Execution where the decision-maker is an AI agent or model pipeline. An agent reads
repository content (code, issues, workflow output, docs) and chooses what to run;
or the repo defines training, inference, RAG, evaluation, or tool-server logic.

## Mechanism

| #   | Path                               | Examples                                    |
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

This category matters because the executor may be an agent that reads repo content,
issue text, workflow output, or documentation, then decides which command to run.

## Uniqueness

- **Non-deterministic decision-maker.** Unlike every other mode, *what* executes is
  chosen at runtime by a model, not fixed by a config file or human command.
- **Content becomes instruction.** Repo text, issues, and docs can influence agent
  behaviour, introducing prompt-injection and untrusted-input risks unique here.
- **The repo as a tool surface.** MCP servers and agent harnesses expose repo
  capabilities *to* agents, inverting the usual "code runs" relationship.
- **Generated-then-executed code.** Prompt-to-script paths execute artifacts that
  did not exist when the repo was authored.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | agent config, MCP/tool defs, training/eval code|
| Trigger           | Agent decision / comment command / pipeline  |
| Executor          | AI agent / model runtime                      |
| Environment       | CI, local, or hosted                         |
| Secrets available | Depends on host (CI secrets, model/API keys) |
| Persistence       | Ephemeral or deployed (inference service)    |
| Customer flavour  | Agent / managed AI service / SDK             |
