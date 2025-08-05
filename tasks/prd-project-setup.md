# Project Setup PRD: ReceiptHealth Mobile App

## Introduction/Overview

This PRD outlines the initial project setup requirements for ReceiptHealth, a React Native mobile app that helps users track and analyze their grocery purchases in relation to their fitness activities. The setup phase will establish the foundational architecture, development environment, and project structure necessary for efficient development.

## Goals

1. Create a well-structured, scalable React Native project using Expo
2. Establish a clean, maintainable codebase architecture
3. Set up essential development tools and workflows
4. Configure basic project dependencies and development environment
5. Initialize version control and establish git workflow

## User Stories

- As a developer, I want a clear project structure so that I can easily locate and organize code
- As a developer, I want proper linting and formatting rules so that I can maintain code quality
- As a developer, I want a proper git workflow so that I can track changes and collaborate effectively
- As a developer, I want hot reloading and fast development cycles so that I can iterate quickly

## Functional Requirements

### 1. Project Initialization

1.1. Initialize a new Expo project using the latest stable SDK
1.2. Configure the project for JavaScript development
1.3. Set up iOS-first development configuration
1.4. Initialize git repository with appropriate .gitignore

### 2. Development Environment

2.1. Configure ESLint with strict rules
2.2. Set up Prettier for code formatting
2.3. Configure VSCode recommended extensions and settings
2.4. Set up pre-commit hooks for linting and formatting

### 3. Project Structure

3.1. Implement feature-based folder organization:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   └── services/
│   ├── receipt-scanning/
│   ├── health-tracking/
│   └── recommendations/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── navigation/
├── theme/
└── config/
```

### 4. Essential Dependencies

4.1. Set up NativeWind for styling
4.2. Configure React Navigation
4.3. Set up AsyncStorage for local data persistence
4.4. Configure basic state management structure

### 5. Git Workflow

5.1. Initialize main and development branches
5.2. Configure branch protection rules
5.3. Set up conventional commit message format
5.4. Create pull request template

## Non-Goals (Out of Scope)

- Setting up the backend infrastructure
- Implementing any feature-specific code
- Setting up CI/CD pipelines (will be addressed later)
- Configuring production deployment
- Setting up testing infrastructure (will be added later)

## Technical Considerations

- Use Expo SDK 50 or latest stable version
- Target iOS 15+ initially
- Use React Navigation v6+
- Use NativeWind v4+
- Consider future Android compatibility when making architectural decisions

## Success Metrics

1. Development environment can be set up in under 15 minutes
2. Hot reload works properly
3. All linting and formatting rules are properly enforced
4. Project structure supports at least 10 major features without refactoring
5. Git workflow successfully prevents direct pushes to main branch

## Git Workflow Details

1. Branch Strategy:

   - `main`: Production-ready code
   - `develop`: Main development branch
   - Feature branches: `feature/feature-name`
   - Bug fixes: `fix/bug-name`
   - Releases: `release/v1.x.x`

2. Commit Message Format:

   ```
   type(scope): description

   [optional body]
   [optional footer]
   ```

   Types: feat, fix, docs, style, refactor, test, chore

3. Pull Request Process:
   - Create PR from feature branch to develop
   - Require at least one review
   - Must pass all linting checks
   - Squash merge to keep history clean

## Open Questions

1. Should we implement a monorepo structure to include backend code later?
2. Do we need to set up any specific security scanning tools from the start?
3. Should we configure any performance monitoring tools during setup?
4. Do we need to set up any specific iOS capabilities in Expo config from the start?
