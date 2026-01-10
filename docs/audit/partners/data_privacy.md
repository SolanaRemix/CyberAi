<<<<<<< HEAD
---
title: Data Privacy for Partners
<<<<<<< HEAD
description: Data handling and privacy practices for SmartContractAudit partners
keywords: privacy, data protection, GDPR, security, compliance
---

# Partner Data Privacy

## Overview

This document explains how we handle partner data and our privacy practices. We take data protection seriously and comply with applicable regulations.

## Data We Collect

### From All Partners

**Public Information**:
- Organization name and website
- Public contact information
- Logo and branding assets
- Public GitHub activity

**Partnership Data**:
- Partnership tier and agreement
- Communication history
- Support requests and tickets
- Technical integration details

### From Paying Sponsors

**Billing Information**:
- Organization legal name
- Billing address
- Payment method details (tokenized)
- Invoice history
- Tax information (if applicable)

### From Technical Integrations

**Usage Data**:
- API call logs (anonymized)
- Integration health metrics
- Error logs (sanitized)
- Performance statistics

### What We DON'T Collect

❌ We never collect:
- Private keys or seed phrases
- Passwords or credentials
- Source code (unless explicitly shared)
- Personal financial information beyond billing
- Unnecessary personal data

## How We Use Partner Data

### Primary Uses

**Partnership Management**:
- Deliver agreed-upon benefits
- Provide technical support
- Process payments
- Track partnership status

**Communication**:
- Respond to inquiries
- Share updates and announcements
- Coordinate co-marketing activities
- Schedule check-in calls

**Service Improvement**:
- Analyze usage patterns
- Improve integrations
- Enhance features
- Optimize performance

**Legal and Compliance**:
- Meet contractual obligations
- Comply with applicable laws
- Resolve disputes
- Maintain audit trails

### We Do NOT

❌ **Never**:
- Sell partner data to third parties
- Share data without permission
- Use data for unrelated marketing
- Expose confidential information

## Data Protection Measures

### Security Practices

**Technical Controls**:
- Encryption at rest and in transit (TLS 1.3)
- Access controls and authentication
- Regular security audits
- Vulnerability scanning
- Secure backup procedures

**Operational Controls**:
- Need-to-know access principle
- Background checks for team members
- Confidentiality agreements
- Security awareness training
- Incident response procedures

**Physical Controls**:
- Secure data center facilities
- Environmental controls
- Access logging and monitoring
- Redundancy and disaster recovery

### Data Handling

**Storage**:
- Encrypted databases
- Secure cloud infrastructure
- Geographic redundancy
- Regular backups

**Transmission**:
- TLS encryption for all communications
- Secure APIs with authentication
- VPN for sensitive integrations
- Sanitization of logs

**Access**:
- Multi-factor authentication
- Role-based access control
- Audit logging
- Annual access reviews

## Third-Party Services

### Services We Use

**Infrastructure**:
- **GitHub**: Code hosting and CI/CD
- **Cloud Providers**: Compute and storage
- **CDN**: Content delivery

**Business Operations**:
- **Stripe**: Payment processing
- **Email Service**: Communication
- **Analytics**: Anonymized usage data

**Each service**:
- Has been vetted for security
- Complies with applicable regulations
- Has a data processing agreement
- Provides encryption and security

### Data Sharing

We share limited data with third parties only:

**Payment Processors**:
- Billing information (securely transmitted)
- Transaction details
- Tax information (if required)

**Cloud Providers**:
- Encrypted data storage
- Compute resources
- Backup services

**Analytics**:
- Anonymized usage statistics
- No personally identifiable information
- Aggregate data only

## Partner Rights

### Your Rights (GDPR/CCPA)

**Access**: Request copy of your data  
**Rectification**: Correct inaccurate data  
**Erasure**: Request deletion (where feasible)  
**Portability**: Receive data in portable format  
**Objection**: Object to certain processing  
**Restriction**: Limit processing in some cases

### How to Exercise Rights

**Email**: privacy@cuberai.example  
**Subject**: "Data Request - [Your Organization]"  
**Include**:
- Organization name
- Specific request
- Verification information
- Preferred response format

**Response Time**: 30 days maximum

## Data Retention

### Retention Periods

**Active Partnerships**:
- Retained for duration of partnership
- Plus 12 months after termination

**Billing Records**:
- 7 years (tax and legal requirements)

**Support Tickets**:
- 3 years after resolution

**Usage Logs**:
- 90 days (anonymized aggregates kept longer)

**Marketing Communications**:
- Until unsubscribe or objection

### Deletion Process

**Upon Request**:
1. Verify identity and authority
2. Assess legal obligations to retain
3. Delete data where possible
4. Anonymize where deletion not feasible
5. Confirm completion

**Note**: Some data must be retained for legal/compliance reasons.

## Confidentiality

### Confidential Information

We treat as confidential:
- Partnership terms and pricing
- Technical integration details
- Private communications
- Strategic information
- Non-public product details

### Non-Disclosure

**Standard NDA Terms**:
- Information marked confidential
- Information reasonably confidential
- Exceptions: public domain, required by law
- Duration: Term + 3 years

**Mutual NDA**: Available upon request
=======
description: How we handle partner and user data
keywords: privacy, data protection, GDPR, compliance
---

=======
>>>>>>> origin/pr10
# Data Privacy for Partners

## Overview

<<<<<<< HEAD
SmartContractAudit is committed to protecting the privacy of our partners and their users. This document outlines our data practices for partner integrations.

## Data Collection

### What We Collect

**From Partner Integration**:
- Repository URLs and metadata
- Scan configurations
- API usage statistics
- Integration performance metrics
- Error logs (no sensitive data)

**From End Users** (via partner integration):
- GitHub usernames (public)
- Scan results
- Security findings
- Usage patterns

### What We DON'T Collect

- ❌ Private keys or credentials
- ❌ User passwords
- ❌ Financial information
- ❌ Personal identifiable information (beyond GitHub username)
- ❌ Private repository code (unless authorized)

## Data Usage

### How We Use Data

1. **Service Delivery**
   - Perform security scans
   - Generate reports
   - Provide recommendations

2. **Service Improvement**
   - Improve scan accuracy
   - Optimize performance
   - Develop new features

3. **Analytics**
   - Aggregated usage statistics
   - Performance metrics
   - Anonymized trend analysis

4. **Communication**
   - Service notifications
   - Security alerts
   - Product updates

### How We DON'T Use Data

- ❌ Sell to third parties
- ❌ Train AI models (without permission)
- ❌ Share publicly (unless findings require disclosure)
- ❌ Use for advertising
- ❌ Share with competitors

## Data Storage

### Where Data is Stored

- **Primary**: AWS (US-East-1)
- **Backup**: AWS (EU-West-1)
- **Logs**: Encrypted cloud storage
- **Artifacts**: GitHub Actions (90-day retention)

### Security Measures

- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Access controls (RBAC)
- Regular security audits
- SOC 2 compliance (in progress)

### Retention Periods

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Scan results | 90 days | Configurable |
| API logs | 30 days | Aggregated after |
| Metrics | 1 year | Anonymized |
| Security findings | Until resolved | Critical data |
| User accounts | Active + 30 days | After deletion request |

## Data Sharing

### When We Share Data

**With Partners**:
- You receive your integration's data
- Aggregated metrics (anonymized)
- Security findings for your users

**With Third Parties**:
- Infrastructure providers (AWS, GitHub)
- Analytics tools (anonymized)
- Security tools (hashed data)

**Legal Requirements**:
- Court orders
- Law enforcement (valid warrants)
- Regulatory compliance

### When We DON'T Share

- Never sell user data
- Never share with competitors
- Never public disclosure without permission
- Never unauthorized access

## Partner Responsibilities

### Data Protection

Partners must:
- ✅ Protect API credentials
- ✅ Use HTTPS for all communications
- ✅ Implement access controls
- ✅ Follow security best practices
- ✅ Comply with applicable laws (GDPR, CCPA, etc.)

### User Privacy

Partners must:
- ✅ Provide privacy notice to users
- ✅ Obtain consent for data processing
- ✅ Honor user data requests
- ✅ Report data breaches promptly
- ✅ Implement data minimization

### Data Processing Agreement

All partners must sign a Data Processing Agreement (DPA) covering:
- Processing scope and purpose
- Data subject rights
- Security measures
- Sub-processors
- Breach notification
- Audit rights

## User Rights

### Rights We Support

**Access**: Users can request their data  
**Correction**: Users can correct inaccurate data  
**Deletion**: Users can request data deletion  
**Portability**: Users can export their data  
**Objection**: Users can object to processing  

### How to Exercise Rights

1. **Via Partner**: Users contact partner directly
2. **Direct Request**: Email privacy@cuberai.example
3. **Automated**: Through API (coming soon)

**Response Time**: 30 days maximum
>>>>>>> origin/pr9
=======
This document outlines how CyberAi handles data in partnership contexts, extending our main [PRIVACY.md](/PRIVACY.md) policy.

## Data Shared with Partners

### What We Share

**Aggregate Data Only** (default):
- Total scans performed
- General usage statistics
- Anonymized vulnerability trends
- No user-identifiable information

**Individual Data** (with explicit user consent):
- Scan results for their own contracts
- Their own API usage metrics
- Their own support tickets

### What We DON'T Share

❌ **Never Shared Without Consent:**
- User personal information
- Email addresses
- Payment information
- Individual usage patterns
- Private repository contents
- Scan results from other users
- Contract source code (unless published)

## Partner Data Collection

### Data Partners May Collect

Partners integrating our tools may collect:
- Usage within their platform
- Integration performance metrics
- User feedback on integration
- Error logs and diagnostics

**Requirements:**
- Partners must have their own privacy policy
- Users must be informed of data collection
- Consent required for non-essential data
- Data minimization principles applied

### Partner Privacy Obligations

Partners must:
- ✅ Maintain their own compliant privacy policy
- ✅ Respect user privacy rights
- ✅ Secure all user data
- ✅ Allow users to opt-out of analytics
- ✅ Delete user data on request
- ✅ Not sell or share user data
- ✅ Comply with GDPR, CCPA, and applicable laws

## Data Processing Agreements

### When Required

A Data Processing Agreement (DPA) is required for partners who:
- Process user data on our behalf
- Receive any personal information
- Handle scan results containing sensitive code
- Operate in regulated industries

### DPA Contents

Our DPA covers:
- Data types processed
- Processing purposes
- Security measures
- Subprocessor list
- Data breach notification
- Audit rights
- Data retention
- International transfers

**Request DPA**: privacy@cyberai.network

## User Consent

### Consent Requirements

For sharing user data with partners:

**Required:**
- Clear explanation of what's shared
- Why it's being shared
- Which partner receives it
- Opt-in consent (not pre-checked)
- Easy opt-out mechanism

**Example Consent Text:**
> "Allow [Partner Name] to receive your scan results to provide enhanced analysis. [Partner Name]'s privacy policy applies to data they receive. [Link to partner privacy policy]"

### Revocation

Users can revoke consent:
- Immediately effective
- Data sharing stops
- Previously shared data handled per retention policies
- No penalty or service degradation

## Data Retention

### Our Retention

**Partner-related data:**
- Partnership agreements: 7 years after termination
- API usage logs: 90 days
- Support tickets: 2 years
- Aggregate statistics: Indefinitely (anonymized)

### Partner Retention

Partners must:
- Define retention periods
- Delete data when no longer needed
- Honor user deletion requests
- Document retention policy

## Security Requirements

### Minimum Standards

Partners handling user data must:

**Technical:**
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Encryption at rest
- ✅ Access controls and authentication
- ✅ Regular security audits
- ✅ Vulnerability management
- ✅ Secure API keys and credentials

**Organizational:**
- ✅ Security policies documented
- ✅ Employee training
- ✅ Incident response plan
- ✅ Background checks for data access
- ✅ Compliance certifications (if applicable)

### Breach Notification

Partners must notify us within **24 hours** of discovering:
- Data breach affecting our users
- Unauthorized access to systems
- Loss of data integrity
- Compliance violations

**Contact**: security@cyberai.network

## International Data Transfers

### EU/EEA Partners

For partners in EU/EEA:
- Standard Contractual Clauses (SCCs) required
- Privacy Shield no longer valid
- GDPR compliance mandatory
- Data Protection Impact Assessment (DPIA) for high-risk processing

### Other Jurisdictions

- Compliance with local data protection laws
- Adequate safeguards for transfers
- Documentation of transfer mechanisms
- User notification of transfers

## User Rights

### Rights We Facilitate

For data shared with partners, users have rights to:

- **Access**: See what data partners have
- **Correction**: Fix inaccurate data
- **Deletion**: Request data deletion
- **Portability**: Receive data in portable format
- **Objection**: Object to certain processing
- **Restriction**: Limit processing

**How to Exercise**: privacy@cyberai.network

### Partner Cooperation

Partners must:
- Respond to our requests for user data (30 days)
- Support user rights requests
- Provide data for portability requests
- Delete data when requested
- Document actions taken
>>>>>>> origin/pr10

## Compliance

### Regulations

<<<<<<< HEAD
<<<<<<< HEAD
**GDPR** (EU General Data Protection Regulation):
- Lawful basis for processing
- Data minimization
- User rights respected
- Data protection by design

**CCPA** (California Consumer Privacy Act):
- Transparency about data collection
- Right to opt-out
- Right to deletion
- Non-discrimination

**Other**: Compliance with applicable local laws

### International Transfers

**Data Location**:
- Primary: [Region TBD]
- Backups: Multiple regions
- EU partners: EU data residency available (Gold+)

**Transfer Mechanisms**:
- Standard Contractual Clauses
- Adequacy decisions
- Explicit consent when required

## Breach Notification

### Our Commitment

In the event of a data breach:

**Timeline**:
- Internal discovery: Immediate investigation
- Partner notification: Within 72 hours
- Regulatory notification: As required by law

**Information Provided**:
- Nature of breach
- Data affected
- Likely consequences
- Mitigation steps taken
- Recommendations for partners

**Contact**: security@cuberai.example

## Marketing and Communications

### Partner Communications

**We May Send**:
- Partnership updates
- Product announcements
- Security alerts
- Billing notifications
- Co-marketing opportunities

**You Control**:
- Communication preferences
- Frequency settings
- Opt-out anytime
- Channel selection

### Public Recognition

**By Default**:
- Logo on sponsors page
- Mention in announcements
- Listed in tier

**Opt-Out Available**:
- Request confidential partnership
- No public recognition
- Internal acknowledgment only

### Unsubscribe

**Email**: Include unsubscribe link in footer  
**Preferences**: Update in partner portal  
**Note**: Transactional emails still sent (invoices, critical alerts)

## Partner-Specific Privacy

### Platinum Partners

**Enhanced Privacy**:
- Dedicated data residency options
- Custom retention schedules
- Private communication channels
- Stricter access controls

### Enterprise Deployments

**On-Premise/Private Cloud**:
- You control data storage
- We provide software only
- Minimal data transfer
- Custom privacy terms

## Children's Privacy

This service is not directed at children under 13. Partners represent they comply with children's privacy laws (COPPA, etc.) in their use of our services.

## Cookie Policy

**Website Cookies**:
- Essential: Required for functionality
- Analytics: Anonymized usage data
- Preferences: Save your settings

**Control**: Cookie preferences in website footer

## Updates to This Policy

**Changes**:
- Material changes: 30 days advance notice
- Minor updates: Announced in changelog
- Continued partnership: Acceptance of updates

**History**: Previous versions in git history

## Contact

### Privacy Inquiries

**Email**: privacy@cuberai.example  
**Response Time**: 5-7 business days

### Security Issues

**Email**: security@cuberai.example  
**Response Time**: 24-48 hours

### General Partnership

**Email**: partners@cuberai.example  
**Response Time**: 3-5 business days

## Related Resources
=======
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
const apiKey = "sca_live_xxxx";
```

**Data Minimization**:
```javascript
// ✅ Good: Request only needed data
const result = await client.scan({
  repository: 'owner/repo',
  fields: ['summary', 'critical_findings']
});

// ❌ Bad: Request everything
const result = await client.scan({
  repository: 'owner/repo',
  fields: ['*']
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

| Service | Purpose | Location |
|---------|---------|----------|
| AWS | Infrastructure | US, EU |
| GitHub | Code hosting | Global |
| Datadog | Monitoring | US |
| Sentry | Error tracking | US |

Partners are notified of changes 30 days in advance.

## Contact

For privacy questions:

📧 **General**: privacy@cuberai.example  
📧 **DPA requests**: legal@cuberai.example  
📧 **Data requests**: data-requests@cuberai.example  
🔒 **Security**: security@cuberai.example

## Resources
>>>>>>> origin/pr9

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

**Status**: Contact us for current compliance status
=======
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
>>>>>>> origin/pr10

---

**Last Updated**: 2026-01-01  
<<<<<<< HEAD
**Version**: 1.0  
**Next Review**: 2026-07-01

**DPO Contact**: dpo@cuberai.example (when appointed)

---

Your privacy and security are our priority. Thank you for trusting us with your partnership. 🔒
=======
- DPA Template: Contact legal team

---

*Last updated: 2026-01-01*
>>>>>>> origin/pr9
=======
**Policy Version**: 1.0  
**Applies To**: All partners handling user data  
**Review Cycle**: Quarterly
>>>>>>> origin/pr10
