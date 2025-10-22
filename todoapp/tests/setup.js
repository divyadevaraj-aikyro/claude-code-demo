/**
 * Test Setup File
 * This file sets up the testing environment for the TodoApp unit tests.
 * It mocks DOM elements and localStorage functionality needed for testing.
 */

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
};

// Set localStorage mock globally
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

// Mock confirm dialog
global.confirm = jest.fn();

// Mock alert dialog
global.alert = jest.fn();

// Create basic HTML structure similar to index.html
const setupDOM = () => {
    // Clear existing body content
    document.body.innerHTML = '';

    // Create main container
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    // Create header
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="header-content">
            <h1>My Todo List</h1>
            <button id="theme-toggle" class="theme-toggle" title="Toggle dark mode">
                <span class="theme-icon">🌙</span>
            </button>
        </div>
    `;
    container.appendChild(header);

    // Create main section
    const main = document.createElement('main');

    // Create todo input section
    const todoInputSection = document.createElement('section');
    todoInputSection.className = 'todo-input';
    todoInputSection.innerHTML = `
        <form id="todo-form">
            <div class="input-row">
                <input
                    type="text"
                    id="todo-input"
                    placeholder="Add a new task..."
                    required
                    autocomplete="off"
                >
                <select id="priority-select" class="priority-select">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" id="add-btn">Add</button>
            </div>
        </form>
    `;
    main.appendChild(todoInputSection);

    // Create stats section
    const statsSection = document.createElement('section');
    statsSection.className = 'todo-stats';
    statsSection.innerHTML = `
        <span id="total-count">Total: 0</span>
        <span id="completed-count">Completed: 0</span>
        <span id="remaining-count">Remaining: 0</span>
    `;
    main.appendChild(statsSection);

    // Create filters section
    const filtersSection = document.createElement('section');
    filtersSection.className = 'todo-filters';
    filtersSection.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="active">Active</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
    `;
    main.appendChild(filtersSection);

    // Create todo list section
    const todoListSection = document.createElement('section');
    todoListSection.className = 'todo-list';
    todoListSection.innerHTML = '<ul id="todo-list"></ul>';
    main.appendChild(todoListSection);

    // Create actions section
    const actionsSection = document.createElement('section');
    actionsSection.className = 'todo-actions';
    actionsSection.innerHTML = `
        <button id="clear-completed">Clear Completed</button>
        <button id="clear-all">Clear All</button>
    `;
    main.appendChild(actionsSection);

    container.appendChild(main);
};

// Set up DOM before each test
beforeEach(() => {
    setupDOM();

    // Reset localStorage mock
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.key.mockClear();
    localStorageMock.length = 0;

    // Reset confirm mock
    global.confirm.mockClear();
    global.alert.mockClear();

    // Set default behavior for localStorage.getItem
    localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'todos') {
            return '[]'; // Return empty array by default
        }
        return null;
    });
});

// Helper function to create a TodoApp instance for testing
global.createTodoApp = (initialTodos = []) => {
    // Set up initial todos if provided
    if (initialTodos.length > 0) {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'todos') {
                return JSON.stringify(initialTodos);
            }
            return null;
        });
    }

    // Create TodoApp instance
    const TodoApp = require('../script.js');
    return new TodoApp();
};

// Helper function to create mock todo items
global.createMockTodo = (overrides = {}) => {
    return {
        id: Date.now(),
        text: 'Test todo',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        ...overrides
    };
};

// Helper function to wait for DOM updates
global.waitForDOMUpdate = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper function to trigger DOM events
global.triggerEvent = (element, eventType, eventInit = {}) => {
    const event = new Event(eventType, { bubbles: true, cancelable: true, ...eventInit });
    element.dispatchEvent(event);
    return event;
};

// Helper function to simulate user input
global.simulateInput = (element, value) => {
    element.value = value;
    triggerEvent(element, 'input');
    return element;
};

// Helper function to simulate form submission
global.simulateFormSubmit = (form) => {
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    submitEvent.preventDefault = jest.fn();
    form.dispatchEvent(submitEvent);
    return submitEvent;
};

// Console log to confirm setup is loaded
console.log('Test setup completed');