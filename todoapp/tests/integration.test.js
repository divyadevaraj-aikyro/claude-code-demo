/**
 * Integration Tests for DOM Interactions
 * This file contains tests for DOM interactions, event handling, and user workflows.
 */

describe('DOM Integration Tests', () => {
    let app;

    beforeEach(() => {
        app = new TodoApp();
        jest.clearAllMocks();
    });

    describe('Form Submission Integration', () => {
        test('should add todo when form is submitted', () => {
            const todoInput = document.getElementById('todo-input');
            const prioritySelect = document.getElementById('priority-select');
            const form = document.getElementById('todo-form');

            todoInput.value = 'Test todo from form';
            prioritySelect.value = 'high';

            simulateFormSubmit(form);

            expect(app.todos).toHaveLength(1);
            expect(app.todos[0].text).toBe('Test todo from form');
            expect(app.todos[0].priority).toBe('high');
            expect(todoInput.value).toBe('');
            expect(prioritySelect.value).toBe('medium');
        });

        test('should prevent default form submission behavior', () => {
            const form = document.getElementById('todo-form');
            const submitEvent = simulateFormSubmit(form);

            expect(submitEvent.preventDefault).toHaveBeenCalled();
        });

        test('should not add todo when form is submitted with empty input', () => {
            const todoInput = document.getElementById('todo-input');
            const form = document.getElementById('todo-form');

            todoInput.value = '';
            simulateFormSubmit(form);

            expect(app.todos).toHaveLength(0);
        });

        test('should not add todo when form is submitted with whitespace-only input', () => {
            const todoInput = document.getElementById('todo-input');
            const form = document.getElementById('todo-form');

            todoInput.value = '   \t\n   ';
            simulateFormSubmit(form);

            expect(app.todos).toHaveLength(0);
        });
    });

    describe('Filter Button Integration', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo', completed: true })
            ];
        });

        test('should set filter to all when All button is clicked', () => {
            const allButton = document.querySelector('[data-filter="all"]');
            triggerEvent(allButton, 'click');

            expect(app.currentFilter).toBe('all');
            expect(allButton.classList.contains('active')).toBe(true);
        });

        test('should set filter to active when Active button is clicked', () => {
            const activeButton = document.querySelector('[data-filter="active"]');
            triggerEvent(activeButton, 'click');

            expect(app.currentFilter).toBe('active');
            expect(activeButton.classList.contains('active')).toBe(true);
        });

        test('should set filter to completed when Completed button is clicked', () => {
            const completedButton = document.querySelector('[data-filter="completed"]');
            triggerEvent(completedButton, 'click');

            expect(app.currentFilter).toBe('completed');
            expect(completedButton.classList.contains('active')).toBe(true);
        });

        test('should update active class correctly when switching filters', () => {
            const allButton = document.querySelector('[data-filter="all"]');
            const activeButton = document.querySelector('[data-filter="active"]');

            triggerEvent(activeButton, 'click');
            expect(allButton.classList.contains('active')).toBe(false);
            expect(activeButton.classList.contains('active')).toBe(true);

            triggerEvent(allButton, 'click');
            expect(allButton.classList.contains('active')).toBe(true);
            expect(activeButton.classList.contains('active')).toBe(false);
        });
    });

    describe('Todo Item Interaction Integration', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Test todo', completed: false, priority: 'high' })
            ];
            app.render(); // Render to create DOM elements
        });

        test('should toggle todo when checkbox is clicked', () => {
            const checkbox = document.querySelector('.todo-checkbox');
            expect(checkbox.checked).toBe(false);

            triggerEvent(checkbox, 'change');

            expect(app.todos[0].completed).toBe(true);
        });

        test('should delete todo when delete button is clicked', () => {
            const deleteButton = document.querySelector('.todo-delete');
            triggerEvent(deleteButton, 'click');

            expect(app.todos).toHaveLength(0);
        });

        test('should start editing todo when edit button is clicked', () => {
            const editButton = document.querySelector('.todo-edit');
            const todoTextElement = document.querySelector('.todo-text');

            expect(todoTextElement).toBeTruthy();

            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            expect(editInput).toBeTruthy();
            expect(editInput.value).toBe('Test todo');
            expect(todoTextElement.parentElement).toBeNull();
        });

        test('should have correct priority styling', () => {
            const todoItem = document.querySelector('.todo-item');
            const priorityBadge = document.querySelector('.priority-badge');

            expect(todoItem.classList.contains('priority-high')).toBe(true);
            expect(priorityBadge.textContent).toBe('high');
        });

        test('should have correct completed state styling', () => {
            const todoItem = document.querySelector('.todo-item');

            expect(todoItem.classList.contains('completed')).toBe(false);

            // Toggle the todo
            app.todos[0].completed = true;
            app.render();

            const updatedTodoItem = document.querySelector('.todo-item');
            expect(updatedTodoItem.classList.contains('completed')).toBe(true);
        });
    });

    describe('Inline Editing Integration', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Original text', completed: false })
            ];
            app.render();
        });

        test('should save edit when Enter key is pressed', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, 'Updated text');

            const keydownEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                bubbles: true,
                cancelable: true
            });
            editInput.dispatchEvent(keydownEvent);

            expect(app.todos[0].text).toBe('Updated text');
            expect(app.todos[0].updatedAt).toBeTruthy();
        });

        test('should cancel edit when Escape key is pressed', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, 'Updated text');

            const keydownEvent = new KeyboardEvent('keydown', {
                key: 'Escape',
                bubbles: true,
                cancelable: true
            });
            editInput.dispatchEvent(keydownEvent);

            expect(app.todos[0].text).toBe('Original text');
            expect(app.todos[0].updatedAt).toBeUndefined();
        });

        test('should save edit when input loses focus (blur event)', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, 'Updated text');

            triggerEvent(editInput, 'blur');

            expect(app.todos[0].text).toBe('Updated text');
        });

        test('should not save edit if new text is empty', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, '   '); // Whitespace only

            triggerEvent(editInput, 'blur');

            expect(app.todos[0].text).toBe('Original text');
        });

        test('should not save edit if text has not changed', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, 'Original text'); // Same text

            triggerEvent(editInput, 'blur');

            expect(app.todos[0].text).toBe('Original text');
            expect(app.todos[0].updatedAt).toBeUndefined();
        });

        test('should trim whitespace from edited text', () => {
            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, '  Updated text with spaces  ');

            triggerEvent(editInput, 'blur');

            expect(app.todos[0].text).toBe('Updated text with spaces');
        });
    });

    describe('Clear Actions Integration', () => {
        beforeEach(() => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo', completed: false }),
                createMockTodo({ id: 2, text: 'Completed todo 1', completed: true }),
                createMockTodo({ id: 3, text: 'Completed todo 2', completed: true })
            ];
        });

        test('should clear completed todos when button is clicked', () => {
            const clearCompletedButton = document.getElementById('clear-completed');
            triggerEvent(clearCompletedButton, 'click');

            expect(app.todos).toHaveLength(1);
            expect(app.todos[0].completed).toBe(false);
        });

        test('should show confirmation dialog when Clear All button is clicked', () => {
            global.confirm.mockReturnValue(true);

            const clearAllButton = document.getElementById('clear-all');
            triggerEvent(clearAllButton, 'click');

            expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete all todos?');
        });

        test('should clear all todos when user confirms', () => {
            global.confirm.mockReturnValue(true);

            const clearAllButton = document.getElementById('clear-all');
            triggerEvent(clearAllButton, 'click');

            expect(app.todos).toHaveLength(0);
        });

        test('should not clear all todos when user cancels', () => {
            global.confirm.mockReturnValue(false);

            const clearAllButton = document.getElementById('clear-all');
            triggerEvent(clearAllButton, 'click');

            expect(app.todos).toHaveLength(3);
        });

        test('should handle clear completed when no completed todos exist', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo 1', completed: false }),
                createMockTodo({ id: 2, text: 'Active todo 2', completed: false })
            ];

            const clearCompletedButton = document.getElementById('clear-completed');
            const originalLength = app.todos.length;

            triggerEvent(clearCompletedButton, 'click');

            expect(app.todos).toHaveLength(originalLength);
        });
    });

    describe('Statistics Display Integration', () => {
        test('should update statistics when todos are added', () => {
            app.todoInput.value = 'Test todo';
            app.addTodo();

            expect(document.getElementById('total-count').textContent).toBe('Total: 1');
            expect(document.getElementById('completed-count').textContent).toBe('Completed: 0');
            expect(document.getElementById('remaining-count').textContent).toBe('Remaining: 1');
        });

        test('should update statistics when todos are toggled', () => {
            app.todoInput.value = 'Test todo';
            app.addTodo();
            app.toggleTodo(app.todos[0].id);

            expect(document.getElementById('total-count').textContent).toBe('Total: 1');
            expect(document.getElementById('completed-count').textContent).toBe('Completed: 1');
            expect(document.getElementById('remaining-count').textContent).toBe('Remaining: 0');
        });

        test('should update statistics when todos are deleted', () => {
            app.todoInput.value = 'Test todo 1';
            app.addTodo();
            app.todoInput.value = 'Test todo 2';
            app.addTodo();
            app.deleteTodo(app.todos[1].id);

            expect(document.getElementById('total-count').textContent).toBe('Total: 1');
            expect(document.getElementById('completed-count').textContent).toBe('Completed: 0');
            expect(document.getElementById('remaining-count').textContent).toBe('Remaining: 1');
        });

        test('should display correct statistics for mixed todo states', () => {
            // Add active todos
            app.todoInput.value = 'Active 1';
            app.addTodo();
            app.todoInput.value = 'Active 2';
            app.addTodo();

            // Add completed todo
            app.todoInput.value = 'Completed todo';
            app.addTodo();
            app.toggleTodo(app.todos[0].id);

            expect(document.getElementById('total-count').textContent).toBe('Total: 3');
            expect(document.getElementById('completed-count').textContent).toBe('Completed: 1');
            expect(document.getElementById('remaining-count').textContent).toBe('Remaining: 2');
        });
    });

    describe('Empty State Integration', () => {
        test('should display empty state when no todos exist', () => {
            app.todos = [];
            app.render();

            const todoList = document.getElementById('todo-list');
            expect(todoList.innerHTML).toBe('<li class="empty-state">No todos to display</li>');
        });

        test('should display empty state when all todos are filtered out', () => {
            app.todos = [
                createMockTodo({ id: 1, text: 'Active todo', completed: false })
            ];
            app.currentFilter = 'completed';
            app.render();

            const todoList = document.getElementById('todo-list');
            expect(todoList.innerHTML).toBe('<li class="empty-state">No todos to display</li>');
        });

        test('should hide empty state when todos are added', () => {
            app.todos = [];
            app.render();

            app.todoInput.value = 'Test todo';
            app.addTodo();

            const todoList = document.getElementById('todo-list');
            expect(todoList.innerHTML).not.toContain('No todos to display');
            expect(todoList.querySelectorAll('.todo-item')).toHaveLength(1);
        });
    });

    describe('Complete User Workflow Integration', () => {
        test('should handle complete todo management workflow', async () => {
            // 1. Add multiple todos with different priorities
            app.todoInput.value = 'High priority task';
            app.prioritySelect.value = 'high';
            app.addTodo();

            app.todoInput.value = 'Low priority task';
            app.prioritySelect.value = 'low';
            app.addTodo();

            app.todoInput.value = 'Medium priority task';
            app.prioritySelect.value = 'medium';
            app.addTodo();

            expect(app.todos).toHaveLength(3);

            // 2. Check initial rendering
            let todoItems = document.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(3);

            // 3. Toggle first todo to completed
            const firstCheckbox = document.querySelector('.todo-checkbox');
            triggerEvent(firstCheckbox, 'change');
            expect(app.todos[2].completed).toBe(true); // Last added (unshift)

            // 4. Filter to show only active todos
            const activeButton = document.querySelector('[data-filter="active"]');
            triggerEvent(activeButton, 'click');
            expect(app.currentFilter).toBe('active');

            todoItems = document.querySelectorAll('.todo-item');
            expect(todoItems).toHaveLength(2);

            // 5. Edit second todo
            const editButton = document.querySelectorAll('.todo-edit')[1]; // Second todo
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            simulateInput(editInput, 'Updated low priority task');
            triggerEvent(editInput, 'blur');

            expect(app.todos[1].text).toBe('Updated low priority task');

            // 6. Clear completed todos
            const clearCompletedButton = document.getElementById('clear-completed');
            triggerEvent(clearCompletedButton, 'click');

            expect(app.todos).toHaveLength(2);
            expect(app.todos.every(todo => !todo.completed)).toBe(true);

            // 7. Clear all todos
            global.confirm.mockReturnValue(true);
            const clearAllButton = document.getElementById('clear-all');
            triggerEvent(clearAllButton, 'click');

            expect(app.todos).toHaveLength(0);
        });

        test('should handle error scenarios gracefully', () => {
            // Test editing non-existent todo
            app.startEditTodo(999);
            expect(document.querySelector('.todo-edit-input')).toBeNull();

            // Test toggling non-existent todo
            const originalLength = app.todos.length;
            app.toggleTodo(999);
            expect(app.todos).toHaveLength(originalLength);

            // Test deleting non-existent todo
            app.deleteTodo(999);
            expect(app.todos).toHaveLength(originalLength);
        });

        test('should handle rapid user interactions', () => {
            // Rapidly add multiple todos
            for (let i = 0; i < 5; i++) {
                app.todoInput.value = `Todo ${i}`;
                app.addTodo();
            }

            expect(app.todos).toHaveLength(5);

            // Rapidly toggle multiple todos
            const checkboxes = document.querySelectorAll('.todo-checkbox');
            checkboxes.forEach((checkbox, index) => {
                if (index % 2 === 0) {
                    triggerEvent(checkbox, 'change');
                }
            });

            // Check that some todos are completed
            const completedCount = app.todos.filter(todo => todo.completed).length;
            expect(completedCount).toBeGreaterThan(0);
            expect(completedCount).toBeLessThan(5);
        });
    });

    describe('Accessibility Integration', () => {
        test('should maintain focus management during editing', () => {
            app.todoInput.value = 'Test todo';
            app.addTodo();

            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');
            expect(document.activeElement).toBe(editInput);
        });

        test('should handle keyboard navigation', () => {
            app.todoInput.value = 'Test todo';
            app.addTodo();

            const editButton = document.querySelector('.todo-edit');
            triggerEvent(editButton, 'click');

            const editInput = document.querySelector('.todo-edit-input');

            // Test Enter key
            simulateInput(editInput, 'Updated text');
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            editInput.dispatchEvent(enterEvent);

            expect(app.todos[0].text).toBe('Updated text');
        });

        test('should preserve button states and aria attributes', () => {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                expect(button.hasAttribute('data-filter')).toBe(true);
            });

            const activeButton = document.querySelector('[data-filter="active"]');
            triggerEvent(activeButton, 'click');
            expect(activeButton.classList.contains('active')).toBe(true);
        });
    });
});