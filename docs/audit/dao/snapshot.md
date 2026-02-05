
# Snapshot Space Setup & Strategies

## Overview

Snapshot is a gasless, off-chain voting platform used by SmartContractAudit DAO for governance proposals. This document explains our Snapshot configuration and voting strategies.

## Snapshot Space

**Space Name**: SmartContractAudit
**ENS**: smartcontractaudit.eth (placeholder)
**Network**: Ethereum Mainnet
**URL**: snapshot.org/#/smartcontractaudit.eth

## Space Configuration

### Basic Settings

```json
{
  "name": "SmartContractAudit DAO",
  "network": "1",
  "symbol": "SCA",
  "skin": "smartcontractaudit",
  "domain": "smartcontractaudit.eth",
  "about": "Decentralized governance for SmartContractAudit - automated security scanning and smart contract auditing",
  "website": "https://github.com/SolanaRemix/SmartContractAudit",
  "twitter": "@SmartContractAudit",
  "github": "SolanaRemix",
  "terms": "https://github.com/SolanaRemix/SmartContractAudit/blob/main/GOVERNANCE.md"
}
```

### Proposal Settings

> > > > > > > origin/pr9

```json
{
  "voting": {
    "delay": 0,
    "period": 604800,
    "type": "basic",
    "quorum": 0,
    "hideAbstain": false
  },
  "strategies": [
    {
      "name": "erc20-balance-of",
      "network": "1",
      "params": {
# Snapshot Process

## Overview

This document explains how CyberAi takes snapshots of contributor data for DAO token distribution.

## What is a Snapshot?

A **snapshot** is a point-in-time capture of:

- All eligible contributors
- Their contribution history
- Calculated scores
- Token allocations

Think of it as freezing the state of the project at a specific moment to determine who gets how many tokens.

## Why Take Snapshots?

### Fairness

- **Fixed target**: Contributors know the deadline
- **No retroactive changes**: Can't add contributions after snapshot
- **Transparent**: Everyone sees the same data
- **Predictable**: Announced well in advance

### Technical

- **Merkle tree generation**: Need fixed data set
- **Smart contract deployment**: Requires finalized allocations
- **Verification**: Community can audit the snapshot

### Operational

- **Manageable scope**: Defined set of contributions to score
- **Appeal window**: Time for disputes before distribution
- **Testing**: Can test claiming with real data

## Snapshot Schedule

### Announcement

**Minimum 14 days before snapshot:**

- Date and time (UTC) announced
- Block height or timestamp specified (for blockchain state)
- Eligibility criteria confirmed
- Scoring methodology version published
- Appeal process explained

**Announcement channels:**
- GitHub Discussions (pinned)
- Repository README
- Social media
- Email (if mailing list exists)

### Snapshot Execution

**On the announced date:**

1. **Capture GitHub data** (see Data Collection below)
2. **Record blockchain state** (if applicable, e.g., token holdings)
3. **Calculate scores** per scoring methodology
4. **Generate allocation list**
5. **Create merkle tree**

**Duration:** Typically 1-3 days for processing

### Post-Snapshot

1. **Publish results** (3-5 days after snapshot)
2. **Appeal period** (30 days)
3. **Final allocation** (after appeals resolved)
4. **Claiming opens** (date announced)

## Data Collection

### GitHub Contributions

**Data Sources:**
- Pull requests (merged, reviewed)
- Issues (created, commented, resolved)
- Discussions (participation, helpful responses)
- Code reviews (quality and quantity)
- Commits (if not via PR)

**Collection Method:**

```bash
# Example using GitHub API
# (actual implementation in snapshot scripts)

# Get all PRs merged before snapshot
gh pr list --state merged --limit 1000 \
  --json number,author,createdAt,mergedAt,additions,deletions

# Get all issues
gh issue list --state all --limit 1000 \
  --json number,author,createdAt,closedAt,comments

# Get code reviews
gh api /repos/OWNER/REPO/pulls/PR_NUMBER/reviews
````

**Timestamp:** All data uses GitHub's timestamps (UTC)

### Security Contributions

**Private vulnerability reports:**

- Collected separately from security@cyberai.network
- Manually scored by security team
- Privacy maintained (no public disclosure)

### Community Contributions

**External contributions:**

- Tutorials and blog posts (self-reported + verified)
- Event organization (documented in issues)
- Social media promotion (significant only)
- Translations and internationalization

## Score Calculation

### Process

1. **Collect raw contribution data** (automated)
2. **Classify contributions** (automated + manual review)
3. **Apply base point values** (per scoring.md)
4. **Apply multipliers** (time, impact, quality)
5. **Add bonuses** (special recognition)
6. **Apply caps** (individual and type limits)
7. **Generate preliminary scores**

### Review

1. **Automated validation** (sanity checks, outlier detection)
2. **Manual review** (top 10% and flagged cases)
3. **Anti-fraud checks** (sockpuppets, gaming detection)
4. **Quality assessment** (borderline cases)

### Output

```json
{
  "snapshot_date": "2026-01-01T00:00:00Z",
  "methodology_version": "1.0",
  "total_contributors": 150,
  "total_points": 50000,
  "contributors": [
    {
      "github_username": "contributor1",
      "address": "0x1234...5678",
      "total_points": 500,
      "breakdown": {
        "code": 300,
        "reviews": 100,
        "community": 50,
        "security": 50
      },
      "bonuses": {
        "early_contributor": 50,
        "consistency": 75
      }
    }
  ]
}
```

        "address": "0x...",
        "symbol": "SCA",
        "decimals": 18
      }
    },
    {
      "name": "delegation",
      "network": "1",
      "params": {
"symbol": "SCA",
"strategies": []
}
}
],
"validation": {
"name": "basic",
"params": {
"minScore": 1
}
}
}
```

## Voting Strategies

We use multiple strategies to calculate voting power:

### 1. Token Balance Strategy

**Strategy**: `erc20-balance-of`

Counts tokens held in wallet at proposal snapshot time.

```json
{
  "name": "erc20-balance-of",
  "network": "1",
  "params": {
    "address": "0xYourTokenAddress",
    "symbol": "SCA",
    "decimals": 18
  }
}
```

**Voting Power**: 1 token = 1 vote

### 2. Delegation Strategy

**Strategy**: `delegation`

Allows token holders to delegate voting power.

```json
{
  "name": "delegation",
  "network": "1",
  "params": {
    "symbol": "SCA (delegated)",
    "strategies": [
      {
        "name": "erc20-balance-of",
        "params": {
          "address": "0xYourTokenAddress",
          "symbol": "SCA",
          "decimals": 18
        }
      }
    ]
  }
}
```

### 3. Contribution Strategy (Custom)

**Strategy**: `contribution-score`

Bonus voting power based on contribution history.

```json
{
  "name": "api",
  "network": "1",
  "params": {
    "url": "https://api.smartcontractaudit.io/snapshot/scores/{addresses}",
    "symbol": "CONTRIB"
  }
}
```

**Calculation**:

- Pull contribution scores from API
- Contribution score / 100 = bonus votes
- Capped at 20% of token-based voting power

### 4. Staking Strategy

**Strategy**: `contract-call`

Bonus for staked tokens.

```json
{
  "name": "contract-call",
  "network": "1",
  "params": {
    "address": "0xStakingContractAddress",
    "decimals": 18,
    "symbol": "xSCA",
    "methodABI": {
      "name": "balanceOf",
      "type": "function",
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    }
  }
}
```

**Multiplier**: Staked tokens = 1.5x voting power

## Proposal Types

### Standard Proposal

```markdown
Title: [Proposal Name]

> > > > > > > origin/pr9

## Summary

Brief description of the proposal

## Motivation

Why this proposal is needed

## Specification

