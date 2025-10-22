#!/bin/bash

# TodoApp Test Suite Installation Script
# This script sets up the testing environment for the TodoApp

echo "🚀 Setting up TodoApp test suite..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please upgrade to v14 or higher."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

echo "✓ Dependencies installed successfully"

# Verify Jest installation
echo "🔍 Verifying Jest installation..."
npx jest --version

if [ $? -ne 0 ]; then
    echo "❌ Jest verification failed."
    exit 1
fi

echo "✓ Jest is installed and working"

# Run tests to verify setup
echo "🧪 Running initial test suite..."
npm test

if [ $? -eq 0 ]; then
    echo "🎉 Test suite setup completed successfully!"
    echo ""
    echo "📚 Available commands:"
    echo "  npm test              - Run all tests"
    echo "  npm run test:watch    - Run tests in watch mode"
    echo "  npm run test:coverage - Run tests with coverage"
    echo ""
    echo "📁 Test files created:"
    echo "  tests/TodoApp.test.js      - Main TodoApp class tests"
    echo "  tests/utils.test.js        - Utility function tests"
    echo "  tests/integration.test.js  - DOM integration tests"
    echo "  tests/setup.js             - Test setup and helpers"
    echo "  tests/README.md            - Test documentation"
    echo ""
    echo "🔧 For detailed documentation, see: tests/README.md"
else
    echo "⚠️  Tests completed with warnings. Check the output above for details."
    echo "   The testing environment is set up, but some tests may need attention."
fi

echo ""
echo "✨ Setup complete! Happy testing! 🚀"