# Claude Code Installation and Setup with GLM-4.6

## Prerequisites

Before installing Claude Code, ensure you have the following:

### System Requirements
- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control integration
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Verify Prerequisites
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git installation
git --version
```

## Step 1: Install Claude Code CLI

### Option A: Using npm (Recommended)
```bash
# Install globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude-code --version
```

### Option B: Using Yarn
```bash
# Install globally
yarn global add @anthropic-ai/claude-code

# Verify installation
claude-code --version
```

### Option C: Download Binary
```bash
# Download latest release
curl -fsSL https://claude.ai/install.sh | sh

# Or download manually from GitHub releases
# https://github.com/anthropics/claude-code/releases
```

## Step 2: Configure GLM-4.6 Integration

### Method 1: Direct API Configuration
```bash
# Initialize Claude Code
claude-code init

# Configure GLM-4.6 endpoint
claude-code configure --model glm-4.6 \
  --endpoint https://open.bigmodel.cn/api/paas/v4/chat/completions \
  --api-key YOUR_GLM_API_KEY
```

### Method 2: Environment Variables
```bash
# Set GLM-4.6 API key
export GLM_API_KEY="your-glm-api-key-here"

# Set custom endpoint
export GLM_ENDPOINT="https://open.bigmodel.cn/api/paas/v4/chat/completions"

# Set model name
export GLM_MODEL="glm-4.6"

# Add to shell profile for persistence
echo 'export GLM_API_KEY="your-glm-api-key-here"' >> ~/.bashrc
echo 'export GLM_ENDPOINT="https://open.bigmodel.cn/api/paas/v4/chat/completions"' >> ~/.bashrc
echo 'export GLM_MODEL="glm-4.6"' >> ~/.bashrc
```

### Method 3: Configuration File
Create or edit `~/.claude-code/config.json`:
```json
{
  "model": "glm-4.6",
  "endpoint": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  "apiKey": "your-glm-api-key-here",
  "temperature": 0.7,
  "maxTokens": 4096,
  "contextWindow": 200000
}
```

## Step 3: Initialize Your First Project

```bash
# Create a new project directory
mkdir my-claude-project
cd my-claude-project

# Initialize Claude Code in the project
claude-code init

# Create CLAUDE.md file (project memory)
echo "# My Claude Code Project

This is a project where I'll be using Claude Code with GLM-4.6 to build amazing things!

## Project Goals
- Learn Claude Code features
- Build sample applications
- Demonstrate GLM-4.6 capabilities

## Key Features to Explore
- Code generation
- Debugging assistance
- Project management
- Git integration
" > CLAUDE.md
```

## Step 4: Configure Claude Code Settings

### Create `.claude/` Directory Structure
```bash
# Create Claude configuration directory
mkdir -p .claude

# Create settings file
cat > .claude/settings.json << 'EOF'
{
  "model": "glm-4.6",
  "endpoint": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  "apiKey": "${GLM_API_KEY}",
  "temperature": 0.7,
  "maxTokens": 4096,
  "contextWindow": 200000,
  "tools": {
    "bash": true,
    "editor": true,
    "git": true,
    "filesystem": true
  },
  "permissions": {
    "bash": "full",
    "filesystem": "project",
    "git": "full",
    "network": "allowed"
  },
  "memory": {
    "contextWindowThreshold": 0.8,
    "autoCompact": true,
    "maxHistorySize": 1000
  }
}
EOF
```

### Set Up Permissions Configuration
Create `.claude/permissions.json`:
```json
{
  "allowedTools": [
    "bash",
    "editor",
    "git",
    "filesystem",
    "web",
    "database"
  ],
  "restrictedPaths": [
    "/etc",
    "/usr/bin",
    "~/.ssh"
  ],
  "allowedDomains": [
    "github.com",
    "stackoverflow.com",
    "docs.anthropic.com",
    "open.bigmodel.cn"
  ],
  "maxFileSize": "10MB",
  "allowNetworkAccess": true,
  "allowFileCreation": true,
  "allowFileDeletion": true,
  "allowExecution": true
}
```

## Step 5: Verify Installation

### Test Basic Functionality
```bash
# Start Claude Code
claude-code

# Test with a simple command
claude-code --help

# Test GLM-4.6 connection
claude-code --test-connection
```

### Interactive Test
```bash
# Launch interactive mode
claude-code

# Try these test prompts:
> Hello! Can you write a simple Python function?
> Create a basic HTML page with CSS
> Explain what you can help me with
> Show me your current configuration
```

## Step 6: Set Up Git Integration

### Install GitHub App (Optional but Recommended)
```bash
# Install GitHub CLI if not already installed
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

# Add GitHub CLI repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Install GitHub CLI
sudo apt update && sudo apt install gh

# Authenticate with GitHub
gh auth login
```

### Configure Git for Claude Code
```bash
# Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize Git in your project
git init
git add .
git commit -m "Initial commit: Claude Code project setup"

# Enable Claude Code Git features
claude-code config set git.autoCommit true
claude-code config set git.autoPush false
```

## Step 7: Set Up Custom Commands

### Create Custom Commands Directory
```bash
# Create commands directory
mkdir -p .claude/commands

# Create a custom command
cat > .claude/commands/setup-dev.md << 'EOF'
# Setup Development Environment

This command sets up a complete development environment for the project.

## Steps:
1. Install dependencies
2. Set up environment variables
3. Initialize database
4. Start development server

## Usage:
/run setup-dev

## Requirements:
- Node.js 16+
- Docker (for database)
- Git
EOF

# Create another custom command
cat > .claude/commands/deploy.md << 'EOF'
# Deploy Project

This command handles deployment of the project to production.

## Steps:
1. Run tests
2. Build project
3. Deploy to staging
4. Run integration tests
5. Deploy to production

## Usage:
/run deploy

## Environment Variables Needed:
- DEPLOY_KEY
- STAGING_URL
- PRODUCTION_URL
EOF
```

## Step 8: Configure Auto-Complete and Key Bindings

### Enable Shell Auto-Complete
```bash
# For Bash
echo 'eval "$(claude-code completion bash)"' >> ~/.bashrc
source ~/.bashrc

# For Zsh
echo 'eval "$(claude-code completion zsh)"' >> ~/.zshrc
source ~/.zshrc

# For Fish
claude-code completion fish > ~/.config/fish/completions/claude-code.fish
```

### Configure VS Code Integration
```bash
# Install VS Code extension
code --install-extension anthropic.claude-code

# Configure VS Code settings
mkdir -p ~/.vscode
cat > ~/.vscode/settings.json << 'EOF'
{
  "claude-code.autoStart": true,
  "claude-code.model": "glm-4.6",
  "claude-code.contextWindow": 200000,
  "claude-code.autoCompact": true,
  "claude-code.showInlineSuggestions": true,
  "claude-code.enableGitIntegration": true
}
EOF
```

## Step 9: Set Up Monitoring and Logging

### Configure Logging
```bash
# Create logs directory
mkdir -p ~/.claude/logs

# Configure logging in settings
cat >> .claude/settings.json << 'EOF'
,
  "logging": {
    "level": "info",
    "file": "~/.claude/logs/claude-code.log",
    "maxFileSize": "10MB",
    "maxFiles": 5,
    "enableConsoleLogging": true
  }
EOF
```

## Step 10: Final Verification

### Complete Test Suite
```bash
# Create a test script
cat > test-claude-setup.sh << 'EOF'
#!/bin/bash

echo "🔍 Testing Claude Code Setup..."

# Test 1: CLI Installation
echo "1. Testing CLI installation..."
if command -v claude-code &> /dev/null; then
    echo "✅ Claude Code CLI is installed"
    claude-code --version
else
    echo "❌ Claude Code CLI not found"
    exit 1
fi

# Test 2: Configuration
echo "2. Testing configuration..."
if [ -f ~/.claude/config.json ]; then
    echo "✅ Configuration file exists"
else
    echo "❌ Configuration file missing"
    exit 1
fi

# Test 3: GLM-4.6 Connection
echo "3. Testing GLM-4.6 connection..."
claude-code --test-connection

# Test 4: Project Setup
echo "4. Testing project setup..."
if [ -f CLAUDE.md ]; then
    echo "✅ CLAUDE.md file exists"
else
    echo "❌ CLAUDE.md file missing"
fi

if [ -d .claude ]; then
    echo "✅ .claude directory exists"
else
    echo "❌ .claude directory missing"
fi

echo "🎉 Setup verification complete!"
EOF

# Run test
chmod +x test-claude-setup.sh
./test-claude-setup.sh
```

## Troubleshooting Common Issues

### Issue 1: API Connection Failed
```bash
# Check API key
echo $GLM_API_KEY

# Test endpoint connectivity
curl -X POST https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $GLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"glm-4.6","messages":[{"role":"user","content":"Hello"}]}'
```

### Issue 2: Permission Denied
```bash
# Fix permissions
chmod +x ~/.claude/commands/*.md

# Check file ownership
ls -la ~/.claude/
```

### Issue 3: Context Window Errors
```bash
# Clear context
claude-code --clear-context

# Adjust context window size
claude-code config set contextWindow 100000
```

## Next Steps

Your Claude Code with GLM-4.6 is now set up! You can:

1. Start using Claude Code: `claude-code`
2. Explore commands: `/help`
3. Set up your first project: `claude-code init`
4. Try custom commands: `/run setup-dev`
5. Configure your IDE: Install VS Code extension

## Quick Reference

| Command | Description |
|---------|-------------|
| `claude-code` | Start interactive mode |
| `claude-code init` | Initialize project |
| `claude-code config` | Configure settings |
| `claude-code --help` | Show help |
| `/help` | Show available commands |
| `/compact` | Compact context window |
| `/clear` | Clear conversation |
| `/memory` | Manage memory |