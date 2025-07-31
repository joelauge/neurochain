'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Brain, 
  Shield, 
  Play,
  Square,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

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
  hash: string;
  status: 'pending' | 'confirmed' | 'validated';
  timestamp: Date;
  validators: number;
}

export default function DemoPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    totalDecisions: 0,
    validatedDecisions: 0,
    averageConfidence: 0,
    totalValidators: 0
  });

  const questions = [
    "Should this loan application be approved?",
    "Is this medical diagnosis accurate?",
    "Should this content be flagged as inappropriate?",
    "What is the optimal investment strategy?",
    "Should this autonomous vehicle make an emergency stop?",
    "Is this legal contract compliant?",
    "Should this job candidate be hired?",
    "What is the best treatment plan for this patient?"
  ];

  const generateDecision = (question: string): Decision => {
    const decisions = [
      "Approve with conditions",
      "Reject due to risk factors",
      "Require additional documentation",
      "Approve immediately",
      "Flag for manual review"
    ];
    
    const reasoning = [
      "Based on credit history and income verification",
      "Risk assessment indicates high probability of default",
      "Insufficient documentation provided",
      "All criteria met with strong indicators",
      "Unusual patterns detected requiring human oversight"
    ];

    return {
      id: Math.random().toString(36).substr(2, 9),
      question,
      decision: decisions[Math.floor(Math.random() * decisions.length)],
      reasoning: reasoning[Math.floor(Math.random() * reasoning.length)],
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      timestamp: new Date(),
      blockHash: '0x' + Math.random().toString(16).substr(2, 64)
    };
  };

  const startDemo = () => {
    setIsRunning(true);
  };

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

  const processNextDecision = useCallback(() => {
    if (!isRunning) return;

    const question = questions[Math.floor(Math.random() * questions.length)];
    const decision = generateDecision(question);
    
    setDecisions(prev => [decision, ...prev.slice(0, 9)]);
    
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      decisionId: decision.id,
      hash: decision.blockHash,
      status: 'pending',
      timestamp: new Date(),
      validators: 0
    };
    
    setTransactions(prev => [transaction, ...prev.slice(0, 9)]);
    
    // Simulate validation after 3 seconds
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => 
          t.id === transaction.id 
            ? { ...t, status: 'confirmed', validators: Math.floor(Math.random() * 5) + 1 }
            : t
        )
      );
    }, 3000);
    
    // Simulate final validation after 6 seconds
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => 
          t.id === transaction.id 
            ? { ...t, status: 'validated', validators: Math.floor(Math.random() * 10) + 5 }
            : t
        )
      );
      
      setStats(prev => ({
        totalDecisions: prev.totalDecisions + 1,
        validatedDecisions: prev.validatedDecisions + 1,
        averageConfidence: (prev.averageConfidence * prev.totalDecisions + decision.confidence) / (prev.totalDecisions + 1),
        totalValidators: prev.totalValidators + Math.floor(Math.random() * 10) + 5
      }));
    }, 6000);
  }, [isRunning, questions]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(processNextDecision, 4000);
    }
    return () => clearInterval(interval);
  }, [isRunning, processNextDecision]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-purple-400" />
            Neurochain AI Decision Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch AI decisions being made, recorded on the blockchain, and validated by human consensus in real-time.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={startDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Demo
          </button>
          <button
            onClick={stopDemo}
            disabled={!isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
          >
            <Square className="w-5 h-5" />
            Stop Demo
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.totalDecisions}</div>
            <div className="text-sm text-gray-300">Total Decisions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.validatedDecisions}</div>
            <div className="text-sm text-gray-300">Validated</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.averageConfidence.toFixed(1)}%</div>
            <div className="text-sm text-gray-300">Avg Confidence</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.totalValidators}</div>
            <div className="text-sm text-gray-300">Validators</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent AI Decisions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Recent AI Decisions
            </h2>
            <div className="space-y-4">
              {decisions.map((decision) => (
                <div key={decision.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{decision.question}</h3>
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded">{decision.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{decision.decision}</p>
                  <p className="text-xs text-gray-400">{decision.reasoning}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{decision.timestamp.toLocaleTimeString()}</span>
                    <span className="font-mono">{decision.blockHash.substring(0, 8)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Transactions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              Blockchain Transactions
            </h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm">{tx.hash.substring(0, 12)}...</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tx.status === 'validated' ? 'bg-green-600' :
                      tx.status === 'confirmed' ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{tx.validators} validators</span>
                    <span>{tx.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 