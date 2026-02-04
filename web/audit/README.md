# Web Control Panel

## Overview

This directory contains a lightweight GitHub Pages scaffold for the SmartContractAudit control panel and billing interface.

## Files

- **index.html**: Main dashboard displaying scan results, artifacts, and project information
- **billing.html**: Sponsorship tiers and payment integration placeholder
- **README.md**: This file

## Features

### Dashboard (index.html)

- **Statistics Overview**: Total scans, issues found, fixes applied
- **Recent Runs**: Display of recent scan executions (placeholder)
- **Artifacts**: Links to scan artifacts and reports
- **Quick Links**: Navigation to documentation and community resources
- **Sponsor CTA**: Call-to-action for sponsorship

### Billing (billing.html)

- **Sponsorship Tiers**: Display of all 5 sponsorship tiers
- **Payment Integration**: Stripe Checkout placeholder
- **Alternative Payment**: Cash App, cryptocurrency, GitHub Sponsors, OpenCollective
- **Integration Instructions**: Step-by-step guide to enable live payments

## Publishing to GitHub Pages

### Option 1: Repository Settings

1. Go to repository **Settings** > **Pages**
2. Set source to **main branch** and **/web** folder (or root with web/ symlink)
3. Save and wait for deployment
4. Access at: `https://[username].github.io/SmartContractAudit/`

### Option 2: Custom Domain

1. Add `CNAME` file with your domain:
   ```
   audit.yourdomain.com
   ```
2. Configure DNS with your domain provider:
   ```
   Type: CNAME
   Name: audit (or @)
   Value: [username].github.io
   ```
3. Enable HTTPS in GitHub Pages settings

### Option 3: GitHub Actions Deployment

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'web/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './web'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Local Development

```bash
# Serve locally with Python
cd web
python3 -m http.server 8000

# Or use Node.js
npx http-server web -p 8000

# Access at http://localhost:8000
```

## Customization

### Update API Keys

For live payment processing, update placeholders in `billing.html`:

1. **Stripe**: Replace `YOUR_STRIPE_PUBLISHABLE_KEY` with your actual key
2. **Cash App**: Update `$YourCashAppTag` with your Cash App username
3. **Cryptocurrency**: Replace wallet addresses with real ones

### Modify Styling

Both HTML files use inline CSS for simplicity. Adjust colors, fonts, and layout as needed.

### Add Features

- **Authentication**: Integrate OAuth or API key validation
- **Dynamic Data**: Connect to backend API for real-time scan results
- **Analytics**: Add Google Analytics or Plausible tracking

## Security Considerations

- Never commit actual API keys or secrets
- Use environment variables for sensitive configuration
- Enable HTTPS for all payment processing
- Implement CSRF protection for forms
- Validate all user inputs on backend

## Support

For questions or issues:
- Open an issue on GitHub
- See main documentation at `/docs`
- Contact: contact@example.com

## License

Apache 2.0 - See LICENSE file
