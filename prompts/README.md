# CyberAi Prompts

This directory contains operator-grade instruction prompts for agents in the CyberAi ecosystem.

## Structure

- `operators/` - Prompts for human operators
- `agents/` - Prompts for AI agents
- `workflows/` - Workflow-specific prompts

## Prompt Guidelines

Prompts should be:
- Clear and unambiguous
- Include context about the CyberAi ecosystem
- Specify expected inputs and outputs
- Include safety guidelines and constraints
- Be version controlled

## Usage

Prompts are referenced in agent contracts and can be loaded dynamically by agents at runtime.

Example:
```json
{
  "prompt": "prompts/agents/security-audit.md",
  "version": "1.0.0"
}
```
