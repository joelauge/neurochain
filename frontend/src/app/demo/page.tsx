'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  Clock, 
  Hash, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface Decision {
  id: string;
  timestamp: string;
  question: string;
  reasoning: string;
  decision: string;
  confidence: number;
  blockHash: string;
  status: 'pending' | 'validated' | 'rejected';
}

export default function Demo() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleQuestions = [
    "Should I approve this loan application for $50,000?",
    "Is this medical diagnosis accurate based on the symptoms?",
    "Should I recommend this investment to a client?",
    "Is this content appropriate for all audiences?",
    "Should I approve this insurance claim?",
    "Is this legal document compliant with regulations?",
    "Should I recommend this treatment plan?",
    "Is this financial transaction suspicious?"
  ];

  const generateDecision = async (question: string): Promise<Decision> => {
    // Simulate AI reasoning process
    const reasoning = `Analyzing the request: "${question}". Considering ethical guidelines, legal requirements, and risk factors. Evaluating potential outcomes and impact on stakeholders.`;
    
    const decision = Math.random() > 0.3 ? 'APPROVED' : 'REJECTED';
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    // Simulate blockchain transaction
    const blockHash = '0x' + Math.random().toString(16).substr(2, 64);
    
    return {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      question,
      reasoning,
      decision,
      confidence,
      blockHash,
      status: 'pending'
    };
  };

  const startDemo = () => {
    setIsRunning(true);
    processNextDecision();
  };

  const stopDemo = () => {
    setIsRunning(false);
  };

  const resetDemo = () => {
    setDecisions([]);
    setIsRunning(false);
    setIsProcessing(false);
  };

  const processNextDecision = async () => {
    if (!isRunning) return;

    setIsProcessing(true);
    const question = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    setCurrentQuestion(question);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const decision = await generateDecision(question);
    setDecisions(prev => [decision, ...prev]);
    setCurrentQuestion('');
    setIsProcessing(false);

    // Simulate validation after 3 seconds
    setTimeout(() => {
      setDecisions(prev => 
        prev.map(d => 
          d.id === decision.id 
            ? { ...d, status: 'validated' as const }
            : d
        )
      );
    }, 3000);

    // Continue with next decision
    if (isRunning) {
      setTimeout(processNextDecision, 1000);
    }
  };

  useEffect(() => {
    if (isRunning && !isProcessing) {
      processNextDecision();
    }
  }, [isRunning, isProcessing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Neurochain Demo</span>
            </div>
            <a 
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Decision Transparency Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Watch as AI makes decisions that are automatically recorded and validated on the blockchain. 
              Every decision is transparent and auditable.
            </p>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isRunning ? (
                <button 
                  onClick={startDemo}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Demo</span>
                </button>
              ) : (
                <button 
                  onClick={stopDemo}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Stop Demo</span>
                </button>
              )}
              <button 
                onClick={resetDemo}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </motion.div>

          {/* Current Processing */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Processing Decision</h3>
                  <p className="text-gray-300">{currentQuestion}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Decisions List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Decisions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recent AI Decisions</h2>
              <div className="space-y-4">
                {decisions.slice(0, 5).map((decision, index) => (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400">
                          {new Date(decision.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        decision.status === 'validated' 
                          ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                          : decision.status === 'rejected'
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                      }`}>
                        {decision.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <h3 className="text-white font-medium mb-2">{decision.question}</h3>
                    <p className="text-gray-300 text-sm mb-3">{decision.reasoning}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          decision.decision === 'APPROVED' 
                            ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                            : 'bg-red-600/20 text-red-400 border border-red-600/30'
                        }`}>
                          {decision.decision}
                        </span>
                        <span className="text-gray-400 text-xs">
                          Confidence: {decision.confidence}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Blockchain Transactions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Blockchain Transactions</h2>
              <div className="space-y-4">
                {decisions.slice(0, 5).map((decision, index) => (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Hash className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Transaction Hash</span>
                    </div>
                    
                    <div className="bg-black/20 rounded p-3 mb-3">
                      <code className="text-xs text-purple-300 break-all">
                        {decision.blockHash}
                      </code>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">
                          {new Date(decision.timestamp).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {decision.status === 'validated' && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        <span className={`text-xs ${
                          decision.status === 'validated' 
                            ? 'text-green-400'
                            : decision.status === 'rejected'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}>
                          {decision.status === 'validated' ? 'Validated' : 
                           decision.status === 'rejected' ? 'Rejected' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{decisions.length}</div>
              <div className="text-gray-400">Total Decisions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {decisions.filter(d => d.status === 'validated').length}
              </div>
              <div className="text-gray-400">Validated</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {decisions.filter(d => d.status === 'pending').length}
              </div>
              <div className="text-gray-400">Pending</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {decisions.length > 0 ? Math.round(decisions.reduce((acc, d) => acc + d.confidence, 0) / decisions.length) : 0}%
              </div>
              <div className="text-gray-400">Avg Confidence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 