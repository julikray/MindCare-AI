import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Globe, Shield, Zap, BrainCircuit } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-100">{title}</h3>
    </div>
    <p className="text-slate-400">{description}</p>
  </motion.div>
);

const FeaturesPage = () => {
  const features = [
    {
      icon: Phone,
      title: 'Real-time Voice Conversations',
      description: 'Engage in natural, spoken conversations with our AI assistant. It listens, understands, and responds with empathy, just like a real conversation.',
    },
    {
      icon: MessageSquare,
      title: 'Intuitive Text Chat',
      description: 'Prefer typing? Our chat interface provides a safe space to express your thoughts and feelings at your own pace, with thoughtful responses.',
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'MindCare AI breaks language barriers, offering support in over 10 languages. Get help in the language you\'re most comfortable with.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your conversations are confidential. We prioritize your privacy with secure, anonymous interactions. We do not store your personal conversations.',
    },
    {
      icon: Zap,
      title: 'Available 24/7',
      description: 'Support shouldn\'t have a schedule. Our AI assistant is available around the clock, whenever you need someone to talk to.',
    },
    {
      icon: BrainCircuit,
      title: 'Powered by Advanced AI',
      description: 'Leveraging state-of-the-art technology from Vapi AI, our assistant is designed to provide compassionate and context-aware support.',
    },
  ];

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
            Features Designed for 
            <span className="text-gradient"> Your Wellbeing</span>
          </h1>
          <p className="text-lg text-slate-400">
            Discover how MindCare AI provides a comprehensive and accessible mental health support experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1 + 0.2} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
