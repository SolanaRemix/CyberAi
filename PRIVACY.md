# Privacy Policy

## Overview

This document outlines the privacy and data handling practices for the SmartContractAudit project. We are committed to protecting privacy and handling data responsibly.

## Data Collection and Usage

### What We Collect

This project may collect:

- **Public Repository Data**: Information visible in public GitHub repositories
- **Issue and PR Data**: Publicly submitted issues and pull requests
- **Usage Statistics**: Anonymous analytics about tool usage (when applicable)
- **Error Reports**: Diagnostic information from failures (sanitized)

### What We DO NOT Collect

We **never** collect or store:

- Private keys or seed phrases
- API keys or authentication tokens
- Passwords or credentials
- Personal financial information
- Personally identifiable information (PII) without consent

## Critical Security Policy: No Plaintext Private Keys

### Absolute Prohibition

**We never store, log, or transmit plaintext private keys or sensitive cryptographic material.**

This policy applies to:

- Source code and configuration files
- Log files and error messages
- Audit reports and artifacts
- Temporary files and caches
- Database storage
- Network transmissions
- Memory dumps or debugging output

### Redaction Requirements

All automation and tooling must:

- **Detect** potential secrets before storage or transmission
- **Redact** sensitive data in logs and outputs
- **Sanitize** all public artifacts
- **Reject** PRs or commits containing secrets
- **Alert** on potential exposure incidents

Example redaction patterns:

```
Private Key: [REDACTED]
API Key: ***************
Mnemonic: [REDACTED - 12 words]
Secret: ********
```

### Handling Secret Exposure

If a secret is accidentally exposed:

1. **Immediate Action**: Rotate/revoke the compromised credential
2. **Notification**: Alert security team at security@cuberai.example
3. **Remediation**: Remove from git history using git-filter-repo or BFG
4. **Documentation**: Document incident and prevention measures
5. **Prevention**: Update detection rules to prevent recurrence

## Data Retention

### Artifact Retention

- **Default Retention**: 90 days for workflow artifacts
- **Log Files**: 30 days for standard logs
- **Security Logs**: 180 days for security-related logs
- **Release Artifacts**: Indefinite for stable releases

### Deletion Requests

To request deletion of your data:

1. Email privacy@cuberai.example
2. Specify the data to be deleted
3. Provide verification of ownership
4. We will respond within 14 days

Note: Some data (e.g., public git commits) cannot be deleted due to the distributed nature of git.

## Third-Party Services

This project may use:

- **GitHub**: Repository hosting and CI/CD
  - [GitHub Privacy Policy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)
- **npm/PyPI**: Package distribution
- **CDNs**: Content delivery for documentation

Each service has its own privacy policy. We recommend reviewing them.

## Contributor Privacy

### Public Contributions

By contributing to this project:

- Your commits become part of public git history
- Your GitHub username is visible
- Contribution statistics may be public
- Communications in issues/PRs are public

### Protecting Your Privacy

As a contributor, you can:

- Use a pseudonymous GitHub account
- Use GitHub's private email feature
- Request removal of specific PII from documentation
- Opt out of contributor recognition lists

## Transparency Reports

We are committed to transparency:

- Security incidents are disclosed (after remediation)
- Data breaches are reported promptly
- Changes to this policy are announced

## Contact

For privacy concerns or questions:

**Email**: privacy@cuberai.example

Response time: 5-7 business days

For security issues, use: security@cuberai.example

## Automated Scanning

### Secret Detection

Our tools implement:

- Pre-commit hooks for secret detection (recommended)
- CI/CD scanning for exposed secrets
- Periodic audits of repository history
- Automated redaction in logs and artifacts

### Configurable Detection

Pattern detection includes:

- Private keys (RSA, EC, etc.)
- API keys and tokens
- Database credentials
- OAuth tokens
- JWT tokens
- Encryption keys
- Custom patterns (configurable)

## Compliance

This project aims to be compliant with:

- GDPR (for European contributors)
- CCPA (for California contributors)
- General data protection best practices

While this is an open-source project and not a commercial service, we strive to respect privacy rights globally.

## Data Minimization

We follow the principle of data minimization:

- Collect only what is necessary
- Retain data only as long as needed
- Delete data when no longer required
- Anonymize data when possible

## User Rights

You have the right to:

- **Access**: Request copies of your data
- **Rectification**: Request correction of inaccurate data
- **Erasure**: Request deletion (where technically feasible)
- **Portability**: Receive data in a portable format
- **Objection**: Object to processing of your data

To exercise these rights, contact privacy@cuberai.example.

## Children's Privacy

This project is not directed at children under 13. We do not knowingly collect information from children.

## Changes to This Policy

We may update this policy:

- Major changes are announced via GitHub
- Continued use constitutes acceptance
- Previous versions available in git history

## Related Policies

- [SECURITY.md](SECURITY.md) - Security and vulnerability disclosure
- [DATA_RETENTION.md](DATA_RETENTION.md) - Data retention specifics
- [GOVERNANCE.md](GOVERNANCE.md) - Project governance

---

**Last Updated**: 2026-01-01

**Contact**: privacy@cuberai.example
