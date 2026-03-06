# Branch Sync Audit

_Generated: 2026-03-06_

## Overview

This document records the branch analysis findings for the CyberAi repository as part of the full UI/UX upgrade.

## Active Branches (30+ found)

| Branch                                                      | Purpose                                            | Status                                 |
| ----------------------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| `copilot/add-professional-auto-commenting-system`           | Adds automated PR commenting to CI                 | Superseded by CI simplification        |
| `copilot/automate-fixes-for-pr-36`                          | Automated fix automation for PR #36                | Merged or stale                        |
| `copilot/fix-broken-links-and-optimizations`                | Link fixes and general optimizations               | Candidate to merge/close               |
| `copilot/fix-eslint-flat-config-issues`                     | ESLint 9 flat-config migration                     | Merged into main                       |
| `copilot/fix-issue-in-cyber-ai`                             | General bug fixes                                  | Stale                                  |
| `copilot/initialize-control-plane-infrastructure`           | Control-plane scaffolding                          | Stale — no corresponding files in main |
| `copilot/integrate-advanced-build-files`                    | Advanced build system (esbuild, Dockerfile, turbo) | Merged                                 |
| `copilot/migrate-code-and-documentation`                    | Code + docs migration                              | Merged or stale                        |
| `copilot/rebuild-lock-json-files`                           | Lock file regeneration                             | Merged                                 |
| `copilot/remove-vercel-and-migrate-to-github-pages`         | Vercel → GitHub Pages migration                    | Merged                                 |
| `copilot/set-primary-domain-github-pages`                   | CNAME / domain config                              | Merged                                 |
| `copilot/setup-cyberai-repository-layout`                   | Monorepo layout setup                              | Merged                                 |
| `copilot/sub-pr-27`                                         | Sub-PR for issue #27                               | Stale                                  |
| `copilot/sub-pr-27-again`                                   | Retry of sub-PR #27                                | Stale                                  |
| `copilot/sub-pr-27-another-one`                             | Third attempt for #27                              | Stale                                  |
| `copilot/sub-pr-27-yet-again`                               | Fourth attempt for #27                             | Stale                                  |
| `copilot/sub-pr-38`                                         | Sub-PR for issue #38                               | Stale                                  |
| `copilot/sub-pr-38-again`                                   | Retry of sub-PR #38                                | Stale                                  |
| `copilot/sub-pr-38-another-one`                             | Third attempt for #38                              | Stale                                  |
| `copilot/sub-pr-50`                                         | Sub-PR for issue #50                               | Stale                                  |
| `copilot/sub-pr-50-again`                                   | Retry of sub-PR #50                                | Stale                                  |
| `copilot/sub-pr-50-another-one`                             | Third attempt for #50                              | Stale                                  |
| `copilot/sub-pr-50-yet-again`                               | Fourth attempt for #50                             | Stale                                  |
| `copilot/transition-to-github-pages`                        | GitHub Pages transition                            | Merged                                 |
| `copilot/optimize-cyberai-ui-ux`                            | **This PR** — full UI/UX upgrade                   | Active                                 |
| `cyberai/pipeline-bootstrap`                                | Pipeline bootstrap experiments                     | Stale                                  |
| `dependabot/github_actions/actions/checkout-6`              | Dependabot: actions/checkout v6                    | Auto-managed                           |
| `dependabot/github_actions/actions/download-artifact-8.0.0` | Dependabot: download-artifact v8                   | Auto-managed                           |
| `dependabot/github_actions/actions/setup-node-6`            | Dependabot: setup-node v6                          | Auto-managed                           |
| `dependabot/github_actions/actions/upload-artifact-7`       | Dependabot: upload-artifact v7                     | Auto-managed                           |
| `dependabot/github_actions/docker/build-push-action-6`      | Dependabot: docker/build-push-action v6            | Auto-managed                           |

## Key Findings

### Merged / Landed

- GitHub Pages migration is complete (`CNAME`, `pages-deploy.yml` present in main).
- Advanced build system (esbuild, Dockerfile, turbo.json, Makefile) is merged.
- ESLint flat config is in place (`eslint.config.js`).
- Lock files are regenerated and consistent.

### Stale Branches

- Multiple `sub-pr-*` branches (27, 38, 50 — 4 variants each) are stale artifacts from automated sub-PR retries. These can be safely deleted.
- `cyberai/pipeline-bootstrap` has no corresponding files on `main` and appears abandoned.
- `copilot/initialize-control-plane-infrastructure` has no corresponding code on `main`.

### Auto-managed

- All `dependabot/*` branches are auto-managed by GitHub Dependabot and should not be merged manually.

## Recommendations

1. **Delete stale sub-PR branches**: `sub-pr-27`, `sub-pr-27-again`, `sub-pr-27-another-one`, `sub-pr-27-yet-again`, `sub-pr-38`, `sub-pr-38-again`, `sub-pr-38-another-one`, `sub-pr-50`, `sub-pr-50-again`, `sub-pr-50-another-one`, `sub-pr-50-yet-again`.
2. **Delete abandoned branches**: `cyberai/pipeline-bootstrap`, `copilot/initialize-control-plane-infrastructure`.
3. **Review and close**: `copilot/add-professional-auto-commenting-system` — the CI commenting feature was intentionally removed.
4. **Keep**: All `dependabot/*` branches — managed automatically.
5. **Merge this PR**: `copilot/optimize-cyberai-ui-ux` — delivers the full UI/UX upgrade.
