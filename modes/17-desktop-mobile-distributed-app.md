# Mode 17 — Desktop / Mobile / Distributed App Execution

> **Master-model shape:** `repo-built binary → distributed to user → installed on device → user's machine/phone → native app behaviour`

## What this mode is

The repository compiled and packaged into installable applications that run natively
on end-user desktops and mobile devices, including auto-updating apps, store-released
binaries, background helpers, and offline-first apps.

## Mechanism

| #   | Path                           | Examples                      |
| --: | ------------------------------ | ----------------------------- |
| 152 | Desktop installer              | Windows/macOS/Linux app       |
| 153 | Auto-updating desktop app      | Electron/Tauri/native updater |
| 154 | Mobile app                     | iOS/Android app               |
| 155 | Enterprise mobile deployment   | MDM/private store             |
| 156 | App Store / Play Store release | Store-distributed binary      |
| 157 | Desktop background helper      | Tray app/helper daemon        |
| 158 | Offline-first app              | Local runtime + sync          |

## Uniqueness

- **Native, on-device runtime.** Code executes as a first-class application on the
  user's OS with device APIs, file access, and UI — beyond the browser sandbox of
  Mode 16.
- **Distribution through stores/installers.** Reaches users via signed installers,
  app stores, or MDM, each with its own review, signing, and update mechanics.
- **Self-updating capability.** Auto-updaters let the app fetch and execute new code
  post-install, a distinct ongoing execution channel.
- **Offline autonomy.** Offline-first apps run and persist locally without server
  connectivity, syncing opportunistically — unique among delivery modes.

## Tracking schema

| Field             | Typical value                              |
| ----------------- | ------------------------------------------ |
| Repo artifact     | app source + packaging/signing config      |
| Trigger           | User install / launch / auto-update        |
| Executor          | Native OS runtime / app framework          |
| Environment       | End-user desktop / mobile device           |
| Secrets available | None / device-local user secrets           |
| Persistence       | Installed (auto-updating)                  |
| Customer flavour  | Desktop / mobile application               |
