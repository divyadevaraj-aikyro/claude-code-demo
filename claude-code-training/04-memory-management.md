# Memory Management in Claude Code

## Understanding Memory in Claude Code

Claude Code has two types of memory that work together to provide context and continuity:

### Short-Term Memory (Context Window)
- **What it is**: The current conversation context that Claude can "see" and reference
- **Size**: Up to 200,000 tokens (approximately 150,000 words)
- **Volatility**: Temporary, cleared when session ends or context is compacted
- **Purpose**: Immediate context for current tasks

### Long-Term Memory (Persistent Storage)
- **What it is**: Saved information that persists across sessions
- **Storage**: Files in your project (CLAUDE.md, memory files, etc.)
- **Permanence**: Persistent until manually deleted
- **Purpose**: Project knowledge, decisions, and progress tracking

## The Context Window Problem

### Why Context Management Matters

When working on complex projects, the context window can fill up quickly, leading to:

1. **Loss of Early Context**: Claude forgets early conversations and decisions
2. **Reduced Performance**: Slower responses as context grows
3. **Hallucinations**: Claude may invent information when context is lost
4. **Session Limits**: Hitting the maximum token limit causes errors

### The 80-95% Rule

**Best Practice**: Move information from short-term to long-term memory when context usage reaches 80-95% of capacity.

**For a 200K token window:**
- **Trigger Point**: 160,000 - 190,000 tokens
- **Safe Buffer**: 10,000 - 40,000 tokens
- **Action Required**: Summarize and compact context

## Memory Triage Strategy

### The Surgical Table Analogy

Think of managing AI context like a surgeon's operating table:

**Short-Term Memory (The Table)**:
- Only tools and information for immediate tasks
- Recent conversation turns
- Active data and variables
- Current session state

**Long-Term Memory (The Cabinets)**:
- Completed tasks and summaries
- Key decisions and findings
- Finalized code and artifacts
- Global project state

### What to Keep in Short-Term Memory

✅ **Immediate Goal**: Current specific instruction or task
✅ **Recent Conversation**: Last 5-10 conversation turns
✅ **Active Data**: Recent tool outputs and code snippets
✅ **Session State**: Brief summary of current project phase

### What to Move to Long-Term Memory

🗄️ **Completed Tasks**: Summaries of finished work phases
🗄️ **Key Decisions**: Important insights and choices made
🗄️ **Finalized Artifacts**: Complete, tested code and documentation
🗄️ **Global Project State**: High-level project requirements

## Practical Memory Management Workflow

### Step 1: Monitor Context Usage

**Automatic Monitoring**:
```bash
# Check current context usage
/memory --show

# Enable automatic monitoring
/memory --monitor --threshold=0.8
```

**Manual Monitoring**:
```bash
# Check context size
/doctor --memory

# Show detailed memory status
/memory --detailed
```

### Step 2: Trigger Memory Management at Threshold

When context reaches 80-85% capacity:

```bash
# Save current state to long-term memory
/memory --save --summary="Phase 1: User authentication system completed"

# Compact context to free up space
/compact --save-summary --preserve-code
```

### Step 3: Prompt Claude to Summarize

**Example Summary Prompt**:
```
You are approaching your context limit at 85% capacity. Please:

1. Summarize the completed authentication system implementation
2. Save the final auth.js code to long-term memory
3. Document key decisions made during development
4. State the next immediate task: building the user profile page
5. Compact the conversation to focus on the next phase
```

### Step 4: Save to Long-Term Storage

**Using Memory Commands**:
```bash
# Save comprehensive summary
/memory --save --file="phase1-authentication.md"

# Save specific artifacts
/memory --save-code --file="auth-system.js" --source="src/auth/auth.js"

# Save key decisions
/memory --save-decisions --file="decisions.md"
```

**Manual File Creation**:
```bash
# Create phase summary
cat > phase1-authentication.md << 'EOF'
# Phase 1: Authentication System - COMPLETED

## Summary
Successfully implemented JWT-based authentication system with the following features:
- User registration and login
- Password hashing with bcrypt
- JWT token generation and validation
- Protected routes middleware
- Session management

## Key Components
- `src/auth/auth.js`: Main authentication logic
- `src/auth/middleware.js`: Route protection middleware
- `src/auth/routes.js`: Authentication API endpoints
- `models/User.js`: User database model

## Key Decisions Made
1. Used JWT instead of sessions for scalability
2. Implemented bcrypt for password security (12 rounds)
3. Added refresh token rotation for enhanced security
4. Structured auth as separate module for reusability

## Next Phase
Build user profile management system with:
- Profile CRUD operations
- Avatar upload functionality
- Profile privacy settings
- User preferences management

## Context for Next Phase
- Authentication system is complete and tested
- User model has basic profile fields ready
- JWT middleware available for protecting profile routes
- Database connection and schema established
EOF
```

### Step 5: Reset and Reload

```bash
# Start fresh with compacted context
/clear --keep-memory

# Or use compact for less aggressive cleanup
/compact --preserve-recent --threshold=0.5

# Load long-term memory if needed
/memory --load --file="phase1-authentication.md"
```

## Advanced Memory Management Techniques

### 1. Structured Memory Organization

**Directory Structure**:
```
.claude/
├── memory/
│   ├── phases/
│   │   ├── phase1-authentication.md
│   │   ├── phase2-profiles.md
│   │   └── phase3-dashboard.md
│   ├── decisions/
│   │   ├── architecture-decisions.md
│   │   ├── technology-choices.md
│   │   └── api-design-decisions.md
│   ├── artifacts/
│   │   ├── completed-components/
│   │   ├── tested-functions/
│   │   └── configuration-files/
│   └── summaries/
│       ├── daily-summaries/
│       ├── weekly-progress/
│       └── milestone-reviews/
```

### 2. Automated Memory Management

**Setting Up Automatic Compaction**:
```bash
# Configure automatic memory management
/memory --auto-compact --threshold=0.8
/memory --auto-save --interval=30-minutes
/memory --monitor --alerts
```

**Creating Memory Management Scripts**:
```bash
# Create .claude/scripts/memory-manager.sh
cat > .claude/scripts/memory-manager.sh << 'EOF'
#!/bin/bash

# Memory Management Script for Claude Code

THRESHOLD=0.8
MEMORY_FILE=".claude/memory/status.json"

# Check current context usage
USAGE=$(claude-code --context-usage)

if (( $(echo "$USAGE > $THRESHOLD" | bc -l) )); then
    echo "Context usage at $USAGE, initiating memory management..."

    # Save current state
    claude-code /memory --save --auto-summary

    # Compact context
    claude-code /compact --preserve-code

    # Create checkpoint
    echo "$(date): Context compacted from $USAGE" >> .claude/memory/checkpoints.log
fi
EOF

chmod +x .claude/scripts/memory-manager.sh
```

### 3. Memory Templates

**Phase Completion Template**:
```markdown
# Phase [NUMBER]: [PHASE NAME] - COMPLETED

## Summary
[Brief description of what was accomplished]

## Key Components
[List of main files, modules, or features created]

## Technical Implementation
[Important technical details and implementation notes]

## Key Decisions Made
1. [Decision 1 with rationale]
2. [Decision 2 with rationale]
3. [Decision 3 with rationale]

## Testing Status
- [ ] Unit tests completed
- [ ] Integration tests completed
- [ ] Manual testing completed
- [ ] Code review completed

## Next Phase
[Description of next phase and requirements]

## Context for Next Phase
[Information needed for the next phase]
```

**Daily Summary Template**:
```markdown
# Daily Summary - [DATE]

## Progress Made
- [Accomplishment 1]
- [Accomplishment 2]
- [Accomplishment 3]

## Issues Encountered
- [Issue 1 and resolution]
- [Issue 2 and resolution]

## Key Decisions
- [Decision 1]
- [Decision 2]

## Next Steps
1. [Next step 1]
2. [Next step 2]
3. [Next step 3]

## Context Status
- Context usage: [PERCENTAGE]%
- Last compaction: [TIMESTAMP]
- Active files: [LIST]
```

## Memory Management Commands Reference

### `/memory` Command Family

**Basic Memory Operations**:
```bash
# Show current memory status
/memory --show

# Save current context
/memory --save

# Load saved memory
/memory --load --file=filename.md

# Clear memory
/memory --clear

# Export memory
/memory --export=backup.json

# Import memory
/memory --import=backup.json
```

**Advanced Memory Operations**:
```bash
# Save with summary
/memory --save --summary="Completed user authentication module"

# Save specific code
/memory --save-code --source=src/auth.js --dest=memory/auth-complete.js

# Save decisions
/memory --save-decisions --file=decisions.md

# Enable monitoring
/memory --monitor --threshold=0.8 --alerts

# Auto-compact configuration
/memory --auto-compact --threshold=0.85 --preserve-code
```

### `/compact` Command Options

**Basic Compaction**:
```bash
# Standard compaction
/compact

# Aggressive compaction (removes more)
/compact --aggressive

# Preserve code blocks
/compact --preserve-code

# Save summary before compacting
/compact --save-summary
```

**Advanced Compaction**:
```bash
# Compact with custom threshold
/compact --threshold=0.7

# Preserve recent items
/compact --preserve-recent=10

# Compact to specific size
/compact --target-size=50%

# Selective compaction
/compact --keep-topics=auth,api --remove-topics=debug,testing
```

## Retrieval-Augmented Generation (RAG) Implementation

### Understanding RAG in Claude Code

RAG (Retrieval-Augmented Generation) is the formal name for the memory management strategy we're implementing. It combines:

1. **Generation**: Claude's ability to generate responses
2. **Retrieval**: Fetching relevant information from long-term memory

### Setting Up RAG System

**1. Create Knowledge Base**:
```bash
# Create structured knowledge base
mkdir -p .claude/knowledge/{architecture,decisions,components,tests}

# Populate with project knowledge
echo "# Authentication Architecture

## Overview
JWT-based authentication with refresh tokens

## Security Measures
- bcrypt with 12 rounds
- JWT expiration: 15 minutes
- Refresh token rotation
- CSRF protection

## Implementation Details
See: src/auth/implementation.md
" > .claude/knowledge/architecture/authentication.md
```

**2. Implement Retrieval System**:
```bash
# Create retrieval script
cat > .claude/scripts/retrieve-knowledge.sh << 'EOF'
#!/bin/bash

TOPIC="$1"
QUERY="$2"

# Search knowledge base
find .claude/knowledge -name "*.md" -exec grep -l "$TOPIC" {} \; | while read file; do
    echo "=== $file ==="
    grep -A 5 -B 5 "$QUERY" "$file"
    echo
done
EOF

chmod +x .claude/scripts/retrieve-knowledge.sh
```

**3. Use RAG in Practice**:
```bash
# Before starting new task
./claude/scripts/retrieve-knowledge.sh "authentication" "security"

# Load relevant knowledge into context
/memory --load --topic=authentication

# Proceed with task using retrieved knowledge
```

## Vector Databases for Advanced Memory

### When to Use Vector Databases

Consider vector databases when:
- Project has extensive documentation
- Multiple developers contributing
- Complex codebase with many modules
- Need semantic search capabilities

### Simple Vector Database Setup

**Using ChromaDB (Example)**:
```bash
# Install ChromaDB
pip install chromadb

# Create vector store script
cat > .claude/scripts/vector-store.py << 'EOF'
import chromadb
import os
from pathlib import Path

class ProjectMemory:
    def __init__(self, path=".claude/vector-store"):
        self.client = chromadb.PersistentClient(path=path)
        self.collection = self.client.get_or_create_collection("project_memory")

    def add_document(self, doc_id, content, metadata=None):
        """Add document to vector store"""
        self.collection.add(
            documents=[content],
            metadatas=[metadata or {}],
            ids=[doc_id]
        )

    def search(self, query, n_results=3):
        """Search for relevant documents"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        return results

    def load_from_directory(self, directory):
        """Load all markdown files from directory"""
        for file_path in Path(directory).rglob("*.md"):
            with open(file_path, 'r') as f:
                content = f.read()
                doc_id = str(file_path)
                metadata = {"source": str(file_path), "type": "documentation"}
                self.add_document(doc_id, content, metadata)

# Usage example
if __name__ == "__main__":
    memory = ProjectMemory()
    memory.load_from_directory(".claude/knowledge")

    # Search for authentication-related information
    results = memory.search("authentication security")
    print(results)
EOF

python .claude/scripts/vector-store.py
```

## Best Practices for Memory Management

### Daily Memory Management Routine

**Start of Day**:
```bash
# Load yesterday's summary
/memory --load --file="summaries/yesterday.md"

# Check project status
/memory --show

# Review daily goals
cat .claude/goals/daily.md
```

**During Development**:
```bash
# Monitor context usage regularly
/memory --monitor --threshold=0.7

# Save completed features
/memory --save-code --source="src/feature.js" --summary="Feature X completed"

# Document decisions as they're made
/memory --save-decisions --file="decisions.md" --append
```

**End of Day**:
```bash
# Create daily summary
/memory --save-summary --template=daily

# Compact context for tomorrow
/compact --save-summary

# Backup memory
/memory --export="backups/daily-$(date +%Y%m%d).json"
```

### Weekly Memory Management

**Weekly Review**:
```bash
# Create weekly summary
/memory --save-summary --template=weekly

# Archive old memory
/memory --archive --older-than=7days

# Clean up temporary files
/memory --cleanup

# Update project knowledge base
/memory --update-knowledge
```

### Memory Management Checklist

**Before Major Tasks**:
- [ ] Check context usage (`/memory --show`)
- [ ] Load relevant previous work (`/memory --load`)
- [ ] Clear unnecessary context (`/compact`)
- [ ] Set monitoring threshold (`/memory --monitor`)

**During Major Tasks**:
- [ ] Save progress regularly (`/memory --save`)
- [ ] Document key decisions (`/memory --save-decisions`)
- [ ] Monitor context usage
- [ ] Compact when necessary (`/compact`)

**After Major Tasks**:
- [ ] Create phase summary (`/memory --save-summary`)
- [ ] Archive completed work
- [ ] Update knowledge base
- [ ] Clear context for next phase

## Troubleshooting Memory Issues

### Common Problems and Solutions

**Issue 1: Context Window Full**
```bash
# Symptoms: Slow responses, errors
# Solution: Emergency compact
/compact --aggressive --save-summary

# If that fails, clear and reload
/clear --keep-memory
/memory --load --file="last-summary.md"
```

**Issue 2: Lost Important Context**
```bash
# Symptoms: Claude forgot previous decisions
# Solution: Load from long-term memory
/memory --load --topic=decisions
/memory --load --topic=architecture
```

**Issue 3: Memory Not Saving**
```bash
# Symptoms: /memory --save not working
# Solution: Check permissions and space
/doctor --filesystem
/memory --check-permissions
```

**Issue 4: Too Much Memory**
```bash
# Symptoms: Slow loading, too much information
# Solution: Archive and cleanup
/memory --archive --older-than=30days
/memory --cleanup
```

## Advanced Memory Patterns

### 1. Rolling Memory Window
```bash
# Keep only last N phases in active memory
/memory --rolling-window --phases=3

# Archive older phases automatically
/memory --auto-archive --older-than=2phases
```

### 2. Selective Memory Loading
```bash
# Load only specific types of memory
/memory --load --types=decisions,architecture
/memory --load --topics=auth,api
/memory --load --recent=7days
```

### 3. Memory Compression
```bash
# Compress old memory
/memory --compress --older-than=14days
/memory --compress --level=high
```

## Integration with Development Workflow

### Git Integration
```bash
# Commit memory changes
git add .claude/memory/
git commit -m "Update project memory - Phase 1 completed"

# Tag memory for important milestones
git tag -a "phase1-auth-complete" -m "Authentication system completed"
```

### CI/CD Integration
```bash
# Add memory backup to CI
# .github/workflows/backup-memory.yml
name: Backup Project Memory
on: [push]
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Backup memory
        run: |
          mkdir -p backups
          tar -czf backups/memory-$(date +%Y%m%d).tar.gz .claude/memory/
```

This comprehensive memory management system ensures that Claude Code can maintain context across long development sessions while avoiding the pitfalls of context window limitations.