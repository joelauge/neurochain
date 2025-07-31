# Neurochain Documentation

## Overview

Neurochain is a decentralized framework for transparent and accountable AI decision-making using blockchain technology. This project addresses the critical need for transparency and oversight in AI systems by recording every AI decision on a public blockchain.

## Architecture

### System Components

1. **Frontend (Next.js)**
   - Modern web interface built with Next.js 14 and TypeScript
   - Tailwind CSS for styling
   - Framer Motion for animations
   - Web3.js for blockchain interaction

2. **Backend (Python FastAPI)**
   - AI decision-making engine
   - RESTful API endpoints
   - Redis for caching and session management
   - LangChain integration for AI reasoning

3. **Blockchain (Ethereum)**
   - Smart contracts for decision recording
   - Decentralized validation system
   - Transparent audit trail

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Web3.js**: Ethereum JavaScript API
- **Lucide React**: Icon library

### Backend
- **Python 3.11+**: Programming language
- **FastAPI**: Modern web framework
- **LangChain**: AI/LLM framework
- **Redis**: In-memory data store
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

### Blockchain
- **Ethereum**: Blockchain platform
- **Solidity**: Smart contract language
- **Hardhat**: Development framework
- **OpenZeppelin**: Secure contract library

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Redis server
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neurochain.git
   cd neurochain
   ```

2. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Set up the blockchain**
   ```bash
   cd blockchain
   npm install
   npx hardhat compile
   ```

### Environment Variables

Create `.env` files in the respective directories:

**Backend (.env)**
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Blockchain (.env)**
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## API Documentation

### Backend API Endpoints

#### Health Check
```http
GET /health
```

#### Create Decision
```http
POST /api/decisions
Content-Type: application/json

{
  "question": "Should I approve this loan application?",
  "context": "Additional context information"
}
```

#### Get Decisions
```http
GET /api/decisions?limit=10
```

#### Get Decision by ID
```http
GET /api/decisions/{decision_id}
```

#### Validate Decision
```http
POST /api/decisions/{decision_id}/validate
```

#### Get Statistics
```http
GET /api/stats
```

### Smart Contract Functions

#### Record Decision
```solidity
function recordDecision(
    string memory question,
    string memory reasoning,
    string memory decision,
    uint256 confidence
) external returns (bytes32)
```

#### Validate Decision
```solidity
function validateDecision(
    bytes32 decisionId,
    bool isValid,
    string memory reason
) external
```

#### Get Decision
```solidity
function getDecision(bytes32 decisionId) external view returns (Decision memory)
```

## Deployment

### Frontend (GitHub Pages)

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Push to main branch
   - GitHub Actions will automatically deploy
   - Site will be available at `https://neurocha.in`

### Backend (Railway/Render)

1. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Deploy to Render**
   - Connect GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Smart Contracts (Ethereum)

1. **Deploy to Sepolia Testnet**
   ```bash
   cd blockchain
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

2. **Deploy to Mainnet**
   ```bash
   npx hardhat run scripts/deploy.ts --network mainnet
   ```

## Development

### Project Structure

```
neurochain/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   └── components/      # React components
│   ├── public/              # Static assets
│   └── package.json
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
└── README.md
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- **Frontend**: ESLint + Prettier
- **Backend**: Black + isort
- **Smart Contracts**: Solhint

## Security

### Smart Contract Security

- OpenZeppelin contracts for security
- Reentrancy protection
- Access control mechanisms
- Pausable functionality

### API Security

- CORS configuration
- Input validation with Pydantic
- Rate limiting (to be implemented)
- Authentication (to be implemented)

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
pytest
```

### Smart Contract Tests
```bash
cd blockchain
npx hardhat test
```

## Monitoring

### Health Checks
- Backend health endpoint: `/health`
- Redis connection monitoring
- Smart contract event monitoring

### Analytics
- Decision statistics
- Validation metrics
- Performance monitoring

## Roadmap

### Phase 1: Foundation ✅
- [x] Basic AI decision system
- [x] Smart contract development
- [x] Frontend interface
- [x] Backend API

### Phase 2: Enhancement
- [ ] Advanced AI models integration
- [ ] Layer-2 scaling solutions
- [ ] Enhanced validation mechanisms
- [ ] Mobile application

### Phase 3: Production
- [ ] Mainnet deployment
- [ ] Enterprise features
- [ ] Advanced analytics
- [ ] Multi-chain support

## Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/neurochain/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/neurochain/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenZeppelin for secure smart contracts
- Next.js team for the excellent framework
- FastAPI for the modern Python web framework
- The Ethereum community for blockchain infrastructure 