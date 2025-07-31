'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Shield, Zap, TrendingUp, ArrowRight, FileText,
  Cpu, Network, Database, Lock, Eye, CircuitBoard
} from 'lucide-react';

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const features = [
    {
      title: "AI TRANSPARENCY",
      description: "Every AI decision is recorded on the blockchain with full traceability and explainability.",
      icon: <Eye className="w-8 h-8" />,
      color: "cyan"
    },
    {
      title: "HUMAN VALIDATION",
      description: "Decentralized network of human validators ensures AI decisions are fair and accurate.",
      icon: <Shield className="w-8 h-8" />,
      color: "green"
    },
    {
      title: "CONTINUOUS EVOLUTION",
      description: "AI models improve through collective human feedback and validation.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "purple"
    }
  ];

  const techStack = [
    { name: "Next.js", icon: <Cpu className="w-6 h-6" />, color: "cyan" },
    { name: "FastAPI", icon: <Database className="w-6 h-6" />, color: "green" },
    { name: "Ethereum", icon: <Network className="w-6 h-6" />, color: "purple" },
    { name: "LangChain", icon: <CircuitBoard className="w-6 h-6" />, color: "yellow" }
  ];

  return (
    <div className="bg-black relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern"></div>

        {/* Floating Particles */}
        {isBrowser && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      {/* Glowing Cursor Effect */}
      {isBrowser && (
        <div 
          className="cursor-glow"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      {/* Navigation */}
      <nav className="nav-sci-fi fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-white tracking-wider">
                <span className="text-cyan-400">NEURO</span>CHAIN
              </span>
            </motion.div>
            <motion.button
              onClick={handleWalletConnect}
              className={`btn-sci-fi ${
                isWalletConnected 
                  ? 'bg-green-600/20 border-green-400 text-green-400' 
                  : ''
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isWalletConnected ? 'CONNECTED' : 'CONNECT WALLET'}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="hero-title mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            TRANSPARENT AI DECISION MAKING
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Revolutionizing AI decision-making with blockchain technology, creating an{' '}
            <span className="text-cyan-400 font-bold">immutable, auditable framework</span>{' '}
            that ensures transparency and accountability in every AI decision.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <a href="/demo" className="btn-sci-fi inline-flex items-center gap-3">
              <Zap className="w-5 h-5" />
              LAUNCH DEMO
            </a>
            <a href="/whitepaper" className="btn-sci-fi inline-flex items-center gap-3">
              <FileText className="w-5 h-5" />
              READ WHITEPAPER
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="gradient-text text-4xl md:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            WHY NEUROCHAIN?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <div className={`text-${feature.color}-400 mb-4`}>
                  {feature.icon}
                </div>
                <h3 className={`text-${feature.color}-400 text-xl font-bold mb-4`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="gradient-text text-4xl md:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            TECHNOLOGY STACK
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="feature-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <div className={`text-${tech.color}-400 mb-4 flex justify-center`}>
                  {tech.icon}
                </div>
                <h3 className={`text-${tech.color}-400 text-lg font-bold`}>
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="gradient-text text-4xl md:text-6xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            READY TO EXPERIENCE THE FUTURE?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <a href="/demo" className="btn-sci-fi inline-flex items-center gap-3 text-lg">
              <ArrowRight className="w-6 h-6" />
              LAUNCH DEMO NOW
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Brain className="w-6 h-6 text-cyan-400" />
              <div className="absolute inset-0 w-6 h-6 bg-cyan-400/20 rounded-full animate-pulse"></div>
            </div>
            <span className="text-lg font-bold text-white">
              <span className="text-cyan-400">NEURO</span>CHAIN
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 Neurochain. Revolutionizing AI transparency through blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
