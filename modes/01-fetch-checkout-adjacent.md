# Mode 01 — Fetch / Checkout-Adjacent Paths

> **Master-model shape:** `repo artifact → git client operation → git/filter process → local machine → developer outcome`

## What this mode is

The set of execution paths that are *adjacent to* getting the repository onto a
machine: cloning, pulling, checking out, and the helper processes Git itself runs
during those operations. The repository is the source artifact, but most of these
operations move bytes rather than run code.

## Mechanism

| #  | Path                                       | What executes                                                  | Where         |
| -: | ------------------------------------------ | -------------------------------------------------------------- | ------------- |
| 1  | Plain `git clone`                          | Usually nothing from the repo                                  | Local machine |
| 2  | `git pull` / checkout                      | Usually nothing from the repo                                  | Local machine |
| 3  | Git hooks, if already installed/configured | Hook scripts such as `pre-commit`, `post-checkout`, `pre-push` | Local machine |
| 4  | Git hooks via configured `core.hooksPath`  | Hook scripts from configured path                              | Local machine |
| 5  | Git LFS / filters / smudge-clean filters   | Filter process configured in Git client                       | Local machine |
| 6  | Submodule checkout                         | Usually fetch/checkout only, not execution                    | Local machine |
| 7  | Sparse checkout / worktree                 | Usually checkout only, not execution                          | Local machine |

The executor is the Git client and any **locally configured** helper process
(hook scripts, LFS smudge/clean filters). Triggers are human-initiated Git
commands. The environment is the developer's local machine with whatever local
credentials are present.

## Uniqueness

- **Mostly non-executing.** This is the only mode where the dominant behaviour is
  *no code execution at all* — the repo is data in transit.
- **Execution is opt-in and local.** Hooks and filters only run when they have been
  configured/installed in the user's Git environment. Tracked hook files do **not**
  automatically become active executable hooks on clone; Git's default hooks
  directory is `$GIT_DIR/hooks`, changeable via `core.hooksPath`.
- **Lowest trust boundary cost.** No CI secrets or production credentials are
  involved — only local environment access.
- **Supply-chain caveat.** LFS/smudge-clean filters and pre-configured hooks are the
  subtle places where a checkout *can* run code, so they are the security-relevant
  exceptions inside an otherwise inert mode.

## Tracking schema

| Field             | Typical value                                  |
| ----------------- | ---------------------------------------------- |
| Repo artifact     | `.git` metadata, `.gitattributes`, hook files  |
| Trigger           | Human (`clone`, `pull`, `checkout`)            |
| Executor          | Git client, filter/hook process                |
| Environment       | Local machine                                  |
| Secrets available | None / local env                               |
| Persistence       | Ephemeral                                      |
| Customer flavour  | Developer tooling                              |

## References

- [Git — `core.hooksPath` and hooks](https://git-scm.com/docs/githooks)
