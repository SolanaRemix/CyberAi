# Data Retention Policy

## Overview

This document defines how long different types of data are retained in the SmartContractAudit project and the process for requesting data deletion.

## Artifact Retention Periods

### Workflow Artifacts

**Default Retention: 90 days**

GitHub Actions artifacts include:

- Build outputs
- Test results
- Audit reports (AUDIT-REPORT.md)
- Scan logs (SMARTBRAIN.log)
- Quarantine directories (.quarantine/)
- Coverage reports

**Rationale**: Balances storage costs with troubleshooting needs.

### Log Files

**Standard Logs: 30 days**
- Application logs
- Debug logs
- Workflow run logs

**Security Logs: 180 days**
- Authentication logs
- Security scan results
- Vulnerability reports
- Incident response logs

**Rationale**: Security logs retained longer for compliance and investigation purposes.

### Release Artifacts

**Retention: Indefinite**

Stable release artifacts are retained permanently:

- Release binaries and packages
- Release notes and changelogs
- Version tags
- Release documentation

**Rationale**: Required for reproducibility and user access to specific versions.

### Git Repository Data

**Retention: Permanent (with caveats)**

Git commits, issues, and pull requests:

- Commits are part of permanent git history
- Closed issues and PRs remain accessible
- Discussions and comments are retained
- Some data can be redacted but not fully deleted

**Rationale**: Git's distributed nature and project history requirements.

### Temporary Files

**Retention: 24-48 hours**

Temporary processing files:

- Cache directories
- Intermediate build files
- Temporary scan results
- Session data

**Rationale**: Cleanup to manage storage and security.

## Storage Locations

Data is stored in:

- **GitHub**: Repository, issues, PRs, artifacts, workflows
- **GitHub Actions**: Workflow logs and artifacts (per GitHub's retention policy)
- **Local Caches**: Temporary files in CI/CD runners (ephemeral)

## Deletion Request Process

### How to Request Deletion

1. **Submit Request**
   - Email: privacy@cuberai.example
   - Subject: "Data Deletion Request - [Your Name/Handle]"

2. **Provide Details**
   - Specific data to be deleted
   - Location/URLs of the data
   - Reason for deletion (optional)
   - Proof of ownership/authorization

3. **Verification**
   - We verify the request is legitimate
   - May require confirmation from the GitHub account owner
   - Processing time: 14 business days

4. **Deletion**
   - We delete what is technically and legally feasible
   - Provide confirmation of deletion
   - Explain any data that cannot be deleted and why

### What Can Be Deleted

✅ **Can Usually Be Deleted:**
- Personally identifiable information in documentation
- Your email from git history (replaced with GitHub noreply)
- Specific comments or discussion posts
- Workflow artifacts (if not yet expired)
- Temporary caches and logs

### What Cannot Be Deleted

❌ **Cannot Be Deleted:**
- Git commit hashes and metadata (distributed across forks)
- Code contributions (part of permanent history)
- Public release artifacts
- Data required for legal/compliance purposes
- Data in third-party forks (outside our control)

### Redaction Alternative

For data that cannot be deleted:

- **Redaction**: Replace sensitive data with `[REDACTED]`
- **Anonymization**: Replace identifying information with pseudonyms
- **History Rewrite**: Use `git filter-repo` for severe cases (disruptive)

## Automated Cleanup

### Scheduled Cleanup Tasks

- **Daily**: Remove temp files older than 48 hours
- **Weekly**: Archive logs older than retention period
- **Monthly**: Clean up expired workflow artifacts
- **Quarterly**: Review and archive old closed issues

### Configuration

Retention periods can be configured in `config/repair.json`:

```json
{
  "artifact_retention_days": 90,
  "log_retention_days": 30,
  "security_log_retention_days": 180
}
```

## Exceptions and Overrides

### Legal Hold

Data may be retained beyond standard periods if:

- Required by law or legal process
- Part of ongoing investigation
- Subject to regulatory requirements
- Necessary for litigation

### User-Requested Extension

Users may request extended retention:

- Contact privacy@cuberai.example
- Provide justification
- Maximum extension: 1 year beyond standard period

## Data Minimization

We practice data minimization:

- Collect only necessary data
- Anonymize where possible
- Redact sensitive information automatically
- Delete data proactively when no longer needed

## Backup Retention

Backups follow retention policies:

- **Incremental Backups**: 30 days
- **Monthly Backups**: 1 year
- **Annual Backups**: 3 years

Deleted data is purged from backups during the next backup cycle.

## Third-Party Retention

Third-party services have their own policies:

- **GitHub**: See [GitHub's data retention policy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)
- **npm/PyPI**: Package metadata retained indefinitely
- **CDNs**: Cached data typically 24-48 hours

## Audit Trail

We maintain audit trails for:

- Data deletion requests (5 years)
- Security incidents (7 years)
- Access logs (180 days)
- Retention policy changes (permanent)

## Policy Updates

This policy may be updated:

- Changes announced via GitHub
- 30-day notice for significant changes
- Previous versions available in git history

## Contact

For data retention questions or deletion requests:

**Email**: privacy@cuberai.example

**Response Time**: 5-7 business days

For urgent security-related deletion:

**Email**: security@cuberai.example

**Response Time**: 24-48 hours

## Related Documents

- [PRIVACY.md](PRIVACY.md) - Overall privacy policy
- [SECURITY.md](SECURITY.md) - Security policies
- [GOVERNANCE.md](GOVERNANCE.md) - Project governance

---

**Last Updated**: 2026-01-01

**Next Review**: 2026-07-01
