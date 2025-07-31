'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Brain, 
  Shield, 
  Play,
  Square,
  RotateCcw,
  ExternalLink,
  Cpu,
  Network,
  Database,
  Eye,
  Zap,
  TrendingUp
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
  const [isBrowser, setIsBrowser] = useState(false);
  const [stats, setStats] = useState({
    totalDecisions: 0,
    validatedDecisions: 0,
    averageConfidence: 0,
    totalValidators: 0
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

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
      "APPROVE WITH CONDITIONS",
      "REJECT DUE TO RISK FACTORS",
      "REQUIRE ADDITIONAL DOCUMENTATION",
      "APPROVE IMMEDIATELY",
      "FLAG FOR MANUAL REVIEW"
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(120,119,198,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,119,198,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Particles */}
        {isBrowser && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 2 + 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NEUROCHAIN
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl">AI DECISION DEMO</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch AI decisions being made, recorded on the blockchain, and validated by human consensus in real-time.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={startDemo}
            disabled={isRunning}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center gap-3">
              <Play className="w-6 h-6" />
              <span>START DEMO</span>
            </div>
          </button>
          <button
            onClick={stopDemo}
            disabled={!isRunning}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center gap-3">
              <Square className="w-6 h-6" />
              <span>STOP DEMO</span>
            </div>
          </button>
          <button
            onClick={resetDemo}
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center gap-3">
              <RotateCcw className="w-6 h-6" />
              <span>RESET</span>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "TOTAL DECISIONS", value: stats.totalDecisions, color: "cyan", icon: <Brain className="w-8 h-8" /> },
            { label: "VALIDATED", value: stats.validatedDecisions, color: "green", icon: <Shield className="w-8 h-8" /> },
            { label: "AVG CONFIDENCE", value: stats.averageConfidence.toFixed(1) + "%", color: "purple", icon: <TrendingUp className="w-8 h-8" /> },
            { label: "VALIDATORS", value: stats.totalValidators, color: "yellow", icon: <Network className="w-8 h-8" /> }
          ].map((stat, index) => (
            <div key={index} className={`group relative bg-gradient-to-br from-${stat.color}-900/20 to-${stat.color}-600/10 backdrop-blur-xl border border-${stat.color}-500/30 rounded-2xl p-6 text-center hover:border-${stat.color}-400/50 transition-all duration-300 hover:scale-105`}>
              <div className={`text-${stat.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-black text-${stat.color}-400 mb-2`}>{stat.value}</div>
              <div className="text-sm text-gray-300 font-medium tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent AI Decisions */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                RECENT AI DECISIONS
              </span>
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {decisions.map((decision) => (
                <div key={decision.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-sm text-white">{decision.question}</h3>
                    <span className="text-xs bg-gradient-to-r from-cyan-600 to-purple-600 px-3 py-1 rounded-full font-bold">{decision.confidence}%</span>
                  </div>
                  <p className="text-sm text-cyan-300 mb-2 font-medium">{decision.decision}</p>
                  <p className="text-xs text-gray-400 mb-3">{decision.reasoning}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{decision.timestamp.toLocaleTimeString()}</span>
                    <span className="font-mono text-cyan-400">{decision.blockHash.substring(0, 8)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Transactions */}
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <div className="relative">
                <Network className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                BLOCKCHAIN TRANSACTIONS
              </span>
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-sm text-purple-300">{tx.hash.substring(0, 12)}...</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      tx.status === 'validated' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' :
                      tx.status === 'confirmed' ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white' : 
                      'bg-gradient-to-r from-gray-600 to-slate-600 text-white'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Network className="w-3 h-3" />
                      {tx.validators} validators
                    </span>
                    <span>{tx.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center gap-3">
              <ExternalLink className="w-6 h-6" />
              <span>BACK TO HOME</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 