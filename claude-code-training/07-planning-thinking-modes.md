# Planning Modes and Thinking Modes in Claude Code

## Understanding Planning Modes

Planning modes in Claude Code allow you to control how the AI approaches complex tasks, from quick execution to thorough analysis. These modes help balance speed, thoroughness, and creativity based on your specific needs.

## Types of Planning Modes

### 1. Standard Mode
**Purpose**: Quick execution with minimal planning
**Best for**: Simple tasks, routine operations, clear requirements
**Characteristics**: Fast, direct, minimal deliberation

**Usage Examples**:
```bash
# Simple tasks
Create a basic React component for user profiles
Fix the syntax error in the authentication function
Update the package.json with new dependencies

# Routine operations
Run the test suite
Deploy the application to staging
Create a new branch for the feature
```

**Code Example**:
```bash
# Standard mode execution
User: Create a login form component

Claude: I'll create a basic login form component with email and password fields.

[Immediately creates the component without extensive planning]
```

### 2. Plan Mode (`think`)
**Purpose**: Moderate planning with structured approach
**Best for**: Medium complexity tasks, feature development, debugging
**Characteristics**: Structured, considered, balanced approach

**Usage Examples**:
```bash
/think
Create a user authentication system with JWT tokens
Implement a shopping cart with state management
Design and build a RESTful API for product management
```

**Code Example**:
```bash
# Plan mode execution
User: /think
User: Create a user authentication system

Claude: Let me plan this authentication system step by step:

## Planning: User Authentication System

### Requirements Analysis
- User registration with email validation
- Login with password authentication
- JWT token generation and validation
- Protected routes middleware
- Session management
- Password reset functionality

### Architecture Plan
1. **Database Layer**
   - User model with required fields
   - Password hashing with bcrypt
   - Token storage strategy

2. **API Layer**
   - Registration endpoint
   - Login endpoint
   - Token refresh endpoint
   - Password reset endpoint

3. **Middleware Layer**
   - Authentication middleware
   - Token validation
   - Error handling

4. **Frontend Layer**
   - Login form component
   - Registration form component
   - Auth service for API calls
   - Protected route components

### Implementation Steps
1. Set up database schema and User model
2. Create authentication middleware
3. Implement API endpoints
4. Build frontend components
5. Add error handling and validation
6. Write tests for all components

### Security Considerations
- Input validation and sanitization
- Rate limiting for auth endpoints
- Secure password storage
- JWT token expiration handling
- HTTPS enforcement

Ready to proceed with implementation. Should I start with the database model?
```

### 3. Hard Mode (`think hard`)
**Purpose**: Comprehensive planning with deep analysis
**Best for**: Complex systems, architecture decisions, critical features
**Characteristics**: Thorough, analytical, risk-focused

**Usage Examples**:
```bash
/think hard
Design a microservices architecture for an e-commerce platform
Create a scalable real-time chat application
Build a comprehensive payment processing system with multiple providers
```

**Code Example**:
```bash
# Hard mode execution
User: /think hard
User: Design a microservices architecture for an e-commerce platform

Claude: Let me conduct a comprehensive analysis of e-commerce microservices architecture:

## Deep Analysis: E-Commerce Microservices Architecture

### 1. Business Requirements Analysis
**Core Business Functions:**
- User management and authentication
- Product catalog management
- Inventory management
- Order processing and fulfillment
- Payment processing
- Shopping cart and session management
- Search and recommendations
- Analytics and reporting

**Non-Functional Requirements:**
- Scalability: Handle 100K+ concurrent users
- Availability: 99.9% uptime requirement
- Performance: <200ms response time for 95% of requests
- Security: PCI compliance, data protection
- Maintainability: Easy to update and extend

### 2. Domain-Driven Design Analysis
**Domain Boundaries:**
```
User Domain ←→ Product Domain ←→ Order Domain
    ↓              ↓              ↓
Auth Domain    Inventory Domain  Payment Domain
    ↓              ↓              ↓
Notification Domain ←→ Analytics Domain
```

**Bounded Contexts:**
- **User Context**: Identity, profiles, preferences
- **Product Context**: Catalog, pricing, categories
- **Order Context**: Cart, checkout, fulfillment
- **Payment Context**: Transactions, refunds, billing
- **Inventory Context**: Stock, warehousing, suppliers

### 3. Microservice Decomposition Strategy

**Core Services (Primary):**
1. **User Service** (Authentication & Profiles)
   - Registration, login, profile management
   - JWT token generation and validation
   - User preferences and settings

2. **Product Service** (Catalog Management)
   - Product information, pricing, categories
   - Search and filtering capabilities
   - Product recommendations

3. **Order Service** (Order Processing)
   - Shopping cart management
   - Order creation and tracking
   - Order history and status

4. **Payment Service** (Financial Transactions)
   - Payment processing with multiple providers
   - Refund and cancellation handling
   - Transaction history and reporting

**Supporting Services (Secondary):**
5. **Inventory Service** (Stock Management)
   - Stock level tracking
   - Reservation and allocation
   - Supplier management

6. **Notification Service** (Communications)
   - Email notifications
   - SMS alerts
   - Push notifications

7. **Analytics Service** (Data Processing)
   - User behavior tracking
   - Sales analytics
   - Performance monitoring

### 4. Data Architecture Analysis

**Database Strategy:**
- **Polyglot Persistence**: Different databases for different needs
  - PostgreSQL: Relational data (orders, users)
  - MongoDB: Product catalog (flexible schema)
  - Redis: Session management, caching
  - Elasticsearch: Search functionality
  - Cassandra: Analytics data (time-series)

**Data Consistency Patterns:**
- **Strong Consistency**: Orders, payments (critical transactions)
- **Eventual Consistency**: Product catalog, recommendations
- **Saga Pattern**: Distributed transactions across services

### 5. Communication Patterns Analysis

**Synchronous Communication:**
- **REST APIs**: For simple CRUD operations
- **GraphQL**: For complex data fetching
- **gRPC**: For internal service communication

**Asynchronous Communication:**
- **Event-Driven Architecture**: Using message queues
- **Message Brokers**: RabbitMQ, Apache Kafka
- **Event Sourcing**: For order and payment events

### 6. API Gateway Strategy

**Gateway Responsibilities:**
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation
- API versioning

**Implementation Options:**
- Kong API Gateway
- AWS API Gateway
- NGINX with custom modules
- Spring Cloud Gateway

### 7. Security Architecture

**Security Layers:**
1. **Network Security**: VPC, firewalls, TLS encryption
2. **Application Security**: OAuth 2.0, JWT, API keys
3. **Data Security**: Encryption at rest and in transit
4. **Infrastructure Security**: Container security, secrets management

**Security Patterns:**
- **Zero Trust Architecture**: Verify every request
- **Defense in Depth**: Multiple security layers
- **Principle of Least Privilege**: Minimal access rights

### 8. Scalability and Performance Analysis

**Horizontal Scaling Strategy:**
- **Stateless Services**: Easy horizontal scaling
- **Load Balancing**: Distribute traffic efficiently
- **Auto-scaling**: Based on metrics and demand
- **Caching Strategy**: Multiple layers of caching

**Performance Optimization:**
- **Database Optimization**: Indexing, query optimization
- **Caching Layers**: Redis, CDN, application caching
- **Async Processing**: Background jobs, message queues
- **Connection Pooling**: Database and external service connections

### 9. Deployment and DevOps Strategy

**Containerization:**
- **Docker**: Service packaging
- **Kubernetes**: Orchestration and scaling
- **Docker Compose**: Local development

**CI/CD Pipeline:**
- **Jenkins/GitHub Actions**: Automated builds and testing
- **Automated Testing**: Unit, integration, E2E tests
- **Blue-Green Deployment**: Zero-downtime deployment
- **Canary Releases**: Gradual rollout

### 10. Monitoring and Observability

**Logging Strategy:**
- **Structured Logging**: JSON format for consistency
- **Centralized Logging**: ELK stack or similar
- **Log Correlation**: Request tracing across services

**Monitoring Metrics:**
- **Application Metrics**: Response times, error rates
- **Infrastructure Metrics**: CPU, memory, network
- **Business Metrics**: Conversion rates, user engagement

**Distributed Tracing:**
- **OpenTelemetry**: Standardized tracing
- **Jaeger/Zipkin**: Trace visualization
- **Correlation IDs**: Track requests across services

### 11. Risk Analysis and Mitigation

**Technical Risks:**
- **Service Dependencies**: Circuit breakers, retries
- **Data Consistency**: Saga pattern, idempotency
- **Performance Bottlenecks**: Load testing, monitoring

**Business Risks:**
- **Vendor Lock-in**: Multi-cloud strategy
- **Data Privacy**: GDPR compliance
- **Service Downtime**: High availability, disaster recovery

### 12. Implementation Roadmap

**Phase 1: Foundation (Months 1-2)**
- Set up infrastructure and CI/CD
- Implement User and Product services
- Create API gateway and basic security

**Phase 2: Core Features (Months 3-4)**
- Implement Order and Payment services
- Add inventory management
- Build basic frontend integration

**Phase 3: Advanced Features (Months 5-6)**
- Add Analytics and Notification services
- Implement advanced search
- Optimize performance and scalability

### 13. Technology Stack Recommendations

**Backend Services:**
- **Node.js/TypeScript**: For API services
- **Spring Boot/Java**: For critical business logic
- **Python/FastAPI**: For data processing services

**Databases:**
- **PostgreSQL**: Primary relational database
- **MongoDB**: Product catalog
- **Redis**: Caching and sessions
- **Elasticsearch**: Search functionality

**Infrastructure:**
- **Kubernetes**: Container orchestration
- **AWS/GCP**: Cloud infrastructure
- **Terraform**: Infrastructure as code

This comprehensive analysis provides a solid foundation for implementing a scalable, maintainable e-commerce platform. Shall I dive deeper into any specific aspect or begin with the implementation planning?
```

### 4. Ultra Hard Mode (`think ultra hard`)
**Purpose**: Maximum depth analysis with comprehensive research
**Best for**: Mission-critical systems, enterprise architecture, R&D projects
**Characteristics**: Exhaustive, research-intensive, multi-disciplinary

**Usage Examples**:
```bash
/think ultra hard
Design a next-generation AI-powered healthcare platform
Create a quantum-computing-ready financial system
Build an autonomous drone delivery network
```

## Chain of Thought (CoT) Mode

### Understanding CoT

Chain of Thought is a reasoning technique that breaks down complex problems into step-by-step thinking processes, making the reasoning transparent and verifiable.

### Enabling CoT Mode

**Basic CoT**:
```bash
/cot
Solve this complex algorithm problem step by step
```

**Verbose CoT**:
```bash
/cot --verbose
Debug this memory leak in our application
```

**CoT with Template**:
```bash
/cot --template=problem-solving
Design a database schema for a social media platform
```

### CoT Examples

**Algorithm Problem Solving**:
```bash
User: /cot --verbose
User: Find the optimal solution for the traveling salesman problem

Claude: Let me solve this step by step using Chain of Thought reasoning:

## Chain of Thought: Traveling Salesman Problem

### Step 1: Problem Understanding
**Goal**: Find the shortest possible route that visits each city exactly once and returns to the origin city.

**Input**: Set of cities and distances between them
**Output**: Optimal route and total distance

### Step 2: Problem Classification
This is an NP-hard optimization problem. Exact solutions are computationally expensive for large datasets.

### Step 3: Solution Approaches Analysis

**Approach 1: Brute Force**
- Enumerate all possible permutations
- Calculate total distance for each
- Select the minimum
- Complexity: O(n!)
- Feasibility: Only practical for n ≤ 10

**Approach 2: Dynamic Programming (Held-Karp)**
- Use DP with bitmask state representation
- Build solution by adding cities incrementally
- Complexity: O(n² * 2^n)
- Feasibility: Practical for n ≤ 20

**Approach 3: Approximation Algorithms**
- Nearest Neighbor: O(n²) time, 1.5x optimal guarantee
- 2-Opt: Local search improvement
- Christofides: 1.5x optimal for metric TSP

### Step 4: Algorithm Selection
Given typical constraints, I'll implement a hybrid approach:
1. Use Nearest Neighbor for initial solution
2. Apply 2-Opt local search for improvement
3. Consider Christofides if metric properties hold

### Step 5: Implementation Strategy

**Phase 1: Data Structure Design**
```python
class TSPSolver:
    def __init__(self, cities, distances):
        self.cities = cities
        self.distances = distances
        self.n = len(cities)
        self.best_route = None
        self.best_distance = float('inf')
```

**Phase 2: Nearest Neighbor Algorithm**
```python
def nearest_neighbor_tsp(self, start_city=0):
    unvisited = set(range(self.n))
    current = start_city
    route = [current]
    unvisited.remove(current)

    while unvisited:
        nearest = min(unvisited, key=lambda city: self.distances[current][city])
        route.append(nearest)
        unvisited.remove(nearest)
        current = nearest

    route.append(start_city)  # Return to start
    return route
```

**Phase 3: 2-Opt Optimization**
```python
def two_opt_optimization(self, route):
    improved = True
    best_route = route.copy()
    best_distance = self.calculate_distance(best_route)

    while improved:
        improved = False
        for i in range(1, len(best_route) - 2):
            for j in range(i + 1, len(best_route)):
                if j - i == 1: continue  # Skip adjacent edges

                new_route = best_route[:i] + best_route[i:j][::-1] + best_route[j:]
                new_distance = self.calculate_distance(new_route)

                if new_distance < best_distance:
                    best_route = new_route
                    best_distance = new_distance
                    improved = True
                    break
            if improved:
                break

    return best_route, best_distance
```

### Step 6: Complexity Analysis
- Nearest Neighbor: O(n²)
- 2-Opt Optimization: O(n²) per iteration
- Overall: O(k * n²) where k is number of improvement iterations
- Memory: O(n²) for distance matrix

### Step 7: Optimization Considerations
- Use distance matrix precomputation
- Implement early stopping criteria
- Consider parallelization for large datasets
- Add heuristic improvements for initial solution

### Step 8: Testing Strategy
- Test with known optimal solutions
- Verify triangle inequality for metric TSP
- Measure performance improvement from 2-Opt
- Compare with benchmark instances

This step-by-step reasoning ensures we have a robust, efficient solution that balances optimality with computational feasibility.
```

## Thinking Mode Templates

### Problem-Solving Template
```bash
/cot --template=problem-solving
```

**Structure**:
1. Problem Understanding
2. Constraint Analysis
3. Solution Brainstorming
4. Approach Selection
5. Implementation Planning
6. Testing Strategy
7. Risk Assessment

### Architecture Design Template
```bash
/cot --template=architecture
```

**Structure**:
1. Requirements Analysis
2. System Boundaries
3. Component Identification
4. Interface Design
5. Data Flow Analysis
6. Technology Selection
7. Scalability Considerations

### Debugging Template
```bash
/cot --template=debugging
```

**Structure**:
1. Symptom Description
2. Hypothesis Generation
3. Evidence Collection
4. Root Cause Analysis
5. Solution Development
6. Verification Testing
7. Prevention Strategies

## Planning Mode Best Practices

### 1. Mode Selection Guidelines

**Use Standard Mode for**:
- Simple CRUD operations
- Bug fixes with clear symptoms
- Routine maintenance tasks
- Well-defined requirements

**Use Plan Mode (`think`) for**:
- Feature development
- API design
- Database schema changes
- Integration tasks

**Use Hard Mode (`think hard`) for**:
- System architecture
- Performance optimization
- Security implementations
- Major refactoring

**Use Ultra Hard Mode (`think ultra hard`) for**:
- Enterprise system design
- Research and development
- Mission-critical components
- Innovation projects

### 2. Planning Mode Workflow

**Before Starting**:
```bash
# Assess task complexity
/assess-complexity "user authentication system"

# Select appropriate planning mode
/think hard

# Set clear objectives
/set-objectives "create secure, scalable auth system with JWT"
```

**During Planning**:
```bash
# Request clarification if needed
/clarify-requirements

# Validate assumptions
/validate-assumptions

# Consider alternatives
/consider-alternatives
```

**After Planning**:
```bash
# Review the plan
/review-plan

# Save the plan for reference
/memory --save --content="Authentication system architecture plan"

# Get confirmation before implementation
/confirm-implementation
```

### 3. Combining Planning Modes

**Progressive Planning**:
```bash
# Start with basic planning
/think
Create a basic user registration system

# Escalate for complex parts
/think hard
Now design the security architecture for the registration system

# Deep dive into critical components
/think ultra hard
Design the password hashing and session management strategy
```

**Iterative Refinement**:
```bash
# Initial plan
/think
Design the API structure

# Refine specific aspects
/think hard
Now focus on the authentication and authorization patterns

# Final optimization
/think ultra hard
Optimize the performance and security aspects of the API
```

## Custom Planning Templates

### Creating Custom Templates

**Template Definition**:
```markdown
<!-- .claude/templates/security-analysis.md -->
# Security Analysis Template

## 1. Threat Modeling
- Identify assets to protect
- Analyze potential threats
- Assess vulnerability scenarios

## 2. Security Requirements
- Authentication requirements
- Authorization requirements
- Data protection requirements
- Compliance requirements

## 3. Security Architecture
- Security layers design
- Control implementation
- Monitoring and alerting

## 4. Risk Assessment
- Risk identification
- Impact analysis
- Mitigation strategies

## 5. Implementation Plan
- Security controls implementation
- Testing procedures
- Deployment strategy
```

**Using Custom Templates**:
```bash
/cot --template=security-analysis
Analyze the security requirements for the payment processing system
```

### Template Examples

**Performance Analysis Template**:
```bash
/cot --template=performance
Optimize the database queries for the product search functionality
```

**Migration Template**:
```bash
/cot --template=migration
Plan the migration from monolithic to microservices architecture
```

**Integration Template**:
```bash
/cot --template=integration
Design the integration between our CRM and the new payment system
```

## Planning Mode Configuration

### Mode Persistence
```bash
# Set default planning mode
/set-default-mode think

# Set mode for current session
/set-session-mode think hard

# Set mode for specific project
/set-project-mode ultra-hard
```

### Mode Customization
```bash
# Configure think mode parameters
/configure-mode think --depth=medium --timeout=5min

# Configure hard mode parameters
/configure-mode "think hard" --depth=high --timeout=15min

# Configure ultra hard mode parameters
/configure-mode "think ultra hard" --depth=maximum --timeout=30min
```

## Planning Mode Integration

### With Memory Management
```bash
/think hard
/memory --save --content="Architecture planning for e-commerce platform"

# Later recall the plan
/memory --load --topic=architecture-plan
```

### With Git Workflow
```bash
/think hard
Create feature branch and implement planned architecture
git checkout -b feature/new-architecture
# Implement based on plan
git commit -m "feat: implement new architecture based on comprehensive planning"
```

### With Testing
```bash
/think
Plan the test strategy for the authentication system

# Execute testing plan
npm run test:coverage
npm run test:e2e
```

## Measuring Planning Effectiveness

### Planning Metrics
```bash
# Track planning time
/track-planning-time --task=auth-system

# Measure plan accuracy
/measure-plan-accuracy --plan-id=auth-architecture

# Analyze planning outcomes
/analyze-planning-outcomes --last=30days
```

### Continuous Improvement
```bash
# Review planning effectiveness
/review-planning --recent-tasks

# Identify improvement areas
/identify-improvements --planning-process

# Update planning templates
/update-template --name=architecture --improvements="Add security considerations"
```

This comprehensive planning and thinking system enables you to select the appropriate level of analysis for any task, ensuring optimal balance between speed and thoroughness.