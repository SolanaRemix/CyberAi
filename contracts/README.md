# CyberAi Contracts

This directory contains machine-readable contracts for agents, repositories, and runners in the CyberAi ecosystem.

## Structure

- `contract.schema.json` - JSON Schema defining the contract format
- `agents/` - Agent contracts
- `repositories/` - Repository contracts
- `runners/` - Runner contracts (future)

## Contract Schema

All contracts must conform to `contract.schema.json`. The schema defines:

- **version**: Semantic version of the contract
- **type**: Contract type (agent, repository, runner)
- **metadata**: Basic information about the entity
- **capabilities**: What the entity can do
- **requirements**: Dependencies and permissions needed
- **compliance**: Security and certification information

## Validation

Contracts are automatically validated on push via the `contracts-validate.yml` workflow.

To validate locally:

```bash
npm install -g ajv-cli
ajv validate -s contract.schema.json -d "agents/*.json"
ajv validate -s contract.schema.json -d "repositories/*.json"
```

## Creating a New Contract

1. Copy an example contract from the appropriate subdirectory
2. Update the metadata and capabilities
3. Validate against the schema
4. Submit a PR with your contract

## Examples

See `agents/example-agent.json` and `repositories/cyberai.json` for reference implementations.
