# Contributing Guide

Thank you for your interest in contributing to Checklist Master!

## Development Setup

1. Install dependencies:
```bash
npm run install-all
```

2. Start development servers:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Code Style

- Use TypeScript strictly
- Follow existing naming conventions
- Keep components focused and reusable
- Add comments for non-obvious logic
- Format code with consistent indentation

## Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issues when applicable
- Example: `feat: add task rollover logic for daily tasks`

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request with clear description

## Testing

Run tests before submitting:
```bash
# Type checking
npm run typecheck

# Linting (when configured)
npm run lint
```

## Documentation

- Update README.md if adding features
- Update IMPLEMENTATION.md for architectural changes
- Add inline comments for complex logic
- Keep examples up-to-date

## Reporting Issues

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- System information

## Feature Suggestions

Feel free to suggest features by opening an issue with:
- Clear description of the feature
- Why it would be beneficial
- Possible implementation approaches

## Questions?

Ask in issues or via discussions section.

Happy coding! 🚀
