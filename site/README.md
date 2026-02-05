# CyberAi Site

This directory contains the static site for CyberAi.network, built with Astro.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Structure

```
site/
├── src/
│   ├── pages/          # File-based routing
│   │   ├── index.astro # Homepage
│   │   └── docs/       # Documentation pages
│   ├── layouts/        # Page layouts
│   └── components/     # Reusable components
├── public/             # Static assets
└── dist/               # Build output (not committed)
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow:

1. Builds the site with `npm run build`
2. Uploads the `dist` folder to GitHub Pages
3. Makes the site available at https://cyberai.network

## Adding Pages

Create new `.astro` files in `src/pages/` to add pages:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <main>
    <h1>Content</h1>
  </main>
</Layout>
```

Pages are automatically routed based on file paths:

- `src/pages/index.astro` → `/`
- `src/pages/docs/index.astro` → `/docs`
- `src/pages/docs/quickstart.astro` → `/docs/quickstart`

## Documentation

Documentation pages are in `src/pages/docs/`. They use Astro for templating and styling.

To add new documentation:

1. Create a new `.astro` file in `src/pages/docs/`
2. Import the Layout component
3. Add your content
4. Link to it from other pages

## Custom Domain

The site is configured to use the custom domain `cyberai.network` via:

- CNAME file in the repository root
- DNS records pointing to GitHub Pages
- Astro config setting `site: 'https://cyberai.network'`
