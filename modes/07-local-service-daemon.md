# Mode 07 — Local Service / Daemon Execution

> **Master-model shape:** `repo-installed service/script → OS scheduler or boot → service manager → local/on-prem machine → long-running or scheduled process`

## What this mode is

Code from the repository installed as a persistent OS-level service, background
agent, or scheduled job. The OS itself (init system, scheduler) becomes the trigger
and supervisor, not a developer at a terminal.

## Mechanism

| #  | Path                     | Examples                                    |
| -: | ------------------------ | ------------------------------------------- |
| 51 | systemd service          | Linux daemon installed from repo            |
| 52 | launchd service          | macOS background service                    |
| 53 | Windows Service          | Installed `.exe` / service                  |
| 54 | Cron job                 | Scheduled script                            |
| 55 | Windows Task Scheduler   | Scheduled executable/script                 |
| 56 | Local agent              | Security agent, sync agent, telemetry agent |
| 57 | Local web server         | `localhost` server                          |
| 58 | Local database procedure | Migrations, stored procedures, triggers     |

The executor is an OS service manager or scheduler. Triggers are boot, timers, or
events. Persistence is the defining trait: the process is installed and survives
beyond a single invocation.

## Uniqueness

- **Persistence and supervision.** Unlike manual runs (Mode 02), the OS restarts,
  schedules, and keeps these processes alive — they outlive the terminal session.
- **Machine identity as trigger.** Boot and timer events, not humans, drive
  execution; the code runs whether or not anyone is logged in.
- **Elevated/system context.** Services often run with system or service-account
  privileges, giving a broader local blast radius.
- **On-prem footprint.** This is the classic way repo code becomes a permanent
  fixture of a single local or on-prem machine, distinct from cloud daemons.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | unit file, plist, cron entry, installer    |
| Trigger           | Boot, schedule, local event                |
| Executor          | systemd / launchd / SCM / cron / scheduler |
| Environment       | Local / on-prem                            |
| Secrets available | Local env / service-account creds          |
| Persistence       | Daemonised / installed                     |
| Customer flavour  | Self-hosted service / agent                |
