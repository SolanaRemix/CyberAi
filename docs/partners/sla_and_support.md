---
title: SLA and Support
description: Service level agreements and support for SmartContractAudit partners
keywords: SLA, support, response time, uptime, service level
---

# SLA and Support

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

## Contact

**General Support**: support@cuberai.example  
**Partner Success**: partners@cuberai.example  
**Security Issues**: security@cuberai.example  
**Billing**: billing@cuberai.example  
**Escalations**: support-manager@cuberai.example

## Related Documents

- [Sponsorship Tiers](sponsorship_tiers.md)
- [Technical Onboarding](technical_onboarding.md)
- [Partnership Agreement](partnerships.md)
- [Data Privacy](data_privacy.md)

---

**Last Updated**: 2026-01-01  
**Version**: 1.0  
**Next Review**: 2026-04-01

We're committed to your success! 🚀
