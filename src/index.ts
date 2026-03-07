/**
 * CyberAi / GOD-SWARM ULTRA — Control-Plane Platform
 * Main entry point for the CyberAi ecosystem
 */

export * from './agents/index.js';
export * from './contracts/index.js';
export * from './security/index.js';
export * from './utils/index.js';

// GOD-SWARM ULTRA modules
export * from './swarm/index.js';
export * from './control-plane/index.js';
export * from './runners/index.js';
export * from './memory/index.js';
export * from './tools/index.js';
export * from './marketplace/index.js';
export * from './integrations/index.js';

/**
 * CyberAi platform version
 */
export const VERSION = '1.1.0';

/**
 * GOD-SWARM ULTRA version
 */
export const SWARM_VERSION = '1.0.0';

/**
 * Platform configuration
 */
export interface CyberAiConfig {
  apiUrl?: string;
  enableSecurity?: boolean;
  enableAuditing?: boolean;
  swarm?: {
    name?: string;
    maxConcurrentWorkflows?: number;
    enableSelfImprovement?: boolean;
  };
}

/**
 * Initialize the CyberAi / GOD-SWARM ULTRA platform
 */
export function initialize(config: CyberAiConfig = {}): void {
  console.log(`CyberAi v${VERSION} + GOD-SWARM ULTRA v${SWARM_VERSION} initializing...`);
  const defaultConfig: CyberAiConfig = {
    enableSecurity: true,
    enableAuditing: true,
    swarm: {
      name: 'GOD-SWARM ULTRA',
      maxConcurrentWorkflows: 10,
      enableSelfImprovement: true,
    },
    ...config,
  };
  console.log('Configuration:', defaultConfig);
}
