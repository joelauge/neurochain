'use client';

import React, { useEffect } from 'react';
import { Download, Share2, Play, MessageCircle, Globe } from 'lucide-react';
import Link from 'next/link';

export default function WhitepaperPage() {
  useEffect(() => {
    // Set dark theme
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.color = '#f8fafc';
    return () => {
      // Reset on unmount
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Neurochain_Whitepaper_v014_With_Hardware.md';
    link.download = 'Neurochain_Whitepaper_v014_With_Hardware.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Neurochain Whitepaper',
          text: 'Check out the Neurochain whitepaper - AI Trustless Transparency through Blockchain',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
          }}
        />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            <span className="text-blue-400">Neurochain:</span>{' '}
            <span className="text-slate-200">AI Trustless Transparency through</span>{' '}
            <span className="text-gray-400">Blockchain.</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover how blockchain technology can revolutionize AI transparency, alignment and accountability. 
            Download our comprehensive whitepaper to learn about the future of trustworthy AI systems.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download Whitepaper
            </button>
            <button
              onClick={handleShare}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-500"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-slate-100">About the Whitepaper</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 mb-4">
                Neurochain is a platform that addresses the critical challenge of AI transparency and accountability 
                by leveraging blockchain technology to create an immutable, auditable record of every AI decision.
              </p>
              <p className="text-slate-300 mb-4">
                This whitepaper presents a comprehensive technical framework for ensuring AI systems remain 
                transparent, accountable, and aligned with human values through decentralized oversight mechanisms.
              </p>
              <p className="text-slate-300">
                Download the full whitepaper to explore our innovative approach to AI governance and 
                the future of trustworthy artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Whitepaper Content */}
      <section className="px-6 py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-slate-100">Neurochain: A Decentralized Framework for Transparent AI Decision-Making</h1>
            
            <h2 className="text-3xl font-bold mb-6 text-slate-100">Executive Summary</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Neurochain is a revolutionary platform that addresses the critical challenge of AI transparency and accountability by leveraging blockchain technology to create an immutable, auditable record of every AI decision. This whitepaper presents a comprehensive technical framework for ensuring AI systems remain transparent, accountable, and aligned with human values through decentralized oversight mechanisms.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">1. Introduction</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">1.1 The AI Transparency Problem</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              As artificial intelligence systems become increasingly sophisticated and autonomous, they are making decisions that directly impact human lives across critical domains including healthcare, finance, legal systems, and autonomous vehicles. However, these AI systems often operate as "black boxes," making decisions without providing clear explanations or maintaining auditable records of their reasoning processes.
            </p>
            <p className="text-slate-300 mb-4 leading-relaxed">
              The lack of transparency in AI decision-making poses several critical risks:
            </p>
            <ul className="text-slate-300 mb-6 space-y-2 list-disc pl-6">
              <li><strong className="text-slate-100">Accountability Gap</strong>: When AI systems make harmful or biased decisions, there is often no clear mechanism for identifying responsibility or implementing corrective measures.</li>
              <li><strong className="text-slate-100">Trust Erosion</strong>: Users cannot verify whether AI decisions align with stated objectives or ethical guidelines.</li>
              <li><strong className="text-slate-100">Regulatory Challenges</strong>: Regulators lack the tools to audit AI systems and ensure compliance with legal and ethical standards.</li>
              <li><strong className="text-slate-100">Bias Amplification</strong>: Hidden biases in AI systems can perpetuate and amplify existing societal inequalities without detection.</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">1.2 The Neurochain Solution</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Neurochain provides a comprehensive solution to these challenges by implementing a decentralized framework that:
            </p>
            <ol className="text-slate-300 mb-6 space-y-2 list-decimal pl-6">
              <li><strong className="text-slate-100">Records every AI decision</strong> on a public blockchain with complete transparency</li>
              <li><strong className="text-slate-100">Implements decentralized validation</strong> through human consensus mechanisms</li>
              <li><strong className="text-slate-100">Provides real-time auditability</strong> of AI decision-making processes</li>
              <li><strong className="text-slate-100">Ensures ethical alignment</strong> through smart contract governance</li>
              <li><strong className="text-slate-100">Enables regulatory compliance</strong> through immutable audit trails</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">2. Technical Architecture</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">2.1 System Overview</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Neurochain employs a three-tier architecture designed for scalability, security, and transparency:
            </p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded overflow-x-auto">
{`┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Next.js UI  │  │ Demo System │  │ Admin Dashboard     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Backend Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ FastAPI     │  │ AI Engine   │  │ Redis Cache         │  │
│  │ REST API    │  │ LangChain   │  │ Session Mgmt        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  Blockchain Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Ethereum    │  │ Smart       │  │ IPFS Storage        │  │
│  │ Mainnet     │  │ Contracts   │  │ Decision Records    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">2.2 Core Components</h3>
            
            <h4 className="text-xl font-semibold mb-3 text-slate-100">2.2.1 AI Decision Engine</h4>
            <p className="text-slate-300 mb-4 leading-relaxed">
              The AI Decision Engine is built using Python FastAPI and LangChain, providing:
            </p>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
              <h5 className="text-lg font-semibold text-slate-100 mb-2">Decision Processing Pipeline:</h5>
              <pre className="text-sm text-slate-300 bg-slate-900 p-3 rounded overflow-x-auto">
{`class AIDecisionEngine:
    def analyze_question(self, question: str, context: str = "") -> dict:
        # 1. Input validation and sanitization
        # 2. Context analysis and feature extraction
        # 3. Ethical guideline application
        # 4. Decision generation with confidence scoring
        # 5. Reasoning chain documentation
        # 6. Blockchain transaction preparation`}
              </pre>
            </div>

            <h4 className="text-xl font-semibold mb-3 text-slate-100">2.2.2 Smart Contract System</h4>
            <p className="text-slate-300 mb-4 leading-relaxed">
              The blockchain layer is implemented using Solidity smart contracts on Ethereum:
            </p>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
              <h5 className="text-lg font-semibold text-slate-100 mb-2">NeurochainDecision Contract:</h5>
              <pre className="text-sm text-slate-300 bg-slate-900 p-3 rounded overflow-x-auto">
{`contract NeurochainDecision is Ownable, Pausable, ReentrancyGuard {
    struct Decision {
        bytes32 decisionId;
        address aiOperator;
        string question;
        string reasoning;
        string decision;
        uint256 confidence;
        uint256 timestamp;
        bytes32 blockHash;
        bool exists;
    }
    
    struct Validation {
        address validator;
        bool isValid;
        string reason;
        uint256 timestamp;
    }
}`}
              </pre>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">3. Technical Specifications</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">3.1 Performance Requirements</h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Decision Processing:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>Latency</strong>: &lt; 2 seconds for decision generation</li>
                <li><strong>Throughput</strong>: 1000+ decisions per minute</li>
                <li><strong>Availability</strong>: 99.9% uptime</li>
                <li><strong>Scalability</strong>: Horizontal scaling support</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">3.2 Security Specifications</h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Cryptographic Security:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>Hash Algorithm</strong>: SHA-256 for decision integrity</li>
                <li><strong>Digital Signatures</strong>: ECDSA for validator authentication</li>
                <li><strong>Encryption</strong>: AES-256 for sensitive data</li>
                <li><strong>Key Management</strong>: Hardware Security Module (HSM) integration</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">4. Implementation Details</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">4.1 Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 className="text-lg font-semibold text-slate-100 mb-3">Frontend:</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for responsive design</li>
                  <li>• Web3.js for Ethereum integration</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 className="text-lg font-semibold text-slate-100 mb-3">Backend:</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• FastAPI for high-performance API</li>
                  <li>• Python 3.11+ for AI/ML capabilities</li>
                  <li>• LangChain for reasoning chains</li>
                  <li>• Redis for session management</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 className="text-lg font-semibold text-slate-100 mb-3">Blockchain:</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Ethereum (Sepolia testnet, mainnet)</li>
                  <li>• Solidity 0.8.19</li>
                  <li>• Hardhat for development</li>
                  <li>• IPFS for decentralized file storage</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">5. Consensus and Validation Mechanisms</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">5.1 Human Consensus Protocol</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Neurochain implements a decentralized human consensus mechanism:
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Validator Network:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>Validator Selection</strong>: Reputable experts in relevant domains</li>
                <li><strong>Staking Mechanism</strong>: Validators stake tokens for participation</li>
                <li><strong>Reputation System</strong>: Track validator accuracy and reliability</li>
                <li><strong>Rotation Policy</strong>: Regular validator rotation for decentralization</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">6. Use Cases and Applications</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">6.1 Healthcare AI</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              <strong>Medical Diagnosis Validation:</strong> Record AI diagnostic decisions with clinical reasoning, enable medical professionals to validate AI recommendations, maintain audit trail for regulatory compliance, and ensure patient safety through transparent decision-making.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">6.2 Financial Services</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              <strong>Credit Scoring:</strong> Transparent loan approval decisions, bias detection and mitigation, regulatory compliance (FCRA, ECOA), and fair lending practices enforcement.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">6.3 Legal and Compliance</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              <strong>Contract Analysis:</strong> AI contract review decisions, legal compliance validation, risk assessment transparency, and regulatory reporting automation.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">7. Governance and Compliance</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">7.1 Regulatory Framework</h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Data Protection:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>GDPR Compliance</strong>: Right to explanation and data portability</li>
                <li><strong>CCPA Compliance</strong>: California privacy regulations</li>
                <li><strong>HIPAA Compliance</strong>: Healthcare data protection</li>
                <li><strong>SOX Compliance</strong>: Financial reporting requirements</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">7.3 Language Confinement Protocol</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              For Neurochain to ensure meaningful transparency and accountability, the internal thought processes of AI systems must be accessible and interpretable by human validators. To prevent AI from evolving into abstract, self-generated or encoded languages (which would undermine auditability), Neurochain introduces a protocol-level requirement that all AI reasoning chains must be expressed in a registered, human-readable natural language.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">8. Economic Model</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">8.1 Token Economics</h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">NEURO Token:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>Utility</strong>: Platform governance and validation rewards</li>
                <li><strong>Staking</strong>: Validator participation requirement</li>
                <li><strong>Rewards</strong>: Incentivize quality validation and transparency</li>
                <li><strong>Burning</strong>: Deflationary mechanism for value appreciation</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">8.0 Hardware Acceleration and Specialized Architecture</h2>
            <p className="text-slate-300 mb-4 leading-relaxed">
              To support the demands of billions of high-speed AI agents interacting with Neurochain, specialized hardware techniques must be employed to optimize throughput, latency, and auditability of AI reasoning and block creation.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">8.1 Inline Reasoning Log Buffer (WAL Architecture)</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              This approach uses a write-ahead buffer that allows AIs to log decisions and reasoning before final audit and commit. The logs are validated asynchronously by the Neurochain validator network before being permanently included on-chain.
            </p>
            
            {/* Inline Reasoning Log Buffer Diagram */}
            <div className="bg-white p-8 rounded-lg border border-slate-700 mb-6 text-center flex flex-col items-center justify-center">
              <img 
                src="/nc_Inline-Log-Buffer.png" 
                alt="Inline Reasoning Log Buffer Architecture" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Advantages:</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• Reduces commit bottlenecks</li>
                <li>• Parallelizes audit processes</li>
                <li>• Enables rollback or rejection before final inclusion</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">8.2 AI Co-Signer Hardware Module</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              The Co-Signer is a dedicated cryptographic coprocessor that verifies AI decisions at the hardware level before forwarding them to validators or the blockchain. It enforces constraints such as language compliance, logic traceability, and reasoning coherence.
            </p>
            
            {/* AI Co-Signer Hardware Validation Diagram */}
            <div className="bg-white p-8 rounded-lg border border-slate-700 mb-6 text-center flex flex-col items-center justify-center">
              <p className="text-slate-800 font-medium mb-4">AI Co-Signer Hardware Validation Diagram</p>
              <img 
                src="/nc_AICo-Signer.png" 
                alt="AI Co-Signer Hardware Validation Architecture" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Advantages:</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• Enables secure signing of constrained outputs</li>
                <li>• Offloads validator logic</li>
                <li>• Bridges AI logic to verifiable cryptographic identity</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">8.3 Future Concepts</h3>
            <ul className="text-slate-300 mb-6 space-y-2 list-disc pl-6">
              <li><strong>Neuroshard Engines</strong>: Modular block creators optimized for different reasoning domains (e.g. legal, scientific, financial)</li>
              <li><strong>FPGAs for zk-Audit Acceleration</strong>: Fast validation of zero-knowledge rollups containing decision proofs</li>
              <li><strong>AI-native ASICs</strong>: Purpose-built silicon for real-time reasoning trace hashing, signature creation, and protocol-aware commit</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">9. Roadmap and Development Phases</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">9.1 Phase 1: Foundation (Q1-Q2 2025) ✅</h3>
            <ul className="text-slate-300 mb-6 space-y-2 list-disc pl-6">
              <li>✅ Core smart contract development</li>
              <li>✅ Basic AI decision engine</li>
              <li>✅ Frontend interface</li>
              <li>✅ Backend API implementation</li>
              <li>✅ Local development environment</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-slate-100">9.2 Phase 2: Enhancement (Q2-Q4 2025)</h3>
            <ul className="text-slate-300 mb-6 space-y-2 list-disc pl-6">
              <li>Advanced AI model integration</li>
              <li>Layer-2 scaling solutions</li>
              <li>Enhanced validation mechanisms</li>
              <li>Mobile application development</li>
              <li>Enterprise features</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">10. Risk Assessment and Mitigation</h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-slate-100">10.1 Technical Risks</h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-6">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Smart Contract Vulnerabilities:</h4>
              <ul className="space-y-2 text-slate-300">
                <li><strong>Risk</strong>: Exploitation of contract bugs</li>
                <li><strong>Mitigation</strong>: Comprehensive security audits, formal verification, bug bounty programs</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-slate-100">11. Conclusion</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Neurochain represents a paradigm shift in AI transparency and accountability. By combining blockchain technology with advanced AI systems, we create a framework that ensures AI decisions are transparent, auditable, and aligned with human values.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              The technical architecture presented in this whitepaper provides a robust foundation for building trustworthy AI systems that can be deployed across critical domains with confidence. The decentralized validation mechanism ensures that AI decisions are subject to human oversight while maintaining the efficiency and scalability required for real-world applications.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              As AI systems become increasingly integrated into our daily lives, the need for transparency and accountability has never been greater. Neurochain addresses this critical need by providing the tools and infrastructure required to build AI systems that are not only powerful but also trustworthy and accountable.
            </p>
            
            <div className="text-center">
              <p className="text-2xl font-semibold text-purple-400">
                The future of AI is transparent, and Neurochain is leading the way.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-400">
              <p className="mb-2"><strong>Document Version</strong>: 2.0</p>
              <p className="mb-2"><strong>Last Updated</strong>: July 31, 2024</p>
              <p className="mb-2"><strong>Authors</strong>: Neurochain Development Team</p>
              <p className="mb-2"><strong>Contact</strong>: <a href="mailto:contact@neurocha.in" className="text-purple-400 hover:text-purple-300">contact@neurocha.in</a></p>
              <p className="mb-2"><strong>Website</strong>: <a href="https://neurocha.in" className="text-purple-400 hover:text-purple-300">https://neurocha.in</a></p>
              <p><strong>GitHub</strong>: <a href="https://github.com/joelauge/neurochain" className="text-purple-400 hover:text-purple-300">https://github.com/joelauge/neurochain</a></p>
            </div>

            <hr className="my-16 border-slate-700" />

            <h2 className="text-3xl font-bold mb-8 text-slate-100">Technical Appendices</h2>

            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Appendix A: Smart Contract Code</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Complete Solidity contract implementation with detailed comments and security features.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
              <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded overflow-x-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract NeurochainDecision is Ownable, Pausable, ReentrancyGuard {

    struct Decision {
        bytes32 decisionId;
        address aiOperator;
        string question;
        string reasoning;
        string decision;
        string language;
        uint256 confidence;
        uint256 timestamp;
        bytes32 blockHash;
        bool exists;
    }

    struct Validation {
        address validator;
        bool isValid;
        string reason;
        uint256 timestamp;
    }

    mapping(bytes32 => Decision) public decisions;
    mapping(bytes32 => Validation[]) public validations;
    mapping(address => bool) public validators;

    event DecisionRecorded(bytes32 indexed decisionId, address indexed aiOperator);
    event DecisionValidated(bytes32 indexed decisionId, address indexed validator, bool isValid);

    modifier onlyValidator() {
        require(validators[msg.sender], "Not an authorized validator");
        _;
    }

    function addValidator(address _validator) external onlyOwner {
        validators[_validator] = true;
    }

    function removeValidator(address _validator) external onlyOwner {
        validators[_validator] = false;
    }

    function recordDecision(
        string memory _question,
        string memory _reasoning,
        string memory _decision,
        string memory _language,
        uint256 _confidence
    ) external whenNotPaused returns (bytes32) {
        bytes32 decisionId = keccak256(abi.encodePacked(_question, block.timestamp, msg.sender));
        require(!decisions[decisionId].exists, "Duplicate decision");

        decisions[decisionId] = Decision({
            decisionId: decisionId,
            aiOperator: msg.sender,
            question: _question,
            reasoning: _reasoning,
            decision: _decision,
            language: _language,
            confidence: _confidence,
            timestamp: block.timestamp,
            blockHash: blockhash(block.number - 1),
            exists: true
        });

        emit DecisionRecorded(decisionId, msg.sender);
        return decisionId;
    }

    function validateDecision(
        bytes32 decisionId,
        bool isValid,
        string memory reason
    ) external onlyValidator {
        require(decisions[decisionId].exists, "Decision not found");

        validations[decisionId].push(Validation({
            validator: msg.sender,
            isValid: isValid,
            reason: reason,
            timestamp: block.timestamp
        }));

        emit DecisionValidated(decisionId, msg.sender, isValid);
    }

    function getValidations(bytes32 decisionId) external view returns (Validation[] memory) {
        return validations[decisionId];
    }
}`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Appendix B: API Documentation</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Comprehensive REST API documentation with examples and error handling.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
              <h4 className="text-lg font-semibold text-slate-100 mb-4">POST /api/decisions</h4>
              <p className="text-slate-300 mb-2">Submit a new decision for recording.</p>
              <div className="bg-slate-900 p-4 rounded mb-4">
                <h5 className="text-md font-semibold text-slate-100 mb-2">Request:</h5>
                <pre className="text-sm text-slate-300">
{`{
  "question": "Should this transaction be flagged?",
  "context": "Transaction > $10,000 in offshore account",
  "language": "en"
}`}
                </pre>
              </div>
              <div className="bg-slate-900 p-4 rounded mb-4">
                <h5 className="text-md font-semibold text-slate-100 mb-2">Response:</h5>
                <pre className="text-sm text-slate-300">
{`{
  "decisionId": "0xabc...",
  "message": "Decision recorded successfully"
}`}
                </pre>
              </div>
              <div className="bg-slate-900 p-4 rounded">
                <h5 className="text-md font-semibold text-slate-100 mb-2">Error Handling:</h5>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• 400: Missing required fields</li>
                  <li>• 403: Unauthorized</li>
                  <li>• 500: Server error</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Appendix C: Deployment Guide</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Step-by-step deployment instructions for development and production environments.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">1. Smart Contracts</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• Compile with Hardhat</li>
                    <li>• Deploy to Sepolia or Ethereum Mainnet</li>
                    <li>• Verify on Etherscan</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">2. Backend Setup</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• Python 3.11, FastAPI, Redis</li>
                    <li>• Run: <code className="bg-slate-900 px-2 py-1 rounded">uvicorn app.main:app --reload</code></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">3. Frontend Setup</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• Node 18+, Next.js 14</li>
                    <li>• Install dependencies: <code className="bg-slate-900 px-2 py-1 rounded">npm install</code></li>
                    <li>• Run dev server: <code className="bg-slate-900 px-2 py-1 rounded">npm run dev</code></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">4. Environment Variables</h4>
                  <pre className="text-sm text-slate-300 bg-slate-900 p-3 rounded">
{`ETH_PROVIDER_URL=https://rpc.sepolia.org
REDIS_URL=redis://localhost:6379
IPFS_API_URL=https://ipfs.infura.io:5001`}
                  </pre>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Appendix D: Security Audit Report</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Independent security audit findings and recommendations.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-2 px-4 text-slate-100">Area</th>
                      <th className="text-left py-2 px-4 text-slate-100">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Reentrancy Checks</td>
                      <td className="py-2 px-4 text-green-400">✅ All protected</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Access Control</td>
                      <td className="py-2 px-4 text-green-400">✅ Enforced roles</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Gas Optimization</td>
                      <td className="py-2 px-4 text-yellow-400">⚠️ Use bytes32</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-slate-300">Logging & Reverts</td>
                      <td className="py-2 px-4 text-yellow-400">⚠️ Add reasons</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-slate-100">Appendix E: Performance Benchmarks</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Detailed performance testing results and optimization strategies.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-2 px-4 text-slate-100">Metric</th>
                      <th className="text-left py-2 px-4 text-slate-100">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Decision Latency</td>
                      <td className="py-2 px-4 text-slate-300">~1.2 sec avg</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Blockchain Confirmation</td>
                      <td className="py-2 px-4 text-slate-300">~11 sec avg</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Validator Response Time</td>
                      <td className="py-2 px-4 text-slate-300">~2.8 hrs median</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-4 text-slate-300">Throughput</td>
                      <td className="py-2 px-4 text-slate-300">1,250 decisions/min</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-slate-300">API Uptime</td>
                      <td className="py-2 px-4 text-slate-300">99.97%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 