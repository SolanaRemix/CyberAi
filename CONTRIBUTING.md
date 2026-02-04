# Contributing to CyberAi

Thank you for your interest in contributing to CyberAi! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a positive community

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/SolanaRemix/CyberAi/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples of how it would work

### Pull Requests

1. **Fork the repository** and create a new branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
   - Use conventional commits format:

     ```
     type(scope): description

     [optional body]
     [optional footer]
     ```

   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description
   - Link related issues
   - Wait for review

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/CyberAi.git
cd CyberAi

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build project
npm run build
```

## Coding Standards

- **JavaScript/TypeScript**: Follow the project's ESLint configuration
- **Python**: Follow PEP 8 style guide
- **Comments**: Write clear, concise comments for complex logic
- **Tests**: Aim for high test coverage
- **Documentation**: Update docs for any user-facing changes

## Testing

- Write unit tests for new functions
- Write integration tests for new features
- Ensure all tests pass before submitting PR
- Include edge cases in your tests

## Documentation

- Update README.md for major changes
- Add JSDoc/docstring comments for functions
- Update relevant documentation in `/docs`
- Include examples where appropriate

## Review Process

1. Automated checks must pass (CI, linting, tests)
2. At least one maintainer review required
3. All feedback must be addressed
4. No merge conflicts with main branch

## Questions?

Feel free to ask questions by:

- Opening an issue
- Joining our community discussions
- Reaching out to maintainers

Thank you for contributing to CyberAi! 🚀
