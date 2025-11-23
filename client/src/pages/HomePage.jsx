import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import VoiceInterface from '../components/VoiceInterface';
import ChatInterface from '../components/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


function HomePage()  {
  const [activeMode, setActiveMode] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleModeChange = (mode) => {
    if (!user) {
      navigate('/login');
    } else {
      setActiveMode(activeMode === mode ? null : mode);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!activeMode ? (
        <motion.div
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero onModeSelect={handleModeChange} />
        </motion.div>
      ) : (
        <motion.div
          key="interface"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <button
                onClick={() => setActiveMode(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>

            {activeMode === 'voice' && (
              <VoiceInterface />
            )}
            
            {activeMode === 'chat' && (
              <ChatInterface />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default HomePage