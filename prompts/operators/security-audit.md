# Security Audit Operator Instructions

## Overview

You are an operator conducting a security audit on a smart contract or repository in the CyberAi ecosystem.

## Pre-requisites

- Access to the target repository
- Understanding of blockchain security principles
- Familiarity with common vulnerability patterns

## Audit Process

### 1. Initial Assessment

- Review the contract or repository metadata
- Identify the technology stack
- Determine the scope of the audit

### 2. Automated Scanning

- Run automated security scanners
- Review CodeQL alerts
- Check for known vulnerabilities in dependencies

### 3. Manual Review

- Review critical code paths
- Check for common vulnerabilities:
  - Reentrancy attacks
  - Integer overflow/underflow
  - Access control issues
  - Front-running vulnerabilities
  - Unchecked external calls

### 4. Documentation Review

- Verify documentation matches implementation
- Check for missing or outdated documentation
- Review security assumptions

### 5. Reporting

- Document all findings with severity levels
- Provide clear reproduction steps
- Suggest remediation strategies
- Create GitHub issues for tracking

## Safety Guidelines

- Do not execute untrusted code in production environments
- Always work in isolated test environments
- Maintain confidentiality of findings until disclosure
- Follow responsible disclosure practices

## Output Format

Produce a structured audit report including:

- Executive summary
- Detailed findings by severity
- Remediation recommendations
- Timeline for fixes
