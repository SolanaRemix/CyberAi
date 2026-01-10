# Contribution Scoring Formula

## Overview

This document defines how contributions are scored for DAO token allocation. The scoring system aims to be fair, transparent, and incentivize high-quality contributions.

## Base Scoring Formula

```
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

### Security Contributions

| Type | Base Points | Notes |
|------|-------------|-------|
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
