'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Brain, Play, Shield, Square, RotateCcw, ExternalLink,
  Cpu, Network, Database, Eye, Zap, TrendingUp, ArrowLeft
} from 'lucide-react';

interface Decision {
  id: string;
  question: string;
  decision: string;
  reasoning: string;
  confidence: number;
  timestamp: Date;
  blockHash: string;
}

interface Transaction {
  id: string;
  decisionId: string;
  status: 'pending' | 'confirmed' | 'validated';
  timestamp: Date;
  blockNumber: number;
  gasUsed: number;
}

interface Stats {
  totalDecisions: number;
  validatedDecisions: number;
  averageConfidence: number;
  totalValidators: number;
}

export default function DemoPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalDecisions: 0,
    validatedDecisions: 0,
    averageConfidence: 0,
    totalValidators: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const generateDecision = (question: string): Decision => {
    const decisions = [
      "APPROVE WITH CONDITIONS",
      "REJECT DUE TO RISK FACTORS",
      "REQUIRE ADDITIONAL DOCUMENTATION",
      "APPROVE IMMEDIATELY",
      "FLAG FOR MANUAL REVIEW"
    ];
    
    const reasonings = [
      "Analysis indicates moderate risk with acceptable mitigation strategies.",
      "Risk assessment shows potential for significant negative impact.",
      "Insufficient data available for confident decision-making.",
      "All criteria met with high confidence scores across all parameters.",
      "Complex scenario requiring human expert evaluation."
    ];

    const randomDecision = decisions[Math.floor(Math.random() * decisions.length)];
    const randomReasoning = reasonings[Math.floor(Math.random() * reasonings.length)];
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      question,
      decision: randomDecision,
      reasoning: randomReasoning,
      confidence,
      timestamp: new Date(),
      blockHash: '0x' + Math.random().toString(36).substr(2, 16)
    };
  };

  const generateTransaction = (decisionId: string): Transaction => {
    const statuses: ('pending' | 'confirmed' | 'validated')[] = ['pending', 'confirmed', 'validated'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      decisionId,
      status: randomStatus,
      timestamp: new Date(),
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      gasUsed: Math.floor(Math.random() * 200000) + 50000
    };
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

  const startDemo = useCallback(() => {
    setIsRunning(true);
    const interval = setInterval(() => {
      if (!isRunning) {
        clearInterval(interval);
        return;
      }

      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      const newDecision = generateDecision(randomQuestion);
      const newTransaction = generateTransaction(newDecision.id);

      setDecisions(prev => [newDecision, ...prev.slice(0, 9)]);
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);

      // Update stats
      setStats(prev => {
        const newTotal = prev.totalDecisions + 1;
        const newValidated = prev.validatedDecisions + (newTransaction.status === 'validated' ? 1 : 0);
        const newAvgConfidence = ((prev.averageConfidence * prev.totalDecisions) + newDecision.confidence) / newTotal;
        const newValidators = Math.floor(Math.random() * 50) + 100; // Random validator count

        return {
          totalDecisions: newTotal,
          validatedDecisions: newValidated,
          averageConfidence: newAvgConfidence,
          totalValidators: newValidators
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const stopDemo = () => {
    setIsRunning(false);
  };

  const resetDemo = () => {
    setDecisions([]);
    setTransactions([]);
    setStats({
      totalDecisions: 0,
      validatedDecisions: 0,
      averageConfidence: 0,
      totalValidators: 0
    });
  };

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

      {/* Navigation */}
      <nav className="nav-glass">
        <div className="nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Brain />
            </div>
            <span>NEUROCHAIN</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="connect-btn secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO HOME
            </Link>
          </div>
        </div>
      </nav>

      <div className="section-container relative z-10 pt-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-6">
            AI DECISION DEMO
          </h1>
          <p className="hero-subtitle max-w-3xl mx-auto">
            Watch AI decisions being made, recorded on the blockchain, and validated by human consensus in real-time.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={startDemo}
            disabled={isRunning}
            className="hero-btn"
          >
            <Play className="w-5 h-5" />
            START DEMO
          </button>
          <button
            onClick={stopDemo}
            disabled={!isRunning}
            className="hero-btn secondary"
          >
            <Square className="w-5 h-5" />
            STOP DEMO
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
            <div className="tech-name">{stats.totalDecisions}</div>
            <p className="text-sm text-gray-400 mt-2">TOTAL DECISIONS</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Shield />
            </div>
            <div className="tech-name">{stats.validatedDecisions}</div>
            <p className="text-sm text-gray-400 mt-2">VALIDATED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <TrendingUp />
            </div>
            <div className="tech-name">{stats.averageConfidence.toFixed(1)}%</div>
            <p className="text-sm text-gray-400 mt-2">AVG CONFIDENCE</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Network />
            </div>
            <div className="tech-name">{stats.totalValidators}</div>
            <p className="text-sm text-gray-400 mt-2">VALIDATORS</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="features-grid">
          {/* Recent AI Decisions */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon">
                <Brain />
              </div>
              <h2 className="feature-title">RECENT AI DECISIONS</h2>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {decisions.map((decision) => (
                <div key={decision.id} className="glass p-4 rounded-lg border border-gray-700/50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold text-white">{decision.question}</h3>
                    <span className="text-xs bg-gradient-to-r from-cyan-600 to-purple-600 px-3 py-1 rounded-full font-bold">
                      {decision.confidence}%
                    </span>
                  </div>
                  <p className="text-sm text-cyan-300 mb-2 font-medium">{decision.decision}</p>
                  <p className="text-xs text-gray-400 mb-3">{decision.reasoning}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{decision.timestamp.toLocaleTimeString()}</span>
                    <span className="font-mono text-cyan-400">{decision.blockHash.substring(0, 8)}...</span>
                  </div>
                </div>
              ))}
              {decisions.length === 0 && (
                <p className="text-gray-400 text-center py-8">No decisions yet. Start the demo to see AI decisions in action.</p>
              )}
            </div>
          </div>

          {/* Blockchain Transactions */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon">
                <Network />
              </div>
              <h2 className="feature-title">BLOCKCHAIN TRANSACTIONS</h2>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="glass p-4 rounded-lg border border-gray-700/50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold text-white">Decision #{transaction.decisionId.substring(0, 6)}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      transaction.status === 'validated' ? 'bg-green-600/20 text-green-400' :
                      transaction.status === 'confirmed' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <div>
                      <span className="text-gray-500">Block:</span> #{transaction.blockNumber}
                    </div>
                    <div>
                      <span className="text-gray-500">Gas:</span> {transaction.gasUsed.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {transaction.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-gray-400 text-center py-8">No transactions yet. Start the demo to see blockchain activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 