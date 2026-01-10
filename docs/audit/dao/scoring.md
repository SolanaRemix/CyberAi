<<<<<<< HEAD
# Contribution Scoring Formula

## Overview

<<<<<<< HEAD
This document defines how contributions are scored for DAO token allocation. The scoring system aims to be fair, transparent, and incentivize high-quality contributions.
=======
This document defines how contributor scores are calculated for DAO token distribution. The scoring system aims to be fair, transparent, and resistant to gaming.
>>>>>>> origin/pr9

## Base Scoring Formula

```
<<<<<<< HEAD
Total Score = Σ (Base Points × Quality Multiplier × Type Multiplier × Bonus Multipliers)
```

## Base Points by Contribution Type

### Code Contributions (Merged PRs)

| Type | Base Points | Notes |
|------|-------------|-------|
| Major Feature | 100 | Significant new functionality |
| Minor Feature | 50 | Small feature or enhancement |
| Bug Fix (Complex) | 40 | Requires significant investigation/fix |
| Bug Fix (Simple) | 20 | Straightforward fix |
| Refactoring | 30 | Improves code quality/structure |
| Tests | 15 | New test coverage |
| CI/CD | 25 | Workflow improvements |
| Performance | 40 | Measurable performance improvements |

### Documentation Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
| New Doc Page | 30 | Complete documentation page |
| Tutorial/Guide | 50 | Step-by-step tutorial |
| API Documentation | 40 | API reference docs |
| Doc Update (Major) | 20 | Significant improvements |
| Doc Update (Minor) | 10 | Small fixes or clarifications |
| Diagram/Visual | 15 | Charts, diagrams, screenshots |
| Translation | 25 per page | Translation of existing docs |
=======
# Contribution Scoring Methodology

## Overview

This document details how contributions are scored for DAO token allocation in CyberAi.

## Scoring Philosophy

- **Quality over Quantity**: Meaningful contributions valued over volume
- **Fairness**: Clear, transparent, and consistently applied rules
- **Diversity**: Multiple contribution types recognized
- **Balance**: No single activity dominates scoring

## Base Point Values

### Code Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
| Critical bug fix | 100 | Security or data loss fixes |
| Major feature | 75 | New significant functionality |
| Minor feature | 50 | Small enhancements |
| Bug fix | 30 | Non-critical bug resolution |
| Documentation | 20 | Docs, comments, README |
| Tests | 15 | Test additions/improvements |
| Refactoring | 25 | Code quality improvements |
| Typo/formatting | 5 | Minor text corrections |

**Multipliers:**
- Lines of code (LOC): 
  - 1-50 LOC: 1.0x
  - 51-200 LOC: 1.2x
  - 201-500 LOC: 1.5x
  - 500+ LOC: 2.0x
- Complexity (cyclomatic): High complexity +25%
- Impact: Core systems +50%, utilities +0%

### Code Reviews

| Type | Base Points | Notes |
|------|-------------|-------|
| Comprehensive review | 10 | Detailed feedback, multiple rounds |
| Standard review | 5 | Thorough single-pass review |
| Quick review | 2 | Simple approval or minor feedback |
| Security-focused review | 15 | Identifies security issues |

**Disqualified Reviews:**
- Just "LGTM" with no other comment: 0 points
- Reviews of own PRs: 0 points
- Circular reviews (coordinated): 0 points

### Community Participation

| Type | Base Points | Notes |
|------|-------------|-------|
| Helpful issue response | 3 | Helps another user solve problem |
| Bug report (valid) | 10 | Reproducible bug with details |
| Feature request (accepted) | 5 | Well-thought-out feature proposal |
| Discussion participation | 2 | Constructive discussion comment |
| Tutorial/guide creation | 50 | External tutorial or guide |
| Project promotion | 10 | Blog post, talk, or meaningful promotion |

**Caps:**
- Max 50 points per user per month from issue responses
- Max 100 points per user from tutorials/guides
>>>>>>> origin/pr10

### Security Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
<<<<<<< HEAD
| Critical Vulnerability | 200 | Severe security issue |
| High Vulnerability | 100 | Significant security issue |
| Medium Vulnerability | 50 | Moderate security concern |
| Low Vulnerability | 25 | Minor security improvement |
| Security Documentation | 30 | Security guides/best practices |
| Security Review | 20 | PR security review |

### Issue Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
| Critical Bug Report | 30 | Severe bug with reproduction |
| Bug Report | 15 | Valid bug with details |
| Feature Request | 10 | Well-documented feature idea |
| Issue Triage | 5 | Confirmed/validated existing issue |

### Review Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
| Thorough Code Review | 15 | Detailed review with feedback |
| Security Review | 20 | Security-focused review |
| Architecture Review | 25 | High-level design feedback |
| Simple Review | 8 | Quick review with basic feedback |

### Community Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
| Helpful Discussion Answer | 5 | Solving user problems |
| Tutorial/Blog Post | 40 | External content creation |
| Community Moderation | 10 per session | Active moderation |
| Event Organization | 50 | Meetups, workshops, etc. |

## Quality Multipliers

Quality of contribution affects the final score:

| Quality Level | Multiplier | Criteria |
|--------------|------------|----------|
| Exceptional | 1.5x | Goes above and beyond, sets new standards |
| High | 1.2x | Well-executed, thorough, minimal issues |
| Standard | 1.0x | Meets requirements, good quality |
| Acceptable | 0.8x | Meets minimum bar, some issues |
| Low | 0.5x | Just barely acceptable, many issues |

### Quality Assessment Criteria

**Exceptional (1.5x)**:
- Zero reviewer feedback needed
- Comprehensive tests included
- Excellent documentation
- Considers edge cases
- Best practices followed

**High (1.2x)**:
- Minimal reviewer feedback
- Good test coverage
- Clear documentation
- Handles common edge cases
- Follows project standards

**Standard (1.0x)**:
- Moderate reviewer feedback
- Basic test coverage
- Adequate documentation
- Handles main use cases
- Generally follows standards

**Acceptable (0.8x)**:
- Significant reviewer feedback
- Limited test coverage
- Minimal documentation
- Basic functionality only
- Some standard violations

**Low (0.5x)**:
- Extensive rework needed
- No or poor tests
- No documentation
- Incomplete functionality
- Multiple standard violations

## Type Multipliers

Certain types of work receive additional weight:

| Category | Multiplier | Rationale |
|----------|------------|-----------|
| Security-Critical | 1.5x | High impact on project safety |
| Infrastructure | 1.3x | Benefits all contributors |
| Breaking Changes | 0.8x | Requires more coordination |
| First-Time Contributor | 1.2x | Encourage new contributors |
| Maintenance | 1.1x | Sustains project health |

## Bonus Multipliers

Additional bonuses can stack:

### Complexity Bonus

| Complexity | Bonus | Criteria |
|-----------|-------|----------|
| Very High | +0.4x | Extremely difficult/specialized |
| High | +0.2x | Requires deep expertise |
| Medium | +0.1x | Moderate difficulty |
| Low | 0x | Straightforward |

### Impact Bonus

| Impact | Bonus | Criteria |
|--------|-------|----------|
| Critical | +0.5x | Affects core functionality |
| High | +0.3x | Benefits many users |
| Medium | +0.1x | Moderate benefit |
| Low | 0x | Minor benefit |

### Timeliness Bonus

| Timing | Bonus | Criteria |
|--------|-------|----------|
| Urgent Fix | +0.3x | Critical issue fixed quickly |
| Timely | +0.1x | Met deadline or expectation |
| Standard | 0x | Normal timeframe |

### Sustained Contribution Bonus

| Quarters Active | Bonus | Max |
|----------------|-------|-----|
| 1 | 0x | - |
| 2 | +0.1x | - |
| 3 | +0.2x | - |
| 4+ | +0.3x | Caps at 1.5x total |

## Scoring Examples

### Example 1: Major Feature PR

**Contribution**: New automated scanning feature

**Base Points**: 100 (Major Feature)

**Multipliers**:
- Quality: 1.2x (High quality, good tests)
- Type: 1.3x (Infrastructure)
- Complexity: +0.2x (High complexity)
- Impact: +0.3x (High impact)
- First-Time: +0.2x (First contribution)

**Calculation**:
```
Score = 100 × 1.2 × 1.3 × (1 + 0.2 + 0.3 + 0.2)
Score = 100 × 1.2 × 1.3 × 1.7
Score = 265.2 points
```

### Example 2: Security Vulnerability Report

**Contribution**: High severity vulnerability reported

**Base Points**: 100 (High Vulnerability)

**Multipliers**:
- Quality: 1.5x (Exceptional detail with PoC)
- Type: 1.5x (Security-Critical)
- Impact: +0.5x (Critical impact)
- Timeliness: 0x (Standard)

**Calculation**:
```
Score = 100 × 1.5 × 1.5 × (1 + 0.5)
Score = 100 × 1.5 × 1.5 × 1.5
Score = 337.5 points
```

### Example 3: Documentation Improvement

**Contribution**: New tutorial page

**Base Points**: 50 (Tutorial/Guide)

**Multipliers**:
- Quality: 1.2x (High quality with examples)
- Type: 1.0x (Standard)
- Impact: +0.3x (Helps many users)
- Sustained: +0.1x (2nd quarter contributing)

**Calculation**:
```
Score = 50 × 1.2 × 1.0 × (1 + 0.3 + 0.1)
Score = 50 × 1.2 × 1.4
Score = 84 points
```

### Example 4: Multiple Small Contributions

**Contributions**:
- 3 bug fixes (simple): 20 pts each = 60 pts
- 2 code reviews: 15 pts each = 30 pts
- 1 doc update (minor): 10 pts

**Total Base**: 100 points

**Multipliers**: Standard (1.0x) quality on all

**Calculation**:
```
Score = (60 + 30 + 10) × 1.0
Score = 100 points
```

### Example 5: Community Support

**Contributions**:
- 20 helpful answers: 5 pts each = 100 pts
- 1 external blog post: 40 pts

**Total Base**: 140 points

**Multipliers**:
- Quality: 1.1x (good engagement)
- Impact: +0.2x (helped community)

**Calculation**:
```
Score = 140 × 1.1 × (1 + 0.2)
Score = 140 × 1.1 × 1.2
Score = 184.8 points
```

## Score Normalization

Scores are normalized for token allocation:

1. **Calculate Individual Scores**: Sum all contributions per person
2. **Calculate Total Pool**: Sum all eligible contributors' scores
3. **Calculate Allocation Percentage**: Individual Score / Total Pool
4. **Apply to Token Amount**: Percentage × Available Tokens

### Example Normalization

**Scenario**:
- Total tokens for distribution: 1,000,000
- Contributor A score: 500
- Contributor B score: 300
- Contributor C score: 200
- Total pool: 1,000 points

**Allocations**:
- Contributor A: (500/1000) × 1,000,000 = 500,000 tokens
- Contributor B: (300/1000) × 1,000,000 = 300,000 tokens
- Contributor C: (200/1000) × 1,000,000 = 200,000 tokens

## Score Transparency

All scores are:
- **Calculated Publicly**: Formula is open source
- **Reviewable**: Community can audit calculations
- **Appealable**: Disputes can be raised
- **Documented**: Reasoning for multipliers documented

## Score Adjustments

### Manual Adjustments

In rare cases, scores may be manually adjusted:

**Reasons for adjustment**:
- Exceptional circumstances not covered by formula
- Technical limitations in automated scoring
- Community consensus on special recognition
- Gaming/abuse of the system (downward)

**Process**:
- Proposal in GitHub Discussion
- Public documentation of reasoning
- Maintainer review and vote
- Transparency in final decision

### Gaming Prevention

To prevent gaming the system:
- Quality multipliers subjectively assessed
- Spam contributions receive 0 points
- Patterns of abuse result in disqualification
- Community review period catches issues

## Updates to Formula

This formula may evolve:

- **Minor Tweaks**: Point value adjustments (no vote needed)
- **Major Changes**: Require DAO proposal and vote
- **Advance Notice**: 60 days before applying to snapshot
- **Grandfathering**: Old contributions scored under old rules

## Tools

Calculate your estimated score:
- Manual calculation using this document
- Automated script (coming soon)
- Community-built calculators (verify accuracy)

## Questions?

- **Scoring Questions**: GitHub Discussions with "DAO Scoring" label
- **Disputes**: Follow appeals process in [eligibility.md](eligibility.md)
- **Formula Changes**: Submit DAO proposal

---

**Version**: 1.0

**Last Updated**: 2026-01-01

**Next Review**: 2026-04-01
=======
Total Score = Code Score + Documentation Score + Community Score + Security Score + Quality Multiplier
```

## Component Scoring

### 1. Code Contributions

**Pull Request Scoring**:

```javascript
function calculateCodeScore(pr) {
  let baseScore = 0;
  
  // Size-based scoring
  if (pr.additions + pr.deletions < 50) {
    baseScore = 1;  // Small PR
  } else if (pr.additions + pr.deletions < 200) {
    baseScore = 3;  // Medium PR
  } else if (pr.additions + pr.deletions < 500) {
    baseScore = 5;  // Large PR
  } else {
    baseScore = 8;  // Very large PR
  }
  
  // Impact multipliers
  if (pr.labels.includes('critical')) baseScore *= 2;
  if (pr.labels.includes('security')) baseScore *= 1.5;
  if (pr.labels.includes('breaking-change')) baseScore *= 1.3;
  
  // Quality adjustments
  if (pr.reviews > 2) baseScore *= 1.1;
  if (pr.hasTests) baseScore *= 1.2;
  if (pr.hasDocs) baseScore *= 1.1;
  
  return baseScore;
}
```

**Commit Scoring**:
- Each commit with DCO sign-off: 0.1 points
- First commit on new feature: 2 points bonus
- Fixes critical bug: 10 points

### 2. Documentation Contributions

**Documentation Scoring**:

```javascript
function calculateDocScore(contribution) {
  const docType = contribution.type;
  
  const scores = {
    'minor-update': 1,
    'major-documentation': 3,
    'tutorial': 5,
    'api-docs': 4,
    'translation': 3,
    'video-tutorial': 8
  };
  
  let score = scores[docType] || 0;
  
  // Quality bonus
  if (contribution.hasExamples) score *= 1.2;
  if (contribution.hasScreenshots) score *= 1.1;
  
  return score;
}
```

### 3. Community Support

**Community Scoring**:

```javascript
function calculateCommunityScore(activity) {
  let score = 0;
  
  // Issue activity
  score += activity.issueComments * 0.5;
  score += activity.issuesTriaged * 1;
  score += activity.issuesCreated * 0.3;
  
  // PR reviews
  score += activity.prReviewComments * 0.5;
  score += activity.prApprovalsGiven * 2;
  
  // Discussion participation
  score += activity.discussionPosts * 0.5;
  score += activity.discussionHelpful * 1;
  
  // Moderation
  score += activity.moderationActions * 3;
  
  // Cap community score to prevent spam
  return Math.min(score, 50);
}
```

### 4. Security Contributions

**Security Scoring**:

```javascript
function calculateSecurityScore(report) {
  const severityScores = {
    'critical': 50,
    'high': 20,
    'medium': 10,
    'low': 5,
    'informational': 2
  };
  
  let score = severityScores[report.severity] || 0;
  
  // Bonus for responsible disclosure
  if (report.privateDisclosure) score *= 1.5;
  
  // Bonus for providing fix
  if (report.includesFix) score *= 1.3;
  
  return score;
}
```

## Quality Multiplier

To reward high-quality contributions over quantity:

```javascript
function calculateQualityMultiplier(contributor) {
  let multiplier = 1.0;
  
  // PR acceptance rate
  const acceptanceRate = contributor.mergedPRs / contributor.totalPRs;
  if (acceptanceRate > 0.8) multiplier *= 1.2;
  else if (acceptanceRate < 0.4) multiplier *= 0.8;
  
  // Code review quality
  const avgReviewScore = contributor.avgReviewScore; // 1-5 scale
  multiplier *= (0.9 + (avgReviewScore * 0.05));
  
  // Time invested (prevents drive-by contributions)
  const monthsActive = contributor.monthsActive;
  if (monthsActive > 6) multiplier *= 1.1;
  if (monthsActive > 12) multiplier *= 1.2;
  
  // Spam penalty
  if (contributor.spamFlags > 0) multiplier *= 0.5;
  
  return multiplier;
}
```

## Final Score Calculation

```javascript
function calculateFinalScore(contributor) {
  const codeScore = contributor.prs.reduce((sum, pr) => 
    sum + calculateCodeScore(pr), 0);
  
  const docScore = contributor.docs.reduce((sum, doc) => 
    sum + calculateDocScore(doc), 0);
  
  const communityScore = calculateCommunityScore(contributor.activity);
  
  const securityScore = contributor.securityReports.reduce((sum, report) => 
    sum + calculateSecurityScore(report), 0);
  
  const baseScore = codeScore + docScore + communityScore + securityScore;
  
  const qualityMultiplier = calculateQualityMultiplier(contributor);
  
  return Math.round(baseScore * qualityMultiplier);
}
```

## Token Allocation Formula

Once scores are calculated, tokens are distributed proportionally:

```javascript
function calculateTokenAllocation(contributor, totalScore, tokenPool) {
  const contributorScore = calculateFinalScore(contributor);
  const allocation = (contributorScore / totalScore) * tokenPool;
  
  // Apply minimum and maximum
  const minAllocation = 10;  // tokens
  const maxAllocation = tokenPool * 0.05;  // max 5% per contributor
  
  return Math.max(minAllocation, Math.min(allocation, maxAllocation));
}
```

## Time-Weighted Scoring

To value consistent contribution:

```javascript
function applyTimeWeight(score, contributionDate) {
  const now = new Date();
  const monthsAgo = (now - contributionDate) / (1000 * 60 * 60 * 24 * 30);
  
  // Recent contributions valued more
  if (monthsAgo <= 1) return score * 1.5;
  if (monthsAgo <= 3) return score * 1.2;
  if (monthsAgo <= 6) return score * 1.0;
  if (monthsAgo <= 12) return score * 0.8;
  return score * 0.6;
}
=======
| Critical vulnerability | 200 | Remote code execution, data breach |
| High severity | 100 | Privilege escalation, auth bypass |
| Medium severity | 50 | Information disclosure, DoS |
| Low severity | 25 | Minor security improvements |
| Security documentation | 30 | Security guides, best practices |
| Security tooling | 75 | Tools that improve security |

**Requirements:**
- Responsible disclosure followed
- Not publicly disclosed before fix
- Actual vulnerabilities (not theoretical)

### Governance Participation

| Type | Base Points | Notes |
|------|-------------|-------|
| Proposal creation | 20 | Well-formed governance proposal |
| Voting on proposals | 2 | Per vote cast |
| Governance discussion | 5 | Substantive governance input |
| Policy contribution | 30 | Help create/improve policies |

## Multipliers and Bonuses

### Time-Based Multipliers

**Early Contributor Bonus:**
- First 3 months: +50%
- Months 4-6: +25%
- Months 7-12: +10%

**Consistency Bonus:**
- Contributions in 3+ months: +10%
- Contributions in 6+ months: +25%
- Contributions in 12+ months: +50%

### Impact Multipliers

**High-Impact Work:**
- Affects core security: +50%
- Enables major feature: +30%
- Improves user experience: +20%
- Infrastructure improvement: +25%

**Quality Multipliers:**
- Zero bugs in follow-up: +10%
- Requires no revisions: +5%
- Includes tests: +15%
- Includes documentation: +10%

### Special Recognition

**Community Leadership:**
- Mentors new contributors: +50 points
- Organizes community events: +75 points
- Resolves conflicts positively: +25 points

**Technical Excellence:**
- Introduces innovative solution: +100 points
- Performance improvement >50%: +75 points
- Resolves long-standing issue: +50 points

## Calculation Formula

```
Total Score = Σ (Base Points × LOC Multiplier × Impact Multiplier × Time Multiplier) + Bonuses
>>>>>>> origin/pr10
```

## Example Calculations

<<<<<<< HEAD
### Example 1: Active Coder

```javascript
const contributor = {
  prs: [
    { additions: 120, deletions: 30, labels: ['feature'], reviews: 3, hasTests: true, hasDocs: true },
    { additions: 45, deletions: 10, labels: [], reviews: 1, hasTests: true, hasDocs: false },
    { additions: 200, deletions: 50, labels: ['critical'], reviews: 4, hasTests: true, hasDocs: true }
  ],
  docs: [],
  activity: { issueComments: 20, prReviewComments: 15 },
  securityReports: [],
  monthsActive: 8,
  mergedPRs: 3,
  totalPRs: 3
};

// Code Score: ~30 points (with bonuses)
// Doc Score: 0
// Community Score: ~17.5 points
// Security Score: 0
// Quality Multiplier: ~1.32
// Final: ~63 points
```

### Example 2: Documentation Expert

```javascript
const contributor = {
  prs: [],
  docs: [
    { type: 'tutorial', hasExamples: true, hasScreenshots: true },
    { type: 'major-documentation', hasExamples: true },
    { type: 'api-docs', hasExamples: true }
  ],
  activity: { issueComments: 10, discussionPosts: 20 },
  securityReports: [],
  monthsActive: 5,
  mergedPRs: 0,
  totalPRs: 0
};

// Code Score: 0
// Doc Score: ~18 points (with bonuses)
// Community Score: ~15 points
// Security Score: 0
// Quality Multiplier: ~1.1
// Final: ~36 points
```

### Example 3: Security Researcher

```javascript
const contributor = {
  prs: [
    { additions: 100, deletions: 20, labels: ['security'], reviews: 2, hasTests: true, hasDocs: true }
  ],
  docs: [],
  activity: { issueComments: 5 },
  securityReports: [
    { severity: 'high', privateDisclosure: true, includesFix: true }
  ],
  monthsActive: 3,
  mergedPRs: 1,
  totalPRs: 1
};

// Code Score: ~8 points
// Doc Score: 0
// Community Score: ~2.5 points
// Security Score: 39 points (20 * 1.5 * 1.3)
// Quality Multiplier: ~1.2
// Final: ~59 points
```

## Anti-Gaming Measures

1. **PR Size Limits**: Diminishing returns for very large PRs
2. **Community Score Cap**: Maximum 50 points from community activity
3. **Acceptance Rate**: Poor PR acceptance reduces multiplier
4. **Spam Detection**: Automated and manual spam flagging
5. **Quality Over Quantity**: Time-weighted scoring
6. **Sybil Resistance**: Account age and verification requirements

## Transparency

All scoring calculations:
- Run in public GitHub Actions
- Results published to repository
- Algorithm open source
- Community can audit

## Updates

Scoring formula updates require:
- DAO governance vote
- 30-day notice period
- Clear documentation of changes
- No retroactive changes

## Tools

See [dao/merkle/generate_merkle.js](../../dao/merkle/generate_merkle.js) for implementation.

---

Last updated: 2026-01-01
>>>>>>> origin/pr9
=======
### Example 1: Regular Contributor

**Contributions:**
- 3 minor features (50 × 3 = 150 points)
- 200 LOC average (1.2x multiplier)
- Standard impact (1.0x)
- 6 months active (+25% consistency)
- 5 code reviews (5 × 5 = 25 points)
- 10 helpful comments (3 × 10 = 30 points)

**Calculation:**
```
Code: 150 × 1.2 × 1.0 × 1.25 = 225
Reviews: 25
Community: 30
Total: 280 points
```

### Example 2: Security Researcher

**Contributions:**
- 1 high severity vulnerability (100 points)
- Responsible disclosure (+25% quality)
- Security documentation (30 points)
- 3 security reviews (15 × 3 = 45 points)

**Calculation:**
```
Security: 100 × 1.25 = 125
Documentation: 30
Reviews: 45
Total: 200 points
```

### Example 3: Early Core Developer

**Contributions:**
- 2 major features (75 × 2 = 150 points)
- 500+ LOC (2.0x multiplier)
- Core system (1.5x impact)
- First 3 months (+50% early bonus)
- Includes tests (+15% quality)
- Zero revisions (+5% quality)

**Calculation:**
```
Code: 150 × 2.0 × 1.5 × 1.5 × 1.15 × 1.05 = 817
Total: 817 points
```

## Point Caps and Limits

### Individual Caps

- **Maximum per PR**: 500 points (before multipliers)
- **Maximum per month**: 1,000 points (prevents gaming)
- **Maximum from one activity type**: 60% of total score

### Reasoning

Caps prevent:
- Gaming the system with spam contributions
- Domination by single contribution type
- Unfair advantage from one large contribution
- Score inflation

## Score Normalization

Before final allocation:

1. **Calculate raw scores** for all contributors
2. **Apply caps** to individual scores
3. **Remove outliers** (manual review of top 1%)
4. **Normalize to token pool**: Scale scores to available tokens

**Example:**
- Total raw points: 50,000
- Token pool: 10,000 tokens
- Conversion: 1 point = 0.2 tokens

## Transparency and Verification

### Public Data

All scoring data is public:
- Contribution list with point values
- Multipliers applied
- Final calculated scores
- Conversion rate to tokens

### Verification

Anyone can:
1. Review the scoring methodology
2. Check their own score calculation
3. Verify others' scores
4. Appeal discrepancies

### Audits

- Quarterly review of scoring accuracy
- Community input on methodology
- Adjustments based on feedback
- Versioned methodology (changes tracked)

## Appeals and Adjustments

### When to Appeal

- Contributions not counted
- Incorrect point values
- Multipliers not applied
- Technical errors in calculation

### Appeal Process

1. Open GitHub issue with tag `scoring-appeal`
2. Provide contribution links
3. Show expected vs. actual score
4. Wait for review (10 business days)

### Adjustments

Scores may be adjusted for:
- Proven calculation errors
- Previously uncounted contributions
- Misclassified contribution types
- Special circumstances (case-by-case)

## Future Methodology Updates

This methodology may evolve:

**Update Process:**
1. Proposal in GitHub Discussions
2. Community feedback (minimum 14 days)
3. Governance vote (if DAO active)
4. Implementation in next airdrop

**Versioning:**
- Each airdrop uses specific version
- Version noted in airdrop announcement
- No retroactive methodology changes

## Questions and Discussion

- **General Questions**: GitHub Discussions with tag `dao-scoring`
- **Score Disputes**: GitHub Issues with tag `scoring-appeal`
- **Methodology Feedback**: GitHub Discussions

---

**Methodology Version**: 1.0  
**Last Updated**: 2026-01-01  
**Next Review**: 2026-03-01
>>>>>>> origin/pr10
