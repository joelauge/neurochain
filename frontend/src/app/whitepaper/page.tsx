'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, ArrowLeft, FileText, Download, ExternalLink,
  Shield, Network, Database, Cpu, TrendingUp, Eye,
  Lock, Zap, Users, Globe, Code, GitBranch
} from 'lucide-react';

export default function WhitepaperPage() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const sections = [
    {
      title: "Executive Summary",
      icon: <FileText className="w-6 h-6" />,
      content: "Neurochain represents a paradigm shift in AI decision-making, combining blockchain technology with human validation to create transparent, auditable, and trustworthy AI systems."
    },
    {
      title: "Problem Statement",
      icon: <Eye className="w-6 h-6" />,
      content: "Current AI systems operate as black boxes, making decisions without transparency or accountability. This lack of explainability creates trust issues and prevents widespread adoption in critical applications."
    },
    {
      title: "Solution Overview",
      icon: <Brain className="w-6 h-6" />,
      content: "Neurochain creates an immutable, auditable framework for AI decisions by recording every decision on the blockchain and validating them through a decentralized network of human experts."
    },
    {
      title: "Technical Architecture",
      icon: <Code className="w-6 h-6" />,
      content: "Built on Ethereum with Layer-2 scaling, IPFS for data storage, and a sophisticated consensus mechanism that balances AI efficiency with human oversight."
    },
    {
      title: "Economic Model",
      icon: <TrendingUp className="w-6 h-6" />,
      content: "Token-based incentive system rewards validators for accurate assessments while penalizing malicious actors, creating a self-sustaining ecosystem."
    },
    {
      title: "Security & Privacy",
      icon: <Lock className="w-6 h-6" />,
      content: "Zero-knowledge proofs ensure privacy while maintaining transparency, with advanced encryption protecting sensitive decision data."
    }
  ];

  const features = [
    {
      title: "AI Transparency",
      description: "Every decision is recorded with full reasoning and confidence scores",
      icon: <Eye className="w-8 h-8" />
    },
    {
      title: "Human Validation",
      description: "Decentralized network ensures ethical and accurate decisions",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Blockchain Immutability",
      description: "All decisions are permanently recorded and cannot be altered",
      icon: <Network className="w-8 h-8" />
    },
    {
      title: "Continuous Learning",
      description: "System improves through collective human feedback",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Particles */}
      {isBrowser && (
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
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
            NEUROCHAIN WHITEPAPER
          </h1>
          <p className="hero-subtitle max-w-4xl mx-auto">
            A comprehensive guide to transparent AI decision-making through blockchain technology and human validation.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <a href="/docs/Neurochain_Whitepaper.md" className="hero-btn" download>
              <Download className="w-5 h-5" />
              DOWNLOAD PDF
            </a>
            <a href="/docs/Neurochain_Whitepaper.md" className="hero-btn secondary" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
              VIEW ONLINE
            </a>
          </div>
        </div>

        {/* Key Features */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">KEY FEATURES</h2>
            <div className="features-grid">
              {features.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Whitepaper Sections */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">WHITEPAPER SECTIONS</h2>
            <div className="features-grid">
              {sections.map((section) => (
                <div key={section.title} className="feature-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="feature-icon">
                      {section.icon}
                    </div>
                    <h3 className="feature-title">{section.title}</h3>
                  </div>
                  <p className="feature-description">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">TECHNOLOGY STACK</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <div className="tech-icon">
                  <Cpu />
                </div>
                <div className="tech-name">Next.js 14</div>
                <p className="text-sm text-gray-400 mt-2">Frontend Framework</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">
                  <Database />
                </div>
                <div className="tech-name">FastAPI</div>
                <p className="text-sm text-gray-400 mt-2">Backend API</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">
                  <Network />
                </div>
                <div className="tech-name">Ethereum</div>
                <p className="text-sm text-gray-400 mt-2">Blockchain Platform</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">
                  <Brain />
                </div>
                <div className="tech-name">LangChain</div>
                <p className="text-sm text-gray-400 mt-2">AI Framework</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">
                  <Globe />
                </div>
                <div className="tech-name">IPFS</div>
                <p className="text-sm text-gray-400 mt-2">Decentralized Storage</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">
                  <GitBranch />
                </div>
                <div className="tech-name">Layer-2</div>
                <p className="text-sm text-gray-400 mt-2">Scaling Solution</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="section-container">
            <h2 className="cta-title">READY TO LEARN MORE?</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="/demo" className="cta-btn">
                <Zap className="w-6 h-6" />
                LAUNCH DEMO
              </a>
              <a href="/docs/Neurochain_Whitepaper.md" className="hero-btn secondary" target="_blank" rel="noopener noreferrer">
                <FileText className="w-5 h-5" />
                READ FULL WHITEPAPER
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 