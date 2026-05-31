# Mode 14 — Hosted Application / Service Execution

> **Master-model shape:** `repo-built app → continuous hosting → provider/your cloud → customer request → SaaS/API experience`

## What this mode is

The repository becomes a continuously running hosted application or service that
customers consume remotely — multi-tenant or single-tenant SaaS, managed APIs and
backends, hosted web apps, and hybrid control-plane/data-plane arrangements.

## Mechanism

| #   | Path                            | What customer experiences                           |
| --: | ------------------------------- | --------------------------------------------------- |
| 125 | Multi-tenant SaaS               | Shared hosted app                                   |
| 126 | Single-tenant SaaS             | Dedicated customer instance                         |
| 127 | Private SaaS                    | Isolated hosted deployment                          |
| 128 | Managed API                     | Customer calls hosted endpoint                      |
| 129 | Managed backend                 | Customer app uses your backend                      |
| 130 | Hosted web app                  | Browser UI                                          |
| 131 | Hosted admin console            | Customer controls service                           |
| 132 | White-label hosted service      | Your app under customer brand                       |
| 133 | Region-specific hosted service  | Regional compliance/runtime boundary                |
| 134 | Hybrid control-plane/data-plane | Control hosted by you, execution near customer data |

## Uniqueness

- **You operate it, customers consume it.** Defining trait: execution runs on
  infrastructure *you* control and is delivered as an ongoing service, not shipped to
  the customer.
- **Tenancy as a design axis.** Multi-/single-/private-tenant variations distinguish
  isolation, data residency, and runtime boundaries.
- **Production credentials and customer data.** The runtime holds production secrets
  and (often) customer data, the highest-sensitivity operating context.
- **Branding and region boundaries.** White-label and region-specific variants show
  the same code executing under different identities/jurisdictions.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | application source + deploy config         |
| Trigger           | Customer requests / API calls (continuous) |
| Executor          | Hosted app/service runtime                 |
| Environment       | Your cloud (or hybrid near customer data)  |
| Secrets available | Production creds, customer keys            |
| Persistence       | Deployed (always-on)                       |
| Customer flavour  | SaaS / managed API / managed backend       |
