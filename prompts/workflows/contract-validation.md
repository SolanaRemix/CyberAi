# Contract Validation Workflow

## Workflow Purpose
Validate that all contracts in the `/contracts` directory conform to the contract schema and meet quality standards.

## Trigger Events
- Push to main branch
- Pull request with contract changes
- Manual workflow dispatch

## Steps

### 1. Schema Validation
```bash
# Install ajv-cli if not available
npm install -g ajv-cli

# Validate all agent contracts
ajv validate -s contracts/contract.schema.json -d "contracts/agents/*.json"

# Validate all repository contracts
ajv validate -s contracts/contract.schema.json -d "contracts/repositories/*.json"

# Validate all runner contracts
ajv validate -s contracts/contract.schema.json -d "contracts/runners/*.json"
```

### 2. Semantic Validation
- Verify all required fields are present and meaningful
- Check that URLs are accessible
- Validate version format
- Ensure owner/repository combinations are valid

### 3. Conflict Detection
- Check for duplicate contract names
- Verify no conflicting capabilities
- Ensure repository URLs are unique per contract type

### 4. Security Checks
- Scan for suspicious permissions
- Verify compliance fields are complete
- Check for known malicious patterns

### 5. Documentation Verification
- Ensure referenced documentation exists
- Verify workflow files exist if listed
- Check that tags are from approved list

## Success Criteria
All validation steps must pass for the workflow to succeed.

## Failure Handling
On failure:
- Create detailed error report
- Comment on PR with specific issues
- Block merge until resolved

## Reporting
Generate a validation report including:
- Total contracts validated
- Pass/fail status for each
- Detailed error messages
- Suggestions for fixes
