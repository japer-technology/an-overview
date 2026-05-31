# Mode 06 — Container Execution

> **Master-model shape:** `Dockerfile/compose → build or run command → container engine → local, CI, or orchestrator → image build steps and runtime processes`

## What this mode is

Building and running container images defined by the repository. The Dockerfile and
compose/orchestration files describe both *build-time* execution (`RUN`) and
*runtime* execution (`CMD`/`ENTRYPOINT`), plus auxiliary containers.

## Mechanism

| #  | Path                                | What executes                         |
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

Dockerfiles are command documents used to assemble images; the reference includes
instructions such as `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ARG`.

## Uniqueness

- **Two distinct execution phases.** Build-time (`RUN`) and runtime
  (`CMD`/`ENTRYPOINT`) execution come from the same artifact but happen at different
  times, places, and trust levels.
- **Portable, reproducible unit.** The image is a self-contained execution unit that
  can run identically on a laptop, in CI, or in a customer cluster.
- **Composition of processes.** Init containers, sidecars, and healthchecks let one
  repo orchestrate *multiple* cooperating processes around the main workload.
- **Distribution channel.** A published image (Path 46) decouples who builds from who
  runs, feeding Modes 14–15 and 21.

## Tracking schema

| Field             | Typical value                             |
| ----------------- | ----------------------------------------- |
| Repo artifact     | `Dockerfile`, `compose.yaml`, `*.yaml`    |
| Trigger           | Build/run command, orchestrator schedule  |
| Executor          | Container engine / BuildKit / orchestrator|
| Environment       | Local, CI, or customer cloud              |
| Secrets available | Build args / runtime secrets / cluster creds |
| Persistence       | Ephemeral or daemonised                    |
| Customer flavour  | Container image / managed service          |

## References

- [Docker Documentation — Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
