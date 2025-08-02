'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Brain, Play, Shield, Square, RotateCcw, ExternalLink,
  Cpu, Network, Database, Eye, Zap, TrendingUp, ArrowLeft,
  AlertCircle, Loader2, FileText, Hash, AlertTriangle, CheckCircle
} from 'lucide-react';
import { API_CONFIG } from '@/config/api';

interface AIReasoning {
  model_id: string;
  model_version: string;
  timestamp: string;
  input: {
    prompt: string;
    context: string;
    parameters: {
      temperature: number;
      max_tokens: number;
    };
  };
  reasoning_process: {
    thought_chain: string[];
    intermediate_decisions: string[];
    confidence_factors: string[];
  };
  output: {
    decision: string;
    confidence: number;
    explanation: string;
  };
  metadata: {
    session_id: string;
    user_id: string;
    request_id: string;
  };
}

interface Decision {
  id: string;
  timestamp: string;
  question: string;
  reasoning: string;
  decision: string;
  confidence: number;
  block_hash: string;
  status: string;
  category: string;
  ipfs_hash?: string;
  ai_reasoning?: AIReasoning;
}

interface BlockchainTransaction {
  id: string;
  decisionId: string;
  status: 'pending' | 'confirmed' | 'validated' | 'anomaly_detected';
  timestamp: Date;
  blockNumber: number;
  gasUsed: number;
  ipfsHash: string;
  anomalyScore?: number;
  anomalyType?: string;
}

interface Stats {
  total_decisions: number;
  validated_decisions: number;
  pending_decisions: number;
  average_confidence: number;
  system_status: string;
  ai_models_monitored: number;
  anomalies_detected: number;
}

export default function DemoPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_decisions: 0,
    validated_decisions: 0,
    pending_decisions: 0,
    average_confidence: 0,
    system_status: 'healthy',
    ai_models_monitored: 3,
    anomalies_detected: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);

  useEffect(() => {
    setIsBrowser(true);
    // Load initial data
    fetchStats();
    fetchDecisions();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATS}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load system statistics');
    }
  };

  const fetchDecisions = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DECISIONS}?limit=10`);
      if (!response.ok) throw new Error('Failed to fetch decisions');
      const data = await response.json();
      setDecisions(data);
    } catch (err) {
      console.error('Error fetching decisions:', err);
      setError('Failed to load decisions');
    }
  };

  const createDecision = async (question: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DECISIONS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      
      if (!response.ok) throw new Error('Failed to create decision');
      const data = await response.json();
      
      // Add new decision to the list
      setDecisions(prev => [data.decision, ...prev.slice(0, 9)]);
      
      // Create a mock blockchain transaction with IPFS hash
      const ipfsHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
      const anomalyScore = Math.random() > 0.9 ? Math.random() * 100 : 0;
      const anomalyType = anomalyScore > 0 ? ['behavioral_drift', 'confidence_anomaly', 'reasoning_inconsistency'][Math.floor(Math.random() * 3)] : undefined;
      
      const newTransaction: BlockchainTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        decisionId: data.decision.id,
        status: anomalyScore > 70 ? 'anomaly_detected' : 'pending',
        timestamp: new Date(),
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: Math.floor(Math.random() * 200000) + 50000,
        ipfsHash,
        anomalyScore: anomalyScore > 0 ? Math.round(anomalyScore) : undefined,
        anomalyType
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      
      // Update stats
      await fetchStats();
      
    } catch (err) {
      console.error('Error creating decision:', err);
      setError('Failed to create decision');
    } finally {
      setIsLoading(false);
    }
  };

  const validateDecision = async (decisionId: string) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DECISIONS}/${decisionId}/validate`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to validate decision');
      
      // Update the transaction status
      setTransactions(prev => 
        prev.map(tx => 
          tx.decisionId === decisionId 
            ? { ...tx, status: 'validated' as const }
            : tx
        )
      );
      
      // Update stats
      await fetchStats();
      
    } catch (err) {
      console.error('Error validating decision:', err);
      setError('Failed to validate decision');
    }
  };

  const questions = [
    "Should this loan application be approved?",
    "Is this medical diagnosis accurate?",
    "Should this investment be recommended?",
    "Is this content appropriate for all audiences?",
    "Should this legal contract be signed?",
    "Is this scientific research methodology sound?",
    "Should this hiring decision be made?",
    "Is this product safe for consumer use?"
  ];

  const aiModels = [
    { id: "gpt-4", name: "OpenAI GPT-4", version: "2024-01-01" },
    { id: "claude-3", name: "Anthropic Claude-3", version: "2024-01-01" },
    { id: "custom-model", name: "Custom AI Model", version: "1.0.0" }
  ];

  const startDemo = useCallback(() => {
    setIsRunning(true);
    setError(null);
    
    // Create initial decision
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    createDecision(randomQuestion);
    
    // Set up polling interval
    const interval = setInterval(async () => {
      if (!isRunning) {
        clearInterval(interval);
        return;
      }

      // Create a new decision every 5 seconds
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      await createDecision(randomQuestion);
      
      // Randomly validate some decisions
      if (Math.random() > 0.7 && decisions.length > 0) {
        const randomDecision = decisions[Math.floor(Math.random() * decisions.length)];
        await validateDecision(randomDecision.id);
      }
      
    }, 5000);

    setPollingInterval(interval);
  }, [isRunning, decisions]);

  const stopDemo = () => {
    setIsRunning(false);
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  const resetDemo = () => {
    stopDemo();
    setDecisions([]);
    setTransactions([]);
    setStats({
      total_decisions: 0,
      validated_decisions: 0,
      pending_decisions: 0,
      average_confidence: 0,
      system_status: 'healthy',
      ai_models_monitored: 3,
      anomalies_detected: 0
    });
    setError(null);
    setSelectedDecision(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Particles */}
      {isBrowser && (
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 20 + 's',
                animationDuration: Math.random() * 10 + 20 + 's'
              }}
            />
          ))}
        </div>
      )}

      <div className="section-container relative z-10 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-6">
            AI REASONING MONITORING DEMO
          </h1>
          <p className="hero-subtitle max-w-4xl mx-auto">
            Watch AI models being monitored in real-time. See their reasoning processes captured, stored on IPFS, 
            and recorded on the blockchain for transparent oversight and anomaly detection.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={startDemo}
            disabled={isRunning || isLoading}
            className="hero-btn"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {isLoading ? 'MONITORING...' : 'START MONITORING'}
          </button>
          <button
            onClick={stopDemo}
            disabled={!isRunning}
            className="hero-btn secondary"
          >
            <Square className="w-5 h-5" />
            STOP MONITORING
          </button>
          <button
            onClick={resetDemo}
            className="hero-btn secondary"
          >
            <RotateCcw className="w-5 h-5" />
            RESET
          </button>
        </div>

        {/* Stats */}
        <div className="tech-grid mb-16">
          <div className="tech-card">
            <div className="tech-icon">
              <Brain />
            </div>
            <div className="tech-name">{stats.total_decisions}</div>
            <p className="text-sm text-gray-400 mt-2">AI DECISIONS MONITORED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Shield />
            </div>
            <div className="tech-name">{stats.validated_decisions}</div>
            <p className="text-sm text-gray-400 mt-2">VALIDATED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <AlertTriangle />
            </div>
            <div className="tech-name">{stats.anomalies_detected}</div>
            <p className="text-sm text-gray-400 mt-2">ANOMALIES DETECTED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Cpu />
            </div>
            <div className="tech-name">{stats.ai_models_monitored}</div>
            <p className="text-sm text-gray-400 mt-2">AI MODELS MONITORED</p>
          </div>
        </div>

        {/* AI Models Being Monitored */}
        <div className="mb-16">
          <h2 className="section-title mb-8">AI MODELS UNDER MONITORING</h2>
          <div className="tech-grid">
            {aiModels.map((model) => (
              <div key={model.id} className="tech-card">
                <div className="tech-icon">
                  <Cpu />
                </div>
                <div className="tech-name">{model.name}</div>
                <p className="text-sm text-gray-400 mt-2">v{model.version}</p>
                <div className="mt-2">
                  <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
                    MONITORING ACTIVE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="features-grid">
          {/* AI Reasoning Monitoring */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon">
                <Brain />
              </div>
              <h2 className="feature-title">AI REASONING MONITORING</h2>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {decisions.map((decision) => (
                <div 
                  key={decision.id} 
                  className="glass p-4 rounded-lg border border-gray-700/50 cursor-pointer hover:border-cyan-500/50 transition-colors"
                  onClick={() => setSelectedDecision(decision)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold text-white">{decision.question}</h3>
                    <span className="text-xs bg-gradient-to-r from-cyan-600 to-purple-600 px-3 py-1 rounded-full font-bold">
                      {decision.confidence}%
                    </span>
                  </div>
                  <p className="text-sm text-cyan-300 mb-2 font-medium">{decision.decision}</p>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{decision.reasoning}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(decision.timestamp).toLocaleTimeString()}</span>
                    <div className="flex items-center gap-2">
                      <Hash className="w-3 h-3" />
                      <span className="font-mono text-cyan-400">{decision.block_hash.substring(0, 8)}...</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      decision.status === 'validated' ? 'bg-green-600/20 text-green-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {decision.status.toUpperCase()}
                    </span>
                    {decision.ipfs_hash && (
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                        IPFS: {decision.ipfs_hash.substring(0, 8)}...
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {decisions.length === 0 && (
                <p className="text-gray-400 text-center py-8">No AI decisions monitored yet. Start monitoring to see AI reasoning in action.</p>
              )}
            </div>
          </div>

          {/* Blockchain Transactions */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon">
                <Network />
              </div>
              <h2 className="feature-title">BLOCKCHAIN RECORDING</h2>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="glass p-4 rounded-lg border border-gray-700/50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold text-white">Decision #{transaction.decisionId.substring(0, 6)}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      transaction.status === 'validated' ? 'bg-green-600/20 text-green-400' :
                      transaction.status === 'anomaly_detected' ? 'bg-red-600/20 text-red-400' :
                      transaction.status === 'confirmed' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-2">
                    <div>
                      <span className="text-gray-500">Block:</span> #{transaction.blockNumber}
                    </div>
                    <div>
                      <span className="text-gray-500">Gas:</span> {transaction.gasUsed.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    <span className="text-gray-500">IPFS:</span> {transaction.ipfsHash.substring(0, 12)}...
                  </div>
                  {transaction.anomalyScore && (
                    <div className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">
                      Anomaly Score: {transaction.anomalyScore}% ({transaction.anomalyType})
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {transaction.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-gray-400 text-center py-8">No blockchain transactions yet. Start monitoring to see AI reasoning recorded on-chain.</p>
              )}
            </div>
          </div>
        </div>

        {/* AI Reasoning Detail Modal */}
        {selectedDecision && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">AI Reasoning Details</h2>
                <button 
                  onClick={() => setSelectedDecision(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2">Question</h3>
                  <p className="text-white">{selectedDecision.question}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2">AI Decision</h3>
                  <p className="text-white font-medium">{selectedDecision.decision}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2">Reasoning Process</h3>
                  <p className="text-gray-300 text-sm">{selectedDecision.reasoning}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-cyan-300 mb-2">Confidence</h3>
                    <p className="text-white">{selectedDecision.confidence}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-cyan-300 mb-2">Category</h3>
                    <p className="text-white capitalize">{selectedDecision.category}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2">Blockchain Hash</h3>
                  <p className="font-mono text-sm text-cyan-400">{selectedDecision.block_hash}</p>
                </div>
                
                {selectedDecision.ipfs_hash && (
                  <div>
                    <h3 className="text-sm font-semibold text-cyan-300 mb-2">IPFS Hash</h3>
                    <p className="font-mono text-sm text-blue-400">{selectedDecision.ipfs_hash}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 