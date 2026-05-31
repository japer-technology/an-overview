# Mode 16 — Browser-Side Execution

> **Master-model shape:** `built web assets → browser loads page/script → user's browser engine → client device → in-browser behaviour`

## What this mode is

Code from the repository that executes inside the end user's web browser: page
JavaScript, single-page apps, WebAssembly, extensions, embedded widgets, service
workers, and installable PWAs.

## Mechanism

| #   | Path                      | Examples                            |
| --: | ------------------------- | ----------------------------------- |
| 144 | Static website JavaScript | Browser executes JS from built site |
| 145 | Single-page app           | React/Vue/Svelte/etc. in browser    |
| 146 | WebAssembly               | WASM module in browser/runtime      |
| 147 | Browser extension         | Chrome/Edge/Firefox extension       |
| 148 | Bookmarklet / snippet     | Customer embeds JS snippet          |
| 149 | Third-party widget        | Script tag loads widget             |
| 150 | Service worker            | Browser background worker           |
| 151 | PWA install               | Web app installed locally           |

## Uniqueness

- **Runs on the user's device, in a sandbox.** Execution happens client-side inside
  the browser's security sandbox, not on any server you or the customer operate.
- **Distributed by loading, not installing.** Most paths execute simply because a
  page or script tag was loaded — distribution is a URL, not a package.
- **Untrusted, inspectable runtime.** Shipped client code is fully visible to users
  and cannot hold secrets; trust flows the other way.
- **Embeds into third-party pages.** Widgets, snippets, and extensions run repo code
  inside *other people's* sites and browsing sessions.

## Tracking schema

| Field             | Typical value                            |
| ----------------- | ---------------------------------------- |
| Repo artifact     | built JS/WASM bundle, extension manifest |
| Trigger           | Page load / script tag / install          |
| Executor          | Browser engine / extension host           |
| Environment       | End-user browser                          |
| Secrets available | None (public client code)                |
| Persistence       | Ephemeral / installed (extension, PWA)   |
| Customer flavour  | Web app / SDK widget / extension         |
