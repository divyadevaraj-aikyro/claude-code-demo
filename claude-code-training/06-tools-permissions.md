# Tools and Permissions in Claude Code

## Understanding Claude Code Tools

Claude Code provides a powerful set of tools that allow the AI to interact with your development environment, file system, version control, and external services. These tools enable Claude to perform real development tasks rather than just providing guidance.

## Available Tools

### 1. File System Tools

#### Read Tool
**Purpose**: Read file contents from the file system
**Usage**: Access source code, configuration files, documentation
**Examples**:
```bash
# Read a specific file
Read the contents of @src/config/database.js

# Read multiple files
Read package.json and @src/utils/logger.js

# Read file ranges
Read lines 45-80 of @src/middleware/auth.js
```

**Code Example**:
```javascript
// How Claude uses the Read tool
const databaseConfig = await readFile('src/config/database.js');
console.log('Database configuration loaded:', databaseConfig);
```

#### Write Tool
**Purpose**: Create or overwrite files with new content
**Usage**: Generate new code, update configuration, create documentation
**Examples**:
```bash
# Create a new React component
Write a React component called UserProfile in @src/components/UserProfile.js

# Update configuration file
Update the database connection in @src/config/database.js

# Create documentation
Write API documentation for the user endpoints in @docs/api/users.md
```

**Code Example**:
```javascript
// Component generation example
const componentCode = `
import React, { useState, useEffect } from 'react';
import { getUserById } from '../services/userService';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(userId)
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load user:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
`;

await writeFile('src/components/UserProfile.js', componentCode);
```

#### Edit Tool
**Purpose**: Modify specific parts of existing files
**Usage**: Bug fixes, refactoring, feature additions
**Examples**:
```bash
# Fix a bug in authentication
Fix the validation logic in @src/middleware/auth.js at line 23

# Add new feature to service
Add email notification functionality to @src/services/orderService.js

# Refactor function
Optimize the database query in @src/models/Product.js
```

**Code Example**:
```javascript
// Bug fix example
const oldCode = `
function validateUser(userData) {
  if (!userData.email || !userData.password) {
    return false;
  }
  return true;
}
`;

const newCode = `
function validateUser(userData) {
  if (!userData.email || !userData.password) {
    return { valid: false, error: 'Email and password are required' };
  }

  if (!isValidEmail(userData.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (userData.password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  return { valid: true };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
`;

await editFile('src/utils/validation.js', oldCode, newCode);
```

#### Glob Tool
**Purpose**: Find files matching specific patterns
**Usage**: Discover project structure, find related files
**Examples**:
```bash
# Find all test files
Find all test files in the project using glob patterns

# Locate API route files
Find all API route files in the @src/api directory

# Search for configuration files
Find all JSON configuration files
```

**Code Example**:
```javascript
// File discovery examples
const testFiles = await glob('tests/**/*.test.js');
const apiFiles = await glob('src/api/**/*.js');
const configFiles = await glob('**/*.config.js');

console.log('Test files:', testFiles);
console.log('API files:', apiFiles);
console.log('Config files:', configFiles);
```

### 2. Bash Tool

#### Purpose
Execute shell commands for system operations, build processes, and development tasks.

#### Usage Examples
```bash
# Install dependencies
Run npm install to install the project dependencies

# Start development server
Start the development server with npm run dev

# Run tests
Execute the test suite with npm test

# Build project
Build the production bundle with npm run build

# Database operations
Run database migrations with npx sequelize-cli db:migrate

# Git operations
Create a new branch for the feature
```

#### Code Examples
```bash
# Development workflow
npm install
npm run dev
npm test
npm run build

# Database setup
createdb shopflow
npm run migrate
npm run seed

# Git workflow
git checkout -b feature/user-authentication
git add .
git commit -m "Add user authentication feature"
git push origin feature/user-authentication
```

#### Background Processes
```bash
# Start long-running processes in background
npm run dev &

# Monitor background processes
Check the status of background processes

# Stop background processes
Stop the development server
```

### 3. Git Tools

#### Purpose
Interact with Git for version control, collaboration, and deployment.

#### Usage Examples
```bash
# Check repository status
Show the current git status

# Commit changes
Stage and commit the authentication feature

# Create branches
Create a new branch for payment integration

# Merge changes
Merge the feature branch into main

# Handle pull requests
Create a pull request for the new feature
```

#### Code Examples
```bash
# Git workflow automation
git status
git add .
git commit -m "feat: add user authentication system"
git push origin feature/user-authentication

# Branch management
git checkout -b feature/payment-integration
git checkout main
git merge feature/payment-integration

# Pull request creation
gh pr create --title "Add Payment Integration" --body "Implements Stripe payment processing"
```

### 4. Web/HTTP Tools

#### Purpose
Make HTTP requests to external APIs, fetch web content, and integrate with web services.

#### Usage Examples
```bash
# Fetch API documentation
Get the latest API documentation from the service

# Test API endpoints
Test the user registration endpoint

# Fetch web content
Retrieve tutorial content from documentation site

# Integration testing
Test the payment gateway integration
```

#### Code Examples
```javascript
// API testing examples
const response = await fetch('https://api.stripe.com/v1/customers', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    'email': 'customer@example.com',
    'name': 'John Doe'
  })
});

const customer = await response.json();
console.log('Created customer:', customer);
```

## Setting Up Permissions

### Why Permissions Matter

Permissions control what Claude Code can and cannot do in your environment. This ensures:

1. **Security**: Prevent unauthorized access to sensitive files and systems
2. **Safety**: Avoid accidental deletion or modification of important files
3. **Compliance**: Meet organizational security requirements
4. **Control**: Fine-tune Claude's capabilities based on project needs

### Creating `.claude/settings.json`

The settings.json file is the primary configuration for Claude Code permissions and tool access.

**Basic Settings Structure**:
```json
{
  "model": "glm-4.6",
  "contextWindow": 200000,
  "tools": {
    "bash": true,
    "editor": true,
    "git": true,
    "filesystem": true,
    "web": false
  },
  "permissions": {
    "bash": "limited",
    "filesystem": "project",
    "git": "full",
    "network": "allowed"
  },
  "restrictions": {
    "readOnlyPaths": [".env", "config/secrets.js"],
    "writeDeniedPaths": ["node_modules", ".git"],
    "executionDenied": ["rm -rf", "sudo", "chmod 777"]
  }
}
```

### Permission Levels

#### Tool Permissions

**Full Access**:
```json
{
  "tools": {
    "bash": true,
    "editor": true,
    "git": true,
    "filesystem": true,
    "web": true
  }
}
```

**Limited Access**:
```json
{
  "tools": {
    "bash": "read-only",
    "editor": "project-only",
    "git": "read-only",
    "filesystem": "read-only",
    "web": "denied"
  }
}
```

#### File System Permissions

**Project-Only Access**:
```json
{
  "filesystem": {
    "allowedPaths": ["src/", "tests/", "docs/"],
    "deniedPaths": [".env", "config/secrets/", "node_modules/"],
    "maxFileSize": "10MB",
    "allowedExtensions": [".js", ".ts", ".jsx", ".tsx", ".md", ".json"],
    "deniedExtensions": [".exe", ".sh", ".bat", ".cmd"]
  }
}
```

**Read-Only Access**:
```json
{
  "filesystem": {
    "mode": "read-only",
    "allowedPaths": ["src/", "docs/", "tests/"],
    "deniedPaths": [".env*", "config/*secrets*"]
  }
}
```

#### Bash Permissions

**Limited Bash Access**:
```json
{
  "bash": {
    "allowedCommands": [
      "npm", "node", "yarn",
      "git", "ls", "cat", "grep",
      "mkdir", "cp", "mv",
      "python", "pip", "pytest"
    ],
    "deniedCommands": [
      "rm", "sudo", "su",
      "chmod", "chown",
      "dd", "mkfs", "fdisk"
    ],
    "allowedPaths": ["./", "src/", "tests/", "docs/"],
    "deniedPaths": ["/etc", "/usr/bin", "/bin", "~/.ssh"],
    "requireConfirmation": ["npm install", "pip install", "git push"]
  }
}
```

#### Network Permissions

**Controlled Network Access**:
```json
{
  "network": {
    "allowedDomains": [
      "api.github.com",
      "registry.npmjs.org",
      "stripe.com",
      "open.bigmodel.cn"
    ],
    "deniedDomains": [
      "malicious-sites.com",
      "suspicious-domain.net"
    ],
    "allowedPorts": [80, 443, 3000, 8080],
    "maxRequestsPerMinute": 60,
    "requireConfirmation": ["git push", "npm publish"]
  }
}
```

### Creating `.claude/permissions.json`

For more granular control, create a separate permissions file:

**Comprehensive Permissions Example**:
```json
{
  "version": "1.0",
  "lastUpdated": "2024-01-20T10:00:00Z",
  "permissions": {
    "tools": {
      "bash": {
        "enabled": true,
        "level": "limited",
        "allowedCommands": [
          "npm", "node", "yarn", "pnpm",
          "git", "ls", "cat", "head", "tail",
          "grep", "find", "locate",
          "mkdir", "cp", "mv",
          "python", "pip", "pytest",
          "docker", "docker-compose"
        ],
        "deniedCommands": [
          "rm", "rmdir", "sudo", "su",
          "chmod", "chown", "chgrp",
          "dd", "mkfs", "fdisk", "format",
          "shutdown", "reboot", "halt",
          "passwd", "useradd", "userdel"
        ],
        "requireConfirmation": [
          "npm install", "pip install",
          "git push", "docker build",
          "npm publish", "pip install --global"
        ],
        "allowedPaths": [
          "./", "src/", "tests/", "docs/",
          "scripts/", "build/", "dist/"
        ],
        "deniedPaths": [
          "/etc", "/usr/bin", "/bin",
          "~/.ssh", "~/.aws", "~/.gnupg",
          "node_modules/", ".git/", "dist/"
        ]
      },
      "filesystem": {
        "enabled": true,
        "level": "project",
        "allowedPaths": [
          "src/", "tests/", "docs/",
          "scripts/", "config/",
          "public/", "build/"
        ],
        "readOnlyPaths": [
          "package.json", "package-lock.json",
          "yarn.lock", ".gitignore",
          "CLAUDE.md"
        ],
        "deniedPaths": [
          ".env", ".env.*",
          "node_modules/", ".git/",
          "*.key", "*.pem", "*.crt"
        ],
        "maxFileSize": "10MB",
        "allowedExtensions": [
          ".js", ".ts", ".jsx", ".tsx",
          ".md", ".txt", ".json", ".yml", ".yaml",
          ".html", ".css", ".scss", ".less",
          ".py", ".java", ".cpp", ".c"
        ],
        "deniedExtensions": [
          ".exe", ".bat", ".cmd", ".sh",
          ".ps1", ".app", ".deb", ".rpm"
        ]
      },
      "git": {
        "enabled": true,
        "level": "full",
        "allowedOperations": [
          "status", "add", "commit", "push",
          "pull", "clone", "checkout", "branch",
          "merge", "log", "diff", "show"
        ],
        "deniedOperations": [
          "clean -fd", "reset --hard",
          "filter-branch", "rebase -i"
        ],
        "requireConfirmation": [
          "push", "pull", "merge",
          "reset --hard", "clean"
        ],
        "protectedBranches": ["main", "master", "develop"]
      },
      "web": {
        "enabled": true,
        "level": "controlled",
        "allowedDomains": [
          "api.github.com", "github.com",
          "registry.npmjs.org", "yarnpkg.com",
          "stripe.com", "api.stripe.com",
          "open.bigmodel.cn",
          "stackoverflow.com", "docs.anthropic.com"
        ],
        "deniedDomains": [
          "*.malware.com", "*.phishing.net"
        ],
        "allowedPorts": [80, 443, 3000, 8080, 5000],
        "maxRequestsPerMinute": 60,
        "maxResponseSize": "5MB",
        "requireConfirmation": [
          "POST", "PUT", "DELETE",
          "git push", "npm publish"
        ]
      }
    },
    "security": {
      "preventDataExfiltration": true,
      "scanForSensitiveData": true,
      "logAllOperations": true,
      "auditLogRetention": "90d"
    },
    "notifications": {
      "onPermissionDenial": true,
      "onConfirmationRequired": true,
      "onSuspiciousActivity": true
    }
  }
}
```

## Permission Configuration Examples

### Development Environment
```json
{
  "environment": "development",
  "tools": {
    "bash": "full",
    "filesystem": "project",
    "git": "full",
    "web": "controlled"
  },
  "permissions": {
    "allowExecution": true,
    "allowNetworkAccess": true,
    "allowFileCreation": true,
    "allowFileDeletion": true
  }
}
```

### Staging Environment
```json
{
  "environment": "staging",
  "tools": {
    "bash": "limited",
    "filesystem": "read-only",
    "git": "read-only",
    "web": "allowed"
  },
  "permissions": {
    "allowExecution": false,
    "allowNetworkAccess": true,
    "allowFileCreation": false,
    "allowFileDeletion": false
  }
}
```

### Production Environment
```json
{
  "environment": "production",
  "tools": {
    "bash": "denied",
    "filesystem": "denied",
    "git": "denied",
    "web": "denied"
  },
  "permissions": {
    "allowExecution": false,
    "allowNetworkAccess": false,
    "allowFileCreation": false,
    "allowFileDeletion": false
  }
}
```

### Educational Environment
```json
{
  "environment": "education",
  "tools": {
    "bash": "educational",
    "filesystem": "sandboxed",
    "git": "educational",
    "web": "filtered"
  },
  "permissions": {
    "allowExecution": true,
    "allowNetworkAccess": true,
    "allowFileCreation": true,
    "allowFileDeletion": false,
    "sandboxMode": true
  }
}
```

## Managing Permissions

### Updating Permissions
```bash
# Check current permissions
/doctor --permissions

# Update permissions
/memory --update-permissions --file=".claude/permissions.json"

# Reload permissions
/reload-permissions
```

### Testing Permissions
```bash
# Test specific permissions
/test-permission --tool=bash --command="npm install"
/test-permission --tool=filesystem --path="src/"
/test-permission --tool=git --operation="push"
```

### Auditing Permissions
```bash
# Audit permission usage
/audit --permissions --last=7d

# Generate permission report
/generate-report --type=permissions --format=json
```

## Security Best Practices

### 1. Principle of Least Privilege
- Grant only necessary permissions
- Start with restrictive settings and relax as needed
- Review permissions regularly

### 2. Environment-Specific Configurations
- Use different permission sets for different environments
- Never use full permissions in production
- Separate development from production credentials

### 3. Regular Auditing
- Monitor permission usage logs
- Review and update permissions monthly
- Audit for unusual activity patterns

### 4. Sensitive Data Protection
- Deny access to configuration files with secrets
- Use environment variables for sensitive data
- Implement data masking for logs

## Troubleshooting Permission Issues

### Common Problems

**Issue 1: Permission Denied Errors**
```bash
# Check current permissions
/doctor --permissions

# Identify specific permission issue
/debug --permission=filesystem --path="config/secrets.js"

# Fix: Update permissions to allow required access
```

**Issue 2: Tool Not Available**
```bash
# Check tool status
/doctor --tools

# Enable required tool
/enable-tool --name=bash

# Configure tool permissions
/configure-tool --name=filesystem --level=project
```

**Issue 3: Confirmation Required Too Often**
```bash
# Review confirmation requirements
/review-confirmations

# Update confirmation settings
/update-confirmations --remove="npm install"

# Set trust level for trusted operations
/set-trust --operation="git push" --level=trusted
```

## Advanced Permission Features

### 1. Time-Based Permissions
```json
{
  "permissions": {
    "timeRestrictions": {
      "bash": {
        "allowedHours": "09:00-17:00",
        "allowedDays": "Monday-Friday"
      },
      "git": {
        "allowedHours": "always",
        "protectedHours": "22:00-06:00"
      }
    }
  }
}
```

### 2. Context-Aware Permissions
```json
{
  "permissions": {
    "contextual": {
      "feature-branches": {
        "bash": "full",
        "git": "full"
      },
      "main-branch": {
        "bash": "read-only",
        "git": "read-only"
      }
    }
  }
}
```

### 3. Role-Based Permissions
```json
{
  "roles": {
    "developer": {
      "bash": "full",
      "filesystem": "project",
      "git": "full"
    },
    "reviewer": {
      "bash": "denied",
      "filesystem": "read-only",
      "git": "read-only"
    },
    "admin": {
      "bash": "full",
      "filesystem": "full",
      "git": "full"
    }
  }
}
```

This comprehensive tools and permissions system ensures that Claude Code can operate effectively while maintaining security and control over your development environment.