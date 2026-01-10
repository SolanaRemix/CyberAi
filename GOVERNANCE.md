# Project Governance

## Overview

This document defines the governance model for the SmartContractAudit project, including roles, responsibilities, decision-making processes, and how the project is maintained and evolved.

## Project Roles

### Maintainers

Maintainers have elevated privileges and responsibilities:

- **Responsibilities**:
  - Review and merge pull requests
  - Triage and manage issues
  - Make architectural decisions
  - Release management and versioning
  - Security incident response
  - Define and enforce coding standards
  - Mentor contributors

- **Privileges**:
  - Write access to the repository
  - Ability to merge pull requests
  - Manage releases and tags
  - Access to deployment credentials (when applicable)

- **Becoming a Maintainer**:
  - Demonstrate sustained contributions over time
  - Show technical expertise and judgment
  - Exhibit commitment to project values and code of conduct
  - Nomination by existing maintainer and majority approval

### Contributors

Contributors actively participate in the project:

- **Responsibilities**:
  - Submit quality pull requests
  - Follow contribution guidelines
  - Respond to feedback on contributions
  - Adhere to the code of conduct

- **Recognition**:
  - Credit in release notes
  - Potential DAO eligibility (see docs/dao/)
  - Community recognition

### Community Members

Anyone using, discussing, or following the project:

- **Rights**:
  - Report issues and suggest features
  - Participate in discussions
  - Use the software under the license terms
  - Vote on community proposals (if eligible)

## Decision-Making Model

### Consensus-Based Decision Making

Most decisions are made through lazy consensus:

1. **Proposal**: A proposal is made via issue, PR, or discussion
2. **Discussion**: Community members provide feedback
3. **Consensus**: If no objections after reasonable time (typically 72 hours for minor changes, 7 days for major changes), proposal proceeds
4. **Objection Handling**: Objections are discussed; compromise is sought

### Voting for Major Decisions

For significant changes, formal voting may be required:

- **Major decisions include**:
  - Changes to governance model
  - Architectural changes affecting multiple components
  - Changes to project license
  - Addition or removal of maintainers
  - Major refactoring or breaking changes

- **Voting process**:
  - Requires majority approval from maintainers
  - Voting period: minimum 7 days
  - Ties are resolved by project founder/lead maintainer

### Urgent Security Decisions

Security fixes may bypass normal consensus:

- Security maintainers can make urgent decisions
- Changes are reviewed post-merge
- Community is notified after responsible disclosure

## Release Process

### Versioning

We follow semantic versioning (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

### Release Checklist

1. Update CHANGELOG.md with all changes
2. Update version numbers in relevant files
3. Run full test suite and security scans
4. Create release branch if needed
5. Tag release with version number
6. Build and test release artifacts
7. Publish release notes on GitHub
8. Update documentation
9. Announce release to community

See [RELEASE.md](RELEASE.md) for detailed release procedures.

## Security Governance

### Security Owners

Security maintainers have special responsibilities:

- **Responsibilities**:
  - Manage security vulnerability reports
  - Coordinate security releases
  - Perform security reviews
  - Maintain security documentation

- **Current Security Contacts**: security@cuberai.example

### Security Process

- All security issues go through [SECURITY.md](SECURITY.md) process
- Security fixes may be fast-tracked
- Coordinated disclosure with reporters
- Security advisories published for significant vulnerabilities

## Conflict Resolution

1. **Direct Discussion**: Parties attempt to resolve directly
2. **Mediation**: Maintainers mediate if needed
3. **Project Lead Decision**: Final decision by project lead if unresolved
4. **Code of Conduct**: Violations handled per [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Sponsor and Partner Influence

### Sponsor Recognition

Sponsors and partners are recognized and appreciated:

- Listed in FUNDING.yml and partner documentation
- Logo placement on website (where applicable)
- Recognition in release announcements
- Access to partner onboarding resources

### Decision Independence

**Important**: Financial contributions do not grant:

- Voting rights beyond regular contributors
- Veto power over technical decisions
- Priority in feature requests beyond normal prioritization
- Exemption from code of conduct

Sponsors may:

- Suggest features and priorities
- Participate as regular contributors
- Request technical support (per sponsorship tier)
- Provide input on roadmap discussions

## Amendments

This governance document may be amended:

- Proposed changes submitted as PR to this file
- Discussion period: minimum 14 days
- Requires 2/3 majority approval from maintainers
- Community input welcomed but not binding

## Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussion and Q&A
- **Pull Requests**: Code contributions and reviews
- **Security Reports**: security@cuberai.example

## Project Values

- **Transparency**: Open development and decision-making
- **Quality**: High standards for code and documentation
- **Security**: Security-first approach to development
- **Community**: Welcoming and inclusive environment
- **Sustainability**: Long-term project health and maintainability

## Related Documents

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards
- [SECURITY.md](SECURITY.md) - Security policies
- [RELEASE.md](RELEASE.md) - Release procedures
- [docs/partners/](docs/partners/) - Partner and sponsor information

---

Last updated: 2026-01-01
