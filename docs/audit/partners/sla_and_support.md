<<<<<<< HEAD
---
title: SLA and Support
<<<<<<< HEAD
description: Service level agreements and support for SmartContractAudit partners
keywords: SLA, support, response time, uptime, service level
=======
description: Service level agreements and support options for partners
keywords: SLA, support, uptime, response time
>>>>>>> origin/pr9
---

# SLA and Support

<<<<<<< HEAD
## Overview

This document outlines service level agreements (SLAs) and support policies for SmartContractAudit partners.

## Support Tiers by Partnership Level

| Tier | Response Time | Support Channels | Hours | Uptime SLA |
|------|---------------|------------------|-------|------------|
| **Community** | Best effort | GitHub Issues | Business hours | None |
| **Supporter** | 5 business days | GitHub Issues, Email | Business hours | None |
| **Bronze** | 48 hours | Email, GitHub | Business hours | None |
| **Silver** | 24 hours | Email, Video | Business + extended | 99% |
| **Gold** | 12 hours | Email, Video, Slack | 12×6 | 99.5% |
| **Platinum** | 4 hours | All channels, dedicated | 24×7 | 99.9% |

**Business Hours**: Monday-Friday, 9 AM - 5 PM UTC  
**Extended Hours**: Monday-Friday, 6 AM - 10 PM UTC  
**24×7**: Around the clock, including weekends and holidays

## Support Channels

### GitHub Issues (All Users)

**Purpose**: Bug reports, feature requests, general questions

**How to Use**:
1. Search existing issues first
2. Use issue templates
3. Provide reproduction steps
4. Include relevant logs/screenshots

**Response Time**: Varies by tier (see table above)

**Best For**:
- Bug reports
- Feature requests
- Public discussions
- Community help

### Email Support (Bronze+)

**Email**: support@cuberai.example

**Include in Request**:
- Partnership tier
- Organization name
- Detailed description
- Steps to reproduce
- Expected vs. actual behavior
- Relevant logs (sanitized)

**Response Time**: Per tier SLA

**Best For**:
- Private issues
- Account questions
- Billing inquiries
- Security concerns (use security@cuberai.example)

### Video Call Support (Silver+)

**Scheduling**: Via email or partner portal

**Duration**: 30-60 minutes per session

**Frequency**:
- **Silver**: Monthly check-ins available
- **Gold**: Bi-weekly check-ins
- **Platinum**: Weekly + on-demand

**Best For**:
- Complex troubleshooting
- Integration planning
- Training sessions
- Strategic discussions

### Private Slack/Discord (Silver+)

**Access**: Provided upon partnership activation

**Features**:
- Direct messaging with support team
- File sharing
- Screen sharing
- Channel for your organization

**Response Time**: Per tier SLA during support hours

**Best For**:
- Quick questions
- Real-time collaboration
- Ongoing projects
- Team coordination

### Dedicated Support Engineer (Platinum)

**Features**:
- Named engineer assigned to your account
- Proactive monitoring
- Regular check-ins
- Priority for all requests
- Direct phone/SMS (critical issues)

**Availability**: 24×7 for critical issues

**Best For**:
- Enterprise deployments
- Mission-critical integrations
- Custom development
- Strategic partnerships

## Response Time SLAs

### Definitions

**Response Time**: Time from ticket submission to first substantive response

**Resolution Time**: Time from submission to issue resolution (not covered by SLA, but tracked)

**Business Hours**: Monday-Friday, 9 AM - 5 PM UTC (excluding holidays)

### Severity Levels

#### Critical (P1)

**Definition**: System down, major security vulnerability, blocking production deployment

**Examples**:
- Core functionality unavailable
- Data loss or corruption
- Security breach or vulnerability
- Complete service outage

**Response Times**:
- **Silver**: 4 hours
- **Gold**: 2 hours
- **Platinum**: 1 hour

**Updates**: Every 4 hours until resolved

#### High (P2)

**Definition**: Significant feature impairment, workaround available

**Examples**:
- Major feature not working
- Performance degradation
- Integration failures
- Incorrect results

**Response Times**:
- **Silver**: 12 hours
- **Gold**: 6 hours
- **Platinum**: 2 hours

**Updates**: Daily until resolved

#### Medium (P3)

**Definition**: Minor feature issues, cosmetic problems

**Examples**:
- UI/UX issues
- Documentation errors
- Minor bugs with workarounds
- Feature enhancements

**Response Times**:
- **Silver**: 24 hours
- **Gold**: 12 hours
- **Platinum**: 4 hours

**Updates**: Every 3 business days

#### Low (P4)

**Definition**: Questions, minor issues, feature requests

**Examples**:
- General questions
- Documentation requests
- Nice-to-have features
- Best practice advice

**Response Times**:
- **Bronze**: 48 hours
- **Silver**: 24 hours
- **Gold**: 12 hours
- **Platinum**: 4 hours

**Updates**: As needed

## Uptime SLAs

### Service Availability

**Measured**: Monthly uptime percentage for core services

**Core Services**:
- GitHub Actions workflows
- API endpoints (if applicable)
- Documentation site
- Partner portal

### SLA Commitments

#### Silver Tier: 99% Uptime

**Allows**: ~7.3 hours downtime per month

**Excludes**: Scheduled maintenance (with notice)

**Credits**: None (open source project)

#### Gold Tier: 99.5% Uptime

**Allows**: ~3.6 hours downtime per month

**Excludes**: Scheduled maintenance (with notice)

**Credits**: Service credits available (negotiated)

#### Platinum Tier: 99.9% Uptime

**Allows**: ~43 minutes downtime per month

**Excludes**: Emergency maintenance only

**Credits**: Service credits per agreement

### Planned Maintenance

**Notice Period**:
- **Standard Maintenance**: 7 days advance notice
- **Emergency Maintenance**: As soon as possible

**Windows**:
- **Preferred**: Weekends, outside business hours
- **Duration**: Typically 1-4 hours
- **Frequency**: Monthly or as needed

**Notification Channels**:
- Email to partners
- Status page updates
- Slack/Discord announcements (if applicable)

### Incident Response

**Monitoring**: 24/7 automated monitoring

**Response Process**:
1. **Detection**: Automated or reported
2. **Triage**: Assess severity and impact
3. **Communication**: Notify affected partners
4. **Resolution**: Fix and verify
5. **Post-Mortem**: Document and prevent recurrence

**Status Updates**:
- **Status Page**: Real-time status
- **Email**: For affected partners
- **Social**: Major incidents only

## Support Best Practices

### For Efficient Support

**Do**:
✅ Search documentation first  
✅ Check existing issues/tickets  
✅ Provide complete information  
✅ Include reproduction steps  
✅ Sanitize sensitive data  
✅ Use appropriate severity level  
✅ Follow up when asked  

**Don't**:
❌ Open duplicate tickets  
❌ Mark everything as critical  
❌ Share private keys/secrets  
❌ Expect immediate responses for low priority  
❌ Use multiple channels simultaneously  

### Information to Include

**For Bug Reports**:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages
- Screenshots/logs

**For Integration Issues**:
- Integration type
- Configuration files (sanitized)
- Error logs
- Network details
- Attempted solutions

**For Performance Issues**:
- Specific operation
- Performance metrics
- Comparison (before/after)
- Resource usage
- Timing information

## Escalation Process

### When to Escalate

- No response within SLA window
- Issue severity increased
- Critical business impact
- Inadequate resolution
- Urgent business need

### How to Escalate

**Level 1**: Standard support contact  
**Level 2**: support-manager@cuberai.example  
**Level 3**: partners@cuberai.example  
**Level 4**: Executive contact (Platinum only)

**Include**:
- Original ticket number
- Timeline of issue
- Business impact
- Required resolution timeline

## Additional Support Services

### Training (All Tiers, Fee-Based)

**Team Training**: $2,000 per session
- 2-hour interactive training
- Up to 20 participants
- Custom curriculum
- Q&A session
- Recording provided

**Workshops**: $5,000 per day
- Full-day intensive workshop
- Hands-on exercises
- Custom to your use case
- Follow-up support included

### Professional Services (Gold+)

**Integration Assistance**: $200/hour
- Custom integration help
- Code review
- Best practices guidance
- Performance optimization

**Custom Development**: Starting at $10,000
- Custom features
- Plugin development
- Workflow customization
- Ongoing maintenance

### On-Site Support (Platinum)

**Availability**: By arrangement

**Cost**: Travel + daily rate

**Includes**:
- In-person technical support
- Training and workshops
- Integration assistance
- Strategic planning

## Exclusions

SLAs do not cover:

- Issues caused by partner's environment
- Third-party service failures
- Network/connectivity issues outside our control
- Customizations not supported by us
- Beta/experimental features
- Scheduled maintenance (with notice)

## Partner Responsibilities

To receive full SLA benefits:

✅ **Maintain Current Tier**: Active partnership in good standing  
✅ **Use Supported Versions**: Latest stable releases  
✅ **Follow Best Practices**: Per our documentation  
✅ **Provide Information**: Complete details for support requests  
✅ **Respond Timely**: To our questions and requests  
✅ **Test Updates**: In non-production first  

## Monitoring and Reporting

### Status Page

**URL**: [TO BE ANNOUNCED]

**Shows**:
- Current system status
- Incident history
- Scheduled maintenance
- Performance metrics

**Subscribe**: Email/SMS/Slack notifications

### Monthly Reports (Silver+)

**Includes**:
- Uptime statistics
- Support ticket summary
- Resolution times
- Usage metrics (if applicable)
- Recommendations

**Delivery**: First week of each month

### Quarterly Business Reviews (Gold+)

**Agenda**:
- Partnership performance
- Usage analysis
- Support review
- Roadmap discussion
- Feedback session

**Duration**: 60 minutes

**Attendees**: Technical and business stakeholders

## Feedback and Improvements

We continuously improve our support:

**Surveys**: Post-resolution satisfaction surveys  
**Reviews**: Quarterly support quality reviews  
**Feedback**: Always welcome via partners@cuberai.example

**We track**:
- Response times
- Resolution times
- Customer satisfaction
- First-contact resolution
=======
## Service Level Agreements

### Uptime Guarantee

**API Availability**:
- **Standard**: 99.5% uptime
- **Premium**: 99.9% uptime
- **Enterprise**: 99.95% uptime

**Calculation**: Monthly uptime excluding scheduled maintenance

**Credits**: If SLA not met:
- 99.0-99.5%: 10% credit
- 98.0-99.0%: 25% credit
- <98.0%: 50% credit

### Performance

**API Response Times** (p95):
- Scan initiation: <500ms
- Status check: <200ms
- Results retrieval: <1s

**Scan Completion**:
- Small repos (<100 files): <5 minutes
- Medium repos (100-1000 files): <15 minutes
- Large repos (>1000 files): <60 minutes

## Support Tiers

### Community Support (Free)

**Channels**:
- GitHub Issues
- Community Forum
- Documentation

**Response Time**:
- Best effort
- Community-driven
- No SLA

**Coverage**:
- Monday-Friday
- Business hours
- Public issues only

### Standard Support (Included)

**Channels**:
- Email support
- GitHub Issues (priority)
- Monthly office hours

**Response Times**:
| Severity | First Response | Resolution Target |
|----------|---------------|-------------------|
| Critical | 4 business hours | 48 hours |
| High | 8 business hours | 5 business days |
| Medium | 1 business day | 10 business days |
| Low | 2 business days | Best effort |

**Coverage**:
- Monday-Friday
- 9 AM - 5 PM EST
- Email and tickets

### Premium Support (Add-on)

**Channels**:
- Priority email
- Dedicated Slack channel
- Phone support
- Video calls

**Response Times**:
| Severity | First Response | Resolution Target |
|----------|---------------|-------------------|
| Critical | 1 hour | 24 hours |
| High | 4 hours | 48 hours |
| Medium | 8 hours | 5 business days |
| Low | 1 business day | 10 business days |

**Coverage**:
- Monday-Friday
- 6 AM - 8 PM EST
- Email, phone, Slack

### Enterprise Support (Custom)

**Channels**:
- All Premium channels
- Dedicated account manager
- Direct engineer access
- Emergency hotline

**Response Times**:
| Severity | First Response | Resolution Target |
|----------|---------------|-------------------|
| Critical | 15 minutes | 4 hours |
| High | 1 hour | 12 hours |
| Medium | 4 hours | 2 business days |
| Low | 8 hours | 5 business days |

**Coverage**:
- 24/7/365 for Critical
- Extended hours for others
- All channels available

## Severity Levels

### Critical (P0)

**Definition**: Complete service outage or security vulnerability

**Examples**:
- API completely down
- Data breach
- Critical security flaw
- All scans failing

**Requirements**:
- Business completely blocked
- No workaround available
- Immediate attention needed

### High (P1)

**Definition**: Major functionality impaired

**Examples**:
- API degraded performance
- Scan failures for specific repos
- Integration broken
- Critical feature not working

**Requirements**:
- Core functionality affected
- Limited or difficult workaround
- Significant impact

### Medium (P2)

**Definition**: Moderate impact, workaround available

**Examples**:
- Non-critical feature issue
- Performance degradation
- Intermittent errors
- Configuration issues

**Requirements**:
- Workaround available
- Moderate impact
- Not blocking

### Low (P3)

**Definition**: Minor issue or question

**Examples**:
- Documentation unclear
- Feature requests
- General questions
- Minor bugs

**Requirements**:
- Minimal impact
- Easy workaround
- Can wait for resolution

## Support Channels

### Email Support

**Address**: support@cuberai.example  
**Best for**: Non-urgent issues, detailed questions  
**Include**: Account ID, error messages, reproduction steps

### GitHub Issues

**Repository**: github.com/SolanaRemix/SmartContractAudit/issues  
**Best for**: Bug reports, feature requests  
**Label**: Use partner label for priority

### Slack Channel

**Available**: Premium+ tiers  
**Best for**: Quick questions, real-time discussion  
**Hours**: Based on support tier

### Phone Support

**Available**: Premium+ tiers  
**Best for**: Critical issues, urgent matters  
**Number**: Provided upon enrollment

### Video Calls

**Available**: Gold+ sponsors, Premium+ support  
**Best for**: Complex integrations, training  
**Schedule**: Via calendar link

## Scheduled Maintenance

**Frequency**: Monthly (first Sunday)  
**Duration**: 1-2 hours  
**Notice**: 7 days advance  
**Window**: 2 AM - 4 AM EST

**Emergency Maintenance**:
- Announced 1 hour before (if possible)
- Critical security patches
- Immediate fixes only

## Status & Monitoring

**Status Page**: status.smartcontractaudit.io

**Subscriptions**:
- Email notifications
- SMS alerts (Premium+)
- Webhook notifications
- RSS feed

**Metrics**:
- API uptime
- Response times
- Scan queue depth
- Incident history

## Escalation

### Standard Escalation Path

1. **Tier 1**: Support engineer (immediate)
2. **Tier 2**: Senior engineer (if unresolved in SLA)
3. **Tier 3**: Engineering lead (critical issues)
4. **Tier 4**: CTO/Leadership (business impact)

### Emergency Escalation

For critical issues:
- **Immediate**: Email emergency@cuberai.example
- **Phone**: Emergency hotline (Enterprise tier)
- **Automatic**: P0 tickets auto-escalate after 15 min

## Best Practices

### Reporting Issues

**Good Issue Report**:
```
Title: API returns 500 error on scan initiation

Severity: High
Account ID: partner_1234
Environment: Production

Description:
When initiating scans for repositories with >500 files,
API returns 500 Internal Server Error.

Reproduction:
1. POST /v1/scan with repository "large-repo"
2. Observe 500 response
3. Scan never starts

Expected: Scan should initiate successfully
Actual: 500 error received

Error message: "Internal Server Error"
Request ID: req_abc123
Timestamp: 2026-01-01T12:00:00Z

Impact: Cannot scan large repositories
Workaround: None found
```

### Effective Communication

- Be specific and detailed
- Include error messages
- Provide request IDs
- Share reproduction steps
- Indicate business impact
- Suggest workarounds tried

## SLA Credits

### Eligibility

Credits issued when:
- Uptime falls below guarantee
- Response time exceeds SLA
- Resolution target missed

### Calculation

```
Credit = (Guaranteed % - Actual %) × Monthly Fee
```

### Requesting Credits

1. Submit claim within 30 days
2. Include incident references
3. Provide impact documentation
4. Receive credit next billing cycle

**Maximum**: 50% of monthly fee

## Resources

- Status Page: [Link]
- Knowledge Base: [Link]
- API Documentation: [Link]
- Community Forum: [Link]
>>>>>>> origin/pr9

## Contact

**General Support**: support@cuberai.example  
<<<<<<< HEAD
**Partner Success**: partners@cuberai.example  
**Security Issues**: security@cuberai.example  
**Billing**: billing@cuberai.example  
**Escalations**: support-manager@cuberai.example

## Related Documents

- [Sponsorship Tiers](sponsorship_tiers.md)
- [Technical Onboarding](technical_onboarding.md)
- [Partnership Agreement](partnerships.md)
- [Data Privacy](data_privacy.md)
=======
# SLA and Support

## Service Level Agreements

### Overview

This document outlines service level agreements (SLAs) and support commitments for CyberAi partners.

**Note**: SLAs apply to paid partners at Gold tier and above. Community users receive best-effort support.

## Uptime SLA

### API Availability

**Target**: 99.9% uptime (monthly)

**Exclusions**:
- Scheduled maintenance (announced 7 days in advance)
- Force majeure events
- Third-party service failures
- User-caused issues

**Measurement**: Calculated monthly from our monitoring systems

**Credits** (for SLA violations):
- 99.5-99.9%: 10% monthly fee credit
- 99.0-99.5%: 25% monthly fee credit
- <99.0%: 50% monthly fee credit

**To Claim**: Email partners-support@cyberai.network with affected time period within 30 days

### Scheduled Maintenance

**Notification**: 7 days advance notice
**Frequency**: Monthly maximum
**Window**: Tuesday 2-4 AM UTC (2 hours max)
**Emergency**: Minimum 24 hours notice if possible

## Response Time SLA

### Support Ticket Response

| Severity | Bronze | Silver | Gold | Platinum | Custom |
|----------|---------|---------|-------|----------|---------|
| **Critical** | 2 days | 1 day | 4 hours | 1 hour | Custom |
| **High** | 5 days | 3 days | 1 day | 4 hours | Custom |
| **Medium** | 7 days | 5 days | 2 days | 1 day | Custom |
| **Low** | 10 days | 7 days | 5 days | 2 days | Custom |

**Business Hours**: Monday-Friday, 9 AM - 5 PM UTC (excluding holidays)

### Severity Definitions

**Critical**:
- Service completely unavailable
- Data loss or corruption
- Security breach
- Major functionality broken for all users

**High**:
- Major feature not working
- Significant performance degradation
- Security vulnerability (non-exploited)
- Affecting multiple users

**Medium**:
- Feature partially working
- Moderate performance issues
- Affecting individual users
- Workaround available

**Low**:
- Minor bugs
- Feature requests
- Documentation issues
- Cosmetic problems

## Resolution Time SLA

**Targets** (not guarantees):

| Severity | Target Resolution |
|----------|-------------------|
| **Critical** | 24 hours |
| **High** | 5 business days |
| **Medium** | 10 business days |
| **Low** | Best effort |

**Notes**:
- Complex issues may take longer
- Escalation available if targets missed
- Regular updates provided

## Support Channels

### By Partner Tier

**Bronze Sponsors**:
- GitHub Issues (public)
- GitHub Discussions
- Email (partners-support@cyberai.network)

**Silver Sponsors**:
- All Bronze channels
- Priority email support
- Community Slack/Discord

**Gold Sponsors**:
- All Silver channels
- Dedicated support channel
- Video call support (scheduled)

**Platinum Sponsors**:
- All Gold channels
- Dedicated Slack channel with core team
- On-call support (business hours)
- Annual on-site visit option

### Contact Methods

**Email**: partners-support@cyberai.network
- Include partner name, tier, and severity
- Attach logs, error messages, reproduction steps

**GitHub Issues**: [github.com/CyberAi/CyberAi/issues](https://github.com/CyberAi/CyberAi/issues)
- Use template
- Tag: `partner-support`
- Link to partnership

**Slack/Discord**: (Invited after partnership begins)
- Direct message or channel post
- @mention support team for urgent issues

**Emergency**: security@cyberai.network (security issues only)

## Support Scope

### Included Support

✅ **Covered**:
- Bug fixes and issue resolution
- API and integration questions
- Configuration assistance
- Feature usage guidance
- Performance optimization help
- Security vulnerability reports
- Documentation clarification

❌ **Not Covered** (available as custom services):
- Custom feature development
- On-site training (except Platinum annual)
- Code review of your implementations
- Architecture consulting
- Third-party integration debugging
- General development support

### Escalation Path

If issue not resolved within SLA:

1. **Email**: partners-support@cyberai.network with "ESCALATION" in subject
2. **Include**: Original ticket number, timeline, impact
3. **Escalation Review**: Within 4 hours (business hours)
4. **Executive Contact**: If still unresolved, escalate to funding@cyberai.network

## Performance SLA

### API Performance

**Target Response Times** (95th percentile):

- Scan initiation: <2 seconds
- Status check: <500ms
- Results retrieval: <3 seconds
- Report generation: <10 seconds

**Throughput**:
- Minimum 100 requests/minute per partner
- Higher limits available (contact us)

### Rate Limits

**Default Limits**:

| Tier | Requests/Hour | Concurrent Scans |
|------|---------------|------------------|
| Bronze | 100 | 2 |
| Silver | 500 | 5 |
| Gold | 2,000 | 10 |
| Platinum | 10,000 | 25 |
| Custom | Custom | Custom |

**Exceeding Limits**:
- HTTP 429 (Too Many Requests)
- Retry-After header provided
- Contact us to increase limits

## Data SLA

### Backup and Recovery

**Backups**:
- Daily automated backups
- 30-day retention
- Encrypted storage
- Geographically distributed

**Recovery**:
- RPO (Recovery Point Objective): 24 hours
- RTO (Recovery Time Objective): 4 hours

### Data Retention

**Active Data**: Duration of partnership + 30 days  
**Backups**: 30 days rolling  
**Logs**: 90 days  
**Aggregate Analytics**: Indefinitely (anonymized)

See [DATA_RETENTION.md](/DATA_RETENTION.md) for details.

## Security SLA

### Vulnerability Response

| Severity | Response | Patch Target |
|----------|----------|--------------|
| **Critical** | 4 hours | 7 days |
| **High** | 1 day | 14 days |
| **Medium** | 3 days | 30 days |
| **Low** | 5 days | 60 days |

**Notification**:
- Partners notified within response time
- Security advisory published after patch
- Coordinated disclosure process

### Security Updates

- Zero-day vulnerabilities: Immediate notification
- Dependency updates: Monthly
- Security patches: As needed
- Annual security audit results shared with Platinum partners

## Maintenance Windows

### Planned Maintenance

**Advance Notice**: 7 days minimum  
**Frequency**: Once per month maximum  
**Duration**: 2 hours maximum  
**Time**: Tuesday 2-4 AM UTC (lowest traffic)

**Communication**:
1. Email to all partners (7 days before)
2. Status page update (7 days before)
3. Reminder (24 hours before)
4. Start notification
5. Completion notification

### Emergency Maintenance

**Notice**: 24 hours when possible, less if critical security issue  
**Duration**: As short as possible  
**Communication**: Immediate notification via all channels

## Monitoring and Status

### Public Status Page

**URL**: [status.smartcontractaudit.example](#)

**Shows**:
- Current system status
- Planned maintenance
- Incident history
- Performance metrics
- Uptime statistics

**Subscribe**: Email or RSS feed for notifications

### Partner Dashboard

Gold and Platinum partners get access to:
- Real-time API metrics
- Usage statistics
- Error rates
- Performance graphs
- Historical data

## Feedback and Improvement

### Quarterly Business Reviews

**Gold and Platinum Partners**:
- Scheduled quarterly call
- Review metrics and SLA performance
- Discuss feature requests
- Gather feedback
- Plan ahead

### Support Satisfaction

We measure:
- Response time compliance
- Resolution time
- Partner satisfaction (surveys)
- Issue recurrence

**Goal**: >90% satisfaction rating

## Dispute Resolution

### Process

1. **Informal Resolution**: Contact your partner liaison or partners-support@cyberai.network
2. **Formal Review**: If unresolved, escalate to funding@cyberai.network
3. **Executive Review**: CTO and partner executive discuss
4. **Mediation**: Third-party mediation if needed (costs shared)
5. **Arbitration**: Binding arbitration per partnership agreement

**Timeline**: Good faith effort to resolve within 30 days

### SLA Credit Disputes

1. **Submit Claim**: partners-support@cyberai.network within 30 days
2. **Provide Evidence**: Logs, timestamps, impact description
3. **Review**: We investigate within 10 business days
4. **Decision**: Credit issued or denial with explanation
5. **Appeal**: To funding@cyberai.network if disputed

## Termination

### SLA Upon Termination

**30-Day Wind-Down**:
- Support continues for 30 days
- Data export assistance provided
- Migration support available
- Final invoicing and credits

**Immediate Termination** (for cause):
- Support ends immediately
- Data export provided (if compliant with terms)
- No refunds
- Credits void

## Exceptions and Force Majeure

SLAs don't apply during:

- Acts of God (natural disasters)
- War, terrorism, civil unrest
- Government actions or regulations
- Internet backbone failures
- Third-party service failures (beyond our control)
- Cyber attacks (while being mitigated)
- Partner-caused issues

**Notification**: We'll communicate cause and expected resolution

## Contact

**Support**: partners-support@cyberai.network  
**Escalation**: funding@cyberai.network  
**Emergency**: security@cyberai.network  
**Billing**: funding@cyberai.network

**Phone**: (Available for Platinum partners upon request)
>>>>>>> origin/pr10

---

**Last Updated**: 2026-01-01  
<<<<<<< HEAD
**Version**: 1.0  
**Next Review**: 2026-04-01

We're committed to your success! 🚀
=======
**Account Issues**: accounts@cuberai.example  
**Emergency**: emergency@cuberai.example  
**Sales**: partnerships@cuberai.example

---

*Last updated: 2026-01-01*
>>>>>>> origin/pr9
=======
**SLA Version**: 1.0  
**Review Cycle**: Quarterly  
**Next Review**: 2026-04-01
>>>>>>> origin/pr10
