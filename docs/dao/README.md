# DAO Overview

## Introduction

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
