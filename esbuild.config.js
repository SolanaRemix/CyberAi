// CyberAi esbuild Configuration
// =======================================================
// Advanced bundling with optimization and tree-shaking

import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'));

// Common configuration
const commonConfig = {
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  treeShaking: true,
  logLevel: 'info',
  external: [
    // External packages (not bundled)
    ...Object.keys(pkg.dependencies || {}),
    'node:*',
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VERSION': JSON.stringify(pkg.version),
  },
};

// Build configuration for main bundle
const mainConfig = {
  ...commonConfig,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  banner: {
    js: `#!/usr/bin/env node
// CyberAi v${pkg.version}
// Built with esbuild at ${new Date().toISOString()}
`,
  },
};

// Build configuration for agents
const agentsConfig = {
  ...commonConfig,
  entryPoints: ['src/agents/index.ts'],
  outfile: 'dist/agents/index.js',
};

// Build configuration for contracts
const contractsConfig = {
  ...commonConfig,
  entryPoints: ['src/contracts/index.ts'],
  outfile: 'dist/contracts/index.js',
};

// Build configuration for security tools
const securityConfig = {
  ...commonConfig,
  entryPoints: ['src/security/index.ts'],
  outfile: 'dist/security/index.js',
};

// Build configuration for utilities
const utilsConfig = {
  ...commonConfig,
  entryPoints: ['src/utils/index.ts'],
  outfile: 'dist/utils/index.js',
};

// Plugin for advanced features
const advancedPlugin = {
  name: 'cyberai-advanced',
  setup(build) {
    build.onStart(() => {
      console.log('🚀 Starting CyberAi build...');
    });

    build.onEnd(result => {
      if (result.errors.length > 0) {
        console.error('❌ Build failed with errors');
      } else {
        console.log('✅ Build completed successfully');
        if (result.warnings.length > 0) {
          console.warn(`⚠️  Build completed with ${result.warnings.length} warnings`);
        }
      }
    });
  },
};

// Add plugin to all configs
[mainConfig, agentsConfig, contractsConfig, securityConfig, utilsConfig].forEach(config => {
  config.plugins = [advancedPlugin];
});

// Build function
async function build() {
  const isWatch = process.argv.includes('--watch');
  const configs = [mainConfig, agentsConfig, contractsConfig, securityConfig, utilsConfig];

  try {
    if (isWatch) {
      console.log('👀 Starting watch mode...');
      const contexts = await Promise.all(configs.map(config => esbuild.context(config)));
      await Promise.all(contexts.map(ctx => ctx.watch()));
      console.log('👀 Watching for changes...');
    } else {
      console.log('🔨 Building all bundles...');
      await Promise.all(configs.map(config => esbuild.build(config)));
      console.log('✨ All bundles built successfully!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build if this is the main module
const currentFilePath = fileURLToPath(import.meta.url);
const mainScriptPath = process.argv[1];
const isMainModule = currentFilePath === mainScriptPath || 
                     currentFilePath === fileURLToPath(`file://${mainScriptPath}`);

if (isMainModule) {
  build();
}

export { mainConfig, agentsConfig, contractsConfig, securityConfig, utilsConfig, build };
