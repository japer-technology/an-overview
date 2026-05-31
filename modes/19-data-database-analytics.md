# Mode 19 — Data, Database, and Analytics Execution

> **Master-model shape:** `repo-defined query/job/pipeline → schedule, DB event, or orchestrator → data engine → warehouse/DB/cluster → transformed data or report`

## What this mode is

Repository code that executes inside data systems: SQL migrations and stored
procedures, database triggers, ETL/orchestration pipelines, warehouse jobs, notebook
jobs, and distributed batch/stream processing.

## Mechanism

| #   | Path                      | Examples                          |
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

## Uniqueness

- **Execution lives inside the data engine.** Stored procedures, triggers, and
  warehouse jobs run *within* the database/warehouse, not on a separate app server.
- **Data-driven triggers.** DB row events and pipeline DAG dependencies drive
  execution, distinct from request- or push-based triggers.
- **Batch and streaming scale.** Spark/Flink paths execute across distributed
  clusters over large datasets — a scale dimension unique to this mode.
- **State mutation is the point.** Migrations and triggers exist to change persisted
  data/schema, making correctness and irreversibility central concerns.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | SQL files, dbt models, DAGs, job definitions |
| Trigger           | Schedule / DB event / orchestrator           |
| Executor          | Database / warehouse / Spark / orchestrator  |
| Environment       | Data platform / cluster                      |
| Secrets available | DB / warehouse credentials                   |
| Persistence       | Deployed (jobs) / embedded (procs, triggers) |
| Customer flavour  | Managed data service / pipeline              |
