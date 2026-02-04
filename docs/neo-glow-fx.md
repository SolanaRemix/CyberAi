# Neo Glow FX Auras - UI Styling Guide

## Overview

CyberAi uses the **Neo Glow FX Auras** styling system to provide a modern, polished, and cyberpunk-inspired user interface with neon glow effects, glassmorphism, and smooth animations.

## Features

- **Neon Glow Effects**: Interactive elements with customizable glow intensities
- **Glassmorphism Design**: Modern transparent backgrounds with blur effects
- **Smooth Transitions**: Professional animations for all interactive elements
- **Cyberpunk Color Palette**: Vibrant neon colors with high contrast
- **Accessibility**: Respects user's reduced motion preferences

## Color Palette

```css
--neo-primary: #00d9ff /* Cyan - Primary actions */ --neo-secondary: #ff006e
  /* Magenta - Secondary actions */ --neo-accent: #8338ec /* Purple - Accent elements */
  --neo-success: #06ffa5 /* Green - Success states */ --neo-warning: #ffbe0b
  /* Yellow - Warning states */ --neo-danger: #ff006e /* Red - Danger/Error states */;
```

## Utility Classes

### Glow Effects

Apply neon glow effects to any element:

```html
<!-- Primary glow -->
<button class="neo-glow-primary">Click Me</button>

<!-- Secondary glow -->
<div class="neo-glow-secondary">Featured Content</div>

<!-- Accent glow -->
<span class="neo-glow-accent">Important</span>
```

### Glass Effects

Create glassmorphism backgrounds:

```html
<!-- Subtle glass effect -->
<div class="neo-glass">Content with transparent backdrop</div>

<!-- Strong glass effect -->
<div class="neo-glass-strong">Content with more pronounced blur</div>
```

### Neo Buttons

Modern buttons with glow effects and shine animation:

```html
<button class="neo-button">Hover Me</button>
```

**Features:**

- Border glow on hover
- Shine animation effect
- Smooth color transitions
- Elevated on hover

### Neo Cards

Cards with glassmorphism and hover effects:

```html
<div class="neo-card">
  <h3>Card Title</h3>
  <p>Card content with glow effect on hover</p>
</div>
```

**Features:**

- Glass background
- Glow border on hover
- Lift animation on hover
- Smooth transitions

### Text Glow

Add glow effects to text:

```html
<h1 class="neo-text-glow">Glowing Headline</h1>
```

### Status Indicators

Animated status indicators with glow:

```html
<!-- Active/Success -->
<span class="neo-status-active"></span> Active

<!-- Warning -->
<span class="neo-status-warning"></span> Warning

<!-- Danger/Error -->
<span class="neo-status-danger"></span> Error
```

### Loading Spinner

Animated spinner with glow effect:

```html
<div class="neo-spinner"></div>
```

## Animations

### Pulse Animation

Create pulsing glow effect:

```html
<div class="neo-pulse">Pulsing Element</div>
```

### Border Flow Animation

Animated gradient border:

```html
<div class="neo-border-flow">Flowing Border</div>
```

## Usage Examples

### Hero Section

```html
<section class="hero">
  <h1 class="neo-text-glow">Welcome to CyberAi</h1>
  <p>AI-Powered Smart Contract Security</p>
  <button class="neo-button neo-glow-primary">Get Started</button>
</section>
```

### Feature Card Grid

```html
<div class="feature-grid">
  <div class="neo-card">
    <h3>Contract Registry</h3>
    <p>Machine-readable contracts for ecosystem participants</p>
    <a href="/contracts" class="neo-button">Learn More</a>
  </div>

  <div class="neo-card">
    <h3>SmartBrain AI</h3>
    <p>AI-powered automation and analysis</p>
    <a href="/smartbrain" class="neo-button">Explore</a>
  </div>
</div>
```

### Status Dashboard

```html
<div class="neo-glass dashboard">
  <div class="status-item">
    <span class="neo-status-active"></span>
    <span>System Online</span>
  </div>

  <div class="status-item">
    <span class="neo-status-warning"></span>
    <span>High Load</span>
  </div>

  <div class="status-item">
    <span class="neo-status-danger"></span>
    <span>Critical Alert</span>
  </div>
</div>
```

## Customization

### Adjust Glow Intensity

Modify CSS variables for custom glow levels:

```css
:root {
  --glow-sm: 0 0 5px; /* Small glow */
  --glow-md: 0 0 10px; /* Medium glow */
  --glow-lg: 0 0 20px; /* Large glow */
  --glow-xl: 0 0 30px; /* Extra large glow */
}
```

### Custom Colors

Create custom glow colors:

```css
.neo-glow-custom {
  --custom-color: #ff9500;
  box-shadow:
    var(--glow-md) var(--custom-color),
    var(--glow-lg) var(--custom-color);
}
```

### Animation Speed

Adjust transition speeds:

```css
:root {
  --transition-fast: 0.2s;
  --transition-medium: 0.3s;
  --transition-slow: 0.5s;
}
```

## Dark Mode Support

Neo Glow FX automatically adapts to dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --glass-bg: rgba(0, 0, 0, 0.3);
    --glass-border: rgba(255, 255, 255, 0.15);
  }
}
```

## Accessibility

### Reduced Motion

The system respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Contrast Requirements

All glow effects maintain WCAG AA contrast ratios:

- Cyan (#00d9ff) against dark backgrounds: 8.2:1
- Magenta (#ff006e) against dark backgrounds: 5.8:1
- Purple (#8338ec) against dark backgrounds: 5.1:1

## Performance Considerations

### Best Practices

1. **Use Sparingly**: Don't apply glow effects to every element
2. **Combine Effects**: Use multiple utility classes thoughtfully
3. **Test Performance**: Monitor FPS on lower-end devices
4. **Progressive Enhancement**: Ensure base functionality without effects

### Optimization Tips

```css
/* Use transform instead of position changes */
.neo-card:hover {
  transform: translateY(-4px); /* ✓ GPU-accelerated */
  /* top: -4px; */ /* ✗ Slower */
}

/* Prefer opacity over color transitions */
.fade-effect {
  opacity: 0.8; /* ✓ Fast */
  /* background: rgba(...); */ /* ✗ Slower */
}
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (14+)
- Opera: Full support

### Fallbacks

Graceful degradation for older browsers:

```css
/* With backdrop-filter support detection */
@supports (backdrop-filter: blur(10px)) {
  .neo-glass {
    backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .neo-glass {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

## Migration from Legacy Styles

### Before (Legacy)

```html
<button class="btn btn-primary">Click Me</button>
```

### After (Neo Glow FX)

```html
<button class="neo-button neo-glow-primary">Click Me</button>
```

## Resources

- [CSS File](../site/public/neo-glow-fx.css)
- [Layout Examples](../site/src/layouts/Layout.astro)
- [Astro Documentation](https://docs.astro.build/)
- [MDN Web Docs - CSS Effects](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Contributing

To contribute to Neo Glow FX styling:

1. Propose changes in GitHub Issues
2. Test across browsers
3. Ensure accessibility compliance
4. Update this documentation
5. Submit PR with examples

## Support

For questions or issues:

- GitHub Issues: https://github.com/SolanaRemix/CyberAi/issues
- Documentation: https://cyberai.network/docs
- Community: https://github.com/SolanaRemix/CyberAi/discussions
