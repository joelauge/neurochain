'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  FileText
} from 'lucide-react';

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

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
            <button
              onClick={handleWalletConnect}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isWalletConnected 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transparent AI
              <span className="text-purple-400"> Decision-Making</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Neurochain combines artificial intelligence with blockchain technology to create 
              a transparent, auditable framework for AI decision-making. Every decision is 
              recorded, validated, and open for public scrutiny.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Zap className="w-5 h-5" />
                Try Demo
              </a>
              <a
                href="/docs/Neurochain_Whitepaper.md"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors border border-white/20"
              >
                <FileText className="w-5 h-5" />
                Read Whitepaper
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Neurochain Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Neurochain?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Traditional AI systems operate as black boxes. Neurochain brings transparency 
              and accountability to AI decision-making through blockchain technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">AI Transparency</h3>
              <p className="text-gray-300">
                Every AI decision is recorded on the blockchain with complete reasoning 
                and confidence scores, making the decision-making process fully transparent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Human Validation</h3>
              <p className="text-gray-300">
                AI decisions are validated by a decentralized network of human experts, 
                ensuring ethical compliance and preventing harmful outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Continuous Improvement</h3>
              <p className="text-gray-300">
                The system learns from validation feedback, continuously improving 
                AI decision quality and reducing bias over time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built with modern technologies for scalability, security, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
              <p className="text-sm text-gray-300">Next.js 14, TypeScript, Tailwind CSS</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
              <p className="text-sm text-gray-300">FastAPI, Python, Redis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Blockchain</h3>
              <p className="text-sm text-gray-300">Ethereum, Solidity, Hardhat</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">AI</h3>
              <p className="text-sm text-gray-300">LangChain, OpenAI, Custom Models</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Transparent AI?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              See how AI decisions are made, recorded, and validated in real-time.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              Launch Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold text-white">Neurochain</span>
          </div>
          <p className="text-gray-400">
            Transparent AI decision-making powered by blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
