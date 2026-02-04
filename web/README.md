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
          path: 'web'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Integration with Backend

### Connect to Real Data

To display real scan data, integrate with GitHub API or backend:

```javascript
// In index.html, add:
async function loadScanData() {
  const response = await fetch('https://api.github.com/repos/OWNER/REPO/actions/runs');
  const data = await response.json();

  // Update dashboard with real data
  document.querySelector('.total-scans').textContent = data.total_count;
  // ... etc
}

document.addEventListener('DOMContentLoaded', loadScanData);
```

### GitHub Actions Integration

Update workflow to post results:

```yaml
- name: Post results to dashboard
  run: |
    curl -X POST https://yourdomain.com/api/scan-results \
      -H "Content-Type: application/json" \
      -d '{"status": "success", "issues": 5}'
```

## Stripe Integration

### Setup

1. **Create Stripe Account**: https://dashboard.stripe.com/register

2. **Get API Keys**:
   - Test mode: `pk_test_...` and `sk_test_...`
   - Production: `pk_live_...` and `sk_live_...`

3. **Configure Environment Variables**:
   ```bash
   export STRIPE_SECRET_KEY=sk_test_...
   export STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Create Checkout Session Endpoint

```javascript
// Backend API endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  const { tier, price } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tier} Sponsorship`,
            description: `Monthly ${tier} tier sponsorship`,
          },
          unit_amount: price * 100,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/billing',
  });

  res.json({ sessionId: session.id });
});
```

### Update billing.html

```javascript
// Replace placeholder button with:
const stripe = Stripe('pk_test_YOUR_KEY');

async function checkout(tier, price) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tier, price }),
  });

  const session = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId: session.sessionId,
  });

  if (result.error) {
    alert(result.error.message);
  }
}
```

### Webhook Handler

```javascript
// Backend webhook endpoint
app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Provision access, send confirmation email, etc.
    await provisionAccess(session);
  }

  res.json({ received: true });
});
```

## Cash App Integration

To accept Cash App payments:

1. **Set your Cash App handle** in `billing.html`:

   ```html
   <p class="text-sm font-mono bg-gray-100 p-2 rounded">$YourCashAppHandle</p>
   ```

2. **Instructions for users**:
   - Send payment to your Cash App handle
   - Include email in note
   - Email confirmation to you
   - You manually provision access

3. **Automate (optional)**:
   - Cash App doesn't have official API
   - Can use third-party services or manual processing

## Cryptocurrency Integration

For crypto payments:

1. **Set up wallets** for BTC, ETH, USDC, etc.

2. **Display addresses** in `billing.html`

3. **Verify payments**:
   - Monitor blockchain for transactions
   - Use services like BlockCypher or Etherscan API
   - Manual verification for simplicity

4. **Example verification**:
   ```javascript
   async function verifyEthPayment(txHash, expectedAmount) {
     const response = await fetch(
       `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}`
     );
     const data = await response.json();
     // Verify amount and recipient
   }
   ```

## Customization

### Branding

Update colors in both HTML files:

```css
.gradient-bg {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Add Your Logo

Replace the emoji (🔒) with your logo:

```html
<img src="logo.svg" alt="SmartContractAudit" class="h-8" />
```

### Custom Sections

Add new sections following the existing pattern:

```html
<div class="bg-white rounded-lg shadow p-6">
  <h3 class="font-bold text-lg mb-3">Your Section</h3>
  <!-- Your content -->
</div>
```

## Security Notes

### ⚠️ Important

- **Never commit API keys** to the repository
- Use **environment variables** or **GitHub Secrets**
- Always use **test keys** during development
- Enable **webhook signature verification**
- Implement **rate limiting** on backend endpoints
- Use **HTTPS only** for payment pages
- **Sanitize all user inputs**

### FUNDING.yml Integration

The billing page integrates with the repository's `FUNDING.yml`:

```yaml
# .github/FUNDING.yml
github: [YOUR_GITHUB_HANDLE]
open_collective: YOUR_PROJECT
custom: ['https://yourdomain.com/web/billing.html']
```

This makes the "Sponsor" button on GitHub link to your billing page.

## Testing

### Local Testing

1. **Simple HTTP Server**:

   ```bash
   cd web
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Node.js Server**:

   ```bash
   npx serve .
   ```

3. **Live Server** (VS Code extension):
   - Install "Live Server" extension
   - Right-click index.html > "Open with Live Server"

### Test Stripe Integration

1. Use **test mode** API keys
2. Use **test card numbers**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Test webhook with **Stripe CLI**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

## Analytics (Optional)

Add analytics to track usage:

### Google Analytics

```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Support

For questions about the web control panel:

- **General**: hello@cuberai.example
- **Technical**: support@cuberai.example
- **Billing**: billing@cuberai.example

## Related Documentation

- [Sponsorship Tiers](../docs/partners/sponsorship_tiers.md)
- [Partner Program](../docs/partners/README.md)
- [FUNDING.yml](../FUNDING.yml)

---

**Last Updated**: 2026-01-01

**Status**: Scaffold ready, payment integration pending
