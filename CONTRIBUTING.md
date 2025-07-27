# Contributing to Auto Change Tracker

Thank you for your interest in contributing to the Auto Change Tracker VS Code extension! This document provides guidelines for contributing to this project.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- VS Code
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Auto-Change-Tracker-Extension.git
   cd Auto-Change-Tracker-Extension
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Compile the extension:
   ```bash
   npm run compile
   ```

5. Open the project in VS Code and press `F5` to run the extension in a new Extension Development Host window

## Development Workflow

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test your changes thoroughly
4. Run linting:
   ```bash
   npm run lint
   ```

5. Run tests (if applicable):
   ```bash
   npm test
   ```

6. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add new feature description"
   ```

### Code Style

- Follow the existing TypeScript/JavaScript code style
- Use meaningful variable and function names
- Add comments for complex logic
- Follow VS Code extension development best practices

### Testing

- Test your changes in the Extension Development Host
- Test with different VS Code versions if possible
- Test on different operating systems if possible
- Update tests if you add new functionality

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Add tests for new functionality
4. Update the CHANGELOG.md with a brief description of your changes
5. Submit a pull request with a clear description of the changes

### Pull Request Guidelines

- Use a clear and descriptive title
- Provide a detailed description of the changes
- Include screenshots or GIFs for UI changes
- Reference any related issues
- Ensure all CI checks pass

## Issue Reporting

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment details (OS, VS Code version, etc.)
- Any relevant error messages or logs

## Code of Conduct

- Be respectful and inclusive
- Focus on the code and technical aspects
- Help others learn and grow
- Provide constructive feedback

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🎉 