// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    DECISIONS: '/api/decisions',
    STATS: '/api/stats',
    HEALTH: '/health'
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
};

// Blockchain Configuration (for future use)
export const BLOCKCHAIN_CONFIG = {
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '11155111', // Sepolia testnet
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/your-project-id'
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_WEB3: process.env.NEXT_PUBLIC_ENABLE_WEB3 === 'true',
  ENABLE_REAL_TIME: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME !== 'false'
}; 