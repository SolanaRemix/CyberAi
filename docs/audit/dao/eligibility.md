<<<<<<< HEAD
<<<<<<< HEAD
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
=======
# Contributor Eligibility & Criteria

## Overview

SmartContractAudit DAO rewards contributors who help build and improve the project. This document outlines eligibility criteria for token distribution and governance participation.

## Eligibility Requirements

### Basic Eligibility

To be eligible for token rewards, contributors must:

1. **Sign Developer Certificate of Origin (DCO)**
   - All commits must be signed off (`git commit -s`)
   - Certifies you have rights to submit the contribution

2. **Follow Code of Conduct**
   - Respectful community participation
   - Constructive collaboration
   - Professional behavior

3. **Meet Contribution Threshold**
   - Minimum one merged pull request, OR
   - Minimum 5 helpful issue comments, OR
   - Minimum 3 documentation improvements, OR
   - Active community moderation

4. **Identity Verification**
   - Valid GitHub account (30+ days old)
   - Verified email address
   - No duplicate accounts

### Advanced Eligibility Tiers

#### Tier 1: Contributor (Entry)
**Requirements**:
- 1-5 merged PRs
- Active for 1+ month
- Positive community feedback

**Rewards**:
- Base token allocation
- Voting rights
- Community recognition

#### Tier 2: Regular Contributor
**Requirements**:
- 6-20 merged PRs
- Active for 3+ months
- Quality contributions (no spam)
- Helped onboard new contributors

**Rewards**:
- 2x base allocation
- Enhanced voting weight
- Contributor badge
- Early feature access

#### Tier 3: Core Contributor
**Requirements**:
- 21+ merged PRs
- Active for 6+ months
- Significant impact (features, fixes, docs)
- Community leadership
- Code review participation

**Rewards**:
- 3x base allocation
- Maintainer consideration
- Speaking opportunities
- Strategic input

#### Tier 4: Maintainer
**Requirements**:
- Appointed by existing maintainers
- Sustained high-quality contributions
- Technical expertise
- Community trust
- Governance participation

**Rewards**:
- 5x base allocation
- Write access
- Release authority
- Strategic decision-making

## Contribution Types

### Code Contributions

**Eligible**:
- New features
- Bug fixes
- Performance improvements
- Test coverage
- Refactoring
- CI/CD improvements

**Scoring**:
- Small PR: 1 point
- Medium PR: 3 points
- Large PR: 5 points
- Critical fix: 10 points

### Documentation

**Eligible**:
- Technical documentation
- User guides
- Code comments (meaningful)
- API documentation
- Tutorial creation
- Translation

**Scoring**:
- Minor update: 1 point
- Major documentation: 3 points
- Tutorial/guide: 5 points

### Community Support

**Eligible**:
- Answering questions (GitHub/Discord)
- Triaging issues
- Reproducing bugs
- Onboarding new contributors
- Community moderation

**Scoring**:
- Helpful response: 0.5 points
- Issue triage: 1 point
- Onboarding help: 2 points

### Security

**Eligible**:
- Vulnerability reports
- Security audits
- Security documentation
- Patch development

**Scoring**:
- Low severity: 5 points
- Medium severity: 10 points
- High severity: 20 points
- Critical severity: 50 points

### Design & UX

**Eligible**:
- UI/UX improvements
- Design assets
- User research
- Usability testing

**Scoring**:
- Minor improvement: 1 point
- Major redesign: 5 points
- User research: 3 points

## Disqualifications

Contributors may be disqualified for:

- **Code of Conduct violations**
- **Spam contributions** (low quality, automated)
- **Plagiarism or copyright infringement**
- **Sybil attacks** (multiple accounts)
- **Malicious code** or security violations
- **Harassment** of community members

Disqualified contributors forfeit all tokens and rights.

## Verification Process

### Monthly Snapshot

1. **Automated Collection**
   - GitHub API pulls contribution data
   - Scoring algorithm runs
   - Initial allocation calculated

2. **Manual Review**
   - Maintainers review edge cases
   - Quality assessment
   - Spam filtering

3. **Community Feedback**
   - Draft allocations posted
   - 7-day feedback period
   - Disputes addressed

4. **Final Distribution**
   - Merkle tree generated
   - Claiming period opens
   - Tokens distributed

## Special Considerations

### Maintainer Contributions

Maintainer work (reviews, governance, community management) is tracked separately and rewards allocated accordingly.

### External Contributors

Contributors from partner organizations:
- Eligible for same rewards
- Must meet same criteria
- No special advantages

### Retroactive Eligibility

Past contributors (before DAO launch):
- Retroactive snapshot taken
- Historical contributions scored
- Initial airdrop allocation

## Token Vesting

To align long-term incentives:

**Contributor Tokens**:
- 25% immediate
- 75% vested over 12 months
- Linear vesting
- Transferable after vest

**Maintainer Tokens**:
- 10% immediate
- 90% vested over 24 months
- Linear vesting
- Lockup period: 6 months

## Appeals Process

If you believe your eligibility assessment is incorrect:

1. **Submit Appeal**
   - Email: dao@cuberai.example
   - Include: GitHub username, specific contributions, reasoning

2. **Review**
   - Maintainers review within 7 days
   - Additional evidence may be requested

3. **Decision**
   - Final decision communicated
   - If approved, allocation adjusted in next cycle

## Privacy

Contribution data used for eligibility:
- GitHub public activity only
- No private data collected
- Anonymized aggregations
- Opt-out available (forfeit rewards)

## Updates

Eligibility criteria may be updated:
- Through DAO governance process
- With 30-day notice
- Retroactive changes require supermajority

## Resources

- [Scoring Formula](scoring.md)
- [Claiming Process](claiming.md)
- [DAO Overview](README.md)

---

Last updated: 2026-01-01
>>>>>>> origin/pr9
=======
# DAO Eligibility Criteria

## Overview

This document outlines the criteria for eligibility in CyberAi DAO airdrops and governance token distribution.

## General Eligibility

### Who is Eligible?

Contributors who have:

1. **Made Code Contributions**
   - Merged pull requests to the main repository
   - Bug fixes, features, documentation, tests
   - Minimum 1 merged PR

2. **Participated in Governance**
   - Reviewed pull requests
   - Participated in discussions
   - Voted on proposals (when applicable)
   - Provided feedback on issues

3. **Community Building**
   - Helped other contributors
   - Created tutorials or guides
   - Promoted the project
   - Organized events or meetups

4. **Security Contributions**
   - Reported valid security vulnerabilities
   - Participated in security reviews
   - Improved security documentation
   - Enhanced security tooling

### Time Requirements

- **Account Age**: GitHub account created before snapshot date
- **First Contribution**: At least 30 days before snapshot
- **Activity Window**: Active within the 180 days before snapshot

## Detailed Criteria

### Code Contributors

**Minimum Requirements:**
- At least 1 merged pull request
- Contributions signed with DCO (`git commit -s`)
- Code meets quality standards (passes CI/CD)

**Weighted by:**
- Lines of code (quality over quantity)
- Complexity of contributions
- Impact on project (features vs. typos)
- Consistency of contributions

### Reviewers

**Minimum Requirements:**
- At least 3 meaningful code reviews
- Reviews include constructive feedback
- Not just "LGTM" comments

**Weighted by:**
- Number of reviews
- Quality and depth of feedback
- Reviews leading to improvements

### Community Members

**Minimum Requirements:**
- Active participation in issues or discussions
- Helpful responses to community questions
- Positive community interaction

**Weighted by:**
- Number of helpful interactions
- Quality of contributions
- Community sentiment

### Security Researchers

**Minimum Requirements:**
- At least 1 valid security report
- Followed responsible disclosure process
- Report led to a fix

**Weighted by:**
- Severity of issues found
- Quality of reports
- Number of valid reports

## Exclusions

### Who is NOT Eligible?

❌ **Disqualifying Factors:**

1. **Code of Conduct Violations**
   - Banned or suspended accounts
   - Harassment or abusive behavior
   - Spam or low-quality contributions

2. **Fraudulent Activity**
   - Fake contributions or sockpuppeting
   - Plagiarized code
   - Bot-generated contributions
   - Identity fraud

3. **Gaming the System**
   - Intentionally inflating metrics
   - Colluding to boost scores
   - Creating issues just to close them
   - Self-reviews or circular reviews

4. **Inactivity**
   - No activity in past 180 days
   - Deleted GitHub account
   - Account created after snapshot

5. **Compliance Issues**
   - Sanctioned individuals or entities
   - Violation of applicable laws
   - Restricted jurisdictions (if applicable)

## Verification Process

### How Eligibility is Verified

1. **Automated Checks**
   - Contribution history analysis
   - DCO signature verification
   - Account age and activity
   - Code of Conduct status

2. **Manual Review**
   - Edge cases and appeals
   - Quality assessment for borderline cases
   - Fraud detection
   - Final approval

3. **Community Input**
   - Public comment period
   - Dispute resolution
   - Transparency in decisions

## Snapshot Details

### When Snapshots Occur

- **Announced**: At least 14 days in advance
- **Date**: Specific block height or timestamp
- **Frequency**: Varies (initial + periodic)

### What is Captured

- All qualifying contributions up to snapshot time
- GitHub activity data
- Contribution scores
- Community participation metrics

### After Snapshot

- No retroactive additions
- Appeals within 30 days
- Final allocations published

## Special Categories

### Early Contributors

**Bonus for:**
- Contributions in first 6 months of project
- Founding team members
- Initial community builders

### Consistent Contributors

**Bonus for:**
- Contributions spanning 6+ months
- Regular activity (monthly contributions)
- Long-term commitment

### High-Impact Contributors

**Bonus for:**
- Critical security fixes
- Major features or improvements
- Significant documentation contributions
- Exceptional community leadership

### Underrepresented Groups

**Consideration for:**
- First-time open source contributors
- Contributors from underrepresented regions
- Accessibility improvements
- Internationalization efforts

## Calculation Example

**Sample Contributor Profile:**
- 5 merged PRs (100 points)
- 10 code reviews (50 points)
- 20 helpful issue comments (20 points)
- 1 security report (50 points)
- Early contributor bonus (20 points)
- **Total: 240 points**

See [scoring.md](scoring.md) for complete scoring methodology.

## Appeals Process

### How to Appeal

1. **Submit Appeal**: Open issue with tag `dao-appeal`
2. **Provide Evidence**: Include contribution links
3. **Explain Situation**: Why you believe you're eligible
4. **Wait for Review**: Response within 10 business days

### Valid Appeal Reasons

- Contributions not properly attributed
- Technical errors in calculation
- Special circumstances not covered by criteria
- Documentation of excluded contributions

### Invalid Appeal Reasons

- Disagreement with point values
- Requests for retroactive contributions
- Contributions made after snapshot
- Attempting to game the system

## Updates and Changes

This eligibility criteria may be updated with:

- Community input
- Governance votes
- Lessons learned from previous airdrops
- Regulatory requirements

Changes announced with:
- Minimum 30 days notice
- GitHub discussions for feedback
- Changelog in this document

## Contact

- **Questions**: GitHub Discussions with tag `dao`
- **Appeals**: GitHub Issues with tag `dao-appeal`
- **General DAO**: See docs/dao/README.md

---

**Last Updated**: 2026-01-01  
**Version**: 1.0  
**Next Review**: 2026-06-01
>>>>>>> origin/pr10
