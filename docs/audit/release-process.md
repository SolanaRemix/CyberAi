# Release Process

## Overview

<<<<<<< HEAD
<<<<<<< HEAD
This document outlines the complete release process for SmartContractAudit, from planning through deployment and post-release activities.

## Release Cycle

**Frequency**: As needed, typically monthly for minor releases, quarterly for major releases

**Versioning**: Semantic Versioning (SemVer)
- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

## Release Roles

**Release Manager**: Coordinates the release  
**Technical Lead**: Final technical approval  
**Security Lead**: Security review and approval  
**QA Lead**: Testing and validation  
**Documentation Lead**: Docs review and updates

## Release Process Steps

### Phase 1: Planning (2-4 weeks before)

**Activities**:
1. **Feature Freeze**: Decide what goes in the release
2. **Create Milestone**: GitHub milestone for tracking
3. **Assign Issues**: Assign remaining work
4. **Communication**: Announce release plan to community
5. **Schedule**: Set tentative release date

**Output**: Release plan and milestone

### Phase 2: Development (ongoing)

**Activities**:
1. **Feature Development**: Complete planned features
2. **Bug Fixes**: Address issues
3. **Code Review**: All PRs reviewed
4. **Documentation**: Update docs alongside code
5. **Testing**: Unit and integration tests

**Quality Gates**:
- All PRs reviewed and approved
- Tests passing
- No critical/high bugs
- Documentation updated

### Phase 3: Code Freeze (1 week before)

**Activities**:
1. **Freeze Code**: No new features
2. **Bug Fixes Only**: Critical/high priority bugs only
3. **Release Branch**: Create release branch (e.g., `release/v1.2.0`)
4. **Final Testing**: Comprehensive testing
5. **Documentation Review**: Final docs check

**Checklist**:
- [ ] Release branch created
- [ ] All tests passing
- [ ] No blockers
- [ ] Docs complete
- [ ] CHANGELOG updated

### Phase 4: Pre-Release Testing (3-5 days)

**Activities**:
1. **Integration Testing**: Test all integrations
2. **Security Scan**: Run security checks
   ```bash
   # Run GitAntivirus in dry-run
   DRY_RUN=true ./scripts/master.sh scan
   
   # Run any code quality checks
   npm run lint
   npm test
   ```
3. **Performance Testing**: Verify performance
4. **Compatibility Testing**: Test across environments
5. **Documentation Testing**: Verify examples work

**Environments**:
- Development
- Staging (if applicable)
- Test installations

### Phase 5: Security Review (2-3 days)

**Activities**:
1. **Security Scan**: Automated security checks
2. **Dependency Audit**: Check for vulnerable dependencies
   ```bash
   npm audit
   # or
   pip-audit
   ```
3. **Manual Review**: Security team review
4. **Vulnerability Check**: Review open security issues
5. **Sign-off**: Security lead approval

**Tools**:
- CodeQL
- GitAntivirus
- npm audit / pip-audit
- Custom security checks

### Phase 6: Release Candidate (RC)

**Activities**:
1. **Tag RC**: Create release candidate tag (e.g., `v1.2.0-rc.1`)
2. **Build Artifacts**: Generate release artifacts
3. **Beta Testing**: Limited release to partners/testers
4. **Gather Feedback**: Collect issues
5. **Fix Critical Issues**: Address showstoppers

**Criteria for RC**:
- All planned features complete
- All tests passing
- Security review complete
- Documentation ready

**RC Timeline**:
- RC.1: First candidate
- RC.2+: Additional if needed
- Minimum 48 hours between RCs
- Maximum 2 weeks in RC phase

### Phase 7: Final Release

**Activities**:
1. **Final Approval**: Get sign-off from:
   - Release Manager
   - Technical Lead
   - Security Lead
   - QA Lead

2. **Version Bump**: Update version numbers
   ```bash
   # Update version in relevant files
   # package.json, version files, etc.
   ```

3. **Tag Release**: Create official release tag
   ```bash
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

4. **Build Artifacts**: Generate final artifacts

5. **Create GitHub Release**:
   - Release notes
   - Changelog
   - Download links
   - Upgrade instructions

6. **Publish**: Make release public

### Phase 8: Deployment (if applicable)

**Activities**:
1. **Deploy to Production**: If hosted services exist
2. **Verify Deployment**: Health checks
3. **Monitor**: Watch for issues
4. **Rollback Plan**: Ready if needed

**Deployment Checklist**:
- [ ] Backup current state
- [ ] Deploy new version
- [ ] Run smoke tests
- [ ] Monitor logs
- [ ] Verify key functionality

### Phase 9: Communication

**Activities**:
1. **Release Announcement**:
   - GitHub Release page
   - GitHub Discussions
   - Social media (if applicable)
   - Partner email
   - Newsletter

2. **Documentation Updates**:
   - Update docs site
   - Update README
   - Update migration guides
   - Update API docs

3. **Community Engagement**:
   - Answer questions
   - Gather feedback
   - Respond to issues

### Phase 10: Post-Release

**Activities**:
1. **Monitor**: Watch for bugs and issues
2. **Hot Fixes**: Address critical issues quickly
3. **Feedback Collection**: Gather user feedback
4. **Metrics**: Track adoption and usage
5. **Retrospective**: Team review of release process

**Timeline**: 2 weeks post-release monitoring

## Release Checklist

### Pre-Release Checklist

Technical:
- [ ] All features complete
- [ ] All tests passing
- [ ] No known critical bugs
- [ ] Performance tested
- [ ] Security review complete
- [ ] Dependencies updated
- [ ] Backwards compatibility verified

Documentation:
- [ ] CHANGELOG.md updated
- [ ] README.md updated
- [ ] API docs updated
- [ ] Migration guide (if needed)
- [ ] Release notes drafted
- [ ] Examples updated

Process:
- [ ] Version numbers updated
- [ ] Release branch created
- [ ] Release candidate tested
- [ ] Approvals obtained
- [ ] Communication plan ready

### Release Day Checklist

- [ ] Final code review
- [ ] Create release tag
- [ ] Build artifacts
- [ ] Create GitHub Release
- [ ] Publish artifacts
- [ ] Update documentation
- [ ] Send announcements
- [ ] Update website (if applicable)
- [ ] Monitor initial feedback

### Post-Release Checklist

- [ ] Monitor for issues (24-48 hours)
- [ ] Respond to questions
- [ ] Track metrics
- [ ] Schedule retrospective
- [ ] Plan next release
- [ ] Archive release artifacts

## Emergency Releases (Hotfixes)

For critical security or bug fixes:

**Process**:
1. **Assess Severity**: Confirm need for emergency release
2. **Create Hotfix Branch**: From main or release branch
3. **Minimal Changes**: Only fix the critical issue
4. **Fast-Track Testing**: Focused testing on fix
5. **Security Review**: If security-related
6. **Release**: Follow abbreviated process
7. **Communication**: Explain urgency and changes

**Timeline**: Hours to days (not weeks)

## Versioning Strategy

### Major Releases (X.0.0)

**When**:
- Breaking changes
- Major architecture changes
- Significant feature additions
- API changes

**Frequency**: Annually or as needed

**Process**: Full release process with extended RC period

### Minor Releases (x.Y.0)

**When**:
- New features
- Non-breaking enhancements
- Significant improvements

**Frequency**: Monthly to quarterly

**Process**: Standard release process

### Patch Releases (x.y.Z)

**When**:
- Bug fixes
- Security patches
- Minor improvements

**Frequency**: As needed

**Process**: Abbreviated process, faster timeline

## Release Notes Template

```markdown
# Release v1.2.0

## Release Date
YYYY-MM-DD

## Overview
Brief description of the release

## ✨ New Features
- Feature 1 (#123)
- Feature 2 (#456)

## 🐛 Bug Fixes
- Fix 1 (#789)
- Fix 2 (#012)

## 🔒 Security
- Security improvement 1
- Vulnerability fix 1

## 📚 Documentation
- New guide added
- API docs updated

## ⚡ Performance
- Optimization 1
- Improvement 1

## 🔧 Maintenance
- Dependency updates
- Internal improvements

## ⚠️ Breaking Changes
- Breaking change 1 (if any)
- Migration guide: [link]

## 📦 Upgrade Instructions
1. Step 1
2. Step 2

## 🙏 Contributors
Thank you to all contributors!

@contributor1, @contributor2, @contributor3

## 📝 Full Changelog
https://github.com/SolanaRemix/SmartContractAudit/compare/v1.1.0...v1.2.0
```

## Tools and Automation

### Automated Checks

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags:
      - 'v*'
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: npm test
      - name: Security Scan
        run: ./scripts/audit.sh
      - name: Build Artifacts
        run: npm run build
      - name: Create Release
        uses: actions/create-release@v1
```

### Version Management

```bash
# Bump version
npm version patch   # 1.2.0 -> 1.2.1
npm version minor   # 1.2.0 -> 1.3.0
npm version major   # 1.2.0 -> 2.0.0
```

## Rollback Procedure

If critical issues discovered post-release:

1. **Assess**: Determine if rollback needed
2. **Communicate**: Notify community
3. **Revert**: Revert to previous version
4. **Fix**: Address issue
5. **Re-release**: New patch release

## Related Documents

- [RELEASE.md](../RELEASE.md) - Current release checklist
- [GOVERNANCE.md](../GOVERNANCE.md) - Release authority
- [SECURITY.md](../SECURITY.md) - Security process
=======
This document describes the release process for CyberAi, including planning, testing, deployment, and communication.

## Release Types

### Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes, major features
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, backward compatible

**Examples**:
- `v1.0.0` → `v2.0.0`: Breaking API changes
- `v1.0.0` → `v1.1.0`: New scan rules added
- `v1.0.0` → `v1.0.1`: Bug fix in parser

### Release Cadence

- **Major**: Annually (e.g., v2026.01.01 format for calendar versioning)
- **Minor**: Quarterly or as needed
- **Patch**: As needed for bugs and security
- **Security**: Immediately when critical

## Release Planning

### Proposal Phase

1. **Feature Proposals**: GitHub Discussions, Issues
2. **Community Input**: 14-day minimum discussion
3. **Roadmap Update**: Add to roadmap after consensus
4. **Milestone Creation**: GitHub milestone with target date

### Roadmap Management

**Public Roadmap**:
- GitHub Projects board
- Quarterly planning documents
- Community input welcomed
- No guarantees on timeline

**Priority Criteria**:
1. Security fixes (highest)
2. Breaking bugs
3. Community-requested features
4. Maintainer priorities
5. Nice-to-have features

## Release Checklist

See [RELEASE.md](../RELEASE.md) for detailed checklist.

**Summary**:
- [ ] All planned features merged
- [ ] Tests passing
- [ ] Security scans clean
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers updated
- [ ] Release notes drafted
- [ ] Community notified

## Testing Requirements

### Pre-Release Testing

**Automated Tests**:
- Unit tests: 100% pass required
- Integration tests: 100% pass required
- Security scans: No critical/high issues
- Linting: All checks pass

**Manual Testing**:
- Smoke tests on major workflows
- Test installations on major platforms
- Verify documentation accuracy
- Check examples and tutorials

### Beta Testing

**For Major/Minor Releases**:
1. **Beta Release**: 2 weeks before GA
2. **Beta Testers**: Partners, community volunteers
3. **Feedback Period**: 1-2 weeks
4. **Bug Fixes**: Address critical feedback
5. **RC (Release Candidate)**: If major changes made

### Test Environments

- Development: Continuous integration
- Staging: Pre-release testing
- Production: Stable releases

## Release Process

### 1. Code Freeze

**When**: 1 week before release  
**What**: No new features, bug fixes only  
**Communication**: Announce in Discussions

### 2. Version Update

```bash
# Update version in all files
npm version major|minor|patch
# or manually update:
# - package.json
# - README.md badges
# - Documentation version refs
```

### 3. CHANGELOG Update

Format:
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature 1 (#123)
- New feature 2 (#456)

### Changed
- Updated dependency X to v2.0 (#789)

### Fixed
- Bug fix 1 (#234)
- Bug fix 2 (#567)

### Security
- Security fix for vulnerability (#890)
```

### 4. Create Release Branch

```bash
git checkout -b release/vX.Y.Z
git push origin release/vX.Y.Z
```

### 5. Build and Test

```bash
# Install dependencies
npm install

# Run full test suite
npm test

# Run security scans
npm run security-scan

# Build release artifacts
npm run build

# Verify build
npm run verify-build
```

### 6. Create Git Tag

```bash
# Create annotated tag
git tag -a vX.Y.Z -m "Release vX.Y.Z"

# Push tag
git push origin vX.Y.Z
```

### 7. GitHub Release

**Draft Release**:
1. Go to GitHub Releases
2. Click "Draft a new release"
3. Select tag: vX.Y.Z
4. Set as **DRAFT** initially
5. Add release title: "CyberAi vX.Y.Z"
6. Copy CHANGELOG content
7. Attach build artifacts
8. Add installation instructions
9. Save as draft

**Review**:
- All maintainers review
- Final approval needed
- Publish when ready

### 8. Publish Packages

**npm** (if applicable):
```bash
npm publish
```

**Docker**:
```bash
docker build -t cyberai/scanner:vX.Y.Z .
docker push cyberai/scanner:vX.Y.Z
docker tag cyberai/scanner:vX.Y.Z cyberai/scanner:latest
docker push cyberai/scanner:latest
```

### 9. Update Documentation

- Docs site deployment
- Update version in all docs
- Update installation instructions
- Publish API documentation

### 10. Announcements

**Channels**:
1. GitHub Discussions (pinned)
2. GitHub Release published
3. Social media (Twitter, LinkedIn)
4. Partner newsletter
5. Discord/Slack announcements
6. Blog post (for major releases)

**Template**:
```markdown
🎉 CyberAi vX.Y.Z Released!

Highlights:
- [Major feature 1]
- [Major feature 2]
- [Security improvements]

📦 Install: npm install -g @cyberai/cli
📖 Docs: [link]
📝 Changelog: [link]
🐛 Report issues: [link]

Thank you to all contributors! 🙏
```

## Post-Release

### Monitoring

**First 24 Hours**:
- Watch GitHub issues for bug reports
- Monitor social media mentions
- Check download/install metrics
- Verify CI/CD integrations work

**First Week**:
- Address critical bugs immediately
- Collect feedback
- Update FAQ if needed
- Prepare patch if necessary

### Hotfix Process

**For Critical Bugs**:
1. Create hotfix branch from release tag
2. Fix bug, add test
3. Update version (patch bump)
4. Fast-track testing
5. Release ASAP
6. Announce security/critical nature

```bash
git checkout -b hotfix/vX.Y.Z+1 vX.Y.Z
# Make fixes
git commit -m "Fix critical bug"
git tag -a vX.Y.Z+1 -m "Hotfix for critical bug"
```

### Retrospective

**Within 1 Week After Release**:
- Team retrospective meeting
- What went well?
- What could improve?
- Action items for next release
- Update release process docs

## Communication

### Pre-Release

**2 Weeks Before**:
- Announce upcoming release
- Highlight major changes
- Call for testing volunteers
- Feature freeze announcement

**1 Week Before**:
- Beta release (if applicable)
- Reminder of upcoming release
- Known issues documented

### Release Day

**Announcements**:
- GitHub Release published
- Discussion post
- Social media
- Partner email
- Community channels

**Content**:
- What's new
- Breaking changes (if any)
- Installation instructions
- Link to full changelog
- Thank contributors

### Post-Release

**Follow-Up**:
- Thank community for feedback
- Address questions
- Hotfix announcements if needed
- Metrics and success stories

## Release Roles

### Release Manager

**Responsibilities**:
- Coordinate release process
- Ensure checklist completion
- Make go/no-go decisions
- Primary release communications

**Rotation**: Maintainers rotate

### Contributors

- Submit PRs for milestone
- Respond to reviews
- Update documentation
- Test beta releases

### Community

- Test beta releases
- Report bugs
- Provide feedback
- Help others with upgrade

## Version Support

### Support Policy

- **Latest Major**: Full support
- **Previous Major**: Security fixes for 1 year
- **Older Versions**: Community support only

**Example**:
- v2.0.0 released: Full support
- v1.x.x: Security fixes until v2.1.0
- v0.x.x: No official support

### End of Life

**6 Months Notice**:
- Announce EOL date
- Encourage upgrades
- Document migration path
- Final security scan before EOL

## Emergency Releases

### Security Releases

**Process**:
1. Fix developed privately
2. Coordinated disclosure timeline
3. Release prepared in private
4. Security advisory drafted
5. Release published with advisory
6. Disclosure follows responsible timeline

**Timeline**:
- Critical: 7 days target
- High: 14 days target
- Coordinated with security researchers

### Rollback Plan

**If Major Issues Discovered**:
1. Assess severity
2. Communicate issue immediately
3. Prepare hotfix or rollback
4. Release fix ASAP
5. Post-mortem and prevention

**Rollback Steps**:
```bash
# Unpublish bad version (npm)
npm unpublish @cyberai/cli@vX.Y.Z

# Revert Docker tags
docker tag cyberai/scanner:vX.Y.Z-1 cyberai/scanner:latest
docker push cyberai/scanner:latest
```

## Calendar Versioning

### Annual Major Releases

**Format**: v2026.01.01 (YYYY.MM.DD)

**Benefits**:
- Clear age of release
- Predictable schedule
- Easy mental model

**Still Use SemVer for Minor/Patch**:
- v2026.01.01 (January 1, 2026 release)
- v2026.01.02 (patch)
- v2026.02.00 (minor, February update)

## Resources

- [RELEASE.md](../RELEASE.md) - Detailed release checklist
- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines
- [GitHub Releases](https://github.com/CyberAi/CyberAi/releases)

## Questions

**Release Questions**: GitHub Discussions  
**Release Manager**: Current maintainer rotation  
**Emergency**: security@cyberai.network
>>>>>>> origin/pr10

---

**Last Updated**: 2026-01-01  
<<<<<<< HEAD
**Owner**: Release Management Team
=======
This document provides a short checklist for releasing SmartContractAudit.

## Pre-Release

- [ ] All features complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Security review complete
- [ ] Version numbers updated

## Release Steps

1. Create release branch
2. Final testing
3. Tag release
4. Create GitHub release
5. Announce to community

## Post-Release

- [ ] Monitor for issues
- [ ] Update project board
- [ ] Gather feedback

See [RELEASE.md](../RELEASE.md) for detailed procedures.

---

*Last updated: 2026-01-01*
>>>>>>> origin/pr9
=======
**Next Major Release**: v2026.01.01  
**Current Version**: Check GitHub releases
>>>>>>> origin/pr10
