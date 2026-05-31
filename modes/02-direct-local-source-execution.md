# Mode 02 — Direct Local Source Execution

> **Master-model shape:** `source file → human runs interpreter → language runtime → local machine → program output`

## What this mode is

Running source code from the repository directly through an interpreter or shell,
without a separate build/compile step. The human points a runtime at a file in the
working tree and it executes immediately.

## Mechanism

| #  | Path                                   | Examples                                                         |
| -: | -------------------------------------- | ---------------------------------------------------------------- |
| 8  | Run interpreted source directly        | `python app.py`, `node index.js`, `ruby app.rb`, `php index.php` |
| 9  | Run shell scripts                      | `./install.sh`, `./deploy.sh`, `./run.sh`                        |
| 10 | Run PowerShell / batch scripts         | `.\setup.ps1`, `build.bat`                                       |
| 11 | Run notebook cells                     | Jupyter, VS Code notebooks, Colab-style notebooks                |
| 12 | Run REPL / imported module manually    | Python import, Node REPL, Ruby console                           |
| 13 | Run examples / demos                   | `examples/demo.py`, `sample-app`, `quickstart`                   |
| 14 | Run migrations / seed scripts manually | `rails db:migrate`, `prisma migrate`, `alembic upgrade`          |

The executor is a language runtime or shell, triggered by a human, in a local
environment with whatever local credentials happen to be set.

## Uniqueness

- **No build artifact.** Source *is* the executable; there is no compiled binary or
  packaged distribution between repo and execution.
- **Immediate and interactive.** REPLs, notebooks, and direct interpreter runs allow
  partial/iterative execution (cell-by-cell, line-by-line) that no other mode offers.
- **Human-in-the-loop trigger.** Unlike CI or serverless, execution is initiated
  manually and deliberately by a person at a terminal.
- **Local-credential blast radius.** Manual migrations/seeds can touch real
  databases if the developer's local env points at non-local resources — the main
  risk distinct to this mode.

## Tracking schema

| Field             | Typical value                         |
| ----------------- | ------------------------------------- |
| Repo artifact     | `.py` / `.js` / `.sh` / notebook file |
| Trigger           | Human                                 |
| Executor          | Interpreter / shell / REPL            |
| Environment       | Local machine                         |
| Secrets available | Local env                             |
| Persistence       | Ephemeral                             |
| Customer flavour  | Developer / operator tooling          |
