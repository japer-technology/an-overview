# Mode 12 — Infrastructure-as-Code Execution

> **Master-model shape:** `IaC definition → apply/plan command → IaC engine + providers → target cloud/cluster → provisioned or reconciled infrastructure`

## What this mode is

Declarative (and imperative) infrastructure definitions in the repository that, when
applied, cause an IaC engine to create, update, or configure real infrastructure and
remote machines.

## Mechanism

| #   | Path                   | What executes                                 |
| --: | ---------------------- | --------------------------------------------- |
| 103 | Terraform              | Providers create/update infra                 |
| 104 | Pulumi                 | General-purpose language executes infra logic |
| 105 | AWS CDK                | Synth/deploy code                             |
| 106 | CloudFormation / SAM   | Stack deployment                              |
| 107 | Azure Bicep / ARM      | Azure resource deployment                     |
| 108 | Kubernetes manifests   | Cluster schedules workloads                   |
| 109 | Helm chart             | Template/render/install hooks                 |
| 110 | Kustomize              | Rendered manifests applied                    |
| 111 | Kubernetes Operator    | Controller reconciles custom resources        |
| 112 | Ansible playbook       | Remote commands/configuration                 |
| 113 | Chef / Puppet / Salt   | Configuration management                      |
| 114 | Cloud-init / user-data | VM startup script                             |

## Uniqueness

- **Execution *is* infrastructure mutation.** The output is not a program result but
  real-world cloud resources, clusters, and configured machines.
- **High-privilege credentials.** Applying IaC typically requires production cloud
  admin credentials — among the most sensitive execution contexts.
- **Declarative + reconciliation.** Operators and config-management tools execute
  continuously to *converge* actual state to desired state, not just once.
- **Remote command fan-out.** Tools like Ansible/Chef/cloud-init run code across many
  remote hosts from a single repo definition.

## Tracking schema

| Field             | Typical value                                  |
| ----------------- | ---------------------------------------------- |
| Repo artifact     | `*.tf`, charts, manifests, playbooks, templates|
| Trigger           | Apply command / CI pipeline / controller loop  |
| Executor          | Terraform/Pulumi/Helm/Ansible/operator         |
| Environment       | Target cloud / Kubernetes cluster / fleet      |
| Secrets available | Production cloud admin creds                   |
| Persistence       | Deployed / continuously reconciled             |
| Customer flavour  | Managed infra / self-hosted platform           |
