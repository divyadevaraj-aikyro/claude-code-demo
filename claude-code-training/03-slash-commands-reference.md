# Claude Code Slash Commands Complete Reference

## Introduction

Claude Code slash commands are powerful tools that allow you to control and optimize your interaction with the AI. They help with project management, context control, memory management, and various administrative tasks.

## Essential Commands

### `/help` - Get Help
**Purpose**: Display available commands and get help with specific features.

**Basic Usage**:
```bash
/help
```

**Get help with specific topics**:
```bash
/help memory
/help commands
/help git
/help planning
```

**Examples**:
```bash
# Show all available commands
/help

# Get help with memory management
/help memory

# Learn about planning modes
/help planning

# Show git-related commands
/help git
```

### `/init` - Initialize Project
**Purpose**: Initialize a new Claude Code project or reinitialize current directory.

**Basic Usage**:
```bash
/init
```

**Advanced Options**:
```bash
/init --template=node-project
/init --template=python-app
/init --template=react-app
/init --force
```

**Examples**:
```bash
# Initialize basic project
/init

# Initialize with Node.js template
/init --template=node-project

# Force reinitialize current project
/init --force

# Initialize with custom settings
/init --model=glm-4.6 --context-window=200000
```

## Project Management Commands

### `/install-github-app` - Install GitHub Integration
**Purpose**: Install and configure GitHub App for seamless Git integration.

**Basic Usage**:
```bash
/install-github-app
```

**Advanced Options**:
```bash
/install-github-app --scope=repo
/install-github-app --scope=repo,workflow
/install-github-app --auto-merge
```

**Examples**:
```bash
# Install GitHub App with default settings
/install-github-app

# Install with repository scope only
/install-github-app --scope=repo

# Install with auto-merge enabled
/install-github-app --auto-merge

# Install for enterprise GitHub
/install-github-app --enterprise=my-company
```

### `/migrate-installer` - Migrate Installation
**Purpose**: Migrate from older Claude Code versions to current version.

**Basic Usage**:
```bash
/migrate-installer
```

**Options**:
```bash
/migrate-installer --backup
/migrate-installer --force
/migrate-installer --dry-run
```

**Examples**:
```bash
# Migrate with backup
/migrate-installer --backup

# Force migration (skip confirmation)
/migrate-installer --force

# Preview migration without making changes
/migrate-installer --dry-run
```

## Context Management Commands

### `/compact` - Compact Context Window
**Purpose**: Reduce context window size while preserving important information.

**Basic Usage**:
```bash
/compact
```

**Advanced Options**:
```bash
/compact --aggressive
/compact --preserve-code
/compact --save-summary
/compact --threshold=0.8
```

**Examples**:
```bash
# Compact context with default settings
/compact

# Aggressive compaction (removes more context)
/compact --aggressive

# Compact but preserve all code blocks
/compact --preserve-code

# Compact and save summary to file
/compact --save-summary

# Compact when context reaches 80% capacity
/compact --threshold=0.8
```

### `/clear` - Clear Conversation
**Purpose**: Clear entire conversation history and start fresh.

**Basic Usage**:
```bash
/clear
```

**Options**:
```bash
/clear --confirm
/clear --save-history
/clear --keep-memory
```

**Examples**:
```bash
# Clear with confirmation prompt
/clear

# Clear without confirmation
/clear --confirm

# Save conversation history before clearing
/clear --save-history

# Clear conversation but keep project memory
/clear --keep-memory
```

### `/doctor` - Health Check
**Purpose**: Run diagnostic tests to check Claude Code health and configuration.

**Basic Usage**:
```bash
/doctor
```

**Specific Checks**:
```bash
/doctor --api
/doctor --config
/doctor --permissions
/doctor --memory
/doctor --full
```

**Examples**:
```bash
# Run basic health check
/doctor

# Check API connectivity
/doctor --api

# Check configuration files
/doctor --config

# Check permissions setup
/doctor --permissions

# Run comprehensive health check
/doctor --full
```

## Development Environment Commands

### `/ide` - IDE Integration
**Purpose**: Configure and manage IDE integrations.

**Basic Usage**:
```bash
/ide
```

**IDE-Specific Options**:
```bash
/ide --vscode
/ide --vim
/ide --emacs
/ide --intellij
/ide --setup
```

**Examples**:
```bash
# Show IDE integration status
/ide

# Set up VS Code integration
/ide --vscode --setup

# Configure Vim integration
/ide --vim

# Show all available IDE integrations
/ide --list
```

### `/terminal-setup` - Terminal Configuration
**Purpose**: Configure terminal settings and optimizations.

**Basic Usage**:
```bash
/terminal-setup
```

**Options**:
```bash
/terminal-setup --shell=bash
/terminal-setup --shell=zsh
/terminal-setup --auto-complete
/terminal-setup --theme
```

**Examples**:
```bash
# Set up terminal with default shell
/terminal-setup

# Configure for Zsh
/terminal-setup --shell=zsh

# Enable auto-completion
/terminal-setup --auto-complete

# Configure terminal theme
/terminal-setup --theme=dark
```

## System Commands

### `/upgrade` - Upgrade Claude Code
**Purpose**: Upgrade Claude Code to latest version.

**Basic Usage**:
```bash
/upgrade
```

**Options**:
```bash
/upgrade --check
/upgrade --force
/upgrade --backup
/upgrade --version=specific-version
```

**Examples**:
```bash
# Check for updates
/upgrade --check

# Upgrade to latest version
/upgrade

# Force upgrade (skip confirmation)
/upgrade --force

# Upgrade with backup
/upgrade --backup

# Upgrade to specific version
/upgrade --version=1.2.3
```

## Directory and File Management

### `/add-dir` - Add Directory
**Purpose**: Add directory to Claude Code context and project scope.

**Basic Usage**:
```bash
/add-dir path/to/directory
```

**Options**:
```bash
/add-dir path/to/directory --recursive
/add-dir path/to/directory --exclude=node_modules
/add-dir path/to/directory --watch
```

**Examples**:
```bash
# Add specific directory
/add-dir src/components

# Add directory recursively
/add-dir src --recursive

# Add directory but exclude node_modules
/add-dir . --exclude=node_modules

# Add directory and watch for changes
/add-dir src --watch
```

## Agent and Task Management

### `/agents` - Manage Agents
**Purpose**: List, create, and manage specialized agents.

**Basic Usage**:
```bash
/agents
```

**Agent Operations**:
```bash
/agents --list
/agents --create=agent-name
/agents --run=agent-name
/agents --delete=agent-name
/agents --status
```

**Examples**:
```bash
# List all available agents
/agents --list

# Create a new agent
/agents --create=code-reviewer

# Run a specific agent
/agents --run=code-reviewer

# Check agent status
/agents --status

# Delete an agent
/agents --delete=old-agent
```

### `/bashes` - Manage Bash Sessions
**Purpose**: View and manage running bash processes.

**Basic Usage**:
```bash
/bashes
```

**Bash Operations**:
```bash
/bashes --list
/bashes --kill=session-id
/bashes --output=session-id
/bashes --interactive=session-id
```

**Examples**:
```bash
# List all running bash sessions
/bashes --list

# Get output from specific session
/bashes --output=abc123

# Kill a running session
/bashes --kill=abc123

# Interact with running session
/bashes --interactive=abc123
```

## Debugging and Issue Management

### `/bugs` - Bug Report Management
**Purpose**: Create and manage bug reports.

**Basic Usage**:
```bash
/bugs
```

**Bug Operations**:
```bash
/bugs --create
/bugs --list
/bugs --show=bug-id
/bugs --close=bug-id
/bugs --assign=bug-id,user
```

**Examples**:
```bash
# Create new bug report
/bugs --create

# List all bugs
/bugs --list

# Show specific bug details
/bugs --show=BUG-123

# Close a bug
/bugs --close=BUG-123

# Assign bug to team member
/bugs --assign=BUG-123,john.doe
```

## Memory Management Commands

### `/memory` - Memory Management
**Purpose**: Manage short-term and long-term memory.

**Basic Usage**:
```bash
/memory
```

**Memory Operations**:
```bash
/memory --show
/memory --save
/memory --load
/memory --clear
/memory --export
/memory --import
```

**Examples**:
```bash
# Show current memory status
/memory --show

# Save current context to memory
/memory --save

# Load saved memory
/memory --load

# Clear memory
/memory --clear

# Export memory to file
/memory --export=memory-backup.json

# Import memory from file
/memory --import=memory-backup.json
```

## Planning and Thinking Commands

### `/cot` - Chain of Thought
**Purpose**: Enable step-by-step reasoning and thinking process.

**Basic Usage**:
```bash
/cot
```

**Options**:
```bash
/cot --verbose
/cot --show-steps
/cot --save-steps
/cot --template=problem-solving
```

**Examples**:
```bash
# Enable basic chain of thought
/cot

# Enable verbose chain of thought
/cot --verbose

# Show thinking steps
/cot --show-steps

# Save thinking steps to file
/cot --save-steps

# Use specific thinking template
/cot --template=problem-solving
```

## Session Management

### `/resume` - Resume Session
**Purpose**: Resume a previous Claude Code session.

**Basic Usage**:
```bash
/resume
```

**Options**:
```bash
/resume --session-id=session-identifier
/resume --list
/resume --last
/resume --bookmark=name
```

**Examples**:
```bash
# Resume last session
/resume --last

# List available sessions
/resume --list

# Resume specific session
/resume --session-id=abc123def456

# Resume bookmarked session
/resume --bookmark=my-work-session
```

### `/exit` - Exit Claude Code
**Purpose**: Exit Claude Code gracefully.

**Basic Usage**:
```bash
/exit
```

**Options**:
```bash
/exit --save
/exit --force
/exit --cleanup
```

**Examples**:
```bash
# Exit with save prompt
/exit

# Exit and save session
/exit --save

# Force exit without confirmation
/exit --force

# Exit and clean up temporary files
/exit --cleanup
```

## Key Bindings and Shortcuts

### Shift+Enter - Multi-line Input
**Purpose**: Create multi-line input without sending message.

**Usage**:
1. Type your first line
2. Press `Shift+Enter` to go to next line
3. Continue typing
4. Press `Enter` to send the message

**Example**:
```
User: function calculateSum(numbers) {Shift+Enter
    return numbers.reduce((sum, num) => sum + num, 0);Shift+Enter
}Enter
```

### ESC (twice) - Emergency Exit
**Purpose**: Emergency exit from current operation or conversation.

**Usage**:
1. Press `ESC` once to cancel current operation
2. Press `ESC` twice quickly to exit Claude Code

## Custom Commands

### Creating Custom Commands
**Purpose**: Create project-specific commands.

**Create custom command file**:
```bash
# Create .claude/commands/deploy.md
echo "# Deploy Command

This command deploys the application to production.

## Steps:
1. Run tests
2. Build application
3. Deploy to production

## Usage:
/run deploy
" > .claude/commands/deploy.md
```

**Using custom commands**:
```bash
/run deploy
/run setup
/run test
```

## Advanced Usage Examples

### Workflow Example: Full Development Cycle
```bash
# 1. Initialize project
/init --template=node-project

# 2. Add source directory
/add-dir src --recursive

# 3. Start development session
/memory --save

# 4. Enable chain of thought for complex tasks
/cot --verbose

# 5. Work on feature (code generation happens here)
# ... your development work ...

# 6. When context gets full, compact it
/compact --save-summary

# 7. Check system health
/doctor --full

# 8. Save progress
/memory --save

# 9. If interrupted, resume later
/resume --last

# 10. Clean up when done
/exit --save
```

### Debugging Workflow
```bash
# 1. Check system health
/doctor --full

# 2. List running processes
/bashes --list

# 3. Check memory usage
/memory --show

# 4. If needed, clear context
/clear --save-history

# 5. Start fresh for debugging
/cot --show-steps
```

## Best Practices

### Context Management
- Use `/compact` when context window reaches 80%
- Use `/memory --save` before complex operations
- Use `/clear` only when necessary (preserves memory)

### Session Management
- Use `/resume --last` to continue work
- Use `/exit --save` to preserve progress
- Use `/memory --export` for backup

### Development Workflow
- Use `/cot` for complex problem-solving
- Use `/agents` for specialized tasks
- Use `/bashes` to monitor long-running processes

## Troubleshooting

### Common Issues and Solutions

**Issue**: Context window full
```bash
# Solution: Compact context
/compact --aggressive
```

**Issue**: Memory not saving
```bash
# Solution: Check memory status
/memory --show
/doctor --memory
```

**Issue**: Commands not working
```bash
# Solution: Check system health
/doctor --full
/upgrade --check
```

**Issue**: Lost session
```bash
# Solution: List and resume sessions
/resume --list
/resume --last
```

## Command Reference Summary

| Category | Commands | Purpose |
|----------|----------|---------|
| Essential | `/help`, `/init` | Basic operations |
| Context | `/compact`, `/clear` | Memory management |
| System | `/doctor`, `/upgrade` | System health |
| Development | `/ide`, `/terminal-setup` | Environment setup |
| Project | `/add-dir`, `/install-github-app` | Project management |
| Agents | `/agents`, `/bashes` | Task management |
| Sessions | `/resume`, `/exit` | Session control |
| Thinking | `/cot` | Reasoning enhancement |

## Quick Cheatsheet

```bash
# Quick start
/init
/add-dir src
/cot

# When context is full
/compact --save-summary

# Save and exit
/memory --save
/exit --save

# Resume work
/resume --last

# Check health
/doctor --full

# Get help
/help [topic]
```