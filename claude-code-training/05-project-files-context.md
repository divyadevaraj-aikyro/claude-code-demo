# Project Files and Context Management

## Understanding Project Files in Claude Code

Project files are the backbone of Claude Code's context awareness and long-term memory system. They provide persistent storage for project knowledge, configuration, and state that persists across sessions.

## The CLAUDE.md File: Project Memory Core

### What is CLAUDE.md?

`CLAUDE.md` is the primary memory file for your Claude Code project. It serves as the central hub for:

- Project overview and goals
- Key decisions and architecture
- Important context and background
- Development guidelines and standards
- Progress tracking and milestones

### Why CLAUDE.md Matters

1. **Context Continuity**: Maintains project knowledge across sessions
2. **Quick Onboarding**: Helps Claude understand your project instantly
3. **Decision Tracking**: Records important architectural and technical decisions
4. **Goal Alignment**: Keeps Claude aligned with project objectives
5. **Reference Point**: Provides context for all project interactions

### Creating Effective CLAUDE.md Files

**Basic Structure**:
```markdown
# Project Name

## Project Overview
[Brief description of what this project is and its purpose]

## Project Goals
- [Primary goal 1]
- [Primary goal 2]
- [Primary goal 3]

## Architecture Overview
[High-level architecture description]

## Key Technologies
- [Technology 1]: [Purpose]
- [Technology 2]: [Purpose]
- [Technology 3]: [Purpose]

## Important Decisions
### [Date]: [Decision Title]
- **Context**: [Why this decision was needed]
- **Decision**: [What was decided]
- **Rationale**: [Why this decision was made]
- **Impact**: [How this affects the project]

## Development Guidelines
- [Coding standard 1]
- [Testing approach]
- [Deployment process]

## Current Status
**Last Updated**: [Date]
**Current Phase**: [Phase name]
**Progress**: [Percentage or description]

## Next Steps
1. [Next immediate task]
2. [Following task]
3. [Future task]

## Contextual Information
[Additional context that Claude should know]
```

**Advanced CLAUDE.md Example**:
```markdown
# E-Commerce Platform: ShopFlow

## Project Overview
ShopFlow is a modern e-commerce platform built with React, Node.js, and PostgreSQL. It provides a complete online shopping experience with user authentication, product management, shopping cart, and payment processing.

## Project Goals
1. **Core Functionality**: Complete e-commerce workflow from browse to purchase
2. **Performance**: Sub-2 second page load times
3. **Scalability**: Handle 10,000+ concurrent users
4. **Security**: PCI compliance and secure payment processing
5. **Admin Dashboard**: Comprehensive inventory and order management

## Architecture Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Node.js API    │    │   PostgreSQL    │
│                 │    │                 │    │   Database      │
│ - Product Browse│◄──►│ - RESTful APIs  │◄──►│ - Products      │
│ - Shopping Cart │    │ - Auth Service  │    │ - Users         │
│ - Checkout      │    │ - Payment Proc  │    │ - Orders        │
│ - User Account  │    │ - Order Mgmt    │    │ - Sessions      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Redis Cache   │
                    │                 │
                    │ - Session Store │
                    │ - Product Cache │
                    │ - Cart Data     │
                    └─────────────────┘
```

## Key Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, TypeScript, JWT
- **Database**: PostgreSQL 15, Redis 7
- **Payments**: Stripe API, PayPal SDK
- **Deployment**: Docker, AWS ECS, CloudFront
- **Testing**: Jest, Cypress, PostgreSQL Test Containers

## Important Decisions

### 2024-01-15: Monorepo Structure
- **Context**: Need to manage frontend, backend, and shared code efficiently
- **Decision**: Adopt monorepo with Nx workspaces
- **Rationale**:
  - Shared TypeScript types and utilities
  - Unified testing and CI/CD pipeline
  - Easier dependency management
- **Impact**: Improved code reuse, simplified deployment

### 2024-01-10: Payment Provider Selection
- **Context**: Choose payment processing solution
- **Decision**: Primary Stripe, secondary PayPal
- **Rationale**:
  - Stripe: Better developer experience, comprehensive features
  - PayPal: Larger user base, international reach
  - Both support subscription and one-time payments
- **Impact**: Broader payment options, increased conversion

### 2024-01-05: Database Schema Design
- **Context**: Design database for e-commerce needs
- **Decision**: Normalized schema with denormalized reporting tables
- **Rationale**:
  - Normalized: Data integrity, easier updates
  - Denormalized: Fast reporting, better analytics
- **Impact**: Balanced performance and maintainability

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled, no implicit any
- **Naming**: camelCase for variables, PascalCase for classes/types
- **File Organization**: Feature-based structure, index files for exports
- **Comments**: JSDoc for all public APIs

### Testing Strategy
- **Unit Tests**: 90%+ coverage for business logic
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Critical user journeys (checkout flow, registration)
- **Performance Tests**: Load testing for checkout process

### Git Workflow
- **Branching**: GitFlow (main, develop, feature/*, release/*, hotfix/*)
- **Commits**: Conventional commits (feat:, fix:, docs:, etc.)
- **PRs**: Require code review and passing tests
- **Tags**: Semantic versioning for releases

## Current Status
**Last Updated**: 2024-01-20
**Current Phase**: Frontend Development (Phase 2)
**Progress**: 65% Complete

### Completed
- ✅ Backend API foundation
- ✅ Database schema and migrations
- ✅ User authentication system
- ✅ Product management API
- ✅ Payment processing integration

### In Progress
- 🔄 React frontend setup
- 🔄 Product catalog UI
- 🔄 Shopping cart functionality

### Next Up
- ⏳ User authentication UI
- ⏳ Checkout process
- ⏳ Admin dashboard

## Next Steps
1. Complete shopping cart component with state management
2. Implement user authentication pages (login, register, profile)
3. Build checkout flow with payment integration
4. Create admin dashboard for inventory management
5. Set up CI/CD pipeline for automated testing and deployment

## Contextual Information

### API Endpoints Structure
```
/api/v1/
├── auth/
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── GET /profile
├── products/
│   ├── GET /products
│   ├── GET /products/:id
│   └── POST /products (admin)
├── cart/
│   ├── GET /cart
│   ├── POST /cart/items
│   ├── PUT /cart/items/:id
│   └── DELETE /cart/items/:id
└── orders/
    ├── GET /orders
    ├── POST /orders
    └── GET /orders/:id
```

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/shopflow
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m

# Payment
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret

# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
```

### Performance Targets
- **Page Load**: < 2 seconds (95th percentile)
- **API Response**: < 500ms (95th percentile)
- **Database Query**: < 100ms average
- **Cache Hit Rate**: > 90%

### Security Requirements
- **Authentication**: JWT with refresh token rotation
- **Authorization**: Role-based access control
- **Data Protection**: Encrypt sensitive data at rest
- **API Security**: Rate limiting, input validation, CORS
```

## Using the /memory Command

### Accessing Project Memory

**Show Current Memory**:
```bash
/memory --show
```

**Save Information to Memory**:
```bash
/memory --save --content="Just completed the shopping cart API endpoint with Redis integration"
```

**Load Specific Memory**:
```bash
/memory --load --topic="architecture"
/memory --load --date="2024-01-15"
```

**Update CLAUDE.md via Memory**:
```bash
/memory --update-claude --section="status" --content="Current Phase: Frontend Development (Phase 2) - 65% Complete"
```

## Using @src for File Context

### Understanding @src Syntax

The `@src` syntax allows you to reference specific files or directories directly in your conversation, providing immediate context to Claude.

**Basic Usage**:
```bash
# Reference a single file
Can you review the authentication logic in @src/auth/auth.js?

# Reference a directory
What's the structure of our @src/components directory?

# Reference specific function
Look at the validateUser function in @src/utils/validation.js
```

**Advanced Usage**:
```bash
# Multiple files
Compare the approaches in @src/auth/jwt-handler.js and @src/auth/session-handler.js

# File ranges
Show me lines 45-80 in @src/api/products.js

# File with specific content
Find all database queries in @src/models/ directory
```

### @src Examples

**Code Review**:
```bash
Please review the error handling in @src/middleware/error-handler.js and suggest improvements.
```

**Documentation Generation**:
```bash
Generate API documentation for all endpoints in @src/routes/ directory.
```

**Refactoring Assistance**:
```bash
The code in @src/utils/payment-processor.js is getting complex. Can you help refactor it into smaller, more focused functions?
```

**Debugging Help**:
```bash
I'm getting an error in @src/services/order-service.js when creating orders. Can you identify the issue?
```

## Using # for Hashtag Context

### Understanding Hashtags in Claude Code

Hashtags provide semantic context and categorization for your conversations and project elements. They help Claude understand the type and context of your requests.

**Common Hashtags**:
- `#bug`: Bug reports and debugging
- `#feature`: New feature development
- `#refactor`: Code refactoring tasks
- `#docs`: Documentation tasks
- `#test`: Testing-related work
- `#deploy`: Deployment and DevOps
- `#review`: Code review requests
- `#architecture`: Architectural decisions
- `#security`: Security-related tasks

### Hashtag Examples

**Bug Tracking**:
```bash
#bug: User registration fails with error 500 when email already exists

I'm seeing this issue in the registration endpoint. Can you investigate @src/auth/register.js?
```

**Feature Development**:
```bash
#feature: Add product search with filters

I need to implement product search functionality with category, price range, and rating filters. The search endpoint should be in @src/api/search.js.
```

**Code Review**:
```bash
#review: Payment processing implementation

Please review the payment processing logic in @src/services/payment-service.js for security vulnerabilities and edge cases.
```

**Architecture Discussion**:
```bash
#architecture: Microservices vs Monolith for order processing

We're debating whether to extract order processing into a separate microservice. What are the pros and cons given our current architecture in @CLAUDE.md?
```

## Project Files Structure

### Complete Project File Organization

```
project-root/
├── CLAUDE.md                    # Main project memory file
├── README.md                    # Project documentation for humans
├── package.json                 # Node.js dependencies
├── .gitignore                   # Git ignore rules
├── .claude/                     # Claude Code configuration
│   ├── config.json              # Claude Code settings
│   ├── permissions.json         # Tool permissions
│   ├── settings.json            # Project-specific settings
│   ├── memory/                  # Long-term memory storage
│   │   ├── phases/              # Phase completion summaries
│   │   ├── decisions/           # Key decisions documentation
│   │   ├── artifacts/           # Completed code artifacts
│   │   └── summaries/           # Conversation summaries
│   ├── commands/                # Custom commands
│   │   ├── setup.md             # Project setup command
│   │   ├── deploy.md            # Deployment command
│   │   └── test.md              # Testing command
│   ├── scripts/                 # Automation scripts
│   │   ├── memory-manager.sh    # Memory management script
│   │   ├── backup.sh            # Backup script
│   │   └── deploy.sh            # Deployment script
│   └── templates/               # File templates
│       ├── component.js         # React component template
│       ├── api-endpoint.js      # API endpoint template
│       └── test.js              # Test file template
├── src/                         # Source code
│   ├── components/              # Frontend components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── services/                # Business logic services
│   ├── api/                     # API route handlers
│   ├── middleware/              # Express middleware
│   ├── models/                  # Database models
│   ├── config/                  # Configuration files
│   └── types/                   # TypeScript type definitions
├── tests/                       # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
├── docs/                        # Documentation
│   ├── api/                     # API documentation
│   ├── deployment/              # Deployment guides
│   └── development/             # Development guides
├── scripts/                     # Build and utility scripts
├── docker/                      # Docker configuration
└── .github/                     # GitHub workflows
    └── workflows/               # CI/CD pipelines
```

### Creating Project Files

**Initialize Project Structure**:
```bash
# Create Claude Code directory structure
mkdir -p .claude/{memory,commands,scripts,templates}
mkdir -p .claude/memory/{phases,decisions,artifacts,summaries}

# Create source directories
mkdir -p src/{components,pages,hooks,utils,services,api,middleware,models,config,types}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs/{api,deployment,development}
```

**Create Configuration Files**:
```bash
# Claude Code settings
cat > .claude/settings.json << 'EOF'
{
  "model": "glm-4.6",
  "contextWindow": 200000,
  "autoSave": true,
  "autoCompact": true,
  "memoryThreshold": 0.8,
  "defaultTemplate": "component"
}
EOF

# Permissions configuration
cat > .claude/permissions.json << 'EOF'
{
  "allowedTools": ["bash", "editor", "git", "filesystem", "web"],
  "allowedPaths": ["src/", "tests/", "docs/"],
  "restrictedPaths": [".claude/", "node_modules/"],
  "allowNetworkAccess": true,
  "allowFileCreation": true,
  "allowFileDeletion": false
}
EOF
```

## Context Management Strategies

### 1. Context Layering

**Layer 1: Immediate Context** (Current conversation)
- Last 10-15 messages
- Current task focus
- Recent file changes

**Layer 2: Project Context** (CLAUDE.md + recent memory)
- Project overview and goals
- Current phase status
- Recent decisions

**Layer 3: Historical Context** (Archived memory)
- Past phases and decisions
- Completed features
- Architectural history

### 2. Context Prioritization

**High Priority Context**:
- Current task and immediate goals
- Recently modified files
- Active bugs or issues
- Current phase requirements

**Medium Priority Context**:
- Project architecture overview
- Recent decisions and rationale
- Testing requirements
- Deployment configuration

**Low Priority Context**:
- Historical decisions
- Past phases (archived)
- Old bug reports
- Deprecated features

### 3. Context Refresh Patterns

**Before Starting New Task**:
```bash
# Load relevant context
/memory --load --topic=current-phase
/memory --load --decisions --recent=7days

# Clear unnecessary context
/compact --keep-topics=current-task,architecture

# Focus on specific files
@src/components/ @src/services/
```

**During Task Execution**:
```bash
# Monitor context usage
/memory --show

# Save progress periodically
/memory --save --content="Completed user authentication UI components"

# Document decisions as they're made
/memory --save-decision --content="Chose React Hook Form for form validation"
```

**After Task Completion**:
```bash
# Create summary
/memory --save-summary --title="User Authentication UI Completed"

# Archive completed work
/memory --archive --topic=auth-ui

# Compact for next task
/compact --preserve-recent=5
```

## Advanced Context Management Techniques

### 1. Smart Context Loading

**Topic-Based Loading**:
```bash
# Load all authentication-related context
/memory --load --topic=authentication --include=code,decisions,architecture

# Load recent frontend work
/memory --load --topic=frontend --recent=3days --include=code,summaries
```

**Dependency-Based Loading**:
```bash
# Load context for specific component
/memory --load --component=ProductCard --include=dependencies,tests,docs

# Load API endpoint context
/memory --load --endpoint=POST /api/products --include=handler,middleware,tests
```

### 2. Context Tagging

**Tag Creation**:
```bash
# Tag important conversations
/memory --tag --conversation-id=abc123 --tags="#feature,#payment,#critical"

# Tag code artifacts
/memory --tag --file=src/services/payment.js --tags="#payment,#security,#tested"
```

**Tag-Based Retrieval**:
```bash
# Find all payment-related context
/memory --search --tags="#payment"

# Find critical features
/memory --search --tags="#critical" --recent=30days
```

### 3. Context Templates

**Phase Start Template**:
```bash
/memory --template=phase-start --name="Frontend Development" --goals="Build UI components, implement state management, create responsive design"
```

**Daily Summary Template**:
```bash
/memory --template=daily-summary --progress="Completed auth UI, started product catalog" --blocks="API integration, testing setup"
```

## Best Practices for Project Files

### CLAUDE.md Maintenance

**Keep CLAUDE.md Current**:
- Update status daily
- Record decisions immediately
- Archive completed phases
- Review and update weekly

**Structured Updates**:
```bash
# Quick status update
/memory --update-status --phase="Frontend Development" --progress="70%"

# Add new decision
/memory --add-decision --title="UI Library Selection" --decision="Chose Tailwind CSS over Material-UI" --rationale="Better customization, smaller bundle size"
```

### File Organization Best Practices

**Consistent Structure**:
- Use feature-based organization
- Keep related files together
- Separate concerns clearly
- Use index files for clean imports

**Documentation Integration**:
- Document file purposes
- Include usage examples
- Maintain API documentation
- Keep changelogs updated

### Context Management Best Practices

**Proactive Management**:
- Monitor context usage regularly
- Save important information proactively
- Use consistent tagging
- Archive old context systematically

**Reactive Management**:
- Compact when context is full
- Retrieve lost context when needed
- Clean up redundant information
- Reorganize when structure becomes messy

## Integration with Development Tools

### IDE Integration

**VS Code Setup**:
```json
// .vscode/settings.json
{
  "claude-code.projectFile": "CLAUDE.md",
  "claude-code.autoContext": true,
  "claude-code.contextThreshold": 0.8,
  "claude-code.saveOnExit": true
}
```

**Vim Integration**:
```vim
" .vimrc
nnoremap <leader>cc :!claude-code /memory --show<CR>
nnoremap <leader>cs :!claude-code /memory --save --content="<cword>"<CR>
```

### Git Hooks

**Pre-commit Hook**:
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Update CLAUDE.md with current status
claude-code /memory --update-status --auto

# Check if memory needs compacting
if [ $(claude-code /memory --usage) -gt 80 ]; then
    echo "Warning: Context usage above 80%. Consider compacting."
fi
```

### CI/CD Integration

**GitHub Actions**:
```yaml
# .github/workflows/memory-backup.yml
name: Backup Project Memory
on: [push]
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Backup Claude Code memory
        run: |
          tar -czf memory-backup.tar.gz .claude/memory/
          aws s3 cp memory-backup.tar.gz s3://project-backups/
```

This comprehensive project files and context management system ensures that Claude Code maintains deep understanding of your project throughout its lifecycle, enabling more effective assistance and better development outcomes.