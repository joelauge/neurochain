'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Cpu,
  Network,
  Database,
  Lock,
  Eye,
  CircuitBoard
} from 'lucide-react';

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Glowing Cursor Effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(120,119,198,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-cyan-500/20">
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
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 border ${
                isWalletConnected 
                  ? 'bg-green-600/20 border-green-400 text-green-400 shadow-lg shadow-green-400/20' 
                  : 'bg-cyan-600/20 border-cyan-400 text-cyan-400 hover:bg-cyan-600/30 hover:shadow-lg hover:shadow-cyan-400/20'
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Main Title */}
            <motion.h1 
              className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TRANSPARENT
              </span>
              <br />
              <span className="text-white">AI DECISION</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                MAKING
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-cyan-400">Neurochain</span> leverages advanced blockchain technology to create an 
              <span className="text-purple-400"> immutable, auditable framework</span> for AI decision-making. 
              Every neural computation is recorded, validated, and open for public scrutiny.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="/demo"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  <span>LAUNCH DEMO</span>
                </div>
              </motion.a>
              
              <motion.a
                href="/docs/Neurochain_Whitepaper.md"
                className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  <span>READ WHITEPAPER</span>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                WHY NEUROCHAIN?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional AI systems operate as <span className="text-red-400">black boxes</span>. 
              Neurochain brings <span className="text-cyan-400">transparency</span> and 
              <span className="text-purple-400"> accountability</span> to AI decision-making through 
              <span className="text-green-400"> blockchain technology</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="w-12 h-12" />,
                title: "AI TRANSPARENCY",
                description: "Every AI decision is recorded on the blockchain with complete reasoning and confidence scores, making the decision-making process fully transparent.",
                color: "cyan"
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "HUMAN VALIDATION",
                description: "AI decisions are validated by a decentralized network of human experts, ensuring ethical compliance and preventing harmful outcomes.",
                color: "green"
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "CONTINUOUS EVOLUTION",
                description: "The system learns from validation feedback, continuously improving AI decision quality and reducing bias over time.",
                color: "purple"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`group relative bg-gradient-to-br from-${feature.color}-900/20 to-${feature.color}-600/10 backdrop-blur-xl border border-${feature.color}-500/30 rounded-2xl p-8 hover:border-${feature.color}-400/50 transition-all duration-300 hover:scale-105`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-600/5 to-transparent rounded-2xl`}></div>
                <div className="relative">
                  <div className={`text-${feature.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-bold text-${feature.color}-400 mb-4 tracking-wider`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TECHNOLOGY STACK
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for <span className="text-cyan-400">scalability</span>, 
              <span className="text-green-400"> security</span>, and <span className="text-purple-400">performance</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "FRONTEND", tech: "Next.js 14, TypeScript, Tailwind CSS", icon: <CircuitBoard className="w-8 h-8" />, color: "cyan" },
              { name: "BACKEND", tech: "FastAPI, Python, Redis", icon: <Database className="w-8 h-8" />, color: "green" },
              { name: "BLOCKCHAIN", tech: "Ethereum, Solidity, Hardhat", icon: <Network className="w-8 h-8" />, color: "purple" },
              { name: "AI ENGINE", tech: "LangChain, OpenAI, Custom Models", icon: <Cpu className="w-8 h-8" />, color: "yellow" }
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-gradient-to-br from-${stack.color}-900/20 to-${stack.color}-600/10 backdrop-blur-xl border border-${stack.color}-500/30 rounded-xl p-6 text-center hover:border-${stack.color}-400/50 transition-all duration-300 hover:scale-105`}
              >
                <div className={`text-${stack.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stack.icon}
                </div>
                <h3 className={`text-lg font-bold text-${stack.color}-400 mb-2 tracking-wider`}>
                  {stack.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {stack.tech}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                READY TO EXPERIENCE
              </span>
              <br />
              <span className="text-white">TRANSPARENT AI?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Witness the future of AI decision-making in real-time.
            </p>
            <motion.a
              href="/demo"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 text-white rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center gap-4">
                <Zap className="w-6 h-6" />
                <span>LAUNCH DEMO</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-black text-white tracking-wider">
              <span className="text-cyan-400">NEURO</span>CHAIN
            </span>
          </motion.div>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transparent AI decision-making powered by <span className="text-cyan-400">blockchain technology</span>.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
