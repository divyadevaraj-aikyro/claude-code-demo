# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a demonstration repository for Claude Code training and examples. The repository contains:

- `todoapp/` - A vanilla JavaScript todo application with comprehensive testing
- `claude-code-training/` - Training documentation and guides for Claude Code
- `.claude/agents/` - Custom Claude Code agents (unit-test-writer, database-administrator)
- `configs/`, `docs/`, `examples/`, `samples/` - Empty directories intended for future content

## Development Commands

### Root Repository
```bash
# Install dependencies for demo repository
npm install

# No build process - uses Playwright for browser automation examples
```

### Todo Application
```bash
# Navigate to the todo app directory
cd todoapp

# Start a local development server
npm start
# or
npm run dev

# Run tests
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report

# Development server runs on http://localhost:8000
```

## Todo Application Architecture

The todo application follows a class-based architecture with comprehensive testing:

### Core Application (`script.js`)
- **TodoApp class**: Main application controller that manages:
  - Todo state management with localStorage persistence
  - Event handling for all user interactions
  - Filtering and rendering logic
  - Statistics tracking
  - Priority levels (low/medium/high)
  - Inline editing capabilities
  - XSS protection via HTML escaping

### Key Methods
- `addTodo()`: Adds new todos with priority levels and timestamps
- `toggleTodo()`: Marks todos as complete/incomplete
- `deleteTodo()`: Removes todo items
- `editTodo()`: Inline editing with keyboard support
- `setFilter()`: Handles filtering (all/active/completed)
- `render()`: Updates the DOM based on current state
- `saveTodos()`: Persists data to localStorage
- `escapeHtml()`: XSS protection utility

### Data Structure
Each todo item contains:
```javascript
{
  id: Number,           // Unique identifier (timestamp)
  text: String,         // Todo content
  completed: Boolean,   // Completion status
  priority: String,     // Priority level (low/medium/high)
  createdAt: String     // ISO timestamp
}
```

### Testing Infrastructure (`tests/`)
The todo application includes a comprehensive Jest-based testing suite:

- **TodoApp.test.js**: Unit tests for core TodoApp class methods
- **utils.test.js**: Utility function and edge case tests
- **integration.test.js**: End-to-end DOM interaction tests
- **setup.js**: Global test setup with localStorage mocking
- **jest.config.js**: Jest configuration with jsdom environment

**Test Coverage Areas:**
- CRUD operations (Create, Read, Update, Delete)
- Priority system and filtering
- Inline editing workflows
- DOM interactions and event handling
- XSS protection and HTML escaping
- localStorage persistence and error handling
- Accessibility features
- Edge cases and error conditions

## Specialized Agents

This repository includes custom Claude Code agents:

### Unit Test Writer Agent
- Located at `.claude/agents/unit-test-writer.md`
- Specializes in creating comprehensive unit tests
- Use with: `/agent switch unit-test-writer`
- Expertise in Jest, Mocha, Vitest frameworks
- Focus on test coverage, edge cases, and best practices

### Database Administrator Agent
- Located at `.claude/agents/database-administrator.md`
- Specializes in database design and optimization
- Use with: `/agent switch database-administrator`
- Expertise in schema design, query optimization, performance tuning

## Technology Stack

### Todo Application
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Testing**: Jest with jsdom environment
- **Storage**: localStorage for data persistence
- **Server**: Python's built-in HTTP server for development
- **No build tools**: Runs directly in browser

### Root Repository
- **Browser Automation**: Playwright (^1.56.0)
- **MCP Integration**: @playwright/mcp (^0.0.43)

## File Structure

### Root Level
- `package.json`: Root repository configuration with Playwright dependencies
- `screenshot.js`: Screenshot utility script using Playwright
- `settings.json`: Claude Code configuration
- `README.md`: Repository overview and setup instructions

### Todo Application (`todoapp/`)
- `index.html`: Semantic HTML structure with accessibility features
- `script.js`: Complete application logic in TodoApp class
- `style.css`: Responsive CSS with modern styling
- `package.json`: Project configuration with Jest testing setup
- `jest.config.js`: Jest testing configuration
- `CLAUDE.md`: Todo application-specific documentation
- `TESTING_SUMMARY.md`: Comprehensive testing documentation
- `tests/`: Complete test suite with setup and utilities

## Development Workflow

### For Todo Application Development
1. Navigate to `todoapp/` directory
2. Start development server: `npm start`
3. Run tests: `npm test`
4. Check coverage: `npm run test:coverage`
5. For new features, use the unit-test-writer agent: `/agent switch unit-test-writer`

### For Repository-Wide Changes
1. Work at root level for Claude Code training content
2. Use appropriate specialized agents for specific tasks
3. Maintain consistency with existing documentation patterns

## No Build Process

Both the root repository and todo application are designed to run without complex build processes:
- Todo app uses Python's HTTP server for local development
- Direct browser execution of vanilla JavaScript
- Jest runs tests directly on source files
- No bundling, transpilation, or complex toolchains required