import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Heart, Shield, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';



function Hero({ onModeSelect }) {

      const features = [
    { icon: Heart, text: 'Compassionate Support' },
    { icon: Shield, text: 'Private & Secure' },
    { icon: Sparkles, text: 'AI-Powered' }
  ];






  return (
      <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Your Mental Wellness
            <span className="block text-gradient mt-2">Starts Here</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Connect with our AI mental health assistant through voice or chat. Create a free account to track your journey or start a quick session now.
          </p>


          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-full"
                >
                  <Icon className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="relative text-center mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-950 px-2 text-slate-400">Or try a quick session</span>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('voice')}
            className="group relative overflow-hidden bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 shadow-2xl hover:shadow-violet-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-colors">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Voice Call</h3>
              <p className="text-violet-100">Speak naturally with our AI assistant. Have a real conversation about what's on your mind.</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('chat')}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-colors">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Text Chat</h3>
              <p className="text-purple-100">Type your thoughts and feelings. Get thoughtful, supportive responses at your own pace.</p>
            </div>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            This AI assistant provides supportive conversations but is not a replacement for professional mental health care.
          </p>
        </motion.div>
      </div>
    </div>

  )
}

export default Hero