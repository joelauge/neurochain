# Neurochain

A decentralized framework for transparent and accountable AI decision-making using blockchain technology.

## Vision

Neurochain addresses the critical need for transparency and accountability in AI systems by leveraging blockchain technology to record and validate every AI decision. This creates a decentralized oversight mechanism that ensures AI remains aligned with human values and operates transparently.

## Key Features

- **Transparent AI Decisions**: Every AI decision is recorded on a public blockchain with full traceability
- **Real-time Demo**: Interactive demo showing AI decisions and blockchain transactions in real-time
- **Sophisticated AI Engine**: Category-aware decision making with ethical considerations
- **Web3 Integration**: MetaMask wallet connection for blockchain interactions
- **Decentralized Validation**: Human consensus validates AI decisions through smart contracts
- **Smart Contract Governance**: Automated oversight and validation rules
- **High Performance**: Layer-2 solutions and sharding for scalability
- **Open Source**: Fully transparent and community-driven development

## Technology Stack

### Frontend
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Web3.js for blockchain interaction

### Backend/AI
- Python FastAPI
- LangChain for AI reasoning
- Redis for caching

### Blockchain
- Ethereum (Sepolia testnet)
- Solidity smart contracts
- Hardhat development framework

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neurochain.git
   cd neurochain
   ```

2. **Run the setup script**
   ```bash
   ./scripts/setup.sh
   ```

3. **Start the services**
   ```bash
   # Terminal 1: Start backend
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   
   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   ```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neurochain.git
   cd neurochain
   ```

2. **Set up frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set up backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Set up blockchain (optional)**
   ```bash
   cd blockchain
   npm install
   npx hardhat compile
   # Update .env with your values
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

## Project Structure

```
neurochain/
├── frontend/          # Next.js landing page and web interface
├── backend/           # Python FastAPI AI system
├── blockchain/        # Smart contracts and blockchain integration
├── docs/             # Documentation and whitepaper
├── prototype/        # Simple working prototype
└── README.md
```

## Live Demo

Visit [neurocha.in](https://neurocha.in) to see the live prototype and learn more about the project.

### Local Demo

1. Start the application using the setup instructions above
2. Visit `http://localhost:3000/demo` to see the interactive AI decision demo
3. Watch real AI decisions being made and recorded on the blockchain
4. Connect your MetaMask wallet to interact with the blockchain

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and join our community.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Website](https://neurocha.in)
- [Whitepaper](docs/Neurochain_Whitepaper.md)
- [Documentation](docs/)
- [Issues](https://github.com/yourusername/neurochain/issues) 