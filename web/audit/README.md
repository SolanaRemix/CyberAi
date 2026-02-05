<<<<<<< HEAD
<<<<<<< HEAD
=======

> > > > > > > origin/pr10

# Web Control Panel

## Overview

<<<<<<< HEAD
This directory contains a lightweight GitHub Pages scaffold for the SmartContractAudit control panel and billing interface.

## Files

- **index.html**: Main dashboard displaying scan results, artifacts, and project information
- # **billing.html**: Sponsorship tiers and payment integration placeholder

# Web Dashboard

## Overview

This directory contains a lightweight GitHub Pages scaffold for SmartContractAudit dashboard and billing pages.

## Files

- **index.html**: Main dashboard with scan results, artifacts, and quick links
- **billing.html**: Payment integration page with multiple payment options
  > > > > > > > origin/pr9
- **README.md**: This file

## Features

### Dashboard (index.html)

<<<<<<< HEAD

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

# **Status**: Scaffold ready, payment integration pending

- Scan statistics overview
- Recent scan runs table
- Artifact downloads
- Quick links to documentation
- Sponsor call-to-action
- Responsive design (Tailwind CSS)

### Billing (billing.html)

- Stripe Checkout integration (test mode)
- Cash App P2P payments
- GitHub Sponsors link
- Open Collective link
- Cryptocurrency support (placeholder)
- Integration instructions

## Deployment

### GitHub Pages

1. **Enable GitHub Pages**

   ```
   Settings → Pages → Source: Deploy from branch
   Branch: main → /web directory
   ```

2. **Access Your Site**
   ```
   https://[username].github.io/[repository]/
   ```

### Custom Domain (Optional)

1. Add custom domain in Settings → Pages
2. Create CNAME record pointing to [username].github.io
3. Wait for DNS propagation
4. Enable HTTPS

## Payment Integration

### Stripe Setup

1. **Create Stripe Account**
   - Visit https://stripe.com
   - Complete registration
   - Verify your business

2. **Get API Keys**
   - Dashboard → Developers → API Keys
   - Copy Publishable Key (starts with `pk_test_` or `pk_live_`)
   - **NEVER commit secret keys!**

3. **Update billing.html**

   ```javascript
   // Replace this line:
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_REPLACE_WITH_YOUR_TEST_KEY';

   // With your actual test key:
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_key';
   ```

4. **Create Products**
   - Dashboard → Products
   - Create donation products
   - Note the Price IDs

5. **Backend Required**
   - Stripe Checkout requires server-side session creation
   - Example backend (Node.js):

   ```javascript
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

   app.post('/create-checkout-session', async (req, res) => {
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items: [
         {
           price: 'price_xxx', // Your price ID
           quantity: 1,
         },
       ],
       mode: 'payment',
       success_url: 'https://yoursite.com/success',
       cancel_url: 'https://yoursite.com/cancel',
     });
     res.json({ id: session.id });
   });
   ```

### Cash App Setup

1. **Create Cash App Account**
   - Download Cash App
   - Create account
   - Set up Cash Tag

2. **Update billing.html**

   ```html
   <!-- Replace with your Cash Tag -->
   <code>$SmartContractAudit</code>
   ```

3. **Update Links**
   ```html
   <a href="https://cash.app/$YourCashTag"></a>
   ```

### GitHub Sponsors

See [FUNDING.yml](../FUNDING.yml) for GitHub Sponsors configuration.

1. **Enable Sponsors**
   - Settings → Features → Sponsorships
   - Complete sponsor profile

2. **Update Links**
   - Replace sponsor links in billing.html
   - Update FUNDING.yml with your username

### Open Collective

1. **Create Collective**
   - Visit https://opencollective.com
   - Create collective for your project

2. **Update Links**
   - Replace Open Collective links
   - Add to FUNDING.yml

## Security Notes

### What NOT to Include

- ❌ Stripe Secret Keys (sk_test_xxx or sk_live_xxx)
- ❌ API credentials
- ❌ Private keys
- ❌ Database passwords
- ❌ User data

### What IS Safe to Include

- ✅ Stripe Publishable Keys (pk_test_xxx or pk_live_xxx)
- ✅ Cash App Tags (public)
- ✅ GitHub usernames
- ✅ Social media links
- ✅ Public wallet addresses

### Best Practices

1. **Environment Variables**: Use env vars for sensitive data
2. **Backend Processing**: Handle payments server-side
3. **HTTPS Only**: Always use HTTPS for payment pages
4. **Test Mode**: Test thoroughly before going live
5. **Rate Limiting**: Implement rate limiting on backend
6. **Logging**: Log transactions (not card data)
7. **PCI Compliance**: Follow PCI DSS guidelines

## Customization

### Colors

The dashboard uses Tailwind CSS. Key colors:

- Primary Blue: `blue-600`
- Success Green: `green-600`
- Warning Yellow: `yellow-600`
- Error Red: `red-600`

### Branding

1. Replace logo/brand name
2. Update color scheme
3. Add your own images
4. Customize footer links

### Content

1. Update statistics (currently placeholder)
2. Add real scan data
3. Link to actual artifacts
4. # Update documentation links
   This directory contains a simple web-based dashboard for CyberAi, designed to be published via GitHub Pages.

## Contents

- **index.html**: Main dashboard showing recent scans, statistics, and sponsor call-to-action
- **billing.html**: Sponsorship tiers and payment instructions (Stripe, Cash App, crypto)
- **README.md**: This file

## Publishing to GitHub Pages

### Quick Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from a branch
   - Branch: Select `main` (or `CyberAi` for this branch)
   - Folder: Select `/web`
   - Click Save

2. **Access Your Site**:
   - URL will be: `https://solanaremix.github.io/CyberAi/`
   - Wait 1-2 minutes for initial deployment

### Custom Domain (Optional)

1. Add `CNAME` file in web/ directory:

   ```
   smartcontractaudit.example.com
   ```

2. Configure DNS:
   - Add CNAME record: `www` → `solanaremix.github.io`
   - Add A records for apex domain (see GitHub docs)

3. Enable HTTPS in GitHub Pages settings

## Features

### Dashboard (index.html)

- **Hero Section**: Project introduction and CTAs
- **Statistics**: Key metrics (scans, vulnerabilities, value protected)
- **Recent Scans**: Placeholder scan results with security scores
- **Sponsor CTA**: Prominent call-to-action for sponsorships
- **Documentation Links**: Quick access to all docs
- **Responsive Design**: Mobile-friendly Tailwind CSS

### Billing (billing.html)

- **Tier Comparison**: Bronze, Silver, Gold, Platinum tiers
- **Payment Methods**:
  - **Stripe**: Via GitHub Sponsors (recommended)
  - **Cash App**: Direct payment instructions
  - **Cryptocurrency**: BTC, ETH, SOL, USDC/USDT
  - **Bank Transfer**: For enterprise/platinum
- **FAQ Section**: Common billing questions
- **No Keys/Secrets**: Placeholder instructions only

## Technology Stack

- **Framework**: Pure HTML/CSS/JavaScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Font Awesome 6 (via CDN)
- **Fonts**: Inter from Google Fonts

## Security Notes

### What's Included (Safe)

✅ Placeholder UI  
✅ Links to documentation  
✅ Instructions for payments (no keys)  
✅ Static HTML/CSS/JS only

### What's NOT Included (Secure)

❌ **No API keys or secrets**  
❌ **No Stripe publishable keys**  
❌ **No wallet private keys**  
❌ **No authentication tokens**  
❌ **No backend code**

**Payment Processing**: All actual payment processing happens through:

- GitHub Sponsors (Stripe backend)
- Direct external services (Cash App, crypto wallets)
- Manual invoicing

## Customization

### Update Branding

1. Replace logo references (currently using Font Awesome shield icon)
2. Update color scheme in Tailwind classes
3. Add real logo files to `/web/assets/` (create directory)

### Add Real Data

To connect to real scan data:

1. **Option A**: Static JSON
   - Generate JSON files from scans
   - Load via fetch() in JavaScript
   - Update dashboard dynamically

2. **Option B**: API Integration
   - Build separate API backend
   - Call from JavaScript
   - CORS configuration required

3. **Option C**: Build Process
   - Generate static site from data
   - Use GitHub Actions to rebuild on changes

### Example: Load Real Data

```javascript
// Add to index.html script section
async function loadRecentScans() {
  try {
    const response = await fetch('/data/recent-scans.json');
    const scans = await response.json();
    displayScans(scans);
  } catch (error) {
    console.log('Using placeholder data');
  }
}
```

## Integration with FUNDING.yml

The web interface links to sponsorship options defined in `/FUNDING.yml`:

```yaml
github: [username] # Links to GitHub Sponsors
custom: ['mailto:funding@cyberai.network'] # Billing inquiries
```

Update FUNDING.yml with real values when ready.

> > > > > > > origin/pr10

## Development

### Local Testing

```bash
<<<<<<< HEAD
# Simple HTTP server
python -m http.server 8000
# or
npx serve web/

# Visit http://localhost:8000
```

### With Backend

If integrating with backend:

```bash
# Start your backend
npm start

# Open web files
# Update API endpoints in HTML
```

## Dynamic Data

To make dashboard dynamic, connect to your API:

```javascript
// Example: Fetch scan data
async function loadScans() {
  try {
    const response = await fetch('/api/scans');
    const scans = await response.json();

    // Update dashboard
    displayScans(scans);
  } catch (error) {
    console.error('Failed to load scans:', error);
  }
}
```

## Monitoring

### Analytics

Add Google Analytics or similar:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Add Sentry or similar:

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'your-dsn' });
</script>
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Cash App](https://cash.app)

## Support

For questions about the web dashboard:

- GitHub Issues
- Email: support@cuberai.example

---

_Last updated: 2026-01-01_

> > > > > > > # origin/pr9

# Option 1: Python HTTP server

cd web
python -m http.server 8000

# Visit http://localhost:8000

# Option 2: Node.js http-server

npx http-server web -p 8000

# Option 3: VS Code Live Server extension

# Right-click index.html -> "Open with Live Server"

````

### Making Changes

1. Edit HTML files in `/web/` directory
2. Test locally
3. Commit and push to GitHub
4. GitHub Pages automatically rebuilds (1-2 minutes)

## Deployment

### GitHub Pages Deployment

**Automatic**:
- Push to main branch
- GitHub Pages rebuilds automatically
- Changes live in 1-2 minutes

**Manual Trigger**:
- Go to Actions tab
- Find "pages build and deployment" workflow
- Click "Re-run all jobs" if needed

### Monitoring

Check deployment status:
- Actions tab: Shows build status
- Settings → Pages: Shows last deployment
- Site URL: Test live version

## Limitations

### GitHub Pages Limitations

- Static sites only (no backend)
- No server-side processing
- No database
- No environment variables
- 1GB size limit
- 100GB bandwidth/month (soft limit)

### Workarounds

- **Backend**: Use external API service
- **Database**: Use external service (Firebase, Supabase)
- **Auth**: Use GitHub OAuth or external auth
- **Processing**: GitHub Actions for builds

## Maintenance

### Regular Updates

- Update statistics periodically
- Add new features to dashboard
- Keep dependencies updated (Tailwind, Font Awesome)
- Test on multiple devices/browsers

### Analytics (Optional)

Add analytics to track visitors:

```html
<!-- Google Analytics (example) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
````

Or use privacy-friendly alternatives:

- Plausible Analytics
- Simple Analytics
- GoatCounter

## Support

### Issues

- Web interface bugs: Open GitHub issue with `web` label
- GitHub Pages problems: Check GitHub Status
- Design suggestions: Open discussion

### Resources

- [GitHub Pages Docs](https://docs.github.com/pages)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)

## License

Same as project: Apache-2.0

The web interface is part of CyberAi and follows the same license terms.

## Contributing

Improvements to the web interface are welcome!

1. Fork the repository
2. Make changes to `/web/` files
3. Test locally
4. Submit pull request
5. Follow CONTRIBUTING.md guidelines

---

**Last Updated**: 2026-01-01  
**Status**: Placeholder/Template  
**Production Ready**: No (placeholders need real data)  
**Security Reviewed**: Yes (no secrets included)

> > > > > > > origin/pr10
