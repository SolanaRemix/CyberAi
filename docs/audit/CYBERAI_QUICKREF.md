# CyberAi Quick Reference Card

## 🎯 One-Page Guide

### What You Need to Know

**SmartContractAudit** = Foundation (smart contract security functions)  
**CyberAi Bot** = Orchestrator (coordinates all bots and automation)

### Separation of Concerns

| Belongs in SmartContractAudit | Belongs in CyberAi |
|-------------------------------|-------------------|
| Smart contract auditing scripts | AI-powered bot orchestration |
| GitAntivirus workflow | Multi-bot coordination |
| SmartBrain orchestrator (master.sh) | Advanced automation logic |
| Core security functions | DAO & governance features |
| Base infrastructure | Production web interfaces |

### What to Clone First?

**Answer: SmartContractAudit** (this repository)

```bash
git clone https://github.com/SolanaRemix/SmartContractAudit.git
cd SmartContractAudit
./scripts/scan-cyberai-prs.sh
```

### Quick Commands

```bash
# Scan for CyberAi PRs
./scripts/scan-cyberai-prs.sh

# Health check
DRY_RUN=true ./scripts/master.sh health

# Audit
DRY_RUN=true ./scripts/master.sh audit

# Security scan
DRY_RUN=true ./scripts/master.sh scan
```

### Should I Auto-Merge All CyberAi PRs?

**NO!** Review each PR individually:

- ✅ Foundation infrastructure → Merge to SmartContractAudit
- ✅ Documentation → Merge if accurate
- ❌ CyberAi-specific features → Redirect to CyberAi repository
- ⚠️ Orchestration scripts → Evaluate carefully

### Naming Standard

**Use: CyberAi** (not CuberAi)

### Domain Structure

- Repository: `cyberai.git` or `CyberAi`
- Network: `cyberai.network`
- Email: `*@cyberai.example`

### Key Files to Read

1. **[CYBERAI_ARCHITECTURE.md](CYBERAI_ARCHITECTURE.md)** - Complete architecture
2. **[CYBERAI_PR_MERGE_GUIDE.md](CYBERAI_PR_MERGE_GUIDE.md)** - PR strategy
3. **[cuberai-setup.md](cuberai-setup.md)** - Setup instructions
4. **[TRIO.md](../TRIO.md)** - Product/Governance/Security

### Workflow Integration

**Automated**: `.github/workflows/cyberai-super-workflow.yml`

Runs:
- Health checks
- Security scans
- Audit orchestration
- Integrity validation

### Safety First

Always use **DRY_RUN=true** for testing!

```bash
# Safe
DRY_RUN=true ./scripts/master.sh heal

# Production (use with caution)
DRY_RUN=false ./scripts/master.sh heal
```

### Getting Help

1. Run the scanner: `./scripts/scan-cyberai-prs.sh`
2. Read the docs: `docs/CYBERAI_*.md`
3. Check logs: `cat SMARTBRAIN.log`
4. Review reports: `cat AUDIT-REPORT.md`

### Remember

**No confusion**: 
- SmartContract functions stay in SmartContractAudit
- CyberAi Bot handles orchestration
- Keep repositories decoupled
- Test in dry-run first
- Review PRs individually

---

**Quick Links**:
- Architecture: [CYBERAI_ARCHITECTURE.md](CYBERAI_ARCHITECTURE.md)
- PR Guide: [CYBERAI_PR_MERGE_GUIDE.md](CYBERAI_PR_MERGE_GUIDE.md)
- Setup: [cuberai-setup.md](cuberai-setup.md)
- Scanner: `./scripts/scan-cyberai-prs.sh`

---

*Last Updated: 2026-01-02*
