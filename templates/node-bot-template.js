#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * CuberAi Node Bot Template
 *
 * A template for creating automated bot workflows with SmartBrain integration.
 * This bot is designed to work with the SmartBrain orchestrator and follows
 * conservative safety practices.
 *
 * @requires - Node.js 16+
 * @safety - Defaults to DRY_RUN mode for non-destructive testing
 */

// Configuration
const CONFIG = {
  DRY_RUN: process.env.DRY_RUN !== 'false', // Default to true
  ROOT_DIR: path.join(__dirname, '..'),
  LOG_FILE: path.join(__dirname, '..', 'SMARTBRAIN.log'),
  QUARANTINE_DIR: path.join(__dirname, '..', '.quarantine'),
};

/**
 * Logger utility with SmartBrain integration
 */
class BotLogger {
  constructor(agentName) {
    this.agentName = agentName;
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}][${this.agentName}][${level}] ${message}\n`;

    // Write to console
    console.log(logEntry.trim());

    // Append to SmartBrain log
    try {
      fs.appendFileSync(CONFIG.LOG_FILE, logEntry);
    } catch (err) {
      console.error('Failed to write to log file:', err.message);
    }
  }

  info(message) {
    this.log('INFO', message);
  }
  warn(message) {
    this.log('WARN', message);
  }
  error(message) {
    this.log('ERROR', message);
  }
  alert(message) {
    this.log('ALERT', message);
  }
}

/**
 * Main Bot Class
 */
class NodeBot {
  constructor(name) {
    this.name = name;
    this.logger = new BotLogger(name);
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(CONFIG.QUARANTINE_DIR)) {
      fs.mkdirSync(CONFIG.QUARANTINE_DIR, { recursive: true });
    }
  }

  /**
   * Execute a command safely
   * @param {string} command - Command to execute
   * @param {boolean} dryRun - Override dry-run mode
   */
  safeExec(command, dryRun = CONFIG.DRY_RUN) {
    if (dryRun) {
      this.logger.info(`[DRY_RUN] Would execute: ${command}`);
      return null;
    }

    try {
      this.logger.info(`Executing: ${command}`);
      const output = execSync(command, { cwd: CONFIG.ROOT_DIR, encoding: 'utf8' });
      return output;
    } catch (error) {
      this.logger.error(`Command failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Perform health check
   */
  async healthCheck() {
    this.logger.info('Starting health check...');

    // Check if master.sh exists
    const masterScript = path.join(CONFIG.ROOT_DIR, 'scripts', 'master.sh');
    if (!fs.existsSync(masterScript)) {
      this.logger.warn('master.sh not found');
      return false;
    }

    this.logger.info('Health check passed');
    return true;
  }

  /**
   * Run the bot workflow
   */
  async run() {
    this.logger.info(`Starting ${this.name}...`);
    this.logger.info(`DRY_RUN mode: ${CONFIG.DRY_RUN}`);

    try {
      // Perform health check
      const healthy = await this.healthCheck();
      if (!healthy) {
        this.logger.warn('Health check failed, exiting');
        return;
      }

      // Add your bot logic here
      this.logger.info('Bot workflow execution would go here');

      // Example: Call SmartBrain orchestrator
      // this.safeExec('bash scripts/master.sh health');

      this.logger.info(`${this.name} completed successfully`);
    } catch (error) {
      this.logger.error(`${this.name} failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Main execution
if (require.main === module) {
  const bot = new NodeBot('CuberAiBot');
  bot.run().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

export default NodeBot;
