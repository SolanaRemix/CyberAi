This document defines how contributor scores are calculated for DAO token distribution. The scoring system aims to be fair, transparent, and resistant to gaming.

> > > > > > > origin/pr9

## Base Scoring Formula

```

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

| Type             | Base Points | Notes                         |
| ---------------- | ----------- | ----------------------------- |
| Critical bug fix | 100         | Security or data loss fixes   |
| Major feature    | 75          | New significant functionality |
| Minor feature    | 50          | Small enhancements            |
| Bug fix          | 30          | Non-critical bug resolution   |
| Documentation    | 20          | Docs, comments, README        |
| Tests            | 15          | Test additions/improvements   |
| Refactoring      | 25          | Code quality improvements     |
| Typo/formatting  | 5           | Minor text corrections        |

**Multipliers:**

- Lines of code (LOC):
  - 1-50 LOC: 1.0x
  - 51-200 LOC: 1.2x
  - 201-500 LOC: 1.5x
  - 500+ LOC: 2.0x
- Complexity (cyclomatic): High complexity +25%
- Impact: Core systems +50%, utilities +0%

### Code Reviews

| Type                    | Base Points | Notes                              |
| ----------------------- | ----------- | ---------------------------------- |
| Comprehensive review    | 10          | Detailed feedback, multiple rounds |
| Standard review         | 5           | Thorough single-pass review        |
| Quick review            | 2           | Simple approval or minor feedback  |
| Security-focused review | 15          | Identifies security issues         |

**Disqualified Reviews:**

- Just "LGTM" with no other comment: 0 points
- Reviews of own PRs: 0 points
- Circular reviews (coordinated): 0 points

### Community Participation

| Type                       | Base Points | Notes                                    |
| -------------------------- | ----------- | ---------------------------------------- |
| Helpful issue response     | 3           | Helps another user solve problem         |
| Bug report (valid)         | 10          | Reproducible bug with details            |
| Feature request (accepted) | 5           | Well-thought-out feature proposal        |
| Discussion participation   | 2           | Constructive discussion comment          |
| Tutorial/guide creation    | 50          | External tutorial or guide               |
| Project promotion          | 10          | Blog post, talk, or meaningful promotion |

**Caps:**

- Max 50 points per user per month from issue responses
- Max 100 points per user from tutorials/guides
  > > > > > > > origin/pr10

### Security Contributions

| Type | Base Points | Notes |
| ---- | ----------- | ----- |

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

> > > > > > > origin/pr10

````

## Example Calculations

