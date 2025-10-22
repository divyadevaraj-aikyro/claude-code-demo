# MCP (Model Context Protocol) Servers in Claude Code

## Understanding MCP Servers

MCP (Model Context Protocol) servers extend Claude Code's capabilities by providing specialized tools and services that can interact with external systems, databases, APIs, and development tools. They act as bridges between Claude and external resources.

## What MCP Servers Provide

### 1. External Data Access
- Database connections and queries
- API integrations
- File system operations
- Cloud service interactions

### 2. Specialized Tools
- Code analysis and linting
- Testing frameworks
- Deployment automation
- Monitoring and observability

### 3. Enhanced Capabilities
- Real-time data processing
- Parallel execution
- Stateful operations
- Complex workflows

## Popular MCP Servers

### 1. Supabase MCP Server

**Purpose**: Database operations and real-time subscriptions
**Use Cases**: CRUD operations, authentication, storage management

**Installation and Setup**:
```bash
# Install Supabase MCP server
npm install -g @supabase/mcp-server

# Configure Supabase connection
claude-code config set mcp.supabase.url "https://your-project.supabase.co"
claude-code config set mcp.supabase.key "your-supabase-key"
```

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "supabase": {
        "enabled": true,
        "url": "https://your-project.supabase.co",
        "key": "${SUPABASE_ANON_KEY}",
        "schema": "public",
        "timeout": 30000
      }
    }
  }
}
```

**Usage Examples**:
```bash
# Query database
Query the users table for all active users
SELECT * FROM users WHERE status = 'active'

# Insert data
Create a new user in the database with email john@example.com and name John Doe

# Update data
Update the user with ID 123 to set their status to 'premium'

# Real-time subscription
Listen for changes in the orders table

# File operations
Upload the product image to Supabase storage
```

**Advanced Usage**:
```bash
# Complex query with joins
Get all orders with user information
SELECT o.*, u.name, u.email FROM orders o JOIN users u ON o.user_id = u.id WHERE o.created_at > '2024-01-01'

# Database operations
Create a new table for product reviews with appropriate schema
Add indexes to optimize query performance
Create a database migration for the new table structure
```

### 2. Playwright MCP Server

**Purpose**: Web automation and testing
**Use Cases**: E2E testing, web scraping, browser automation

**Installation and Setup**:
```bash
# Install Playwright MCP server
npm install -g @mcp-server/playwright

# Install browser dependencies
npx playwright install
```

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "enabled": true,
        "browsers": ["chromium", "firefox", "webkit"],
        "headless": true,
        "timeout": 30000,
        "viewport": { "width": 1280, "height": 720 }
      }
    }
  }
}
```

**Usage Examples**:
```bash
# E2E testing
Create a Playwright test for the user login flow
Navigate to the login page
Fill in the email field with test@example.com
Fill in the password field with testpassword
Click the login button
Verify that the user is redirected to the dashboard
Take a screenshot for verification

# Web scraping
Extract product information from an e-commerce page
Navigate to https://example-shop.com/products
Get all product names and prices
Save the extracted data to a JSON file

# Form testing
Test the contact form submission
Navigate to the contact page
Fill in all form fields with test data
Submit the form
Verify the success message appears
Check that the data was saved to the database
```

**Advanced Testing Scenarios**:
```bash
# Multi-browser testing
Run the login test across all browsers (Chrome, Firefox, Safari)
Compare the results and identify any browser-specific issues

# Mobile testing
Test the responsive design on mobile devices
Emulate iPhone 12 viewport
Verify that all elements are properly displayed
Test touch interactions

# Performance testing
Measure page load times
Capture performance metrics
Generate a performance report
```

### 3. Database MCP Servers

#### PostgreSQL MCP Server
```bash
# Installation
npm install -g @mcp-server/postgres

# Configuration
{
  "mcp": {
    "servers": {
      "postgres": {
        "enabled": true,
        "connection": "postgresql://user:password@localhost:5432/dbname",
        "schema": "public",
        "poolSize": 10
      }
    }
  }
}

# Usage
Create a migration to add user profiles table
Insert sample data into the products table
Generate a database schema diagram
Optimize slow queries with appropriate indexes
```

#### MongoDB MCP Server
```bash
# Installation
npm install -g @mcp-server/mongodb

# Configuration
{
  "mcp": {
    "servers": {
      "mongodb": {
        "enabled": true,
        "url": "mongodb://localhost:27017",
        "database": "myapp"
      }
    }
  }
}

# Usage
Create a collection for user sessions
Add indexes for better query performance
Aggregate sales data by month
Export data to CSV format
```

### 4. Git MCP Server

**Purpose**: Enhanced Git operations
**Use Cases**: Advanced version control, repository management

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "git": {
        "enabled": true,
        "autoCommit": false,
        "signCommits": false,
        "defaultBranch": "main"
      }
    }
  }
}
```

**Usage Examples**:
```bash
# Repository management
Create a new repository for the project
Initialize with proper .gitignore and README
Set up branch protection rules

# Advanced Git operations
Create a feature branch from develop
Implement the feature with proper commits
Create a pull request with detailed description
Set up automated code review checks

# Repository analysis
Analyze commit history for code quality metrics
Generate contribution statistics
Identify hotspots in the codebase
```

### 5. Docker MCP Server

**Purpose**: Container management and orchestration
**Use Cases**: Development environment setup, deployment

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "docker": {
        "enabled": true,
        "socket": "/var/run/docker.sock",
        "defaultRegistry": "docker.io"
      }
    }
  }
}
```

**Usage Examples**:
```bash
# Container management
Create a Dockerfile for the Node.js application
Build the Docker image with multi-stage build
Run the container with proper environment variables
Set up docker-compose for development environment

# Orchestration
Create a docker-compose.yml with multiple services
Configure networking between containers
Set up volume mounts for persistent data
Implement health checks
```

### 6. Redis MCP Server

**Purpose**: Caching and session management
**Use Cases**: Performance optimization, real-time features

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "redis": {
        "enabled": true,
        "host": "localhost",
        "port": 6379,
        "password": "${REDIS_PASSWORD}",
        "database": 0
      }
    }
  }
}
```

**Usage Examples**:
```bash
# Caching operations
Implement caching for database queries
Set up session storage for user authentication
Cache API responses for better performance
Implement rate limiting with Redis

# Real-time features
Create a pub/sub system for notifications
Implement real-time chat functionality
Set up leaderboards for gaming applications
```

### 7. AWS MCP Server

**Purpose**: Cloud infrastructure management
**Use Cases**: AWS service integration, deployment automation

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "aws": {
        "enabled": true,
        "region": "us-west-2",
        "accessKeyId": "${AWS_ACCESS_KEY_ID}",
        "secretAccessKey": "${AWS_SECRET_ACCESS_KEY}"
      }
    }
  }
}
```

**Usage Examples**:
```bash
# S3 operations
Create an S3 bucket for file storage
Upload static assets to S3
Set up CDN distribution with CloudFront
Implement file upload functionality

# EC2 management
Launch EC2 instances for the application
Configure security groups and networking
Set up auto-scaling groups
Deploy application using EC2 instances

# Lambda functions
Create a Lambda function for image processing
Set up API Gateway triggers
Configure environment variables
Monitor function performance
```

### 8. Slack MCP Server

**Purpose**: Team communication and notifications
**Use Cases**: Automated notifications, team collaboration

**Configuration**:
```json
{
  "mcp": {
    "servers": {
      "slack": {
        "enabled": true,
        "botToken": "${SLACK_BOT_TOKEN}",
        "channel": "#development"
      }
    }
  }
}
```

**Usage Examples**:
```bash
# Notifications
Send deployment notifications to Slack
Notify team about build failures
Share code review requests
Announce feature releases

# Team collaboration
Create standup reminders
Schedule sprint planning meetings
Share development progress updates
```

## Setting Up MCP Servers

### 1. Installation Process

**Using npm**:
```bash
# Install individual servers
npm install -g @mcp-server/supabase
npm install -g @mcp-server/playwright
npm install -g @mcp-server/postgres

# Install all at once
npm install -g @mcp-server/suite
```

**Using Claude Code CLI**:
```bash
# Install via Claude Code
claude-code mcp install supabase
claude-code mcp install playwright
claude-code mcp install postgres

# List available servers
claude-code mcp list

# Install all recommended servers
claude-code mcp install --all
```

### 2. Configuration

**Global Configuration** (`~/.claude/mcp.json`):
```json
{
  "version": "1.0",
  "servers": {
    "supabase": {
      "enabled": true,
      "config": {
        "url": "${SUPABASE_URL}",
        "key": "${SUPABASE_ANON_KEY}"
      }
    },
    "playwright": {
      "enabled": true,
      "config": {
        "browsers": ["chromium", "firefox"],
        "headless": true
      }
    }
  },
  "settings": {
    "timeout": 30000,
    "retryAttempts": 3,
    "logLevel": "info"
  }
}
```

**Project Configuration** (`.claude/mcp.json`):
```json
{
  "project": "my-web-app",
  "servers": {
    "postgres": {
      "enabled": true,
      "config": {
        "connection": "${DATABASE_URL}",
        "schema": "public"
      }
    },
    "redis": {
      "enabled": true,
      "config": {
        "host": "localhost",
        "port": 6379
      }
    }
  }
}
```

### 3. Environment Variables

**Create .env file**:
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# AWS
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-west-2

# Slack
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
```

## Using MCP Servers

### Basic Usage

**Server Status Check**:
```bash
# Check all MCP servers
/mcp status

# Check specific server
/mcp status supabase

# Test server connectivity
/mcp test supabase
```

**Server Operations**:
```bash
# Enable/disable servers
/mcp enable playwright
/mcp disable redis

# Restart servers
/mcp restart postgres

# Update server configuration
/mcp config supabase --set timeout=60000
```

### Advanced Usage Patterns

**Multi-Server Workflows**:
```bash
# Database + Testing workflow
Using the postgres MCP server, create a test database
Using the playwright MCP server, run E2E tests against the test database
Using the slack MCP server, notify team of test results

# Development + Deployment workflow
Using the git MCP server, create a feature branch
Using the docker MCP server, build development environment
Using the supabase MCP server, set up staging database
Using the aws MCP server, deploy to staging environment
```

**Server Chaining**:
```bash
# Create automated workflow
Chain: postgres → playwright → slack
1. Run database migrations (postgres)
2. Run integration tests (playwright)
3. Send results to team (slack)
```

## Creating Custom MCP Servers

### 1. Server Structure

**Basic Server Template**:
```javascript
// custom-mcp-server.js
const { MCPServer } = require('@mcp-server/core');

class CustomMCPServer extends MCPServer {
  constructor(config) {
    super(config);
    this.name = 'custom-server';
    this.version = '1.0.0';
  }

  async initialize() {
    // Initialize server connections
    // Set up authentication
    // Validate configuration
  }

  async execute(tool, params) {
    switch (tool) {
      case 'custom_operation':
        return await this.customOperation(params);
      default:
        throw new Error(`Unknown tool: ${tool}`);
    }
  }

  async customOperation(params) {
    // Implement custom functionality
    return { success: true, data: result };
  }
}

module.exports = CustomMCPServer;
```

### 2. Tool Definition

**Define Custom Tools**:
```javascript
const tools = {
  query_database: {
    description: 'Execute database queries',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'SQL query to execute' },
        params: { type: 'array', description: 'Query parameters' }
      },
      required: ['query']
    }
  },

  create_file: {
    description: 'Create files in the project',
    parameters: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path' },
        content: { type: 'string', description: 'File content' }
      },
      required: ['path', 'content']
    }
  }
};
```

### 3. Server Registration

**Register with Claude Code**:
```bash
# Register custom server
claude-code mcp register custom-server --path ./custom-mcp-server.js

# Configure server
claude-code mcp config custom-server --set timeout=30000
```

## MCP Server Best Practices

### 1. Security

**Secure Configuration**:
```json
{
  "mcp": {
    "servers": {
      "postgres": {
        "enabled": true,
        "config": {
          "connection": "${DATABASE_URL}",
          "ssl": true,
          "maxConnections": 10
        },
        "security": {
          "allowedQueries": ["SELECT", "INSERT", "UPDATE"],
          "blockedQueries": ["DROP", "DELETE", "TRUNCATE"],
          "requireConfirmation": true
        }
      }
    }
  }
}
```

**Authentication**:
```bash
# Use environment variables for secrets
export DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
export AWS_ACCESS_KEY_ID="your-access-key"

# Rotate keys regularly
/rotate-keys --server=aws
```

### 2. Performance

**Connection Pooling**:
```json
{
  "postgres": {
    "pool": {
      "min": 2,
      "max": 10,
      "idleTimeoutMillis": 30000
    }
  }
}
```

**Caching**:
```json
{
  "redis": {
    "cache": {
      "ttl": 3600,
      "maxSize": 1000
    }
  }
}
```

### 3. Monitoring

**Health Checks**:
```bash
# Monitor server health
/mcp monitor --all

# Set up alerts
/mcp alert --server=postgres --condition=connection-failure
```

**Logging**:
```json
{
  "logging": {
    "level": "info",
    "format": "json",
    "file": "/var/log/mcp-servers.log"
  }
}
```

## Troubleshooting MCP Servers

### Common Issues

**Connection Failures**:
```bash
# Test connectivity
/mcp test postgres

# Check configuration
/mcp config postgres --show

# View logs
/mcp logs postgres --tail=50
```

**Performance Issues**:
```bash
# Monitor performance
/mcp monitor postgres --metrics

# Optimize configuration
/mcp optimize postgres
```

**Authentication Problems**:
```bash
# Verify credentials
/mcp auth test postgres

# Refresh tokens
/mcp auth refresh aws
```

## MCP Server Ecosystem

### Official Servers
- **@mcp-server/postgres**: PostgreSQL database operations
- **@mcp-server/mongodb**: MongoDB database operations
- **@mcp-server/redis**: Redis caching and pub/sub
- **@mcp-server/playwright**: Browser automation and testing
- **@mcp-server/supabase**: Supabase integration
- **@mcp-server/aws**: AWS cloud services
- **@mcp-server/slack**: Slack integration
- **@mcp-server/docker**: Docker container management
- **@mcp-server/git**: Enhanced Git operations
- **@mcp-server/filesystem**: File system operations

### Community Servers
- **@mcp-server/jira**: Jira project management
- **@mcp-server/github**: GitHub repository management
- **@mcp-server/kafka**: Apache Kafka messaging
- **@mcp-server/elasticsearch**: Elasticsearch search
- **@mcp-server/kubernetes**: Kubernetes orchestration

### Finding More Servers
```bash
# Search available servers
claude-code mcp search database
claude-code mcp search testing
claude-code mcp search cloud

# Install from community
claude-code mcp install @mcp-server-community/jira
```

MCP servers significantly extend Claude Code's capabilities, enabling seamless integration with external services and specialized tools. By leveraging these servers, you can create powerful automation workflows and enhance your development productivity.