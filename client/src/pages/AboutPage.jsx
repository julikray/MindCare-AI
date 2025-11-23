import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About
            <span className="text-gradient"> MindCare AI</span>
          </h1>
          <p className="text-lg text-slate-400">
            Our mission is to make mental wellness support universally accessible.
          </p>
        </div>

        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
              <Heart className="w-16 h-16 text-violet-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                At MindCare AI, we believe that everyone deserves a safe space to be heard. Our mission is to leverage the power of artificial intelligence to provide immediate, compassionate, and private mental wellness support to anyone, anywhere, at any time. We aim to bridge the gap in mental health services by offering a reliable first point of contact for emotional support.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row-reverse items-center gap-8"
          >
            <div className="flex-shrink-0 p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
              <Sparkles className="w-16 h-16 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Technology</h2>
              <p className="text-slate-300 leading-relaxed">
                MindCare AI is built on a foundation of cutting-edge AI technology, powered by Vapi AI for lifelike voice interactions. This allows us to create a conversational experience that is both natural and empathetic. We are committed to responsible innovation, ensuring our technology is used ethically and effectively to support user wellbeing while maintaining the highest standards of privacy and security.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-800/50 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-3">A Note on Professional Help</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              While MindCare AI is a powerful tool for emotional support and self-reflection, it is not a substitute for professional medical advice, diagnosis, or treatment. If you are in crisis or believe you may have a condition requiring professional care, please consult a qualified healthcare provider or contact emergency services.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage