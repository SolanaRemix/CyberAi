# How to Disconnect Vercel GitHub App

This guide provides step-by-step instructions to completely remove the Vercel GitHub App integration from your repository, which will stop the Vercel bot from commenting on pull requests.

## Why This Is Needed

After migrating from Vercel to GitHub Pages, the Vercel GitHub App may still be connected to your repository. This causes:
- Vercel bot comments on every PR/commit
- Failed deployment notifications
- Unnecessary Vercel build attempts (even with `vercel.json` disabling builds)

## Complete Removal Steps

### Option 1: Disconnect from GitHub Repository Settings (Recommended)

1. **Navigate to Repository Settings**
   - Go to: `https://github.com/SolanaRemix/CyberAi/settings/installations`
   - Or: Go to your repository → Settings → Integrations → Applications

2. **Find Vercel App**
   - Look for "Vercel" or "Vercel for GitHub" in the list of installed GitHub Apps

3. **Configure the App**
   - Click the "Configure" button next to Vercel

4. **Remove Repository Access**
   - In the "Repository access" section, either:
     - Uncheck "CyberAi" from the list of repositories
     - Or change from "All repositories" to "Only select repositories" and uncheck this repo

5. **Save Changes**
   - Scroll to bottom and click "Save"

6. **Verify Removal**
   - Run the verification script: `npm run verify-vercel-disconnect`
   - Or manually check: No more Vercel bot comments should appear on new PRs

### Option 2: Disconnect from Vercel Dashboard

1. **Log into Vercel**
   - Go to: `https://vercel.com/gxq-studio/cyber-ai/settings`
   - Or navigate: Vercel Dashboard → cyber-ai project → Settings

2. **Navigate to Git Settings**
   - Click on the "Git" tab in project settings

3. **Disconnect GitHub Integration**
   - Find the "Disconnect Git Repository" or similar option
   - Click "Disconnect"
   - Confirm the action

4. **Optionally Delete Project**
   - If you no longer need the Vercel project at all:
   - Go to Settings → General
   - Scroll to "Delete Project"
   - Follow the deletion prompts

### Option 3: Uninstall Vercel App Completely (Nuclear Option)

⚠️ **Warning**: This will remove Vercel from ALL your repositories, not just this one.

1. **Go to GitHub Settings**
   - Navigate to: `https://github.com/settings/installations`

2. **Find Vercel**
   - Look for "Vercel" in the list of installed apps

3. **Uninstall**
   - Click "Configure"
   - Scroll to the bottom
   - Click "Uninstall"
   - Confirm the action

## Verification

After disconnection, you can verify Vercel is fully removed:

### Automated Verification

```bash
npm run verify-vercel-disconnect
```

This script checks:
- ✅ No `.vercel` directory exists
- ✅ `vercel.json` has builds disabled (if present)
- ✅ No Vercel environment variables in repository secrets
- ✅ No active Vercel deployments

### Manual Verification

1. **Create a test commit/PR**
   - Make a small change and create a PR
   - Wait a few minutes

2. **Check for Vercel bot comments**
   - If Vercel bot still comments, the app is still connected
   - If no Vercel bot comments, disconnection was successful

3. **Check Vercel Dashboard**
   - Go to your Vercel dashboard
   - The "cyber-ai" project should not show any new deployments

## What Happens to Existing Deployments?

- **Existing Vercel deployments remain accessible** until you delete them
- **No new deployments will be created** after disconnection
- **Existing preview URLs continue to work** but won't update

To remove old deployments:
1. Go to Vercel Dashboard → cyber-ai project
2. Click on "Deployments" tab
3. Delete deployments individually or delete the entire project

## Troubleshooting

### Vercel Bot Still Comments After Disconnection

**Possible causes:**
1. Changes haven't propagated yet (wait 5-10 minutes)
2. Multiple Vercel installations (check all organizations/accounts)
3. Webhooks still active (check repository Settings → Webhooks)

**Solution:**
- Check: `https://github.com/SolanaRemix/CyberAi/settings/hooks`
- Remove any webhooks pointing to vercel.com

### Can't Find Vercel in GitHub Settings

**Possible causes:**
1. You don't have admin access to the repository
2. Vercel was installed under a different GitHub account
3. App is installed at organization level, not repository level

**Solution:**
- Contact repository owner/admin for help
- Check organization settings: `https://github.com/organizations/SolanaRemix/settings/installations`

### "Permission Denied" When Trying to Disconnect

**Solution:**
- Only repository admins can disconnect GitHub Apps
- Contact: @SolanaRemix (repository owner)

## Alternative: Keep Vercel App but Silence It

If you need Vercel for other projects but want to silence it for this repo:

1. Keep `vercel.json` with:
   ```json
   {
     "buildCommand": null,
     "github": {
       "enabled": false,
       "silent": true
     }
   }
   ```

2. This prevents builds and enables silent mode
3. Vercel bot may still comment but builds won't run

## Support

If you need help:
1. Check Vercel documentation: https://vercel.com/docs
2. Create an issue in this repository
3. Contact repository maintainers

## Related Files

- `vercel.json` - Disables Vercel builds (can be removed after disconnection)
- `.vercelignore` - Prevents file inclusion (can be removed after disconnection)
- `tools/vercel-scanner.sh` - Diagnostic tool for Vercel configuration
- `VERCEL_MIGRATION_REPORT.md` - Full migration documentation
