'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Eye, 
  Users, 
  Zap, 
  Code, 
  ArrowRight, 
  CheckCircle,
  Github,
  ExternalLink
} from 'lucide-react';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Transparent AI Decisions",
      description: "Every AI decision is recorded on a public blockchain for complete transparency and auditability."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Decentralized Validation",
      description: "Human consensus validates AI decisions through side chains, ensuring ethical alignment."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Smart Contract Governance",
      description: "Automated oversight and validation rules enforced by smart contracts."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High Performance",
      description: "Layer-2 solutions and sharding for scalable, fast blockchain operations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Open Source",
      description: "Fully transparent and community-driven development for trust and collaboration."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer Friendly",
      description: "Comprehensive APIs and documentation for easy integration and development."
    }
  ];

  const techStack = [
    "Next.js 14", "TypeScript", "Tailwind CSS", "Python FastAPI", 
    "LangChain", "Ethereum", "Solidity", "Hardhat", "Web3.js"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Neurochain</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/yourusername/neurochain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setIsConnected(!isConnected)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isConnected 
                    ? 'bg-green-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isConnected ? 'Connected' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transparent AI for a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}Trustworthy Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Neurochain leverages blockchain technology to ensure AI systems remain transparent, 
              accountable, and aligned with human values through decentralized oversight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/demo" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2">
                <span>Try Demo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/docs/Neurochain_Whitepaper.md"
                className="px-8 py-4 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Read Whitepaper</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Neurochain?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform addresses the critical challenges of AI transparency and accountability 
              through innovative blockchain technology.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with modern, scalable technologies for maximum performance and reliability.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-purple-600/20 border border-purple-600/30 text-purple-300 px-4 py-2 rounded-lg font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Live Demo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience transparent AI decision-making in action. Watch as AI decisions are 
              recorded and validated on the blockchain in real-time.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                AI Decision Prototype
              </h3>
              <p className="text-gray-300 mb-6">
                This demo shows how AI decisions are made, recorded, and validated on the blockchain.
              </p>
              <a href="/demo" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-all inline-block">
                Launch Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">Neurochain</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/yourusername/neurochain" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="/docs" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="/docs/Neurochain_Whitepaper.md" className="text-gray-400 hover:text-white transition-colors">
                Whitepaper
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 Neurochain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
