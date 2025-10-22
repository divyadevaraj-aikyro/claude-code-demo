# TodoApp Test Suite Documentation

This directory contains comprehensive unit tests for the vanilla JavaScript TodoApp. The test suite covers all functionality including CRUD operations, DOM interactions, error handling, and edge cases.

## Table of Contents

1. [Test Structure](#test-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Running Tests](#running-tests)
4. [Test Coverage](#test-coverage)
5. [Test Files Overview](#test-files-overview)
6. [Mocking Strategy](#mocking-strategy)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Test Structure

```
tests/
├── setup.js              # Test setup and global helpers
├── TodoApp.test.js       # Main TodoApp class unit tests
├── utils.test.js         # Utility function tests
├── integration.test.js   # DOM integration tests
└── README.md            # This documentation
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Verify Jest installation:**
   ```bash
   npx jest --version
   ```

3. **Run tests to verify setup:**
   ```bash
   npm test
   ```

## Running Tests

### Basic Test Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npx jest TodoApp.test.js

# Run tests matching a pattern
npx jest --testNamePattern="addTodo"
```

### Coverage Reports

Coverage reports are generated in the `coverage/` directory:

```bash
# View coverage in browser
open coverage/lcov-report/index.html

# View coverage in terminal
npm run test:coverage
```

## Test Coverage

The test suite covers the following areas:

### Core Functionality (100% coverage)
- ✅ Todo CRUD operations (Create, Read, Update, Delete)
- ✅ Priority system (Low/Medium/High)
- ✅ Inline editing functionality
- ✅ Filtering (All/Active/Completed)
- ✅ Statistics tracking and display
- ✅ LocalStorage persistence
- ✅ HTML escaping and XSS protection

### Edge Cases and Error Handling
- ✅ Empty input validation
- ✅ Malformed localStorage data
- ✅ DOM element missing scenarios
- ✅ Invalid todo IDs
- ✅ Storage quota exceeded
- ✅ Rapid user interactions

### DOM Integration
- ✅ Form submission handling
- ✅ Button click events
- ✅ Keyboard interactions (Enter, Escape)
- ✅ Focus management
- ✅ Event propagation
- ✅ Dynamic content updates

## Test Files Overview

### setup.js

**Purpose:** Global test configuration and helper functions

**Key Features:**
- localStorage mocking
- DOM element setup
- Helper functions for creating mock data
- Event simulation utilities
- Global test configuration

**Global Helpers:**
- `createTodoApp(initialTodos)` - Create TodoApp instance with preset todos
- `createMockTodo(overrides)` - Generate mock todo objects
- `simulateInput(element, value)` - Simulate user input
- `simulateFormSubmit(form)` - Simulate form submission
- `triggerEvent(element, eventType)` - Trigger DOM events

### TodoApp.test.js

**Purpose:** Comprehensive unit tests for TodoApp class methods

**Test Categories:**
- Constructor initialization
- addTodo() method
- deleteTodo() method
- toggleTodo() method
- editTodo() method
- startEditTodo() method
- setFilter() method
- getFilteredTodos() method
- clearCompleted() method
- clearAll() method
- updateStats() method
- createTodoElement() method
- escapeHtml() method
- render() method
- saveTodos() method
- Integration workflows

### utils.test.js

**Purpose:** Tests for utility functions and edge cases

**Test Categories:**
- HTML escaping and XSS protection
- localStorage integration
- Date handling
- Input validation and sanitization
- Priority system validation
- Filter system validation

### integration.test.js

**Purpose:** End-to-end DOM interaction tests

**Test Categories:**
- Form submission integration
- Filter button interactions
- Todo item interactions
- Inline editing workflows
- Clear actions integration
- Statistics display updates
- Empty state handling
- Complete user workflows
- Accessibility testing

## Mocking Strategy

### localStorage Mocking

```javascript
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
};
```

### DOM Mocking

- Creates complete HTML structure matching index.html
- Simulates real DOM behavior for testing
- Provides event handling capabilities
- Maintains state between test operations

### User Interaction Simulation

```javascript
// Simulate form submission
simulateFormSubmit(form);

// Simulate user input
simulateInput(inputElement, 'text value');

// Trigger DOM events
triggerEvent(element, 'click');
```

## Best Practices

### Test Organization

1. **Arrange-Act-Assert Pattern:**
   ```javascript
   // Arrange
   app.todoInput.value = 'Test todo';

   // Act
   app.addTodo();

   // Assert
   expect(app.todos).toHaveLength(1);
   ```

2. **Descriptive Test Names:**
   ```javascript
   test('should add todo with correct priority and timestamp', () => {
       // test implementation
   });
   ```

3. **Group Related Tests:**
   ```javascript
   describe('addTodo method', () => {
       test('should add todo with default priority', () => {});
       test('should add todo with custom priority', () => {});
       test('should not add empty todo', () => {});
   });
   ```

### Mocking Guidelines

1. **Reset mocks before each test:**
   ```javascript
   beforeEach(() => {
       jest.clearAllMocks();
       localStorageMock.getItem.mockClear();
   });
   ```

2. **Provide default mock behavior:**
   ```javascript
   localStorageMock.getItem.mockImplementation((key) => {
       if (key === 'todos') return '[]';
       return null;
   });
   ```

3. **Mock external dependencies:**
   ```javascript
   global.confirm = jest.fn();
   global.alert = jest.fn();
   ```

### Coverage Guidelines

1. **Aim for 100% line coverage** on critical business logic
2. **Test all code paths** including error conditions
3. **Focus on behavior over implementation**
4. **Test edge cases and boundary conditions**

## Troubleshooting

### Common Issues

#### 1. Tests Fail Due to Missing DOM Elements

**Problem:** Tests fail because required DOM elements don't exist

**Solution:** Ensure `setupDOM()` is called in `beforeEach()`:
```javascript
beforeEach(() => {
    setupDOM();
    // other setup code
});
```

#### 2. localStorage Mock Not Working

**Problem:** localStorage calls are not being mocked

**Solution:** Verify localStorage mock setup in setup.js:
```javascript
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});
```

#### 3. Event Handlers Not Triggered

**Problem:** Simulated events don't trigger expected behavior

**Solution:** Use proper event simulation:
```javascript
const event = new Event('click', { bubbles: true, cancelable: true });
element.dispatchEvent(event);
```

#### 4. Asynchronous Test Failures

**Problem:** Tests fail due to timing issues with DOM updates

**Solution:** Use `waitForDOMUpdate()` helper:
```javascript
await waitForDOMUpdate();
// assertions here
```

### Debugging Tips

1. **Use console.log in tests:**
   ```javascript
   test('debugging test', () => {
       console.log('Current todos:', app.todos);
       console.log('DOM content:', document.body.innerHTML);
   });
   ```

2. **Check mock calls:**
   ```javascript
   console.log('localStorage.setItem calls:', localStorage.setItem.mock.calls);
   ```

3. **Inspect DOM state:**
   ```javascript
   console.log('Active element:', document.activeElement);
   console.log('Event listeners:', element.onclick);
   ```

### Performance Considerations

1. **Optimize test setup:**
   - Only create necessary DOM elements
   - Reuse setup code across tests
   - Clean up after each test

2. **Mock expensive operations:**
   - Mock Date.now() for consistent timestamps
   - Mock timers for time-dependent tests
   - Use lightweight mock objects

## Contributing

When adding new tests:

1. **Follow existing patterns** for consistency
2. **Write descriptive test names** that explain what is being tested
3. **Cover both happy path and edge cases**
4. **Add appropriate mocking** for external dependencies
5. **Update documentation** if adding new test categories

## Continuous Integration

The test suite is designed to work with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v1
```

This comprehensive test suite ensures the TodoApp functions correctly across all scenarios and maintains high code quality standards.