# Mode 24 — Blockchain / Distributed-Runtime Execution

> **Master-model shape:** `repo contract/worker code → deploy or transaction → chain VM or off-chain worker → distributed network → on-chain state change or integration effect`

## What this mode is

Repository code deployed to and executed by blockchain and distributed-ledger
runtimes: smart contracts, the chain's execution of deployed bytecode, off-chain
workers (keepers/oracles/indexers), node/validator plugins, and wallet integrations.

## Mechanism

| #   | Path                     | Examples                                        |
| --: | ------------------------ | ----------------------------------------------- |
| 215 | Smart contract deploy    | Solidity/Rust/etc. compiled/deployed            |
| 216 | Smart contract execution | Chain executes deployed bytecode                |
| 217 | Off-chain worker         | Keeper/oracle/indexer                           |
| 218 | Node / validator plugin  | Blockchain node extension                       |
| 219 | Wallet integration       | Browser/mobile wallet executes integration code |

## Uniqueness

- **Consensus-driven execution.** Contract code runs identically across many nodes
  and is validated by consensus, not by a single trusted executor.
- **Immutable, deterministic by design.** Deployed bytecode is typically immutable
  and must be deterministic; bugs are largely unpatchable in place.
- **Value-bearing state.** Execution directly moves and gates digital assets, raising
  the stakes of correctness far above ordinary app logic.
- **On-chain + off-chain split.** Off-chain workers and wallet integrations execute
  in conventional environments but exist to feed or react to the chain — a hybrid
  runtime boundary unique to this mode.

## Tracking schema

| Field             | Typical value                                |
| ----------------- | -------------------------------------------- |
| Repo artifact     | contract source/bytecode, worker, plugin code|
| Trigger           | Deploy tx / on-chain call / chain event      |
| Executor          | Chain VM / off-chain worker / node / wallet  |
| Environment       | Distributed network (+ off-chain runtimes)   |
| Secrets available | Signing keys / wallet keys                   |
| Persistence       | Deployed (immutable on-chain) / daemonised   |
| Customer flavour  | Smart contract / dApp / integration          |
