/**
 * Unit Tests for Utility Functions
 * This file contains tests for utility functions used in the TodoApp.
 */

describe('Utility Functions', () => {
    describe('escapeHtml function', () => {
        let escapeHtml;

        beforeEach(() => {
            // We need to create a TodoApp instance to access the escapeHtml method
            const app = new TodoApp();
            escapeHtml = app.escapeHtml.bind(app);
        });

        test('should escape HTML entities correctly', () => {
            const testCases = [
                { input: '<div>', expected: '&lt;div&gt;' },
                { input: '</div>', expected: '&lt;/div&gt;' },
                { input: '&', expected: '&amp;' },
                { input: '"', expected: '&quot;' },
                { input: "'", expected: '&#039;' },
                { input: '<script>', expected: '&lt;script&gt;' },
                { input: '</script>', expected: '&lt;/script&gt;' },
                { input: '<img src="x" onerror="alert(1)">', expected: '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;' }
            ];

            testCases.forEach(({ input, expected }) => {
                expect(escapeHtml(input)).toBe(expected);
            });
        });

        test('should handle complex XSS scenarios', () => {
            const xssAttempts = [
                '<script>alert("XSS")</script>',
                'javascript:alert("XSS")',
                '<img src=x onerror=alert("XSS")>',
                '<svg onload=alert("XSS")>',
                '<iframe src="javascript:alert(\'XSS\')"></iframe>',
                '<link rel="import" href="javascript:alert(\'XSS\')">'
            ];

            xssAttempts.forEach(attempt => {
                const escaped = escapeHtml(attempt);
                expect(escaped).not.toContain('<script>');
                expect(escaped).not.toContain('javascript:');
                expect(escaped).not.toContain('onerror=');
                expect(escaped).not.toContain('onload=');
            });
        });

        test('should preserve normal text', () => {
            const normalTexts = [
                'This is normal text',
                'Hello World 123',
                'Special chars: @#$%^&*()',
                'Unicode: ñáéíóú',
                'Emoji: 🎉🚀💡'
            ];

            normalTexts.forEach(text => {
                expect(escapeHtml(text)).toBe(text);
            });
        });

        test('should handle edge cases', () => {
            expect(escapeHtml('')).toBe('');
            expect(escapeHtml(null)).toBe('null');
            expect(escapeHtml(undefined)).toBe('undefined');
            expect(escapeHtml(0)).toBe('0');
            expect(escapeHtml(false)).toBe('false');
        });

        test('should handle mixed content', () => {
            const mixedInput = 'Hello <b>world</b> & "friends"!';
            const expected = 'Hello &lt;b&gt;world&lt;/b&gt; &amp; &quot;friends&quot;!';
            expect(escapeHtml(mixedInput)).toBe(expected);
        });
    });

    describe('localStorage integration', () => {
        let app;

        beforeEach(() => {
            app = new TodoApp();
            localStorage.clear();
            jest.clearAllMocks();
        });

        test('should handle localStorage errors gracefully', () => {
            // Mock localStorage to throw an error
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = jest.fn(() => {
                throw new Error('Storage quota exceeded');
            });

            app.todos = [createMockTodo({ text: 'Test todo' })];

            // Should not throw an error
            expect(() => app.saveTodos()).not.toThrow();

            // Restore original method
            localStorage.setItem = originalSetItem;
        });

        test('should handle corrupted localStorage data', () => {
            localStorage.getItem.mockReturnValue('invalid json');

            const appWithCorruptedData = new TodoApp();

            // Should handle corrupted data gracefully
            expect(appWithCorruptedData.todos).toEqual([]);
        });

        test('should handle localStorage being disabled', () => {
            // Mock localStorage to be disabled
            const originalLocalStorage = window.localStorage;
            Object.defineProperty(window, 'localStorage', {
                value: undefined,
                writable: true
            });

            // Should not throw an error when localStorage is disabled
            expect(() => new TodoApp()).not.toThrow();

            // Restore localStorage
            Object.defineProperty(window, 'localStorage', {
                value: originalLocalStorage,
                writable: true
            });
        });
    });

    describe('Date handling', () => {
        test('should generate valid timestamps', () => {
            const todo = createMockTodo();

            expect(todo.id).toBeTypeOf('number');
            expect(todo.createdAt).toBeTypeOf('string');

            // Should be a valid ISO string
            expect(() => new Date(todo.createdAt)).not.toThrow();
        });

        test('should handle updatedAt timestamps', () => {
            const app = new TodoApp();
            const todo = createMockTodo({ text: 'Original text' });
            app.todos = [todo];

            const originalCreatedAt = todo.createdAt;

            // Wait a bit to ensure different timestamp
            setTimeout(() => {
                app.editTodo(todo.id, 'Updated text');

                expect(todo.updatedAt).toBeTruthy();
                expect(todo.updatedAt).not.toBe(originalCreatedAt);
                expect(() => new Date(todo.updatedAt)).not.toThrow();
            }, 1);
        });

        test('should handle edge cases in date generation', () => {
            // Test with Date.now returning the same value (edge case)
            const originalDateNow = Date.now;
            const fixedTimestamp = 1234567890;
            Date.now = jest.fn(() => fixedTimestamp);

            const todo = createMockTodo();
            expect(todo.id).toBe(fixedTimestamp);

            // Restore original Date.now
            Date.now = originalDateNow;
        });
    });

    describe('Input validation and sanitization', () => {
        let app;

        beforeEach(() => {
            app = new TodoApp();
        });

        test('should validate todo input correctly', () => {
            const validInputs = [
                'Valid todo',
                'Todo with numbers 123',
                'Todo with symbols !@#$%',
                'Todo with Unicode: ñáéíóú',
                'Todo with Emoji: 🎉🚀'
            ];

            validInputs.forEach(input => {
                app.todoInput.value = input;
                const initialLength = app.todos.length;
                app.addTodo();
                expect(app.todos.length).toBe(initialLength + 1);
                expect(app.todos[app.todos.length - 1].text).toBe(input);
            });
        });

        test('should reject invalid todo inputs', () => {
            const invalidInputs = [
                '',
                '   ',
                '\t',
                '\n',
                '\r\n\t   '
            ];

            invalidInputs.forEach(input => {
                app.todoInput.value = input;
                const initialLength = app.todos.length;
                app.addTodo();
                expect(app.todos.length).toBe(initialLength);
            });
        });

        test('should sanitize edit input correctly', () => {
            const todo = createMockTodo({ text: 'Original' });
            app.todos = [todo];

            const maliciousInputs = [
                '<script>alert("xss")</script>',
                'javascript:alert("xss")',
                '<img src=x onerror=alert(1)>',
                'Updated text with <b>HTML</b>'
            ];

            maliciousInputs.forEach(input => {
                app.editTodo(todo.id, input);
                expect(todo.text).not.toContain('<script>');
                expect(todo.text).not.toContain('javascript:');
                expect(todo.text).not.toContain('onerror=');
            });
        });

        test('should handle extremely long inputs', () => {
            const longInput = 'a'.repeat(10000);
            app.todoInput.value = longInput;
            app.addTodo();

            expect(app.todos).toHaveLength(1);
            expect(app.todos[0].text).toBe(longInput);
        });
    });

    describe('Priority system validation', () => {
        let app;

        beforeEach(() => {
            app = new TodoApp();
        });

        test('should accept valid priority values', () => {
            const validPriorities = ['low', 'medium', 'high'];

            validPriorities.forEach(priority => {
                app.todoInput.value = `Test todo with ${priority} priority`;
                app.prioritySelect.value = priority;
                app.addTodo();

                expect(app.todos[app.todos.length - 1].priority).toBe(priority);
            });
        });

        test('should handle invalid priority values', () => {
            app.todoInput.value = 'Test todo';
            app.prioritySelect.value = 'invalid';
            app.addTodo();

            // Should default to 'invalid' or handle gracefully
            expect(app.todos[0].priority).toBe('invalid');
        });

        test('should handle missing priority', () => {
            app.todoInput.value = 'Test todo';
            delete app.prioritySelect.value;
            app.addTodo();

            // Should default to 'medium' or handle gracefully
            expect(['medium', undefined, '']).toContain(app.todos[0].priority);
        });
    });

    describe('Filter system validation', () => {
        let app;

        beforeEach(() => {
            app = new TodoApp();
            app.todos = [
                createMockTodo({ id: 1, text: 'Active 1', completed: false }),
                createMockTodo({ id: 2, text: 'Active 2', completed: false }),
                createMockTodo({ id: 3, text: 'Completed 1', completed: true }),
                createMockTodo({ id: 4, text: 'Completed 2', completed: true })
            ];
        });

        test('should handle valid filter values', () => {
            const filters = ['all', 'active', 'completed'];
            const expectedLengths = [4, 2, 2];

            filters.forEach((filter, index) => {
                app.currentFilter = filter;
                const filtered = app.getFilteredTodos();
                expect(filtered).toHaveLength(expectedLengths[index]);
            });
        });

        test('should handle invalid filter values', () => {
            app.currentFilter = 'invalid';
            const filtered = app.getFilteredTodos();
            expect(filtered).toHaveLength(4); // Should return all todos
        });

        test('should handle empty todos array', () => {
            app.todos = [];
            app.currentFilter = 'active';
            const filtered = app.getFilteredTodos();
            expect(filtered).toHaveLength(0);
        });

        test('should handle all completed todos', () => {
            app.todos.forEach(todo => todo.completed = true);
            app.currentFilter = 'active';
            const filtered = app.getFilteredTodos();
            expect(filtered).toHaveLength(0);
        });

        test('should handle all active todos', () => {
            app.todos.forEach(todo => todo.completed = false);
            app.currentFilter = 'completed';
            const filtered = app.getFilteredTodos();
            expect(filtered).toHaveLength(0);
        });
    });
});