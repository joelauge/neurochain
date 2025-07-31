# Neurochain Setup Guide

## Quick Start

This guide will help you get the Neurochain project up and running locally.

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Python 3.11+** - [Download here](https://www.python.org/)
- **Redis** - [Download here](https://redis.io/download)
- **Git** - [Download here](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/neurochain.git
cd neurochain
```

### 2. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Set Up Backend

```bash
cd backend
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### 4. Set Up Blockchain (Optional)

```bash
cd blockchain
npm install
npx hardhat compile
```

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Blockchain Environment Variables

Create a `.env` file in the `blockchain` directory:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Testing the Setup

### 1. Frontend Test

1. Open `http://localhost:3000` in your browser
2. You should see the Neurochain landing page
3. Click "Try Demo" to test the AI decision prototype

### 2. Backend Test

1. Open `http://localhost:8000/docs` in your browser
2. You should see the FastAPI documentation
3. Test the health endpoint: `http://localhost:8000/health`

### 3. API Test

```bash
# Test creating a decision
curl -X POST "http://localhost:8000/api/decisions" \
  -H "Content-Type: application/json" \
  -d '{"question": "Should I approve this loan application?"}'

# Test getting decisions
curl "http://localhost:8000/api/decisions"

# Test getting stats
curl "http://localhost:8000/api/stats"
```

## Project Structure

```
neurochain/
├── frontend/                 # Next.js frontend application
│   ├── src/app/             # Pages and components
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                  # Python FastAPI backend
│   ├── main.py              # Main application
│   ├── requirements.txt     # Python dependencies
│   └── venv/                # Virtual environment
├── blockchain/              # Smart contracts
│   ├── contracts/           # Solidity contracts
│   ├── scripts/             # Deployment scripts
│   └── hardhat.config.ts    # Hardhat configuration
├── docs/                    # Documentation
├── prototype/               # Simple HTML prototype
└── README.md               # Project overview
```

## Development Commands

### Frontend

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
uvicorn main:app --reload # Start development server
```

### Blockchain

```bash
cd blockchain
npx hardhat compile   # Compile contracts
npx hardhat test      # Run tests
npx hardhat node      # Start local blockchain
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Port 8000 already in use**
   ```bash
   # Kill the process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

3. **Redis connection failed**
   ```bash
   # Start Redis server
   redis-server
   ```

4. **Python virtual environment issues**
   ```bash
   # Remove and recreate virtual environment
   rm -rf venv
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

5. **Node modules issues**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- Check the [documentation](docs/README.md)
- Open an [issue](https://github.com/yourusername/neurochain/issues)
- Join our [discussions](https://github.com/yourusername/neurochain/discussions)

## Next Steps

1. **Explore the codebase** - Start with the frontend components and backend API
2. **Test the prototype** - Try the AI decision demo
3. **Read the whitepaper** - Understand the project vision
4. **Contribute** - Fork the repository and submit pull requests

## Deployment

### Frontend (GitHub Pages)

The frontend is automatically deployed to GitHub Pages when you push to the main branch.

### Backend (Railway/Render)

1. **Railway**: Connect your GitHub repository and deploy
2. **Render**: Connect your GitHub repository and set build/start commands

### Smart Contracts (Ethereum)

```bash
cd blockchain
npx hardhat run scripts/deploy.ts --network sepolia
```

## Support

If you encounter any issues during setup, please:

1. Check this setup guide
2. Review the [documentation](docs/README.md)
3. Search existing [issues](https://github.com/yourusername/neurochain/issues)
4. Create a new issue with detailed information

Happy coding! 🚀 