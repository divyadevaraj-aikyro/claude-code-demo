# Simple Todo App - Project Context

## Project Overview

This is a vanilla JavaScript todo application demonstrating modern web development practices without frameworks. The app provides a clean, responsive interface for managing tasks with persistent storage.

## Architecture Summary

### Core Components

**TodoApp Class** (`script.js:1-167`)
- Single responsibility class managing the entire application state
- Event-driven architecture with centralized state management
- LocalStorage integration for data persistence
- Component-based DOM manipulation

**Key Architecture Patterns:**
- **Class-based OOP**: Single TodoApp class encapsulates all functionality
- **Event delegation**: Efficient event handling through delegation
- **State management**: Centralized todo array with reactive rendering
- **Data persistence**: JSON serialization to localStorage
- **XSS protection**: HTML escaping for user input

### Data Flow

1. **User Action** → Event listener triggers method
2. **State Update** → Todo array modified
3. **Persistence** → `saveTodos()` writes to localStorage
4. **Render** → `render()` updates DOM based on new state
5. **UI Update** → Visual feedback reflects changes

### File Responsibilities

- **index.html**: Semantic structure with accessibility considerations
- **script.js**: Complete application logic in single class
- **style.css**: Mobile-first responsive design with CSS transitions
- **package.json**: Development server configuration

## Key Features Implementation

### Todo Management
- **Add**: `addTodo()` creates new todo with timestamp, uses `unshift()` for LIFO ordering
- **Toggle**: `toggleTodo()` flips completion status and triggers re-render
- **Delete**: `deleteTodo()` filters array by ID
- **Filter**: `setFilter()` updates UI state and re-renders filtered view

### State Management
```javascript
// Core state structure
this.todos = [
  {
    id: Date.now(),           // Unique identifier
    text: string,             // User input (escaped)
    completed: boolean,       // Completion status
    createdAt: ISO_string     // Timestamp
  }
];
this.currentFilter = 'all|active|completed';
```

### Security Considerations
- **XSS Prevention**: `escapeHtml()` method sanitizes user input
- **Confirmation**: `clearAll()` requires user confirmation
- **Input Validation**: Empty text validation in `addTodo()`

### Performance Optimizations
- **Event delegation**: Single listeners for dynamic content
- **Efficient rendering**: Complete DOM rebuild on state changes
- **LocalStorage**: Immediate persistence after each operation
- **Minimal reflows**: Batch DOM updates in render cycle

## UI/UX Implementation

### Responsive Design
- **Mobile-first**: Base styles for mobile, enhanced for desktop
- **Breakpoint**: 600px for desktop layout adjustments
- **Flexible layout**: Flexbox for adaptive component arrangement

### Visual Hierarchy
- **Primary actions**: Blue buttons (#3498db) with hover states
- **Destructive actions**: Red buttons (#dc3545) for delete operations
- **Neutral actions**: Gray buttons (#6c757d) for secondary functions
- **State indication**: Visual feedback for completed items

### Interaction Patterns
- **Form submission**: Prevent default, handle via JavaScript
- **Keyboard accessibility**: Focus management and visual indicators
- **Micro-interactions**: Smooth transitions (0.3s) for state changes
- **Empty states**: Informative messages when no todos exist

## Development Workflow

### Local Development
```bash
cd todoapp
npm start  # Starts Python HTTP server on port 8000
```

### Code Organization
- **Single file architecture**: All JavaScript in one file for simplicity
- **Method grouping**: Related functionality grouped logically
- **Consistent naming**: Clear, descriptive method and variable names
- **No external dependencies**: Pure vanilla JavaScript implementation

### Browser Support
- **Modern browsers**: ES6+ features (classes, arrow functions, template literals)
- **LocalStorage**: Required for data persistence
- **CSS Features**: Flexbox, transitions, media queries

## Technical Implementation Details

### Event Handling Architecture
```javascript
// Form submission handling
this.todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    this.addTodo();
});

// Dynamic content handling via delegation
// Events attached to individual todo elements in createTodoElement()
```

### Rendering Strategy
- **Complete re-render**: Clear and rebuild entire todo list on changes
- **Filter-based rendering**: `getFilteredTodos()` applies current filter
- **Statistics updating**: `updateStats()` calculates and displays metrics
- **Empty state handling**: Special case UI for filtered empty results

### CSS Architecture
- **BEM-like naming**: Component-based class structure
- **Mobile-first responsive**: Base styles enhanced for larger screens
- **Semantic HTML5**: Proper element usage for accessibility
- **Progressive enhancement**: Core functionality works without CSS

## Common Development Tasks

### Adding New Features
1. Add HTML structure to `index.html`
2. Create corresponding CSS classes in `style.css`
3. Implement logic in appropriate TodoApp method
4. Add event listeners in `attachEventListeners()`
5. Update rendering logic if needed

### Modifying Todo Data Structure
1. Update todo object creation in `addTodo()`
2. Modify `escapeHtml()` if adding new text fields
3. Update `createTodoElement()` for new properties
4. Consider localStorage migration strategy

### Styling Changes
1. Modify existing classes in `style.css`
2. Add responsive adjustments in media queries
3. Test mobile and desktop layouts
4. Ensure accessibility contrast ratios

This project serves as a clean example of vanilla JavaScript development patterns and modern web development best practices.