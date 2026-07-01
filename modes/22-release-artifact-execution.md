# Mode 22 — Release Artifact Execution

> **Master-model shape:** `repo build → release/download → user installs or boots artifact → user/device → standalone binary or image runs`

## What this mode is

Pre-built, downloadable release artifacts produced from the repository — binaries,
installers, firmware, VM/ISO images, mobile binaries, archives, WASM artifacts, and
signed updater packages — that customers run directly.

## Mechanism

| #   | Path                      | Examples                                    |
| --: | ------------------------- | ------------------------------------------- |
| 199 | Downloaded release binary | `.exe`, `.dmg`, `.deb`, `.rpm`, `.AppImage` |
| 200 | Installer package         | MSI, PKG, DEB, RPM                          |
| 201 | Firmware image            | Device executes firmware                    |
| 202 | VM image                  | Customer boots image                        |
| 203 | ISO / appliance image     | Installed/booted system                     |
| 204 | Mobile binary             | APK/IPA                                     |
| 205 | Java archive              | `.jar`                                      |
| 206 | WASM artifact             | Browser/server runtime                      |
| 207 | Signed updater package    | Auto-update execution                       |

## Uniqueness

- **Self-contained, prebuilt unit.** The artifact is a finished, runnable product;
  no build step happens on the consumer side (unlike Mode 04 source packages).
- **Direct download distribution.** Delivered as a file (release page, download
  link), not via a registry/package manager or hosted service.
- **Boot- and device-level forms.** VM/ISO/firmware images execute at the
  system/device boot level, the lowest-level delivery in the taxonomy.
- **Signing and integrity centric.** Because users run opaque binaries, code signing
  and update authenticity are the defining trust controls.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | release build outputs + signing config     |
| Trigger           | User download / install / boot / auto-update|
| Executor          | OS / device / VM / runtime                  |
| Environment       | User machine / device / VM                 |
| Secrets available | None embedded (signed, not secret-bearing) |
| Persistence       | Installed / embedded / booted              |
| Customer flavour  | Downloadable binary / appliance / firmware |
