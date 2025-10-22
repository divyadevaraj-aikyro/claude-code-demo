/**
 * Comprehensive Unit Tests for TodoApp Class
 * This file contains tests for all methods and functionality of the TodoApp class.
 */

// We need to import the script in a way that works with our test setup
require('../script.js');

describe('TodoApp', () => {
    let app;
    let mockTodos;

    beforeEach(() => {
        // Reset mock todos for each test
        mockTodos = [];

        // Create new TodoApp instance
        app = new TodoApp();
    });

    describe('Constructor', () => {
        test('should initialize with empty todos array when localStorage is empty', () => {
            expect(app.todos).toEqual([]);
            expect(app.currentFilter).toBe('all');
            expect(app.priorities).toEqual(['low', 'medium', 'high']);
        });

        test('should load todos from localStorage when available', () => {
            const savedTodos = [
                createMockTodo({ id: 1, text: 'Saved todo 1' }),
                createMockTodo({ id: 2, text: 'Saved todo 2' })
            ];

            localStorage.getItem.mockReturnValue(JSON.stringify(savedTodos));

            const appWithSavedTodos = new TodoApp();

            expect(appWithSavedTodos.todos).toEqual(savedTodos);
        });

        test('should initialize DOM elements correctly', () => {
            expect(app.todoForm).toBeTruthy();
            expect(app.todoInput).toBeTruthy();
            expect(app.prioritySelect).toBeTruthy();
            expect(app.todoList).toBeTruthy();
            expect(app.totalCount).toBeTruthy();
            expect(app.completedCount).toBeTruthy();
            expect(app.remainingCount).toBeTruthy();
            expect(app.filterButtons).toBeTruthy();
            expect(app.clearCompletedBtn).toBeTruthy();
            expect(app.clearAllBtn).toBeTruthy();
        });
    });

    describe('addTodo', () => {
        test('should add a new todo with default medium priority', () => {
            const todoText = 'New test todo';
            app.todoInput.value = todoText;

            app.addTodo();

            expect(app.todos).toHaveLength(1);
            expect(app.todos[0].text).toBe(todoText);
            expect(app.todos[0].completed).toBe(false);
            expect(app.todos[0].priority).toBe('medium');
            expect(app.todos[0].id).toBeTypeOf('number');
            expect(app.todos[0].createdAt).toBeTypeOf('string');
        });

        test('should add a new todo with custom priority', () => {
            const todoText = 'High priority todo';
            app.todoInput.value = todoText;
            app.prioritySelect.value = 'high';

            app.addTodo();

            expect(app.todos[0].priority).toBe('high');
        });

        test('should not add todo when input is empty', () => {
            app.todoInput.value = '   '; // Whitespace only

            app.addTodo();

            expect(app.todos).toHaveLength(0);
            expect(localStorage.setItem).not.toHaveBeenCalled();
        });

        test('should add todo to the beginning of the array', () => {
            // Add initial todo
            app.todos.push(createMockTodo({ id: 1, text: 'First todo' }));

            // Add new todo
            app.todoInput.value = 'New todo';
            app.addTodo();

            expect(app.todos).toHaveLength(2);
            expect(app.todos[0].text).toBe('New todo');
            expect(app.todos[1].text).toBe('First todo');
        });

        test('should reset input fields after adding todo', () => {
            app.todoInput.value = 'Test todo';
            app.prioritySelect.value = 'high';

            app.addTodo();

            expect(app.todoInput.value).toBe('');
            expect(app.prioritySelect.value).toBe('medium');
        });

        test('should save todos to localStorage after adding', () => {
            app.todoInput.value = 'Test todo';
            app.addTodo();

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should call render after adding todo', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.todoInput.value = 'Test todo';
            app.addTodo();

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('deleteTodo', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Todo 1' }),
                createMockTodo({ id: 2, text: 'Todo 2' }),
                createMockTodo({ id: 3, text: 'Todo 3' })
            ];
        });

        test('should delete todo by id', () => {
            app.deleteTodo(2);

            expect(app.todos).toHaveLength(2);
            expect(app.todos.find(t => t.id === 2)).toBeUndefined();
            expect(app.todos.map(t => t.id)).toEqual([1, 3]);
        });

        test('should not delete any todo if id is not found', () => {
            const originalLength = app.todos.length;
            app.deleteTodo(999);

            expect(app.todos).toHaveLength(originalLength);
        });

        test('should save todos to localStorage after deleting', () => {
            app.deleteTodo(2);

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should call render after deleting todo', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.deleteTodo(2);

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('toggleTodo', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Todo 2', completed: true })
            ];
        });

        test('should toggle completed status from false to true', () => {
            app.toggleTodo(1);

            expect(app.todos.find(t => t.id === 1).completed).toBe(true);
        });

        test('should toggle completed status from true to false', () => {
            app.toggleTodo(2);

            expect(app.todos.find(t => t.id === 2).completed).toBe(false);
        });

        test('should not change anything if todo id is not found', () => {
            const originalTodos = [...app.todos];
            app.toggleTodo(999);

            expect(app.todos).toEqual(originalTodos);
        });

        test('should save todos to localStorage after toggling', () => {
            app.toggleTodo(1);

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should call render after toggling todo', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.toggleTodo(1);

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('editTodo', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Original text', completed: false })
            ];
        });

        test('should update todo text', () => {
            const newText = 'Updated text';
            app.editTodo(1, newText);

            expect(app.todos.find(t => t.id === 1).text).toBe(newText);
        });

        test('should add updatedAt timestamp when editing', () => {
            app.editTodo(1, 'Updated text');

            const todo = app.todos.find(t => t.id === 1);
            expect(todo.updatedAt).toBeTypeOf('string');
        });

        test('should not update if todo id is not found', () => {
            const originalText = app.todos[0].text;
            app.editTodo(999, 'Updated text');

            expect(app.todos[0].text).toBe(originalText);
        });

        test('should not update if new text is empty', () => {
            const originalText = app.todos[0].text;
            app.editTodo(1, '   ');

            expect(app.todos[0].text).toBe(originalText);
        });

        test('should not update if new text is whitespace only', () => {
            const originalText = app.todos[0].text;
            app.editTodo(1, '   ');

            expect(app.todos[0].text).toBe(originalText);
        });

        test('should trim whitespace from new text', () => {
            app.editTodo(1, '  Updated text with spaces  ');

            expect(app.todos.find(t => t.id === 1).text).toBe('Updated text with spaces');
        });

        test('should save todos to localStorage after editing', () => {
            app.editTodo(1, 'Updated text');

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should call render after editing todo', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.editTodo(1, 'Updated text');

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('startEditTodo', () => {
        beforeEach(() => {
            app.todos = [createMockTodo({ id: 1, text: 'Test todo' })];
            app.render(); // Create DOM elements
        });

        test('should replace todo text element with input element', () => {
            const todoTextElement = document.querySelector('.todo-text[data-id="1"]');
            expect(todoTextElement).toBeTruthy();

            app.startEditTodo(1);

            const editInput = document.querySelector('.todo-edit-input');
            expect(editInput).toBeTruthy();
            expect(editInput.value).toBe('Test todo');
            expect(todoTextElement.parentElement).toBeNull(); // Original element removed
        });

        test('should focus and select the input text', () => {
            const editInput = document.createElement('input');
            const focusSpy = jest.spyOn(editInput, 'focus');
            const selectSpy = jest.spyOn(editInput, 'select');

            app.startEditTodo(1);

            const createdInput = document.querySelector('.todo-edit-input');
            expect(focusSpy).toHaveBeenCalled();
            expect(selectSpy).toHaveBeenCalled();
        });

        test('should not do anything if todo is not found', () => {
            const todoTextElement = document.querySelector('.todo-text[data-id="1"]');
            app.startEditTodo(999);

            expect(todoTextElement).toBeTruthy(); // Element still exists
        });

        test('should not do anything if todo text element is not found', () => {
            const todoTextElement = document.querySelector('.todo-text[data-id="1"]');
            todoTextElement.remove();

            app.startEditTodo(1);

            expect(document.querySelector('.todo-edit-input')).toBeNull();
        });
    });

    describe('setFilter', () => {
        test('should set current filter to all', () => {
            app.setFilter('all');
            expect(app.currentFilter).toBe('all');
        });

        test('should set current filter to active', () => {
            app.setFilter('active');
            expect(app.currentFilter).toBe('active');
        });

        test('should set current filter to completed', () => {
            app.setFilter('completed');
            expect(app.currentFilter).toBe('completed');
        });

        test('should update active class on filter buttons', () => {
            const allButton = document.querySelector('[data-filter="all"]');
            const activeButton = document.querySelector('[data-filter="active"]');

            app.setFilter('active');

            expect(allButton.classList.contains('active')).toBe(false);
            expect(activeButton.classList.contains('active')).toBe(true);
        });

        test('should call render after setting filter', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.setFilter('completed');

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('getFilteredTodos', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo 1', completed: true }),
                createMockTodo({ id: 3, text: 'Active todo 2', completed: false }),
                createMockTodo({ id: 4, text: 'Completed todo 2', completed: true })
            ];
        });

        test('should return all todos when filter is all', () => {
            app.currentFilter = 'all';
            const filtered = app.getFilteredTodos();

            expect(filtered).toHaveLength(4);
        });

        test('should return only active todos when filter is active', () => {
            app.currentFilter = 'active';
            const filtered = app.getFilteredTodos();

            expect(filtered).toHaveLength(2);
            expect(filtered.every(todo => !todo.completed)).toBe(true);
        });

        test('should return only completed todos when filter is completed', () => {
            app.currentFilter = 'completed';
            const filtered = app.getFilteredTodos();

            expect(filtered).toHaveLength(2);
            expect(filtered.every(todo => todo.completed)).toBe(true);
        });

        test('should return all todos for unknown filter', () => {
            app.currentFilter = 'unknown';
            const filtered = app.getFilteredTodos();

            expect(filtered).toHaveLength(4);
        });
    });

    describe('clearCompleted', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo 1', completed: true }),
                createMockTodo({ id: 3, text: 'Active todo 2', completed: false }),
                createMockTodo({ id: 4, text: 'Completed todo 2', completed: true })
            ];
        });

        test('should remove all completed todos', () => {
            app.clearCompleted();

            expect(app.todos).toHaveLength(2);
            expect(app.todos.every(todo => !todo.completed)).toBe(true);
            expect(app.todos.map(t => t.id)).toEqual([1, 3]);
        });

        test('should save todos to localStorage after clearing', () => {
            app.clearCompleted();

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should call render after clearing completed todos', () => {
            const renderSpy = jest.spyOn(app, 'render');

            app.clearCompleted();

            expect(renderSpy).toHaveBeenCalled();
        });

        test('should do nothing if no completed todos', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Active todo 2', completed: false })
            ];

            const originalTodos = [...app.todos];
            app.clearCompleted();

            expect(app.todos).toEqual(originalTodos);
        });
    });

    describe('clearAll', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Todo 2', completed: true })
            ];
        });

        test('should clear all todos when user confirms', () => {
            global.confirm.mockReturnValue(true);

            app.clearAll();

            expect(app.todos).toHaveLength(0);
            expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete all todos?');
        });

        test('should not clear todos when user cancels', () => {
            global.confirm.mockReturnValue(false);

            const originalTodos = [...app.todos];
            app.clearAll();

            expect(app.todos).toEqual(originalTodos);
            expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete all todos?');
        });

        test('should save todos to localStorage after clearing all', () => {
            global.confirm.mockReturnValue(true);

            app.clearAll();

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify([]));
        });

        test('should call render after clearing all todos', () => {
            const renderSpy = jest.spyOn(app, 'render');
            global.confirm.mockReturnValue(true);

            app.clearAll();

            expect(renderSpy).toHaveBeenCalled();
        });
    });

    describe('updateStats', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo 1', completed: true }),
                createMockTodo({ id: 3, text: 'Active todo 2', completed: false }),
                createMockTodo({ id: 4, text: 'Completed todo 2', completed: true })
            ];
        });

        test('should update total count correctly', () => {
            app.updateStats();

            expect(app.totalCount.textContent).toBe('Total: 4');
        });

        test('should update completed count correctly', () => {
            app.updateStats();

            expect(app.completedCount.textContent).toBe('Completed: 2');
        });

        test('should update remaining count correctly', () => {
            app.updateStats();

            expect(app.remainingCount.textContent).toBe('Remaining: 2');
        });

        test('should handle empty todo list', () => {
            app.todos = [];
            app.updateStats();

            expect(app.totalCount.textContent).toBe('Total: 0');
            expect(app.completedCount.textContent).toBe('Completed: 0');
            expect(app.remainingCount.textContent).toBe('Remaining: 0');
        });

        test('should handle all todos completed', () => {
            app.todos.forEach(todo => todo.completed = true);
            app.updateStats();

            expect(app.totalCount.textContent).toBe('Total: 4');
            expect(app.completedCount.textContent).toBe('Completed: 4');
            expect(app.remainingCount.textContent).toBe('Remaining: 0');
        });

        test('should handle all todos active', () => {
            app.todos.forEach(todo => todo.completed = false);
            app.updateStats();

            expect(app.totalCount.textContent).toBe('Total: 4');
            expect(app.completedCount.textContent).toBe('Completed: 0');
            expect(app.remainingCount.textContent).toBe('Remaining: 4');
        });
    });

    describe('createTodoElement', () => {
        test('should create todo element with correct structure', () => {
            const todo = createMockTodo({
                id: 1,
                text: 'Test todo',
                completed: false,
                priority: 'high'
            });

            const element = app.createTodoElement(todo);

            expect(element.tagName).toBe('LI');
            expect(element.className).toContain('todo-item');
            expect(element.className).toContain('priority-high');
            expect(element.dataset.id).toBe('1');
        });

        test('should add completed class for completed todos', () => {
            const todo = createMockTodo({ id: 1, completed: true });
            const element = app.createTodoElement(todo);

            expect(element.className).toContain('completed');
        });

        test('should not add completed class for active todos', () => {
            const todo = createMockTodo({ id: 1, completed: false });
            const element = app.createTodoElement(todo);

            expect(element.className).not.toContain('completed');
        });

        test('should add correct priority class', () => {
            const lowPriorityTodo = createMockTodo({ priority: 'low' });
            const lowElement = app.createTodoElement(lowPriorityTodo);
            expect(lowElement.className).toContain('priority-low');

            const mediumPriorityTodo = createMockTodo({ priority: 'medium' });
            const mediumElement = app.createTodoElement(mediumPriorityTodo);
            expect(mediumElement.className).toContain('priority-medium');

            const highPriorityTodo = createMockTodo({ priority: 'high' });
            const highElement = app.createTodoElement(highPriorityTodo);
            expect(highElement.className).toContain('priority-high');
        });

        test('should have checkbox with correct checked state', () => {
            const completedTodo = createMockTodo({ id: 1, completed: true });
            const completedElement = app.createTodoElement(completedTodo);
            const checkbox = completedElement.querySelector('.todo-checkbox');
            expect(checkbox.checked).toBe(true);

            const activeTodo = createMockTodo({ id: 2, completed: false });
            const activeElement = app.createTodoElement(activeTodo);
            const activeCheckbox = activeElement.querySelector('.todo-checkbox');
            expect(activeCheckbox.checked).toBe(false);
        });

        test('should escape HTML in todo text', () => {
            const todo = createMockTodo({
                id: 1,
                text: '<script>alert("xss")</script>'
            });

            const element = app.createTodoElement(todo);
            const textElement = element.querySelector('.todo-text');

            expect(textElement.textContent).toBe('<script>alert("xss")</script>');
            expect(textElement.innerHTML).not.toContain('<script>');
        });

        test('should have priority badge with correct text', () => {
            const todo = createMockTodo({ priority: 'high' });
            const element = app.createTodoElement(todo);
            const badge = element.querySelector('.priority-badge');

            expect(badge.textContent).toBe('high');
        });

        test('should have edit and delete buttons', () => {
            const todo = createMockTodo({ id: 1 });
            const element = app.createTodoElement(todo);

            const editBtn = element.querySelector('.todo-edit');
            const deleteBtn = element.querySelector('.todo-delete');

            expect(editBtn).toBeTruthy();
            expect(deleteBtn).toBeTruthy();
        });

        test('should attach event listeners correctly', () => {
            const todo = createMockTodo({ id: 1 });
            const toggleSpy = jest.spyOn(app, 'toggleTodo');
            const deleteSpy = jest.spyOn(app, 'deleteTodo');
            const startEditSpy = jest.spyOn(app, 'startEditTodo');

            const element = app.createTodoElement(todo);

            const checkbox = element.querySelector('.todo-checkbox');
            const editBtn = element.querySelector('.todo-edit');
            const deleteBtn = element.querySelector('.todo-delete');

            // Trigger events
            checkbox.checked = true;
            triggerEvent(checkbox, 'change');
            triggerEvent(editBtn, 'click');
            triggerEvent(deleteBtn, 'click');

            expect(toggleSpy).toHaveBeenCalledWith(1);
            expect(deleteSpy).toHaveBeenCalledWith(1);
            expect(startEditSpy).toHaveBeenCalledWith(1);
        });
    });

    describe('escapeHtml', () => {
        test('should escape HTML special characters', () => {
            const textWithHtml = '<div>Test & "quotes"</div>';
            const escaped = app.escapeHtml(textWithHtml);

            expect(escaped).toBe('&lt;div&gt;Test &amp; &quot;quotes&quot;&lt;/div&gt;');
        });

        test('should escape script tags', () => {
            const scriptText = '<script>alert("xss")</script>';
            const escaped = app.escapeHtml(scriptText);

            expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
        });

        test('should handle empty string', () => {
            const escaped = app.escapeHtml('');
            expect(escaped).toBe('');
        });

        test('should handle null and undefined', () => {
            const nullEscaped = app.escapeHtml(null);
            expect(nullEscaped).toBe('null');

            const undefinedEscaped = app.escapeHtml(undefined);
            expect(undefinedEscaped).toBe('undefined');
        });

        test('should not escape normal text', () => {
            const normalText = 'This is normal text';
            const escaped = app.escapeHtml(normalText);

            expect(escaped).toBe(normalText);
        });

        test('should escape ampersand', () => {
            const ampersandText = 'Tom & Jerry';
            const escaped = app.escapeHtml(ampersandText);

            expect(escaped).toBe('Tom &amp; Jerry');
        });

        test('should escape quotes', () => {
            const quotesText = 'Say "Hello" to the world';
            const escaped = app.escapeHtml(quotesText);

            expect(escaped).toBe('Say &quot;Hello&quot; to the world');
        });
    });

    describe('render', () => {
        test('should render empty state when no todos', () => {
            app.todos = [];
            app.render();

            expect(app.todoList.innerHTML).toBe('<li class="empty-state">No todos to display</li>');
        });

        test('should render all todos when filter is all', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Todo 1' }),
                createMockTodo({ id: 2, text: 'Todo 2' })
            ];
            app.currentFilter = 'all';
            app.render();

            const todoItems = app.todoList.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(2);
        });

        test('should render only active todos when filter is active', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo', completed: true })
            ];
            app.currentFilter = 'active';
            app.render();

            const todoItems = app.todoList.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(1);
            expect(todoItems[0].textContent).toContain('Active todo');
        });

        test('should render only completed todos when filter is completed', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo', completed: true })
            ];
            app.currentFilter = 'completed';
            app.render();

            const todoItems = app.todoList.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(1);
            expect(todoItems[0].textContent).toContain('Completed todo');
        });

        test('should call updateStats after rendering', () => {
            const updateStatsSpy = jest.spyOn(app, 'updateStats');

            app.render();

            expect(updateStatsSpy).toHaveBeenCalled();
        });

        test('should clear todo list before rendering', () => {
            app.todoList.innerHTML = '<li>Old content</li>';
            app.todos = [createMockTodo({ id: 1, text: 'New todo' })];
            app.render();

            const todoItems = app.todoList.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(1);
            expect(app.todoList.textContent).not.toContain('Old content');
        });
    });

    describe('saveTodos', () => {
        test('should save todos to localStorage as JSON', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Todo 1' }),
                createMockTodo({ id: 2, text: 'Todo 2' })
            ];

            app.saveTodos();

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(app.todos));
        });

        test('should save empty array when no todos', () => {
            app.todos = [];
            app.saveTodos();

            expect(localStorage.setItem).toHaveBeenCalledWith('todos', '[]');
        });
    });

    describe('Integration Tests', () => {
        test('should handle complete todo workflow', () => {
            // Add todo
            app.todoInput.value = 'Integration test todo';
            app.prioritySelect.value = 'high';
            app.addTodo();

            expect(app.todos).toHaveLength(1);
            expect(app.todos[0].text).toBe('Integration test todo');
            expect(app.todos[0].priority).toBe('high');

            // Toggle todo
            app.toggleTodo(app.todos[0].id);
            expect(app.todos[0].completed).toBe(true);

            // Edit todo
            app.editTodo(app.todos[0].id, 'Updated integration todo');
            expect(app.todos[0].text).toBe('Updated integration todo');
            expect(app.todos[0].updatedAt).toBeTruthy();

            // Set filter to completed
            app.setFilter('completed');
            const filteredTodos = app.getFilteredTodos();
            expect(filteredTodos).toHaveLength(1);

            // Delete todo
            app.deleteTodo(app.todos[0].id);
            expect(app.todos).toHaveLength(0);
        });

        test('should handle filtering and clearing correctly', () => {
            // Create mixed todos
            app.todos = [
                createMockTodo({ id: 1, text: 'Active 1', completed: false }),
                createMockTodo({ id: 2, text: 'Active 2', completed: false }),
                createMockTodo({ id: 3, text: 'Completed 1', completed: true }),
                createMockTodo({ id: 4, text: 'Completed 2', completed: true })
            ];

            // Test active filter
            app.setFilter('active');
            expect(app.getFilteredTodos()).toHaveLength(2);

            // Test completed filter
            app.setFilter('completed');
            expect(app.getFilteredTodos()).toHaveLength(2);

            // Test all filter
            app.setFilter('all');
            expect(app.getFilteredTodos()).toHaveLength(4);

            // Clear completed
            app.clearCompleted();
            expect(app.todos).toHaveLength(2);
            expect(app.todos.every(t => !t.completed)).toBe(true);
        });

        test('should handle priority system correctly', () => {
            // Add todos with different priorities
            app.todoInput.value = 'Low priority';
            app.prioritySelect.value = 'low';
            app.addTodo();

            app.todoInput.value = 'Medium priority';
            app.prioritySelect.value = 'medium';
            app.addTodo();

            app.todoInput.value = 'High priority';
            app.prioritySelect.value = 'high';
            app.addTodo();

            expect(app.todos).toHaveLength(3);
            expect(app.todos[2].priority).toBe('low'); // First added
            expect(app.todos[1].priority).toBe('medium');
            expect(app.todos[0].priority).toBe('high'); // Last added (unshift)
        });

        test('should handle edge cases and error conditions', () => {
            // Test adding empty todo
            app.todoInput.value = '';
            app.addTodo();
            expect(app.todos).toHaveLength(0);

            // Test adding whitespace-only todo
            app.todoInput.value = '   ';
            app.addTodo();
            expect(app.todos).toHaveLength(0);

            // Test editing with empty text
            app.todos = [createMockTodo({ id: 1, text: 'Original' })];
            app.editTodo(1, '');
            expect(app.todos[0].text).toBe('Original');

            // Test editing non-existent todo
            app.editTodo(999, 'New text');
            expect(app.todos).toHaveLength(1);

            // Test deleting non-existent todo
            const originalLength = app.todos.length;
            app.deleteTodo(999);
            expect(app.todos).toHaveLength(originalLength);
        });
    });
});