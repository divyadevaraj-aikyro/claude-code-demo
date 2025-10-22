# Simple Todo App

A clean, modern todo application built with vanilla JavaScript, HTML, and CSS.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear completed todos
- ✅ Clear all todos
- ✅ Persistent storage using localStorage
- ✅ Real-time statistics (total, completed, remaining)
- ✅ Responsive design
- ✅ Clean, modern UI

## Project Structure

```
todoapp/
├── index.html     # Main HTML file
├── style.css      # CSS styles
├── script.js      # JavaScript functionality
├── package.json   # Project configuration
└── CLAUDE.md      # This documentation file
```

## How to Run

1. Navigate to the todoapp directory:
   ```bash
   cd todoapp
   ```

2. Start a local server (using Python 3):
   ```bash
   python3 -m http.server 8000
   ```
   Or use the npm script:
   ```bash
   npm start
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Code Architecture

### JavaScript Structure (script.js)

The application uses a class-based architecture with a main `TodoApp` class:

- **Constructor**: Initializes the app, loads todos from localStorage, and sets up event listeners
- **State Management**: Maintains an array of todos and current filter state
- **Event Handling**: Handles form submissions, button clicks, and user interactions
- **Rendering**: Dynamically updates the UI based on current state
- **Persistence**: Saves todos to localStorage for data persistence

### Key Methods

- `addTodo()`: Creates a new todo item
- `deleteTodo(id)`: Removes a todo by ID
- `toggleTodo(id)`: Toggles completion status
- `setFilter(filter)`: Updates the current filter
- `getFilteredTodos()`: Returns todos based on current filter
- `clearCompleted()`: Removes all completed todos
- `clearAll()`: Removes all todos with confirmation
- `updateStats()`: Updates the statistics display
- `render()`: Renders the todo list and UI

### Data Structure

Each todo item has the following structure:
```javascript
{
  id: Number,           // Unique identifier (timestamp)
  text: String,         // Todo content
  completed: Boolean,   // Completion status
  createdAt: String     // ISO timestamp
}
```

### CSS Features

- **Responsive Design**: Mobile-friendly layout with media queries
- **Modern Styling**: Clean, professional appearance with smooth transitions
- **Interactive Elements**: Hover effects and state changes
- **Accessibility**: Proper contrast ratios and focus states

## Browser Compatibility

This application is compatible with all modern browsers that support:
- ES6 Classes
- LocalStorage API
- CSS Grid/Flexbox
- CSS Transitions

## Future Enhancements

Potential features to add:
- Edit existing todos
- Drag and drop reordering
- Categories/tags
- Due dates
- Priority levels
- Export/import functionality
- Dark mode
- Animations

## Development Notes

- No external dependencies or frameworks required
- Uses semantic HTML5 elements
- Component-based CSS organization
- Event delegation for efficient event handling
- XSS protection through HTML escaping
- Confirmation dialogs for destructive actions