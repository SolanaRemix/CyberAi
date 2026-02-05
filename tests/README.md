# CyberAi Test Suite

This directory contains all test suites for the CyberAi platform.

## Structure

```
tests/
├── unit/            # Unit tests for individual modules
├── integration/     # Integration tests for system components
└── fixtures/        # Test fixtures and mock data
```

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Writing Tests

### Unit Tests

Unit tests should focus on testing individual functions and classes in isolation:

```typescript
import { describe, it, expect } from 'vitest';
import { AgentManager } from '../src/agents';

describe('AgentManager', () => {
  it('should register an agent', () => {
    const manager = new AgentManager();
    const agent = {
      id: 'test-agent',
      name: 'Test Agent',
      type: 'security',
      capabilities: ['scan'],
    };

    manager.register(agent);
    expect(manager.getAgent('test-agent')).toEqual(agent);
  });
});
```

### Integration Tests

Integration tests should validate interactions between multiple components:

```typescript
import { describe, it, expect } from 'vitest';
import { initialize } from '../src';

describe('CyberAi Platform', () => {
  it('should initialize with default config', () => {
    expect(() => initialize()).not.toThrow();
  });
});
```

## Guidelines

- Write tests for all new functionality
- Maintain high code coverage (aim for >80%)
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies
- Keep tests fast and focused

## Test Utilities

Common test utilities and helpers can be found in `tests/utils/`.
