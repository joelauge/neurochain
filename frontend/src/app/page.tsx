'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, Shield, Zap, TrendingUp, ArrowRight, FileText,
  Cpu, Network, Database, Lock, Eye, CircuitBoard, AlertTriangle,
  CheckCircle, Users, BarChart3, Code, Globe, ShieldCheck
} from 'lucide-react';
import { useWeb3 } from '@/components/Web3Provider';
import Image from 'next/image';

export default function HomePage() {
  const { isConnected, connectWallet, disconnectWallet, isLoading, error } = useWeb3();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const features = [
    {
      title: "Real-time AI Monitoring",
      description: "Capture and analyze AI reasoning processes in real-time to detect behavioral drift and potential misalignment.",
      icon: <Eye className="w-6 h-6" />,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Blockchain Transparency",
      description: "Immutable audit trail on custom blockchain + protected redundant sidechain ensures all AI decisions are publicly verifiable and tamper-proof.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Early Warning System",
      description: "Advanced trustless algorithms detect concerning patterns before they become critical safety issues.",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-cyan-500 to-green-500"
    }
  ];

  const benefits = [
    {
      title: "Transparent Oversight",
      description: "Public blockchain ensures all AI behavior is transparent and auditable, enabling community validation.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Human Control Verification",
      description: "Clear parameterization and ethical constructs determine if humans remain in control of AI systems.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      title: "Community Validation",
      description: "Decentralized validation network allows experts and stakeholders to verify AI alignment.",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Comprehensive Analytics",
      description: "Advanced metrics and dashboards provide deep insights into AI behavior patterns.",
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  const techStack = [
    { 
      name: "Python AI Engine", 
      description: "LangChain-powered reasoning with real-time decision capture",
      icon: <Brain className="w-8 h-8" /> 
    },
    { 
      name: "Custom FPGA", 
      description: "Hardware-accelerated AI co-signer for cryptographic validation",
      icon: <Cpu className="w-8 h-8" /> 
    },
    { 
      name: "IPFS Storage", 
      description: "Decentralized immutable storage for decision records",
      icon: <Database className="w-8 h-8" /> 
    },
    { 
      name: "Custom Blockchain", 
      description: "Specialized sidechains optimized for AI reasoning validation",
      icon: <Network className="w-8 h-8" /> 
    },
    { 
      name: "Hardware Acceleration", 
      description: "Inline reasoning log buffers with WAL architecture",
      icon: <Zap className="w-8 h-8" /> 
    },
    { 
      name: "Smart Contracts", 
      description: "Solidity contracts for decentralized consensus validation",
      icon: <Shield className="w-8 h-8" /> 
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Particles */}
      {isBrowser && (
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Monitor AI through blockchain to ensure human control
          </h1>
          <p className="hero-subtitle">
            Neurochain creates transparent oversight of AI systems, ensuring they remain{' '}
            <span className="hero-highlight">aligned with human values and under human control</span>{' '}
            through immutable blockchain monitoring and community validation.
          </p>
          <div className="hero-buttons">
            <a href="/demo" className="resend-btn-primary">
              <Zap className="w-5 h-5" />
              Launch Demo
            </a>
            <a href="/whitepaper" className="resend-btn-secondary">
              <FileText className="w-5 h-5" />
              Read Whitepaper
            </a>
          </div>
        </div>
      </section>

      {/* Companies Trust Section */}
      <section className="section">
        <div className="section-container">
          <p className="text-center text-gray-400 mb-8 text-sm font-medium">
            WORKS ON LEADING REASONING MODELS FROM:
          </p>
          <div className="companies-row">
            <Image
              src="/openai_trans.png"
              alt="OpenAI"
              width={200}
              height={200}
              className="company-logo-image"
            />
            <Image
              src="/anthropic_trans.png"
              alt="Anthropic"
              width={200}
              height={200}
              className="company-logo-image"
            />
            <Image
              src="/deepseek_trans.png"
              alt="DeepSeek"
              width={200}
              height={200}
              className="company-logo-image"
            />
            <Image
              src="/grok_trans.png"
              alt="Grok"
              width={200}
              height={200}
              className="company-logo-image"
            />
            <Image
              src="/meta_trans.png"
              alt="Meta"
              width={200}
              height={200}
              className="company-logo-image"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">First-class AI monitoring experience</h2>
          <p className="section-subtitle">
            We are a team of forward-thinkers who believe AGI is inevitable and AI safety, critical. Our goal is to create the AI monitoring platform we all need to ensure AGI is safe and aligned with human values.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={feature.title} className="feature-card">
                <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="section-container">
          <h2 className="section-title">Everything distributed - including accountability.</h2>
          <p className="section-subtitle">
            Complete visibility and control over AI monitoring with comprehensive analytics and community validation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="benefit-card mb-20">
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">Built with specialized technologies</h2>
          <p className="section-subtitle">
            Custom hardware acceleration, blockchain infrastructure, and AI reasoning engines designed for transparent, auditable AI monitoring at scale.
          </p>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-card">
                <div className="tech-icon">
                  {tech.icon}
                </div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-description">{tech.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="section bg-gradient-to-b from-gray-900/20 to-transparent">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left">Hardware-Accelerated AI Monitoring</h2>
              <p className="text-gray-300 mb-6">
                Custom FPGA co-signers and inline reasoning log buffers capture AI decisions at hardware speed. 
                Specialized blockchain sidechains provide real-time validation with cryptographic guarantees.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">FPGA-accelerated decision capture</span>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">Custom blockchain sidechains</span>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">Hardware-level cryptographic validation</span>
                </div>
              </div>
            </div>
            <div className="architecture-preview">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="cta-title">AI monitoring reimagined. Available today.</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/demo" className="resend-btn-primary">
              <ArrowRight className="w-5 h-5" />
              Launch Demo
            </a>
            <a href="/whitepaper" className="resend-btn-secondary">
              <FileText className="w-5 h-5" />
              Read Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Image
              src="/neurochain_logo__white500px.png"
              alt="Neurochain"
              width={72}
              height={72}
              className="footer-logo-image"
            />
          </div>
          <p className="footer-text">
            © 2024 Neurochain. Monitoring AI through blockchain to ensure human control.
          </p>
        </div>
      </footer>
    </div>
  );
}
