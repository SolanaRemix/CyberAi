# Security Policy

## Reporting a Vulnerability

The SmartContractAudit team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**security@cuberai.example** (placeholder contact)

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the vulnerability
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## PGP Key

For sensitive security reports, you may encrypt your message using our PGP key:

```
[PGP KEY PLACEHOLDER - To be provided]
```

## Disclosure Process

1. **Report Received**: Security reports are acknowledged within 48 hours
2. **Initial Triage**: We assess the severity and scope within 5 business days
3. **Investigation**: The security team investigates and develops a fix
4. **Coordinated Disclosure**: We work with you on disclosure timeline
5. **Release**: Security patches are released and vulnerabilities disclosed

### Triage SLA

- **Critical vulnerabilities**: Initial response within 24 hours, fix target within 7 days
- **High severity**: Initial response within 48 hours, fix target within 14 days
- **Medium severity**: Initial response within 5 days, fix target within 30 days
- **Low severity**: Initial response within 7 days, fix target within 60 days

## Scope

### In Scope

- Authentication and authorization issues
- Code injection vulnerabilities
- Exposure of sensitive data or credentials
- Insecure cryptographic implementations
- Privilege escalation
- Remote code execution
- Cross-site scripting (XSS) or similar web vulnerabilities
- Supply chain vulnerabilities in dependencies

### Out of Scope

- Issues affecting outdated or unsupported versions
- Vulnerabilities requiring physical access to a user's device
- Social engineering attacks
- Denial of Service (DoS) attacks without proven impact
- Issues that have already been reported or are known

## Security Best Practices

This project follows these security practices:

- **No Secrets in Code**: Never commit API keys, passwords, or private keys
- **Dependency Scanning**: Regular audits of dependencies for known vulnerabilities
- **Code Review**: All changes require review before merging
- **Least Privilege**: Services run with minimal required permissions
- **Dry-Run Defaults**: Destructive operations default to dry-run mode
- **Input Validation**: All user inputs are validated and sanitized

## Security Contacts

- **Primary Contact**: security@cuberai.example
- **Backup Contact**: [To be specified]

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

We recommend always using the latest version to ensure you have all security updates.

## Recognition

We appreciate and recognize security researchers who help keep our project secure:

- Responsible disclosures will be credited in release notes (if desired)
- We may acknowledge security researchers in our documentation
- Critical vulnerability reports may qualify for recognition in our Hall of Fame

## Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission of the account holder
- Do not exploit a security issue beyond what is necessary to demonstrate it
- Do not access, modify, or delete data belonging to others
- Give us reasonable time to fix the issue before public disclosure

## Additional Information

For more information about our security practices:
- Review our [GOVERNANCE.md](GOVERNANCE.md) for security roles and responsibilities
- See [PRIVACY.md](PRIVACY.md) for data handling policies
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for secure development practices

Thank you for helping keep SmartContractAudit and our community safe!
