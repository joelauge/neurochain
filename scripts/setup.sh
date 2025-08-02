#!/bin/bash

# Neurochain Setup Script
# This script will help you set up the Neurochain project

set -e

echo "🚀 Setting up Neurochain..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.11+ first."
        exit 1
    fi
    
    # Check Redis
    if ! command -v redis-server &> /dev/null; then
        print_warning "Redis is not installed. Please install Redis for full functionality."
    fi
    
    print_success "Requirements check completed"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    else
        print_status "Frontend dependencies already installed"
    fi
    
    # Create environment file if it doesn't exist
    if [ ! -f ".env.local" ]; then
        print_status "Creating frontend environment file..."
        cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Feature Flags
NEXT_PUBLIC_ENABLE_WEB3=true
NEXT_PUBLIC_ENABLE_REAL_TIME=true
EOF
        print_success "Frontend environment file created"
    fi
    
    cd ..
    print_success "Frontend setup completed"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    pip install -r requirements.txt
    
    # Create environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating backend environment file..."
        cat > .env << EOF
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Blockchain Configuration
BLOCKCHAIN_NETWORK=sepolia
CONTRACT_ADDRESS=
EOF
        print_success "Backend environment file created"
    fi
    
    cd ..
    print_success "Backend setup completed"
}

# Setup blockchain
setup_blockchain() {
    print_status "Setting up blockchain..."
    
    cd blockchain
    
    # Install dependencies
    if [ ! -d "node_modules" ]; then
        print_status "Installing blockchain dependencies..."
        npm install
    else
        print_status "Blockchain dependencies already installed"
    fi
    
    # Compile contracts
    print_status "Compiling smart contracts..."
    npx hardhat compile
    
    # Create environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating blockchain environment file..."
        cat > .env << EOF
# Blockchain Configuration
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key

# Contract Configuration
CONTRACT_NAME=NeurochainDecision
EOF
        print_warning "Please update blockchain/.env with your actual values"
    fi
    
    cd ..
    print_success "Blockchain setup completed"
}

# Start services
start_services() {
    print_status "Starting services..."
    
    # Start Redis if available
    if command -v redis-server &> /dev/null; then
        print_status "Starting Redis..."
        redis-server --daemonize yes
        print_success "Redis started"
    else
        print_warning "Redis not found. Please start Redis manually if needed."
    fi
    
    print_success "Services started"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Start the backend:"
    echo "   cd backend"
    echo "   source venv/bin/activate"
    echo "   uvicorn main:app --reload"
    echo ""
    echo "2. Start the frontend (in a new terminal):"
    echo "   cd frontend"
    echo "   npm run dev"
    echo ""
    echo "3. Deploy smart contracts (optional):"
    echo "   cd blockchain"
    echo "   # Update .env with your values"
    echo "   npx hardhat run scripts/deploy.ts --network sepolia"
    echo ""
    echo "4. Visit the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
    echo "📚 For more information, see SETUP.md"
}

# Main execution
main() {
    echo "🧠 Neurochain Setup Script"
    echo "=========================="
    echo ""
    
    check_requirements
    setup_frontend
    setup_backend
    setup_blockchain
    start_services
    show_next_steps
}

# Run main function
main "$@" 