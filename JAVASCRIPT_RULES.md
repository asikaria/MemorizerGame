# JavaScript Development Rules

This document outlines the coding standards and best practices for the MemorizerGame project.

## Code Style

### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 80 characters
- **Quotes**: Single quotes for strings, double quotes only when escaping is needed
- **Semicolons**: Always required
- **Trailing Commas**: Required in multiline objects and arrays

### Examples

```javascript
// ✅ Good
const user = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'gaming'],
};

const greetUser = (name) => {
  return `Hello, ${name}!`;
};

// ❌ Bad
const user = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"]
}

const greetUser = name => {
  return 'Hello, ' + name + '!'
}
```

## ESLint Rules

### Error Prevention
- `no-console`: Warns about console statements (use proper logging in production)
- `no-debugger`: Prevents debugger statements in production code
- `no-unused-vars`: Catches unused variables and parameters
- `no-undef`: Prevents use of undefined variables

### Best Practices
- `eqeqeq`: Always use strict equality (`===` and `!==`)
- `no-eval`: Prevents dangerous eval() usage
- `prefer-const`: Use `const` when variables aren't reassigned
- `no-var`: Use `let` and `const` instead of `var`

### Code Quality
- `complexity`: Functions should not exceed complexity of 10
- `max-depth`: Maximum nesting depth of 4 levels
- `max-lines`: Maximum 300 lines per file
- `max-params`: Maximum 4 parameters per function

## Naming Conventions

### Variables and Functions
```javascript
// ✅ Good
const userName = 'john_doe';
const isActive = true;
const getUserData = () => {};

// ❌ Bad
const user_name = 'john_doe';
const is_active = true;
const get_user_data = () => {};
```

### Constants
```javascript
// ✅ Good
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// ❌ Bad
const maxRetryAttempts = 3;
const apiBaseUrl = 'https://api.example.com';
```

### Classes
```javascript
// ✅ Good
class GameManager {
  constructor() {
    this.score = 0;
  }
}

// ❌ Bad
class gameManager {
  constructor() {
    this.Score = 0;
  }
}
```

## Function Guidelines

### Arrow Functions
```javascript
// ✅ Good
const multiply = (a, b) => a * b;
const processData = (data) => {
  return data.map(item => item.id);
};

// ❌ Bad
const multiply = function(a, b) {
  return a * b;
};
```

### Function Parameters
```javascript
// ✅ Good
const createUser = (name, email, options = {}) => {
  // Implementation
};

// ❌ Bad
const createUser = (name, email, options) => {
  // Implementation
};
```

## Error Handling

### Try-Catch Blocks
```javascript
// ✅ Good
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error.message);
  throw new Error('Custom error message');
}

// ❌ Bad
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  // Empty catch block
}
```

## Async/Await

### Promise Handling
```javascript
// ✅ Good
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

// ❌ Bad
const fetchData = () => {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => data);
};
```

## Comments and Documentation

### JSDoc Comments
```javascript
/**
 * Calculates the score based on game performance
 * @param {number} time - Time taken to complete the game
 * @param {number} accuracy - Accuracy percentage (0-100)
 * @param {number} difficulty - Game difficulty multiplier
 * @returns {number} The calculated score
 */
const calculateScore = (time, accuracy, difficulty) => {
  return Math.floor((accuracy * difficulty) / time);
};
```

### Inline Comments
```javascript
// ✅ Good
const processGameState = (state) => {
  // Skip processing if game is already finished
  if (state.isFinished) {
    return state;
  }
  
  // Calculate new score based on current performance
  const newScore = calculateScore(state.time, state.accuracy, state.difficulty);
  
  return {
    ...state,
    score: newScore,
  };
};

// ❌ Bad
const processGameState = (state) => {
  if (state.isFinished) return state; // Skip if finished
  const newScore = calculateScore(state.time, state.accuracy, state.difficulty); // Calculate score
  return { ...state, score: newScore }; // Return new state
};
```

## Testing Guidelines

### Test File Naming
- Test files should end with `.test.js` or `.spec.js`
- Place tests in a `__tests__` directory or alongside source files

### Test Structure
```javascript
describe('GameManager', () => {
  let gameManager;
  
  beforeEach(() => {
    gameManager = new GameManager();
  });
  
  afterEach(() => {
    gameManager = null;
  });
  
  it('should initialize with zero score', () => {
    expect(gameManager.score).toBe(0);
  });
  
  it('should increment score correctly', () => {
    gameManager.addPoints(100);
    expect(gameManager.score).toBe(100);
  });
});
```

## Available Scripts

```bash
# Lint all JavaScript files
npm run lint

# Lint and automatically fix issues
npm run lint:fix

# Format all files with Prettier
npm run format

# Check if files are properly formatted
npm run format:check
```

## IDE Setup

### VS Code Extensions
- ESLint
- Prettier - Code formatter
- JavaScript (ES6) code snippets

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Common Issues and Solutions

### Import/Export Issues
```javascript
// ✅ Good
import { GameManager } from './GameManager';
export default GameManager;

// ❌ Bad
const GameManager = require('./GameManager');
module.exports = GameManager;
```

### Variable Declaration
```javascript
// ✅ Good
let counter = 0;
const MAX_VALUE = 100;

// ❌ Bad
var counter = 0;
const maxValue = 100;
```

## Performance Considerations

### Memory Management
- Avoid creating functions inside loops
- Use object pooling for frequently created/destroyed objects
- Clear intervals and timeouts when components unmount

### DOM Manipulation
- Batch DOM updates when possible
- Use document fragments for multiple DOM insertions
- Avoid querying the DOM in loops

## Security Best Practices

- Never use `eval()` or `Function()` constructor
- Validate and sanitize all user inputs
- Use HTTPS for API calls
- Implement proper authentication and authorization
- Avoid storing sensitive data in localStorage

## Git Hooks

Consider setting up pre-commit hooks to:
- Run ESLint on staged files
- Format code with Prettier
- Run tests before committing

## Contributing

1. Follow these coding standards
2. Run `npm run lint` before submitting code
3. Ensure all tests pass
4. Update documentation when adding new features
5. Use conventional commit messages

## Resources

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
