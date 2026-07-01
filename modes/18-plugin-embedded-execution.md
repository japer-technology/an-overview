# Mode 18 — Plugin / Embedded Execution

> **Master-model shape:** `repo-built plugin → installed into host app → host loads and invokes it → host's runtime → in-host behaviour`

## What this mode is

The repository packaged as a plugin/extension that runs *inside another product's*
runtime. The host application — an IDE, browser, CMS, CRM, chat platform, design
tool, database, game, or compiler — loads and invokes the repo's code.

## Mechanism

| #   | Path                     | Host                                     |
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

## Uniqueness

- **Host owns the runtime.** Execution is governed by the host product's process,
  lifecycle, API surface, and permission model — the repo cannot run standalone.
- **Host-defined extension contract.** Each platform dictates packaging, manifest,
  capabilities, and review/marketplace rules.
- **Privileged access to host data.** Plugins often gain access to the host's
  documents, database, or user context, a distinctive trust concern.
- **Spans dev tools to databases to games.** The same "embedded extension" pattern
  recurs across wildly different host categories.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | plugin/extension package + host manifest   |
| Trigger           | Host load / user action within host        |
| Executor          | Host application runtime                    |
| Environment       | Inside host product                        |
| Secrets available | Host-granted scopes / tokens               |
| Persistence       | Installed (within host)                     |
| Customer flavour  | Plugin / app marketplace extension         |
