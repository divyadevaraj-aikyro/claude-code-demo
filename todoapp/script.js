class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.priorities = ['low', 'medium', 'high'];
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.prioritySelect = document.getElementById('priority-select');
        this.todoList = document.getElementById('todo-list');
        this.totalCount = document.getElementById('total-count');
        this.completedCount = document.getElementById('completed-count');
        this.remainingCount = document.getElementById('remaining-count');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clear-completed');
        this.clearAllBtn = document.getElementById('clear-all');
    }

    attachEventListeners() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setFilter(button.dataset.filter);
            });
        });

        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        this.clearAllBtn.addEventListener('click', () => {
            this.clearAll();
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: this.prioritySelect.value || 'medium',
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.prioritySelect.value = 'medium';
        this.saveTodos();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    startEditTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return;

        const todoTextElement = document.querySelector(`.todo-text[data-id="${id}"]`);
        if (!todoTextElement) return;

        const currentText = todo.text;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit-input';
        input.value = currentText;
        input.dataset.originalValue = currentText;

        todoTextElement.replaceWith(input);
        input.focus();
        input.select();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                this.editTodo(id, newText);
            } else {
                this.render();
            }
        };

        const cancelEdit = () => {
            this.render();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEdit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        });
    }

    editTodo(id, newText) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
    }

    clearAll() {
        if (confirm('Are you sure you want to delete all todos?')) {
            this.todos = [];
            this.saveTodos();
            this.render();
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const remaining = total - completed;

        this.totalCount.textContent = `Total: ${total}`;
        this.completedCount.textContent = `Completed: ${completed}`;
        this.remainingCount.textContent = `Remaining: ${remaining}`;
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        const priority = todo.priority || 'medium';
        li.className = `todo-item ${todo.completed ? 'completed' : ''} priority-${priority}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text" data-id="${todo.id}">${this.escapeHtml(todo.text)}</span>
            <span class="priority-badge">${priority}</span>
            <div class="todo-actions">
                <button class="todo-edit" title="Edit">✏️</button>
                <button class="todo-delete" title="Delete">🗑️</button>
            </div>
        `;

        const checkbox = li.querySelector('.todo-checkbox');
        const editBtn = li.querySelector('.todo-edit');
        const deleteBtn = li.querySelector('.todo-delete');

        checkbox.addEventListener('change', () => {
            this.toggleTodo(todo.id);
        });

        editBtn.addEventListener('click', () => {
            this.startEditTodo(todo.id);
        });

        deleteBtn.addEventListener('click', () => {
            this.deleteTodo(todo.id);
        });

        return li;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<li class="empty-state">No todos to display</li>';
        } else {
            this.todoList.innerHTML = '';
            filteredTodos.forEach(todo => {
                this.todoList.appendChild(this.createTodoElement(todo));
            });
        }

        this.updateStats();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});