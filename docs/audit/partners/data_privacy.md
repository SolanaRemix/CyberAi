## <<<<<<< HEAD

title: Data Privacy for Partners

> > > > > > > origin/pr10

# Data Privacy for Partners

## Overview

We comply with:

- **GDPR** (European Union)
- **CCPA** (California)
- **LGPD** (Brazil)
- **PIPEDA** (Canada)
- Other applicable laws

### Certifications

- SOC 2 Type II (in progress)
- ISO 27001 (planned)
- Privacy Shield (if applicable)

## Incident Response

### Data Breach Notification

If a breach occurs:

1. **Discovery**: Detect and contain (immediate)
2. **Assessment**: Determine impact (24 hours)
3. **Notification**: Notify partners (72 hours)
4. **Remediation**: Fix vulnerabilities
5. **Report**: Document lessons learned

### Partner Notification

Partners receive:

- Breach description
- Affected data types
- Impact assessment
- Remediation steps
- Support resources

## Best Practices

### For Partners

**Secure Integration**:

```javascript
// ✅ Good: Secure credential storage
const apiKey = process.env.SCA_API_KEY;

// ❌ Bad: Hardcoded credentials
const apiKey = 'sca_live_xxxx';
```

**Data Minimization**:

```javascript
// ✅ Good: Request only needed data
const result = await client.scan({
  repository: 'owner/repo',
  fields: ['summary', 'critical_findings'],
});

// ❌ Bad: Request everything
const result = await client.scan({
  repository: 'owner/repo',
  fields: ['*'],
});
```

**User Consent**:

```javascript
// ✅ Good: Check consent before scanning
if (user.hasConsentedToScan()) {
  await client.scan(config);
}

// ❌ Bad: Scan without consent
await client.scan(config);
```

## Privacy by Design

We build privacy into our products:

- **Data Minimization**: Collect only what's needed
- **Purpose Limitation**: Use data only for stated purpose
- **Storage Limitation**: Delete when no longer needed
- **Access Controls**: Restrict access to authorized users
- **Encryption**: Protect data at rest and in transit
- **Transparency**: Clear privacy policies
- **User Control**: Easy access to privacy settings

## Subprocessors

We use these subprocessors:

| Service | Purpose        | Location |
| ------- | -------------- | -------- |
| AWS     | Infrastructure | US, EU   |
| GitHub  | Code hosting   | Global   |
| Datadog | Monitoring     | US       |
| Sentry  | Error tracking | US       |

Partners are notified of changes 30 days in advance.

## Contact

For privacy questions:

📧 **General**: privacy@cuberai.example  
📧 **DPA requests**: legal@cuberai.example  
📧 **Data requests**: data-requests@cuberai.example  
🔒 **Security**: security@cuberai.example

## Resources

> > > > > > > origin/pr9

- [Main Privacy Policy](../../PRIVACY.md)
- [Data Retention Policy](../../DATA_RETENTION.md)
- [Security Policy](../../SECURITY.md)
  <<<<<<< HEAD
- [Partnership Agreement](partnerships.md)

## Certifications

**Current**: Working toward standard certifications

**Planned**:

- SOC 2 Type II
- ISO 27001
- Privacy Shield (if reinstated)

# **Status**: Contact us for current compliance status

Partners must comply with:

- **GDPR** (EU)
- **CCPA/CPRA** (California)
- **LGPD** (Brazil)
- **PIPEDA** (Canada)
- **Other applicable laws**

### Certifications

Partners handling sensitive data should have:

- SOC 2 Type II (preferred)
- ISO 27001 (preferred)
- Industry-specific certifications
- Regular third-party audits

Not required but strongly encouraged for high-tier partners.

## Audit Rights

### Our Audit Rights

We reserve the right to:

- Audit partner data practices annually
- Request documentation of compliance
- Require remediation of issues
- Terminate partnership for violations

### Partner Audit Rights

Partners may:

- Request our compliance documentation
- Audit our data practices (reasonable notice)
- Verify security measures
- Review subprocessors

## Prohibited Uses

Partners must NOT:

❌ Sell user data to third parties  
❌ Use data for advertising without consent  
❌ Profile users without consent  
❌ Share data with unauthorized parties  
❌ Combine with other datasets without consent  
❌ Use for purposes beyond agreement  
❌ Retain data beyond agreed period

Violations may result in immediate termination.

## Transparency

### Public Disclosure

We publicly disclose:

- List of partners
- General data sharing practices
- Privacy policy updates
- Breach notifications (if legally required)

### Partner Obligations

Partners must disclose:

- Their privacy policy
- Use of our data/services
- Subprocessors used
- International transfers

## Subprocessors

### Our Subprocessors

Current list:

- GitHub (code hosting, CI/CD)
- [Cloud Provider] (infrastructure)
- [Analytics Provider] (anonymized analytics)

Updated list: [subprocessors.md](#)

### Partner Subprocessors

Partners must:

- List all subprocessors
- Get our approval for new subprocessors
- Ensure subprocessor compliance
- Maintain subprocessor agreements

## Contact

### General Privacy Questions

**Email**: privacy@cyberai.network  
**Response Time**: 5 business days

### Partner Data Requests

**Email**: partners-privacy@cyberai.network  
**Response Time**: 2 business days

### Data Breach

**Email**: security@cyberai.network  
**Response Time**: Immediate

### DPA Requests

**Email**: privacy@cyberai.network  
**Include**: Partner name, data types, processing description

> > > > > > > origin/pr10

---

**Last Updated**: 2026-01-01
