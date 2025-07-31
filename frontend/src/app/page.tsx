'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, Shield, Zap, TrendingUp, ArrowRight, FileText,
  Cpu, Network, Database, Lock, Eye, CircuitBoard
} from 'lucide-react';

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const features = [
    {
      title: "AI TRANSPARENCY",
      description: "Every AI decision is recorded on the blockchain with full traceability and explainability, ensuring complete transparency in the decision-making process.",
      icon: <Eye className="w-12 h-12" />
    },
    {
      title: "HUMAN VALIDATION",
      description: "Decentralized network of human validators ensures AI decisions are fair, ethical, and accurate through collective intelligence.",
      icon: <Shield className="w-12 h-12" />
    },
    {
      title: "CONTINUOUS EVOLUTION",
      description: "AI models improve through collective human feedback and validation, creating a self-improving system that learns from diverse perspectives.",
      icon: <TrendingUp className="w-12 h-12" />
    }
  ];

  const techStack = [
    { name: "Next.js", icon: <Cpu className="w-10 h-10" /> },
    { name: "FastAPI", icon: <Database className="w-10 h-10" /> },
    { name: "Ethereum", icon: <Network className="w-10 h-10" /> },
    { name: "LangChain", icon: <CircuitBoard className="w-10 h-10" /> }
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

      {/* Navigation */}
      <nav className="nav-glass">
        <div className="nav-container">
          <a href="/" className="logo">
            <div className="logo-icon">
              <Brain />
            </div>
            <span>NEUROCHAIN</span>
          </a>
          <button
            onClick={handleWalletConnect}
            className={`connect-btn ${isWalletConnected ? 'connected' : ''}`}
          >
            {isWalletConnected ? 'CONNECTED' : 'CONNECT WALLET'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            TRANSPARENT AI DECISION MAKING
          </h1>
          <p className="hero-subtitle">
            Revolutionizing AI decision-making with blockchain technology, creating an{' '}
            <span className="hero-highlight">immutable, auditable framework</span>{' '}
            that ensures transparency and accountability in every AI decision.
          </p>
          <div className="hero-buttons">
            <a href="/demo" className="hero-btn">
              <Zap className="w-5 h-5" />
              LAUNCH DEMO
            </a>
            <a href="/whitepaper" className="hero-btn secondary">
              <FileText className="w-5 h-5" />
              READ WHITEPAPER
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">WHY NEUROCHAIN?</h2>
          <p className="section-subtitle">
            Traditional AI systems operate as black boxes. Neurochain brings transparency and accountability 
            to AI decision-making through blockchain technology.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
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

      {/* Technology Stack */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">TECHNOLOGY STACK</h2>
          <p className="section-subtitle">
            Built with cutting-edge technologies for scalability, security, and performance.
          </p>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-card">
                <div className="tech-icon">
                  {tech.icon}
                </div>
                <div className="tech-name">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="cta-title">READY TO EXPERIENCE THE FUTURE?</h2>
          <a href="/demo" className="cta-btn">
            <ArrowRight className="w-6 h-6" />
            LAUNCH DEMO NOW
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Brain />
            </div>
            <span>NEUROCHAIN</span>
          </div>
          <p className="footer-text">
            © 2024 Neurochain. Revolutionizing AI transparency through blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
