# Mode 15 — Customer Infrastructure Execution

> **Master-model shape:** `repo-built artifact → installed/deployed by customer → customer-controlled environment → runs on customer hardware/cloud → self-managed outcome`

## What this mode is

The repository's software runs on infrastructure the **customer** owns and controls —
on-prem servers, their VMs, their Kubernetes, their cloud account (BYOC), private
clouds, air-gapped sites, edge gateways, secure enclaves, and appliances.

## Mechanism

| #   | Path                                    | Examples                    |
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

## Uniqueness

- **Customer-controlled trust boundary.** Execution happens where *you have no
  direct operational control* — the inverse of hosted SaaS (Mode 14).
- **Data stays with the customer.** Chosen for data-residency, sovereignty, and
  compliance reasons; the code goes to the data, not vice versa.
- **Air-gapped and confidential constraints.** Offline installs and TEEs impose
  delivery, update, and observability constraints unique to this mode.
- **No access to your secrets.** The runtime uses the *customer's* credentials and
  keys; you typically cannot reach into the environment to debug or rotate them.

## Tracking schema

| Field             | Typical value                                 |
| ----------------- | --------------------------------------------- |
| Repo artifact     | installer, chart/operator, image, appliance   |
| Trigger           | Customer install / deploy / boot              |
| Executor          | Customer-operated runtime/orchestrator        |
| Environment       | On-prem / customer cloud / edge / air-gapped  |
| Secrets available | Customer keys (not yours)                      |
| Persistence       | Deployed / installed / embedded               |
| Customer flavour  | Self-hosted / BYOC / appliance                |
