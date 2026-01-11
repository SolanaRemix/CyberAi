/**
 * CyberAi Control-Plane Platform
 * Main entry point for the CyberAi ecosystem
 */

export * from './agents';
export * from './contracts';
export * from './security';
export * from './utils';

/**
 * CyberAi version
 */
export const VERSION = '1.0.0';

/**
 * Platform configuration
 */
export interface CyberAiConfig {
  apiUrl?: string;
  enableSecurity?: boolean;
  enableAuditing?: boolean;
}

/**
 * Initialize the CyberAi platform
 */
export function initialize(config: CyberAiConfig = {}): void {
  console.log(`CyberAi v${VERSION} initializing...`);
  
  // Platform initialization logic will be implemented here
  const defaultConfig: CyberAiConfig = {
    enableSecurity: true,
    enableAuditing: true,
    ...config,
  };
  
  console.log('Configuration:', defaultConfig);
}
