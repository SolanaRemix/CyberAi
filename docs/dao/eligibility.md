# Contributor Eligibility

## Overview

This document defines who is eligible to participate in the SmartContractAudit DAO and receive governance token allocations.

## Eligibility Criteria

### Primary Eligibility

To be eligible for DAO participation, contributors must meet at least one of the following criteria:

#### 1. Code Contributors

**Requirement**: At least one merged pull request

Includes:
- Feature implementations
- Bug fixes
- Performance improvements
- Refactoring (with clear benefit)
- Test additions
- CI/CD improvements

**Minimum Threshold**:
- At least 1 merged PR by snapshot date
- PR must add meaningful value (no spam PRs)
- PR must follow contribution guidelines

#### 2. Documentation Contributors

**Requirement**: Significant documentation improvements

Includes:
- New documentation pages
- Major doc updates or fixes
- Tutorial creation
- API documentation
- Translation contributions
- Diagram and visual aids

**Minimum Threshold**:
- At least 1 merged documentation PR
- Minimum 100 lines of quality documentation
- Clear improvement to user/developer experience

#### 3. Security Researchers

**Requirement**: Reported valid security vulnerability

Includes:
- Security vulnerabilities
- Logic bugs with security implications
- Cryptographic weaknesses
- Authentication/authorization issues
- Supply chain vulnerabilities

**Minimum Threshold**:
- At least 1 accepted security report
- Followed responsible disclosure process
- Vulnerability confirmed by security team
- Severity: Medium or higher

**Note**: Security reports should be submitted via [SECURITY.md](../../SECURITY.md) process.

#### 4. Issue Reporters

**Requirement**: High-quality issue reports

Includes:
- Bug reports with reproduction steps
- Feature requests with clear use cases
- Issues that lead to improvements
- Well-researched problem descriptions

**Minimum Threshold**:
- At least 3 quality issues created
- Issues must be accepted (not closed as invalid/duplicate)
- Clear value to project
- Proper formatting and details

#### 5. Code Reviewers

**Requirement**: Meaningful code review participation

Includes:
- PR reviews with constructive feedback
- Bug identification in PRs
- Architecture and design feedback
- Security reviews
- Testing recommendations

**Minimum Threshold**:
- At least 5 meaningful PR reviews
- Reviews must add value (not just "+1" or "LGTM")
- Demonstrate understanding of codebase
- Follow code of conduct in feedback

#### 6. Community Support

**Requirement**: Active community assistance

Includes:
- Answering questions in Discussions
- Helping users troubleshoot issues
- Creating educational content
- Moderating community spaces
- Organizing community events

**Minimum Threshold**:
- Sustained activity over at least 30 days
- Helpful and respectful interactions
- At least 10 meaningful community interactions
- Positive feedback from community

### Exclusion Criteria

Contributors are **NOT eligible** if they:

- Violated the Code of Conduct
- Submitted spam or low-quality contributions
- Engaged in sock-puppet or fake accounts
- Plagiarized or violated licenses
- Were banned or blocked from project
- Submitted malicious code
- Acted in bad faith

### Multi-Account Policy

- One allocation per individual
- Sock-puppet accounts will be disqualified
- All accounts owned by the same person will be excluded
- Use your primary GitHub account

## Verification Process

### Pre-Snapshot

Before each snapshot:

1. **Contribution Collection**: All qualifying activities gathered
2. **Scoring Calculation**: Contributions scored per [scoring.md](scoring.md)
3. **Eligibility Check**: Verify minimum thresholds met
4. **Exclusion Review**: Check for violations or bad actors
5. **Public Review**: Draft list published for community review (5 days)

### Community Review Period

- Draft eligibility list published
- 5 business days for review
- Community can flag issues
- Corrections made as needed
- Final list published

### Appeals Process

If you believe you should be included but aren't:

1. **Check Criteria**: Verify you meet minimum thresholds
2. **Gather Evidence**: Link to PRs, issues, reviews, etc.
3. **Submit Appeal**: Open GitHub Discussion with "DAO Appeal" tag
4. **Review**: Maintainers review within 3 business days
5. **Decision**: Final decision documented publicly

Appeals must be submitted within 7 days of final list publication.

## Snapshot Timing

### Regular Snapshots

**Frequency**: Quarterly (every 3 months)

**Typical Schedule**:
- Q1: March 31
- Q2: June 30
- Q3: September 30
- Q4: December 31

**Announcement**: 14 days before snapshot date

### Eligibility Window

Contributions must be:
- Made before the snapshot date/time
- Merged/accepted before the snapshot
- Verified and validated
- Publicly visible in repository

### Vesting Start

- Tokens vest from snapshot date
- Immediate unlock: 25%
- Linear vesting: 75% over 12 months

## Special Considerations

### Maintainers

Core maintainers receive:
- Base allocation for contributions
- Maintenance bonus (additional allocation)
- Long-term commitment bonus

**Rationale**: Recognize sustained project stewardship

### Security Researchers

Significant security findings may receive:
- Bonus allocation based on severity
- Critical: 3x multiplier
- High: 2x multiplier
- Medium: 1.5x multiplier

**Rationale**: Incentivize security research

### First-Time Contributors

First merged contribution receives:
- Welcome bonus (1.2x multiplier)
- Encourages new contributors
- One-time bonus only

### Sustained Contributors

Contributors active for multiple quarters:
- Loyalty bonus (1.1x per consecutive quarter, max 1.5x)
- Encourages long-term engagement

## Example Scenarios

### Scenario 1: New Code Contributor

**Profile**:
- 2 merged PRs (feature + bugfix)
- 1 code review
- Joined this quarter

**Eligible?**: ✅ Yes
**Reason**: Meets code contributor threshold
**Bonus**: First-time contributor bonus (1.2x)

### Scenario 2: Documentation Expert

**Profile**:
- 5 documentation PRs
- Created 2 tutorials
- 300+ lines of documentation

**Eligible?**: ✅ Yes
**Reason**: Exceeds documentation threshold
**Bonus**: None (not first-time)

### Scenario 3: Security Researcher

**Profile**:
- Reported 1 High severity vulnerability
- Followed responsible disclosure
- Vulnerability confirmed and fixed

**Eligible?**: ✅ Yes
**Reason**: Valid security report
**Bonus**: 2x multiplier for High severity

### Scenario 4: Community Helper

**Profile**:
- Answered 20+ questions
- Active for 45 days
- Positive community feedback

**Eligible?**: ✅ Yes
**Reason**: Exceeds community support threshold
**Bonus**: None

### Scenario 5: Issue-Only User

**Profile**:
- Created 10 issues
- 2 were duplicates
- 8 were valid and accepted

**Eligible?**: ✅ Yes (borderline)
**Reason**: 8 valid issues meets minimum of 3
**Note**: Quality over quantity emphasized

### Scenario 6: Spam Contributor

**Profile**:
- Submitted 20 PRs with trivial changes
- Most were typo fixes or whitespace
- No meaningful value added

**Eligible?**: ❌ No
**Reason**: Spam/low-quality contributions
**Action**: May be flagged during community review

## Updates to Criteria

This eligibility criteria may be updated:

- **Minor Updates**: Clarifications and examples (no vote needed)
- **Major Changes**: Require DAO proposal and vote
- **Advance Notice**: 30 days before applying to snapshot
- **Documentation**: All changes logged in git history

## Questions?

- **General Questions**: GitHub Discussions
- **Eligibility Questions**: Open issue with "DAO Eligibility" label
- **Appeals**: Follow appeals process above
- **Security Reports**: Follow [SECURITY.md](../../SECURITY.md)

---

**Version**: 1.0

**Effective Date**: 2026-01-01

**Next Review**: 2026-04-01
