<<<<<<< HEAD
# DAO Overview

## Introduction

<<<<<<< HEAD
The SmartContractAudit DAO (Decentralized Autonomous Organization) enables community governance and rewards contributors through a transparent, merit-based system.

## What is the DAO?

The SmartContractAudit DAO is a governance structure that:

- **Rewards Contributors**: Distribute governance tokens based on contributions
- **Enables Voting**: Community voting on proposals and project decisions
- **Distributes Value**: Fair allocation of resources to active participants
- **Ensures Transparency**: All decisions and distributions are public and auditable

## Governance Flow

### 1. Contribution Phase

Contributors participate by:
- Submitting pull requests
- Reviewing code
- Reporting issues
- Writing documentation
- Supporting community members
- Providing security research

See [eligibility.md](eligibility.md) for detailed criteria.

### 2. Scoring Phase

Contributions are scored based on:
- Impact and quality
- Difficulty and complexity
- Timeliness and responsiveness
- Community value

See [scoring.md](scoring.md) for the scoring formula.

### 3. Snapshot Phase

Periodic snapshots capture:
- Eligible contributors
- Contribution scores
- Token allocations
- Voting power distribution

See [snapshot.md](snapshot.md) for snapshot process.

### 4. Airdrop Phase

Token distribution via:
- Merkle tree generation
- On-chain or off-chain claims
- Verification and validation
- Distribution tracking

See [merkle.md](merkle.md) and [claiming.md](claiming.md) for details.

### 5. Governance Phase

Token holders can:
- Vote on proposals
- Submit governance proposals
- Delegate voting power
- Participate in discussions

## Governance Structure

### Snapshot Integration

The DAO uses Snapshot for gasless voting:

- **Platform**: snapshot.org
- **Strategies**: Token-based voting power
- **Proposals**: Community and maintainer submissions
- **Voting**: Gasless, off-chain voting
- **Execution**: Multisig for on-chain actions

See [snapshot.md](snapshot.md) for Snapshot setup.

### Multisig Control

Critical operations require multisig approval:

- **Token Distribution**: Airdrop execution
- **Treasury Management**: Fund allocation
- **Parameter Changes**: Governance updates
- **Emergency Actions**: Security responses

Multisig composition:
- 3-5 core maintainers
- Requires majority approval (e.g., 3-of-5)
- Transparent on-chain operations

## Token Economics

### Token Utility

Governance tokens provide:
- Voting power on proposals
- Access to exclusive features (planned)
- Recognition of contributions
- Potential future benefits

### Distribution Model

- **Contributors**: 70% - Active contributors and maintainers
- **Treasury**: 20% - Project development and operations
- **Ecosystem**: 10% - Partnerships and growth initiatives

### Vesting Schedule

To ensure long-term alignment:
- Immediate: 25% unlocked at claim
- Linear vesting: 75% over 12 months
- Cliff: None (begins vesting immediately)

## Eligibility

### Who Can Participate?

Eligible participants include:
- Code contributors (merged PRs)
- Documentation contributors
- Security researchers (vulnerability reports)
- Community moderators
- Issue reporters (quality issues)
- Code reviewers

See [eligibility.md](eligibility.md) for full criteria.

### Snapshot Dates

Snapshots are taken:
- **Frequency**: Quarterly
- **Announcement**: 2 weeks advance notice
- **Cut-off**: Specific date/time announced
- **Distribution**: Within 30 days of snapshot

## How to Participate

### 1. Start Contributing

- Review [CONTRIBUTING.md](../../CONTRIBUTING.md)
- Check open issues and PRs
- Follow code of conduct
- Sign commits with DCO

### 2. Track Your Contributions

- Monitor your merged PRs
- Check issue resolutions
- Review documentation updates
- Note security reports

### 3. Verify Eligibility

- Check [eligibility.md](eligibility.md)
- Calculate estimated score using [scoring.md](scoring.md)
- Wait for snapshot announcement

### 4. Claim Your Tokens

When airdrop is announced:
- Verify your inclusion in merkle tree
- Follow [claiming.md](claiming.md) instructions
- Submit claim transaction
- Verify token receipt

### 5. Participate in Governance

- Join Snapshot space
- Review active proposals
- Cast your votes
- Submit proposals (if eligible)

## Important Notes

### ⚠️ Current Status

The DAO infrastructure is currently in **planning phase**:

- Documentation is complete
- Tools and scripts are provided
- Actual token distribution has not begun
- Snapshot space to be created
- Token contract to be deployed

### 🔒 Security

- Never share private keys
- Verify contract addresses before claiming
- Use hardware wallets for significant holdings
- Beware of phishing attempts
- Official announcements only via GitHub

### 📋 Legal Disclaimer

Governance tokens are for utility and governance only:
- Not investment securities
- No expectation of profit
- Utility for voting only
- Subject to terms of service

Consult legal and tax professionals regarding token receipt and holdings.

## Resources

### Documentation

- [eligibility.md](eligibility.md) - Who can participate
- [scoring.md](scoring.md) - How contributions are scored
- [merkle.md](merkle.md) - Merkle tree airdrop process
- [snapshot.md](snapshot.md) - Snapshot setup and usage
- [claiming.md](claiming.md) - How to claim tokens

### Tools

- [dao/airdrop-sample.json](../../dao/airdrop-sample.json) - Example allocation data
- [dao/merkle/generate_merkle.js](../../dao/merkle/generate_merkle.js) - Merkle tree generator

### External Links

- Snapshot: https://snapshot.org
- Governance forums: GitHub Discussions
- Community: GitHub Issues

## FAQ

**Q: When will the first airdrop happen?**
A: To be announced. Follow GitHub for updates.

**Q: Can I participate if I'm new?**
A: Yes! Start contributing now. Future snapshots will include your contributions.

**Q: How are contributions valued?**
A: See [scoring.md](scoring.md) for the detailed formula.

**Q: Is this legally compliant?**
A: Consult your own legal and tax advisors. Governance tokens are for utility purposes.

**Q: Can I transfer my tokens?**
A: Token transferability depends on the token contract design (TBD).

## Contact

Questions about the DAO?

- **GitHub Discussions**: Community Q&A
- **GitHub Issues**: Bug reports and suggestions
- **Email**: governance@cuberai.example (placeholder)

---

**Status**: Planning Phase

**Last Updated**: 2026-01-01

**Next Review**: Q1 2026
=======
SmartContractAudit DAO enables decentralized governance and community participation through token-based voting and contributor rewards.

## Governance Flow

### 1. Proposal Creation

Community members can create proposals for:
- Feature requests
- Budget allocation
- Partnership decisions
- Technical changes
- Token distribution

### 2. Discussion Phase

- Proposals posted to GitHub Discussions
- Community debate period (minimum 7 days)
- Feedback and refinement
- Impact assessment

### 3. Snapshot Voting

- Proposals moved to Snapshot for voting
- Token holders vote based on their holdings
- Voting period: 7 days
- Quorum requirements apply

### 4. Execution

Approved proposals are executed by:
- **On-chain**: Multisig transactions for financial/contract changes
- **Off-chain**: Implementation by maintainers for code/policy changes

### 5. Implementation Tracking

- Progress tracked in GitHub Projects
- Regular status updates
- Completion verification
- Results published

## Governance Structure

### Snapshot + Multisig

We use a hybrid governance model:

**Snapshot (Off-chain Voting)**
- Gas-free voting
- Token-weighted votes
- Flexible strategies
- Transparent results

**Multisig (On-chain Execution)**
- Secure fund management
- Multi-signature approval
- On-chain transparency
- Emergency controls

### Key Roles

**Token Holders**
- Vote on proposals
- Earn tokens through contributions
- Participate in governance

**Multisig Signers**
- Execute approved proposals
- Manage treasury
- Emergency response
- Typically 3-5 trusted members

**Maintainers**
- Implement approved changes
- Technical execution
- Report progress
- Community liaison

## Voting Power

Voting power is based on:
1. Token holdings (primary)
2. Contribution history (weighted)
3. Staking duration (bonus)
4. Delegation (optional)

See [scoring.md](scoring.md) for detailed calculation.

## Proposal Types

### Standard Proposals
- Feature requests
- Budget allocation <$10k
- Minor policy changes
- Quorum: 10% of tokens

### Major Proposals
- Protocol upgrades
- Large budget allocation >$10k
- Major policy changes
- Quorum: 25% of tokens

### Emergency Proposals
- Security issues
- Critical bug fixes
- Accelerated timeline
- Multisig can act immediately, ratified post-facto

## Governance Token

**Token Details**:
- Name: [DAO Token Name]
- Symbol: [SYMBOL]
- Network: [Ethereum/Solana/etc.]
- Contract: [Address]

**Token Distribution**:
- Contributors: 60%
- Treasury: 20%
- Early supporters: 10%
- Team: 10% (vested)

See [eligibility.md](eligibility.md) for earning tokens.

## Snapshot Space

**Space Details**:
- URL: snapshot.org/#/smartcontractaudit.eth
- Voting strategies configured
- Proposal templates available
- Historical votes visible

See [snapshot.md](snapshot.md) for setup details.

## Multisig Details

**Multisig Wallet**:
- Network: [Network]
- Address: [Address]
- Signers: [Number] of [Total]
- Platform: Gnosis Safe / Squads

**Transaction Flow**:
1. Proposal approved on Snapshot
2. Multisig signer creates transaction
3. Other signers review and approve
4. Transaction executed on-chain
5. Results announced to community

## Participation Guidelines

### Creating Proposals

1. **Research**: Check existing proposals and discussions
2. **Draft**: Write clear, detailed proposal
3. **Discuss**: Post to GitHub Discussions for feedback
4. **Refine**: Incorporate community input
5. **Submit**: Create Snapshot proposal
6. **Promote**: Share with community to encourage voting

### Voting Best Practices

- Read proposals thoroughly
- Consider long-term impact
- Participate in discussions
- Vote based on merit, not politics
- Respect minority opinions

### Delegation

Token holders can delegate voting power to:
- Trusted community members
- Subject matter experts
- Active participants

Delegation is revocable at any time.

## Resources

- [Eligibility Criteria](eligibility.md)
- [Contribution Scoring](scoring.md)
- [Merkle Airdrops](merkle.md)
- [Snapshot Setup](snapshot.md)
- [Claiming Process](claiming.md)

## FAQ

**Q: How do I earn governance tokens?**
A: Contribute to the project! See [eligibility.md](eligibility.md) for criteria.

**Q: When are airdrops?**
A: Quarterly distributions based on contributions. See [merkle.md](merkle.md).

**Q: Can I delegate my voting power?**
A: Yes, through Snapshot delegation features.

**Q: What happens if a proposal doesn't reach quorum?**
A: It can be resubmitted after refinement and community building.

## Contact

For DAO governance questions:
- GitHub Discussions
- Discord: [Link]
- Telegram: [Link]

---

Last updated: 2026-01-01
>>>>>>> origin/pr9
=======
# DAO Documentation

## Overview

This directory contains documentation and tools for the CyberAi DAO (Decentralized Autonomous Organization) and contributor reward systems.

## Contents

- **[eligibility.md](eligibility.md)**: Criteria for DAO participation and airdrop eligibility
- **[scoring.md](scoring.md)**: Contribution scoring methodology
- **[merkle.md](merkle.md)**: Merkle tree generation for token distribution
- **[snapshot.md](snapshot.md)**: How snapshots are taken for airdrops
- **[claiming.md](claiming.md)**: Process for claiming airdrop allocations

## Purpose

The DAO tools and documentation serve to:

1. **Recognize Contributors**: Fairly reward community contributions
2. **Enable Governance**: Distribute governance tokens for decision-making
3. **Build Community**: Incentivize long-term participation
4. **Transparency**: Provide clear rules and processes

## Quick Start

### For Contributors

1. Review [eligibility.md](eligibility.md) to understand qualification criteria
2. Check [scoring.md](scoring.md) to see how contributions are valued
3. Wait for snapshot announcement (see [snapshot.md](snapshot.md))
4. Follow [claiming.md](claiming.md) to claim your allocation

### For Administrators

1. Review contributor data and calculate scores
2. Generate merkle tree using `/dao/merkle/generate_merkle.js`
3. Take snapshot per [snapshot.md](snapshot.md) process
4. Publish merkle root and enable claiming

## Tools

- **Merkle Generator**: `/dao/merkle/generate_merkle.js`
  - Generates merkle trees for token distribution
  - Produces proof files for individual claimants
  - Verifies allocation integrity

- **Availability Checker**: `/scripts/availability-check.sh`
  - Checks username availability across platforms
  - Validates contributor handles
  - Prevents impersonation

## Sample Data

See `/dao/airdrop-sample.json` for example allocation data structure.

## Important Notes

### Security

- All operations default to DRY_RUN mode
- Never commit real private keys or secrets
- Verify merkle roots before deployment
- Use multisig for token distribution contracts

### Privacy

- Contributor data handling follows PRIVACY.md
- Personal information minimized
- Public addresses only when necessary
- Opt-in for public recognition

### Fairness

- Clear, published criteria
- Transparent scoring methodology
- Appeal process for disputes
- Regular community review of rules

## Governance Integration

DAO tokens may be used for:

- Voting on project proposals
- Electing maintainers
- Funding allocation decisions
- Feature prioritization
- Policy changes

See GOVERNANCE.md for how DAO governance integrates with project governance.

## Roadmap

- [ ] Initial airdrop allocation
- [ ] Merkle tree generation and verification
- [ ] Smart contract deployment (if applicable)
- [ ] Claiming interface
- [ ] Governance voting interface
- [ ] Regular contributor rewards
- [ ] Community grants program

## Resources

- **Governance**: See `/GOVERNANCE.md`
- **Contributing**: See `/CONTRIBUTING.md`
- **Security**: See `/SECURITY.md`
- **Support**: Open an issue or discussion

## Contact

- **General Questions**: GitHub Discussions
- **Allocation Issues**: Open a GitHub issue with tag `dao`
- **Security Concerns**: security@cyberai.network

---

**Last Updated**: 2026-01-01  
**Status**: Planning/Development
>>>>>>> origin/pr10
