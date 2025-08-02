'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BLOCKCHAIN_CONFIG } from '@/config/api';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    if (typeof window !== 'undefined') {
      return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    }
    return false;
  };

  // Get the ethereum object
  const getEthereum = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }
    return null;
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const ethereum = getEthereum();
      if (!ethereum) {
        throw new Error('No Ethereum provider found');
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      setAccount(account);

      // Get chain ID
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);

      // Check if we're on the correct network
      if (chainId !== BLOCKCHAIN_CONFIG.CHAIN_ID) {
        setError(`Please switch to Sepolia testnet (Chain ID: ${BLOCKCHAIN_CONFIG.CHAIN_ID})`);
        return;
      }

      setIsConnected(true);

    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setChainId(null);
    setError(null);
  };

  // Listen for account changes
  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else {
        // User switched accounts
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(chainId);
      if (chainId !== BLOCKCHAIN_CONFIG.CHAIN_ID) {
        setError(`Please switch to Sepolia testnet (Chain ID: ${BLOCKCHAIN_CONFIG.CHAIN_ID})`);
      } else {
        setError(null);
      }
    };

    // Add event listeners
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    });

    ethereum.request({ method: 'eth_chainId' }).then((chainId: string) => {
      setChainId(chainId);
    });

    // Cleanup
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const value: Web3ContextType = {
    isConnected,
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    isLoading,
    error
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

// Add ethereum to window type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
} 