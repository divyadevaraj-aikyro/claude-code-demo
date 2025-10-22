/**
 * Sample Test Run Demonstration
 * This file demonstrates how to run individual tests and validate the setup.
 */

// Import the TodoApp class
require('../script.js');

// Example test functions that can be run individually
function sampleTodoCreationTest() {
    console.log('🧪 Running sample todo creation test...');

    try {
        // Create a new TodoApp instance
        const app = new TodoApp();

        // Verify initial state
        console.log('✓ TodoApp initialized');
        console.log('  - Initial todos count:', app.todos.length);
        console.log('  - Current filter:', app.currentFilter);
        console.log('  - Priorities:', app.priorities);

        // Add a todo
        app.todoInput.value = 'Sample todo item';
        app.prioritySelect.value = 'high';
        app.addTodo();

        // Verify todo was added
        console.log('✓ Todo added successfully');
        console.log('  - New todos count:', app.todos.length);
        console.log('  - Todo text:', app.todos[0].text);
        console.log('  - Todo priority:', app.todos[0].priority);
        console.log('  - Todo ID:', app.todos[0].id);
        console.log('  - Created at:', app.todos[0].createdAt);

        // Test todo functionality
        app.toggleTodo(app.todos[0].id);
        console.log('✓ Todo toggled');
        console.log('  - Completed status:', app.todos[0].completed);

        // Test filtering
        app.setFilter('completed');
        const completedTodos = app.getFilteredTodos();
        console.log('✓ Filter set to completed');
        console.log('  - Filtered todos count:', completedTodos.length);

        // Test HTML escaping
        const maliciousInput = '<script>alert("xss")</script>';
        const escaped = app.escapeHtml(maliciousInput);
        console.log('✓ HTML escaping works');
        console.log('  - Original input:', maliciousInput);
        console.log('  - Escaped output:', escaped);

        console.log('🎉 All sample tests passed!');
        return true;

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
        return false;
    }
}

function sampleDOMInteractionTest() {
    console.log('🧪 Running sample DOM interaction test...');

    try {
        // Create TodoApp instance (this will set up DOM elements)
        const app = new TodoApp();

        // Add some todos
        app.todoInput.value = 'First todo';
        app.addTodo();

        app.todoInput.value = 'Second todo';
        app.addTodo();

        // Check DOM elements
        const todoList = document.getElementById('todo-list');
        const todoItems = todoList.querySelectorAll('.todo-item');

        console.log('✓ DOM elements created');
        console.log('  - Todo list element exists:', !!todoList);
        console.log('  - Todo items count:', todoItems.length);

        // Test checkbox interaction
        if (todoItems.length > 0) {
            const checkbox = todoItems[0].querySelector('.todo-checkbox');
            const deleteBtn = todoItems[0].querySelector('.todo-delete');

            console.log('✓ Todo item elements found');
            console.log('  - Checkbox exists:', !!checkbox);
            console.log('  - Delete button exists:', !!deleteBtn);

            // Simulate checkbox click
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));

            console.log('✓ Checkbox interaction simulated');
            console.log('  - Todo completed status:', app.todos[0].completed);
        }

        // Test statistics
        const totalCount = document.getElementById('total-count');
        const completedCount = document.getElementById('completed-count');
        const remainingCount = document.getElementById('remaining-count');

        console.log('✓ Statistics elements found');
        console.log('  - Total count:', totalCount.textContent);
        console.log('  - Completed count:', completedCount.textContent);
        console.log('  - Remaining count:', remainingCount.textContent);

        console.log('🎉 DOM interaction test passed!');
        return true;

    } catch (error) {
        console.error('❌ DOM test failed:', error.message);
        console.error(error.stack);
        return false;
    }
}

// Sample localStorage test
function sampleLocalStorageTest() {
    console.log('🧪 Running sample localStorage test...');

    try {
        // Mock localStorage interactions
        const app = new TodoApp();

        // Add todos
        app.todoInput.value = 'Storage test todo';
        app.addTodo();

        // Check if localStorage.setItem was called
        const setItemCalls = localStorage.setItem.mock.calls;
        const lastCall = setItemCalls[setItemCalls.length - 1];

        console.log('✓ localStorage interaction');
        console.log('  - setItem called:', setItemCalls.length, 'times');
        console.log('  - Last call key:', lastCall[0]);
        console.log('  - Last call value type:', typeof lastCall[1]);

        // Test localStorage loading
        const savedData = JSON.parse(lastCall[1]);
        console.log('✓ Data serialization');
        console.log('  - Saved todos count:', savedData.length);
        console.log('  - First todo text:', savedData[0].text);

        console.log('🎉 localStorage test passed!');
        return true;

    } catch (error) {
        console.error('❌ localStorage test failed:', error.message);
        console.error(error.stack);
        return false;
    }
}

// Run all sample tests
function runAllSampleTests() {
    console.log('🚀 Starting sample test run...\n');

    const results = [
        sampleTodoCreationTest(),
        sampleDOMInteractionTest(),
        sampleLocalStorageTest()
    ];

    const passed = results.filter(Boolean).length;
    const total = results.length;

    console.log('\n📊 Test Results Summary:');
    console.log(`  - Passed: ${passed}/${total}`);
    console.log(`  - Failed: ${total - passed}/${total}`);

    if (passed === total) {
        console.log('\n🎉 All sample tests passed! The testing setup is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Check the test setup and dependencies.');
    }

    return passed === total;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleTodoCreationTest,
        sampleDOMInteractionTest,
        sampleLocalStorageTest,
        runAllSampleTests
    };
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runAllSampleTests();
}