# Contributing to Saros DLMM Portfolio Dashboard

Thank you for your interest in contributing to this project! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Rust 1.70+ and Cargo
- Git

### Getting Started

1. **Fork and Clone**
```bash
git clone https://github.com/your-username/saros-dlmm-portfolio-dashboard.git
cd saros-dlmm-portfolio-dashboard
```

2. **Install Dependencies**
```bash
npm install
npm run install:all
```

3. **Environment Setup**
```bash
# Copy environment templates
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

4. **Start Development Servers**
```bash
npm run dev
```

## Project Structure

```
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
├── backend/           # Rust backend
│   ├── src/
│   │   ├── main.rs        # Main server file
│   │   ├── handlers/      # API handlers
│   │   ├── models/        # Data models
│   │   └── utils/         # Utility functions
├── docs/              # Documentation
└── examples/          # Usage examples
```

## Coding Standards

### TypeScript/React

- Use TypeScript for all new files
- Follow React functional components with hooks
- Use meaningful component and variable names
- Include JSDoc comments for complex functions

```typescript
/**
 * Fetches DLMM positions for a given wallet
 * @param walletAddress - The Solana wallet address
 * @returns Promise<Position[]> - Array of positions
 */
const fetchPositions = async (walletAddress: string): Promise<Position[]> => {
  // Implementation
};
```

### Rust

- Follow Rust naming conventions (snake_case)
- Use `Result<T, E>` for error handling
- Add documentation comments for public functions
- Include unit tests for new functionality

```rust
/// Fetches DLMM positions for a wallet
/// 
/// # Arguments
/// 
/// * `wallet_pubkey` - The wallet's public key
/// 
/// # Returns
/// 
/// * `Result<Vec<Position>, DLMMError>` - Vector of positions or error
pub async fn get_positions(wallet_pubkey: &Pubkey) -> Result<Vec<Position>, DLMMError> {
    // Implementation
}
```

## Commit Guidelines

### Commit Message Format

```
type(scope): brief description

Detailed description if needed

Closes #issue-number
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat(frontend): add portfolio summary component

- Add PortfolioSummary component with key metrics
- Include total liquidity, fees earned, and APR
- Add responsive design for mobile devices

Closes #123
```

```
fix(backend): resolve position fetch error

- Fix SQL query for fetching positions
- Add proper error handling for empty results
- Update unit tests

Closes #456
```

## Testing

### Frontend Tests

```bash
# Run frontend tests
npm run test:frontend

# Watch mode
cd frontend && npm run test:watch
```

Test files should be colocated with components:
```
src/
├── components/
│   ├── PositionsList.tsx
│   └── PositionsList.test.tsx
```

### Backend Tests

```bash
# Run backend tests
npm run test:backend

# With coverage
cd backend && cargo test --coverage
```

Test files should be in the same directory:
```
src/
├── handlers/
│   ├── positions.rs
│   └── positions_test.rs
```

## Pull Request Process

1. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**
- Write clean, well-documented code
- Add tests for new functionality
- Update documentation as needed

3. **Test Your Changes**
```bash
npm test
npm run build
```

4. **Commit Your Changes**
```bash
git add .
git commit -m "feat(scope): your changes"
```

5. **Push and Create PR**
```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] Commit messages follow guidelines
- [ ] PR description explains the changes

## Issues and Bug Reports

### Reporting Bugs

Include:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error messages and logs

### Feature Requests

Include:
- Clear description of the feature
- Use cases and benefits
- Mockups or examples if applicable

## SDK Integration

When working with Saros SDKs:

1. **Mock for Development**
   - Use mock data during development
   - Add comments indicating where real SDK calls should go

2. **Error Handling**
   - Always handle SDK errors gracefully
   - Provide meaningful user feedback

3. **Testing**
   - Mock SDK calls in tests
   - Test error scenarios

## Documentation

- Update README.md for significant changes
- Add JSDoc/rustdoc comments for new functions
- Update API documentation for backend changes
- Include examples for complex features

## Getting Help

- Check existing issues and documentation
- Join our Discord community
- Ask questions in pull request comments
- Tag maintainers for urgent issues

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's code of conduct

Thank you for contributing to making DeFi more accessible and user-friendly!