# Snapshot Integration

## Overview

This document explains how SmartContractAudit uses Snapshot for gasless, off-chain governance voting.

## What is Snapshot?

[Snapshot](https://snapshot.org) is a decentralized voting platform that enables:

- **Gasless Voting**: Vote without transaction fees
- **Off-Chain Storage**: Votes stored on IPFS
- **Flexible Strategies**: Custom voting power calculations
- **Easy Integration**: Simple setup for DAOs
- **Transparent Results**: Public, verifiable voting

## Snapshot Space Setup

### Creating the Space

**Not yet created** - To be set up by maintainers

Once created, the space will be accessible at:
`https://snapshot.org/#/smartcontractaudit.eth`

### Space Configuration

#### Basic Settings

```json
{
  "name": "SmartContractAudit",
  "network": "1",
  "symbol": "SCAUDIT",
  "skin": "smartcontractaudit",
  "domain": "smartcontractaudit.eth",
  "about": "Governance for SmartContractAudit - automated smart contract auditing and security",
  "avatar": "[LOGO URL]",
  "twitter": "[TWITTER HANDLE]",
  "github": "SolanaRemix/SmartContractAudit",
  "website": "[PROJECT WEBSITE]"
}
```

#### Voting Settings

```json
{
  "voting": {
    "delay": 0,
    "period": 604800,
    "type": "basic",
    "quorum": 0,
    "hideAbstain": false
  }
}
```

**Explanation**:
- `delay`: 0 seconds (voting starts immediately)
- `period`: 604800 seconds (7 days)
- `type`: basic (yes/no/abstain)
- `quorum`: No minimum (can be added later)

#### Proposal Validation

```json
{
  "validation": {
    "name": "basic",
    "params": {
      "minScore": 100
    }
  }
}
```

**Requirements to create proposals**:
- Minimum 100 tokens
- Prevents spam proposals

## Voting Strategies

### Token-Based Strategy

**Primary Strategy**: ERC20 balance snapshot

```json
{
  "strategies": [
    {
      "name": "erc20-balance-of",
      "network": "1",
      "params": {
        "address": "[TOKEN_CONTRACT_ADDRESS]",
        "symbol": "SCAUDIT",
        "decimals": 18
      }
    }
  ]
}
```

### Multi-Strategy (Advanced)

Can combine multiple strategies:

```json
{
  "strategies": [
    {
      "name": "erc20-balance-of",
      "network": "1",
      "params": {
        "address": "[TOKEN_CONTRACT]",
        "symbol": "SCAUDIT",
        "decimals": 18
      }
    },
    {
      "name": "delegation",
      "network": "1",
      "params": {
        "symbol": "SCAUDIT",
        "strategies": [
          {
            "name": "erc20-balance-of",
            "params": {
              "address": "[TOKEN_CONTRACT]"
            }
          }
        ]
      }
    }
  ]
}
```

**Supports**:
- Token holdings
- Delegated voting power
- LP token holdings (if applicable)
- NFT holdings (if applicable)

### Custom Strategy

For complex voting power calculations:

```javascript
// Example: Weighted by contribution score + token holdings
function calculateVotingPower(address) {
  const tokens = getTokenBalance(address);
  const contributionScore = getContributionScore(address);
  
  // 50% from tokens, 50% from contributions
  return (tokens * 0.5) + (contributionScore * 0.5);
}
```

## Proposal Types

### Governance Proposals

**Format**:
```markdown
# [Proposal Title]

## Summary
Brief description of the proposal

## Motivation
Why this proposal is needed

## Specification
Detailed proposal implementation

## Voting Options
- For: Support the proposal
- Against: Oppose the proposal  
- Abstain: No opinion
```

### Proposal Categories

1. **Feature Requests**: New functionality
2. **Parameter Changes**: Adjust governance parameters
3. **Treasury Allocation**: Fund distribution decisions
4. **Partnership Approvals**: Major partnerships
5. **Security Policies**: Security-related changes
6. **Meta-Governance**: Changes to governance itself

## Creating a Proposal

### Prerequisites

- Minimum token balance (100 tokens)
- Connected wallet
- Clear proposal content
- Community discussion completed

### Steps

1. **Pre-Proposal Discussion**
   - Post in GitHub Discussions
   - Gather community feedback
   - Refine proposal
   - Build consensus

2. **Draft Proposal**
   - Write clear title
   - Complete all sections
   - Define voting options
   - Set voting period

3. **Submit to Snapshot**
   - Connect wallet to Snapshot
   - Navigate to space
   - Click "New Proposal"
   - Fill in details
   - Set voting period (typically 7 days)
   - Sign message (no gas cost)

4. **Announcement**
   - Post in GitHub Discussions
   - Notify community
   - Share voting link
   - Provide context

5. **Voting Period**
   - Monitor participation
   - Answer questions
   - Provide clarifications
   - Encourage voting

6. **Results**
   - Tally results
   - Announce outcome
   - Document decision
   - Implement if approved

## Voting Process

### For Token Holders

1. **Visit Snapshot Space**
   ```
   https://snapshot.org/#/smartcontractaudit.eth
   ```

2. **Connect Wallet**
   - Click "Connect Wallet"
   - Choose wallet provider
   - Approve connection

3. **Review Proposals**
   - Read active proposals
   - Review discussions
   - Consider options

4. **Cast Vote**
   - Select your choice
   - Sign message (gasless)
   - Vote recorded on IPFS

5. **Verify Vote**
   - Check vote appears
   - See your voting power
   - Confirm choice

### Voting Power

Your voting power is determined by:
- Token holdings at snapshot block
- Delegated tokens (if any)
- Contribution score (if applicable)

**Note**: Voting power is snapshot at proposal creation time. Buying tokens after won't increase voting power for that proposal.

## Delegation

### Delegate Your Voting Power

Don't have time to vote? Delegate to someone you trust:

1. **Choose Delegate**
   - Research active voters
   - Check voting history
   - Verify alignment with your values

2. **Set Delegation**
   - Use Snapshot delegation interface
   - Sign delegation message
   - Specify delegate address

3. **Update Anytime**
   - Change delegate anytime
   - Remove delegation
   - Vote directly (overrides delegation)

### Accepting Delegations

To accept delegations:
- Publicly share your address
- Communicate voting philosophy
- Vote regularly and responsibly
- Explain voting decisions

## Proposal Guidelines

### What Makes a Good Proposal?

✅ **Good proposals**:
- Clear and concise
- Well-researched
- Community support
- Actionable specification
- Consider consequences
- Define success metrics

❌ **Poor proposals**:
- Vague or unclear
- No community discussion
- Unrealistic or impossible
- Conflicts with values
- Lacks detail
- No consideration of alternatives

### Proposal Template

```markdown
# [Title]: [Brief Description]

## Summary
One paragraph summary of the proposal.

## Motivation
Why should we implement this? What problem does it solve?

## Specification
### Overview
High-level description

### Details
Specific implementation details

### Timeline
When and how will this be implemented?

### Cost
Resource requirements (funding, time, people)

## Risks & Considerations
What could go wrong? Alternative approaches?

## Success Metrics
How will we measure success?

## Voting Options
- **For**: Approve and implement the proposal
- **Against**: Reject the proposal
- **Abstain**: No opinion
```

## Governance Process

### Standard Flow

1. **Ideation** (GitHub Discussions)
2. **Temperature Check** (Informal poll)
3. **Formal Proposal** (Snapshot)
4. **Voting Period** (7 days)
5. **Implementation** (If approved)
6. **Post-Mortem** (Review results)

### Fast-Track Process

For urgent matters:

- Reduced voting period (3 days)
- Requires maintainer sponsorship
- Emergency situations only
- Security issues, critical bugs

### Quorum Requirements

**Current**: No quorum (may be added later)

**Potential future requirements**:
- Minimum 10% of total supply votes
- Scales with proposal importance
- Adjusted via governance proposal

## Integration with GitHub

### Linking Proposals

Reference Snapshot proposals in GitHub:

```markdown
**Snapshot Vote**: https://snapshot.org/#/smartcontractaudit.eth/proposal/[PROPOSAL_ID]
**Status**: Active / Passed / Rejected
**Voting Ends**: [DATE]
```

### Implementation Tracking

After proposal passes:

1. Create GitHub issue
2. Link to Snapshot proposal
3. Track implementation
4. Update community on progress

## Security & Best Practices

### Proposal Security

- **Review Carefully**: Check all details before voting
- **Verify Links**: Ensure official Snapshot space
- **Check Addresses**: Validate contract addresses
- **Be Skeptical**: Watch for scams and phishing

### Wallet Security

- **Use Hardware Wallet**: For large holdings
- **Verify Messages**: Read before signing
- **Check Network**: Ensure correct network
- **Revoke Permissions**: Disconnect when done

### Common Scams

⚠️ **Watch out for**:
- Fake Snapshot spaces
- Phishing sites mimicking Snapshot
- Malicious proposals requesting approvals
- Impersonators claiming to be team

✅ **Verify**:
- Official Snapshot URL: `snapshot.org`
- Correct space name
- Team announcements on GitHub
- Message content before signing

## FAQ

**Q: Does voting cost gas?**
A: No. Voting on Snapshot is gasless - you only sign a message.

**Q: When is voting power calculated?**
A: At the block when the proposal is created (snapshot block).

**Q: Can I change my vote?**
A: Yes, before the voting period ends.

**Q: Do I need tokens to vote?**
A: Yes, you need tokens at the snapshot block to have voting power.

**Q: What if I don't want to vote on everything?**
A: Delegate your voting power to someone you trust.

**Q: Are vote results binding?**
A: Typically yes, but maintainers have final say on implementation feasibility.

**Q: Can proposals be canceled?**
A: Yes, by the proposal creator or space admins in exceptional cases.

## Resources

### Official Links

- **Snapshot Platform**: https://snapshot.org
- **Documentation**: https://docs.snapshot.org
- **Space** (TBD): https://snapshot.org/#/smartcontractaudit.eth

### SmartContractAudit

- **GitHub**: https://github.com/SolanaRemix/SmartContractAudit
- **Discussions**: GitHub Discussions
- **Governance Docs**: [GOVERNANCE.md](../../GOVERNANCE.md)

### Tools

- **Snapshot Labs**: Official Snapshot tools
- **Snapshot Strategies**: Strategy browser
- **Delegation Portal**: Delegate voting power

## Contact

Questions about Snapshot or governance?

- **GitHub Discussions**: Governance category
- **Email**: governance@cuberai.example

---

**Status**: Planning Phase

**Snapshot Space**: Not yet created

**Last Updated**: 2026-01-01
