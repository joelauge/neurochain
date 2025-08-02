'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Brain, Play, Shield, Square, RotateCcw, ExternalLink,
  Cpu, Network, Database, Eye, Zap, TrendingUp, ArrowLeft,
  AlertCircle, Loader2, FileText, Hash, AlertTriangle, CheckCircle
} from 'lucide-react';
import { API_CONFIG } from '@/config/api';

// Mock Data Generator
const generateMockData = () => {
  const categories = ['financial', 'medical', 'legal', 'content', 'hiring', 'safety'];
  const decisions = ['APPROVED', 'REJECTED', 'CONDITIONAL_APPROVAL', 'REQUIRES_REVIEW'];
  const questions = [
    'Should we approve this loan application for $50,000?',
    'Is this medical diagnosis accurate based on the symptoms?',
    'Does this contract comply with regulatory requirements?',
    'Should this content be flagged for inappropriate material?',
    'Should we hire this candidate for the senior developer position?',
    'Is this safety protocol adequate for the chemical handling process?',
    'Should we approve this investment in renewable energy?',
    'Does this patient need immediate medical intervention?',
    'Is this legal document binding under current laws?',
    'Should this video content be removed for policy violations?',
    'Should we approve this credit card application?',
    'Does this treatment plan align with best practices?',
    'Should this contract be executed with the current terms?',
    'Is this social media post compliant with community guidelines?',
    'Should we proceed with this candidate for the executive role?',
    'Are these safety measures sufficient for the construction site?',
    'Should we approve this mortgage application?',
    'Does this diagnosis require specialist consultation?',
    'Should this legal agreement be modified before signing?',
    'Is this content appropriate for the target audience?'
  ];

  const reasoningTemplates = [
    'Analysis of financial risk factors indicates moderate risk profile with strong collateral backing.',
    'Medical evidence supports the diagnosis with 85% confidence based on symptom correlation.',
    'Legal review confirms compliance with current regulatory framework and industry standards.',
    'Content moderation analysis reveals potential policy violations requiring human review.',
    'Candidate evaluation shows strong technical skills and cultural alignment with company values.',
    'Safety assessment indicates adequate protocols with minor recommendations for improvement.',
    'Investment analysis shows positive ROI projections and alignment with sustainability goals.',
    'Clinical assessment suggests immediate intervention may prevent complications.',
    'Legal framework analysis confirms binding nature under applicable jurisdiction.',
    'Content analysis reveals multiple policy violations requiring removal action.',
    'Credit assessment shows strong payment history and acceptable debt-to-income ratio.',
    'Treatment plan review indicates evidence-based approach with proven efficacy.',
    'Contract analysis reveals standard terms with acceptable risk allocation.',
    'Community guidelines review shows no violations in current context.',
    'Executive assessment indicates strong leadership qualities and strategic vision.',
    'Safety protocol review confirms adequate protection measures for all workers.',
    'Mortgage analysis shows strong applicant profile with sufficient down payment.',
    'Diagnostic review suggests specialist consultation for optimal treatment outcomes.',
    'Legal agreement analysis indicates standard terms with minor recommended modifications.',
    'Content appropriateness review shows alignment with target demographic guidelines.'
  ];

  const mockDecisions: Decision[] = [];
  const mockTransactions: BlockchainTransaction[] = [];
  
  // Generate 100+ realistic decisions
  for (let i = 0; i < 120; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
    const category = categories[Math.floor(Math.random() * categories.length)];
    const decision = decisions[Math.floor(Math.random() * decisions.length)];
    const question = questions[Math.floor(Math.random() * questions.length)];
    const reasoning = reasoningTemplates[Math.floor(Math.random() * reasoningTemplates.length)];
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    const blockHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const ipfsHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
    const anomalyScore = Math.random() > 0.95 ? Math.random() * 100 : 0;
    
    const decisionObj: Decision = {
      id: `decision_${i.toString().padStart(3, '0')}`,
      timestamp: timestamp.toISOString(),
      question,
      reasoning,
      decision,
      confidence,
      block_hash: blockHash,
      status: decision === 'REQUIRES_REVIEW' ? 'pending' : 'validated',
      category,
      ipfs_hash: ipfsHash,
      ai_reasoning: {
        model_id: ['gpt-4', 'claude-3', 'gemini-pro'][Math.floor(Math.random() * 3)],
        model_version: '1.0.0',
        timestamp: timestamp.toISOString(),
        input: {
          prompt: question,
          context: 'AI reasoning context for decision making',
          parameters: {
            temperature: 0.3,
            max_tokens: 1000
          }
        },
        reasoning_process: {
          thought_chain: [
            'Analyzing the provided information',
            'Evaluating risk factors and compliance requirements',
            'Considering ethical implications and best practices',
            'Generating confidence assessment'
          ],
          intermediate_decisions: [
            'Initial assessment completed',
            'Risk evaluation in progress',
            'Final decision reached'
          ],
          confidence_factors: [
            'Data completeness: 85%',
            'Historical patterns: 92%',
            'Regulatory clarity: 78%'
          ]
        },
        output: {
          decision,
          confidence,
          explanation: reasoning
        },
        metadata: {
          session_id: `session_${Math.random().toString(36).substr(2, 9)}`,
          user_id: `user_${Math.floor(Math.random() * 100)}`,
          request_id: `req_${Math.random().toString(36).substr(2, 9)}`
        }
      }
    };
    
    mockDecisions.push(decisionObj);
    
    // Create corresponding blockchain transaction
    const transaction: BlockchainTransaction = {
      id: `tx_${i.toString().padStart(3, '0')}`,
      decisionId: decisionObj.id,
      status: anomalyScore > 70 ? 'anomaly_detected' : 
              decision === 'REQUIRES_REVIEW' ? 'pending' : 'validated',
      timestamp: new Date(timestamp.getTime() + Math.random() * 60000), // Within 1 minute
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      gasUsed: Math.floor(Math.random() * 200000) + 50000,
      ipfsHash,
      anomalyScore: anomalyScore > 0 ? Math.round(anomalyScore) : undefined,
      anomalyType: anomalyScore > 0 ? ['behavioral_drift', 'confidence_anomaly', 'reasoning_inconsistency'][Math.floor(Math.random() * 3)] : undefined
    };
    
    mockTransactions.push(transaction);
  }
  
  return { mockDecisions, mockTransactions };
};

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
  const [mockData, setMockData] = useState<{ mockDecisions: Decision[], mockTransactions: BlockchainTransaction[] } | null>(null);
  const [dataLoadingProgress, setDataLoadingProgress] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [visibleDecisions, setVisibleDecisions] = useState<Decision[]>([]);
  const [visibleTransactions, setVisibleTransactions] = useState<BlockchainTransaction[]>([]);

  useEffect(() => {
    setIsBrowser(true);
    // Generate mock data once
    const data = generateMockData();
    setMockData(data);
    // Start animated data loading
    startAnimatedDataLoading(data);
  }, []);

  const startAnimatedDataLoading = async (data: { mockDecisions: Decision[], mockTransactions: BlockchainTransaction[] }) => {
    setIsDataLoading(true);
    setDataLoadingProgress(0);
    
    // Sort decisions by timestamp (most recent first)
    const sortedDecisions = data.mockDecisions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    const sortedTransactions = data.mockTransactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Animate loading decisions one by one
    for (let i = 0; i < Math.min(10, sortedDecisions.length); i++) {
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      setVisibleDecisions(prev => [...prev, sortedDecisions[i]]);
      setDataLoadingProgress((i + 1) / 10 * 100);
    }
    
    // Animate loading transactions
    for (let i = 0; i < Math.min(10, sortedTransactions.length); i++) {
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
      setVisibleTransactions(prev => [...prev, sortedTransactions[i]]);
    }
    
    // Update stats with animation
    await animateStats(data);
    
    setIsDataLoading(false);
    setDataLoadingProgress(100);
  };

  const animateStats = async (data: { mockDecisions: Decision[], mockTransactions: BlockchainTransaction[] }) => {
    const totalDecisions = data.mockDecisions.length;
    const validatedDecisions = data.mockDecisions.filter(d => d.status === 'validated').length;
    const pendingDecisions = data.mockDecisions.filter(d => d.status === 'pending').length;
    const averageConfidence = data.mockDecisions.reduce((sum, d) => sum + d.confidence, 0) / totalDecisions;
    const anomaliesDetected = data.mockTransactions.filter(t => t.status === 'anomaly_detected').length;
    
    // Animate each stat
    const targetStats = {
      total_decisions: totalDecisions,
      validated_decisions: validatedDecisions,
      pending_decisions: pendingDecisions,
      average_confidence: Math.round(averageConfidence),
      system_status: 'healthy',
      ai_models_monitored: 3,
      anomalies_detected: anomaliesDetected
    };
    
    // Animate from 0 to target values
    for (let step = 0; step <= 20; step++) {
      const progress = step / 20;
      setStats({
        total_decisions: Math.round(targetStats.total_decisions * progress),
        validated_decisions: Math.round(targetStats.validated_decisions * progress),
        pending_decisions: Math.round(targetStats.pending_decisions * progress),
        average_confidence: Math.round(targetStats.average_confidence * progress),
        system_status: 'healthy',
        ai_models_monitored: 3,
        anomalies_detected: Math.round(targetStats.anomalies_detected * progress)
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const fetchStats = async () => {
    try {
      if (!mockData) return;
      
      const totalDecisions = mockData.mockDecisions.length;
      const validatedDecisions = mockData.mockDecisions.filter(d => d.status === 'validated').length;
      const pendingDecisions = mockData.mockDecisions.filter(d => d.status === 'pending').length;
      const averageConfidence = mockData.mockDecisions.reduce((sum, d) => sum + d.confidence, 0) / totalDecisions;
      const anomaliesDetected = mockData.mockTransactions.filter(t => t.status === 'anomaly_detected').length;
      
      setStats({
        total_decisions: totalDecisions,
        validated_decisions: validatedDecisions,
        pending_decisions: pendingDecisions,
        average_confidence: Math.round(averageConfidence),
        system_status: 'healthy',
        ai_models_monitored: 3,
        anomalies_detected: anomaliesDetected
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load system statistics');
    }
  };

  const fetchDecisions = async () => {
    try {
      if (!mockData) return;
      
      // Use visible decisions instead of fetching
      setDecisions(visibleDecisions);
    } catch (err) {
      console.error('Error fetching decisions:', err);
      setError('Failed to load decisions');
    }
  };

  const createDecision = async (question: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      if (!mockData) return;
      
      // Create a new mock decision
      const categories = ['financial', 'medical', 'legal', 'content', 'hiring', 'safety'];
      const decisions = ['APPROVED', 'REJECTED', 'CONDITIONAL_APPROVAL', 'REQUIRES_REVIEW'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const decision = decisions[Math.floor(Math.random() * decisions.length)];
      const confidence = Math.floor(Math.random() * 30) + 70;
      const timestamp = new Date();
      const blockHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      const ipfsHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
      const anomalyScore = Math.random() > 0.95 ? Math.random() * 100 : 0;
      
      const newDecision: Decision = {
        id: `decision_${Date.now()}`,
        timestamp: timestamp.toISOString(),
        question,
        reasoning: `AI analysis of the question "${question}" indicates ${decision.toLowerCase().replace('_', ' ')} with ${confidence}% confidence based on current data and ethical guidelines.`,
        decision,
        confidence,
        block_hash: blockHash,
        status: decision === 'REQUIRES_REVIEW' ? 'pending' : 'validated',
        category,
        ipfs_hash: ipfsHash,
        ai_reasoning: {
          model_id: ['gpt-4', 'claude-3', 'gemini-pro'][Math.floor(Math.random() * 3)],
          model_version: '1.0.0',
          timestamp: timestamp.toISOString(),
          input: {
            prompt: question,
            context: 'AI reasoning context for decision making',
            parameters: {
              temperature: 0.3,
              max_tokens: 1000
            }
          },
          reasoning_process: {
            thought_chain: [
              'Analyzing the provided information',
              'Evaluating risk factors and compliance requirements',
              'Considering ethical implications and best practices',
              'Generating confidence assessment'
            ],
            intermediate_decisions: [
              'Initial assessment completed',
              'Risk evaluation in progress',
              'Final decision reached'
            ],
            confidence_factors: [
              'Data completeness: 85%',
              'Historical patterns: 92%',
              'Regulatory clarity: 78%'
            ]
          },
          output: {
            decision,
            confidence,
            explanation: `Decision reached based on comprehensive analysis of ${category} factors.`
          },
          metadata: {
            session_id: `session_${Math.random().toString(36).substr(2, 9)}`,
            user_id: `user_${Math.floor(Math.random() * 100)}`,
            request_id: `req_${Math.random().toString(36).substr(2, 9)}`
          }
        }
      };
      
      // Add new decision to the list with animation
      setDecisions(prev => [newDecision, ...prev.slice(0, 9)]);
      setVisibleDecisions(prev => [newDecision, ...prev.slice(0, 9)]);
      
      // Add a temporary highlight class to the new decision
      setTimeout(() => {
        const decisionElement = document.querySelector(`[data-decision-id="${newDecision.id}"]`);
        if (decisionElement) {
          decisionElement.classList.add('animate-glow');
          setTimeout(() => {
            decisionElement.classList.remove('animate-glow');
          }, 3000);
        }
      }, 100);
      
      // Create corresponding blockchain transaction
      const newTransaction: BlockchainTransaction = {
        id: `tx_${Date.now()}`,
        decisionId: newDecision.id,
        status: anomalyScore > 70 ? 'anomaly_detected' : 
                decision === 'REQUIRES_REVIEW' ? 'pending' : 'validated',
        timestamp: new Date(timestamp.getTime() + Math.random() * 60000),
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: Math.floor(Math.random() * 200000) + 50000,
        ipfsHash,
        anomalyScore: anomalyScore > 0 ? Math.round(anomalyScore) : undefined,
        anomalyType: anomalyScore > 0 ? ['behavioral_drift', 'confidence_anomaly', 'reasoning_inconsistency'][Math.floor(Math.random() * 3)] : undefined
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      // Update the transaction status
      setTransactions(prev => 
        prev.map(tx => 
          tx.decisionId === decisionId 
            ? { ...tx, status: 'validated' as const }
            : tx
        )
      );
      
      // Update the decision status
      setDecisions(prev =>
        prev.map(d =>
          d.id === decisionId
            ? { ...d, status: 'validated' }
            : d
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
    const questions = [
      'Should we approve this loan application for $50,000?',
      'Is this medical diagnosis accurate based on the symptoms?',
      'Does this contract comply with regulatory requirements?',
      'Should this content be flagged for inappropriate material?',
      'Should we hire this candidate for the senior developer position?',
      'Is this safety protocol adequate for the chemical handling process?',
      'Should we approve this investment in renewable energy?',
      'Does this patient need immediate medical intervention?',
      'Is this legal document binding under current laws?',
      'Should this video content be removed for policy violations?'
    ];
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
    // Reload mock data
    const data = generateMockData();
    setMockData(data);
    // Get the most recent 10 decisions
    const recentDecisions = data.mockDecisions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
    setDecisions(recentDecisions);
    setTransactions(data.mockTransactions.slice(0, 10));
    setStats({
      total_decisions: data.mockDecisions.length,
      validated_decisions: data.mockDecisions.filter(d => d.status === 'validated').length,
      pending_decisions: data.mockDecisions.filter(d => d.status === 'pending').length,
      average_confidence: Math.round(data.mockDecisions.reduce((sum, d) => sum + d.confidence, 0) / data.mockDecisions.length),
      system_status: 'healthy',
      ai_models_monitored: 3,
      anomalies_detected: data.mockTransactions.filter(t => t.status === 'anomaly_detected').length
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
        {/* Loading Progress */}
        {isDataLoading && (
          <div className="mb-8 p-6 glass rounded-lg border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-cyan-400 font-semibold">Loading Historical Data...</span>
              </div>
              <span className="text-cyan-400 font-mono">{Math.round(dataLoadingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${dataLoadingProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Loading {visibleDecisions.length} decisions and {visibleTransactions.length} transactions...
            </div>
          </div>
        )}

        <div className="tech-grid mb-16">
          <div className="tech-card">
            <div className="tech-icon">
              <Brain />
            </div>
            <div className="tech-name">
              {isDataLoading ? (
                <span className="text-cyan-400 animate-pulse">...</span>
              ) : (
                stats.total_decisions
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">AI DECISIONS MONITORED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Shield />
            </div>
            <div className="tech-name">
              {isDataLoading ? (
                <span className="text-green-400 animate-pulse">...</span>
              ) : (
                stats.validated_decisions
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">VALIDATED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <AlertTriangle />
            </div>
            <div className="tech-name">
              {isDataLoading ? (
                <span className="text-red-400 animate-pulse">...</span>
              ) : (
                stats.anomalies_detected
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">ANOMALIES DETECTED</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <Cpu />
            </div>
            <div className="tech-name">
              {isDataLoading ? (
                <span className="text-purple-400 animate-pulse">...</span>
              ) : (
                stats.ai_models_monitored
              )}
            </div>
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
              {decisions.map((decision, index) => (
                <div 
                  key={decision.id} 
                  data-decision-id={decision.id}
                  className="glass p-4 rounded-lg border border-gray-700/50 cursor-pointer hover:border-cyan-500/50 transition-all duration-500 ease-out"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isDataLoading ? 'slideInFromRight 0.5s ease-out forwards' : 'none'
                  }}
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