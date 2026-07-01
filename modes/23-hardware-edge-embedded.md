# Mode 23 — Hardware / Edge / Embedded Execution

> **Master-model shape:** `repo-built firmware/agent → flashed or deployed to device → device processor/runtime → physical edge location → device behaviour`

## What this mode is

Repository code that runs on physical devices and edge hardware: microcontroller
firmware, IoT edge agents, kiosks/appliances, network appliances, AR/VR devices,
robotics controllers, and secure hardware modules.

## Mechanism

| #   | Path                               | Examples                      |
| --: | ---------------------------------- | ----------------------------- |
| 208 | Firmware                           | MCU/device code               |
| 209 | IoT edge agent                     | Gateway/device runtime        |
| 210 | Kiosk / appliance app              | Dedicated hardware            |
| 211 | Router/network appliance module    | Network-side execution        |
| 212 | AR/VR device app                   | Headset/device runtime        |
| 213 | Robotics control software          | Robot/controller runtime      |
| 214 | Secure hardware module integration | HSM/TEE/enclave-adjacent code |

## Uniqueness

- **Physical-world execution.** Code drives sensors, actuators, radios, and robots —
  outputs are physical effects, not just data.
- **Resource-constrained runtimes.** MCU/firmware targets run with tight memory,
  power, and real-time constraints absent from server/cloud modes.
- **Field deployment and flashing.** Delivery means flashing/provisioning hardware,
  often in remote or hard-to-update edge locations.
- **Hardware-rooted trust.** HSM/TEE integration ties execution to secure silicon, a
  trust model unique to this mode.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | firmware/agent source + device config      |
| Trigger           | Device boot / event / sensor input         |
| Executor          | Device processor / embedded runtime / HSM  |
| Environment       | Edge / on-device / physical site           |
| Secrets available | Device keys / hardware-rooted secrets      |
| Persistence       | Embedded / flashed                         |
| Customer flavour  | Appliance / device / firmware              |
