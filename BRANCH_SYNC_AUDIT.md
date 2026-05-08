# Branch Sync Audit

_Generated: 2026-05-08 09:04:33Z (UTC)_

## Scope and Method

- Baseline compared against `origin/main`.
- Each remote branch was tested with `git merge-base origin/main <branch>` and `git rev-list --left-right --count origin/main...<branch>`.
- Status classes:
  - `same-as-main`: branch tip equals `main`.
  - `merged-into-main`: branch tip is an ancestor of `main` (safe cleanup candidate).
  - `ahead-of-main`: branch contains commits not in `main` and cleanly extends from `main`.
  - `diverged`: branch and `main` both contain unique commits.

## Summary

- Total remote branches audited (excluding `main`): **46**
- Fully merged/equivalent branches: **40**
- Active non-merged branches: **6**
- Cleanup candidates (merged + non-protected): **39**

## Active Non-Merged Branches (keep for review/merge decision)

| Branch                                       | Status     | Behind main | Ahead main | Last commit | Commit subject                                                      |
| -------------------------------------------- | ---------- | ----------: | ---------: | ----------- | ------------------------------------------------------------------- |
| `copilot/upgrade-cyberai-enterprise-ready`   | `diverged` |           7 |         21 | 2026-05-08  | Merge pull request #145 from SolanaRemix/copilot/sub-pr-136         |
| `copilot/sub-pr-136`                         | `diverged` |           7 |         20 | 2026-05-08  | fix(ci): load docker image for local run in advanced build workflow |
| `copilot/setup-cyberai-repository-layout`    | `diverged` |         365 |         19 | 2026-01-11  | Fix audit script to validate contracts in correct directory         |
| `pr-81`                                      | `diverged` |         156 |          2 | 2026-03-05  | Apply Prettier formatting fixes                                     |
| `cyberai/pipeline-bootstrap`                 | `diverged` |         375 |          1 | 2026-01-09  | CyberAi Pipeline Bootstrap: structure, workflows, agent.yaml        |
| `copilot/fix-broken-links-and-optimizations` | `diverged` |         236 |          1 | 2026-02-05  | Merge pull request #38 from SolanaRemix/main                        |

## Merged Cleanup Candidates

| Branch                                              | Status             | Behind main | Ahead main | Last commit |
| --------------------------------------------------- | ------------------ | ----------: | ---------: | ----------- |
| `copilot/74595548202-fix-ci-typecheck-failure`      | `merged-into-main` |           4 |          0 | 2026-05-06  |
| `copilot/add-build-md-and-pages-deploy-yml`         | `merged-into-main` |           6 |          0 | 2026-05-06  |
| `copilot/add-minimal-stubs-tests`                   | `merged-into-main` |          72 |          0 | 2026-04-17  |
| `copilot/add-professional-auto-commenting-system`   | `merged-into-main` |         211 |          0 | 2026-02-08  |
| `copilot/automate-fixes-for-pr-36`                  | `merged-into-main` |         264 |          0 | 2026-02-05  |
| `copilot/create-god-swarm-ultra-platform`           | `merged-into-main` |         129 |          0 | 2026-03-07  |
| `copilot/fix-ci-failures-eslint-issues`             | `merged-into-main` |          12 |          0 | 2026-05-06  |
| `copilot/fix-ci-failures-prettier-issues`           | `merged-into-main` |          14 |          0 | 2026-05-05  |
| `copilot/fix-ci-in-pr-136`                          | `merged-into-main` |          20 |          0 | 2026-05-05  |
| `copilot/fix-ci-job-failures`                       | `merged-into-main` |          16 |          0 | 2026-05-06  |
| `copilot/fix-eslint-dependency-issue`               | `merged-into-main` |          23 |          0 | 2026-05-05  |
| `copilot/fix-eslint-flat-config-issues`             | `merged-into-main` |         163 |          0 | 2026-04-03  |
| `copilot/fix-github-actions-job`                    | `merged-into-main` |          18 |          0 | 2026-05-05  |
| `copilot/fix-issue-in-cyber-ai`                     | `merged-into-main` |         273 |          0 | 2026-02-05  |
| `copilot/fix-ui-ux-rebuild-app-structure`           | `merged-into-main` |          42 |          0 | 2026-04-23  |
| `copilot/initialize-control-plane-infrastructure`   | `merged-into-main` |         289 |          0 | 2026-02-04  |
| `copilot/integrate-advanced-build-files`            | `merged-into-main` |         197 |          0 | 2026-02-10  |
| `copilot/migrate-code-and-documentation`            | `merged-into-main` |         381 |          0 | 2026-01-03  |
| `copilot/optimize-cyberai-ui-ux`                    | `merged-into-main` |         147 |          0 | 2026-03-06  |
| `copilot/rebuild-lock-json-files`                   | `merged-into-main` |         326 |          0 | 2026-02-04  |
| `copilot/remove-dead-artifacts-and-update-readme`   | `merged-into-main` |          46 |          0 | 2026-04-22  |
| `copilot/remove-vercel-and-migrate-to-github-pages` | `merged-into-main` |         281 |          0 | 2026-02-05  |
| `copilot/set-primary-domain-github-pages`           | `merged-into-main` |         366 |          0 | 2026-01-10  |
| `copilot/sub-pr-27`                                 | `merged-into-main` |         324 |          0 | 2026-02-05  |
| `copilot/sub-pr-27-again`                           | `merged-into-main` |         325 |          0 | 2026-02-05  |
| `copilot/sub-pr-27-another-one`                     | `merged-into-main` |         324 |          0 | 2026-02-05  |
| `copilot/sub-pr-27-yet-again`                       | `merged-into-main` |         315 |          0 | 2026-02-05  |
| `copilot/sub-pr-38`                                 | `merged-into-main` |         245 |          0 | 2026-02-05  |
| `copilot/sub-pr-38-again`                           | `merged-into-main` |         241 |          0 | 2026-02-05  |
| `copilot/sub-pr-38-another-one`                     | `merged-into-main` |         239 |          0 | 2026-02-05  |
| `copilot/sub-pr-50`                                 | `merged-into-main` |         193 |          0 | 2026-02-10  |
| `copilot/sub-pr-50-again`                           | `merged-into-main` |         190 |          0 | 2026-02-10  |
| `copilot/sub-pr-50-another-one`                     | `merged-into-main` |         188 |          0 | 2026-02-10  |
| `copilot/sub-pr-50-yet-again`                       | `merged-into-main` |         189 |          0 | 2026-02-10  |
| `copilot/transition-to-github-pages`                | `merged-into-main` |         278 |          0 | 2026-02-05  |
| `feature/fix-ci`                                    | `merged-into-main` |         218 |          0 | 2026-02-08  |
| `feature/vercel-deploy`                             | `merged-into-main` |         180 |          0 | 2026-02-10  |
| `fix-npm-error`                                     | `merged-into-main` |         207 |          0 | 2026-02-08  |
| `fix-npm-script`                                    | `merged-into-main` |         223 |          0 | 2026-02-07  |

## Deterministic Cleanup Commands

Run from a maintained admin clone with branch-delete permissions:

```bash
git push origin --delete copilot/74595548202-fix-ci-typecheck-failure
git push origin --delete copilot/add-build-md-and-pages-deploy-yml
git push origin --delete copilot/add-minimal-stubs-tests
git push origin --delete copilot/add-professional-auto-commenting-system
git push origin --delete copilot/automate-fixes-for-pr-36
git push origin --delete copilot/create-god-swarm-ultra-platform
git push origin --delete copilot/fix-ci-failures-eslint-issues
git push origin --delete copilot/fix-ci-failures-prettier-issues
git push origin --delete copilot/fix-ci-in-pr-136
git push origin --delete copilot/fix-ci-job-failures
git push origin --delete copilot/fix-eslint-dependency-issue
git push origin --delete copilot/fix-eslint-flat-config-issues
git push origin --delete copilot/fix-github-actions-job
git push origin --delete copilot/fix-issue-in-cyber-ai
git push origin --delete copilot/fix-ui-ux-rebuild-app-structure
git push origin --delete copilot/initialize-control-plane-infrastructure
git push origin --delete copilot/integrate-advanced-build-files
git push origin --delete copilot/migrate-code-and-documentation
git push origin --delete copilot/optimize-cyberai-ui-ux
git push origin --delete copilot/rebuild-lock-json-files
git push origin --delete copilot/remove-dead-artifacts-and-update-readme
git push origin --delete copilot/remove-vercel-and-migrate-to-github-pages
git push origin --delete copilot/set-primary-domain-github-pages
git push origin --delete copilot/sub-pr-27
git push origin --delete copilot/sub-pr-27-again
git push origin --delete copilot/sub-pr-27-another-one
git push origin --delete copilot/sub-pr-27-yet-again
git push origin --delete copilot/sub-pr-38
git push origin --delete copilot/sub-pr-38-again
git push origin --delete copilot/sub-pr-38-another-one
git push origin --delete copilot/sub-pr-50
git push origin --delete copilot/sub-pr-50-again
git push origin --delete copilot/sub-pr-50-another-one
git push origin --delete copilot/sub-pr-50-yet-again
git push origin --delete copilot/transition-to-github-pages
git push origin --delete feature/fix-ci
git push origin --delete feature/vercel-deploy
git push origin --delete fix-npm-error
git push origin --delete fix-npm-script
```

After deletion, refresh local refs:

```bash
git fetch --prune origin
```

## Notes

- `copilot/update-enterprise-docs-and-cleanup-branches` is intentionally retained because it is the working branch for this change set.
- `dependabot/*` branches are managed by Dependabot lifecycle and are excluded from deletion recommendations.
- Active non-merged branches should be merged or explicitly closed to keep CI deterministic.
