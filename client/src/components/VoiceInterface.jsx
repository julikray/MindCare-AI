import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import Vapi from '@vapi-ai/web';

function VoiceInterface() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callStatus, setCallStatus] = useState('idle');
  const [transcript, setTranscript] = useState([]);
  const [duration, setDuration] = useState(0);
  const vapiRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    
    if (publicKey && publicKey !== 'YOUR_API_KEY') {
      vapiRef.current = new Vapi(publicKey);

      vapiRef.current.on('call-start', () => {
        setCallStatus('connected'); 
        setIsCallActive(true);
        startTimer();
      });

      vapiRef.current.on('call-end', () => {
        setCallStatus('ended');
        setIsCallActive(false);
        stopTimer();
      });

      vapiRef.current.on('speech-start', () => {
        setCallStatus('listening');
      });

      vapiRef.current.on('speech-end', () => {
        setCallStatus('connected');
      });

      vapiRef.current.on('message', (message) => {
        if (message.type === 'transcript') {
          setTranscript(prev => [...prev, {
            role: message.role,
            text: message.transcript,
            timestamp: new Date()
          }]);
        }
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDuration(0);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    
    if (!assistantId || assistantId === 'YOUR_API_KEY') {
      alert('Please configure your Vapi Assistant ID in the .env file');
      return;
    }

    setCallStatus('connecting');
    
    try {
      await vapiRef.current.start(assistantId);
    } catch (error) {
      console.error('Error starting call:', error);
      setCallStatus('error');
      alert('Failed to start call. Please check your Vapi configuration.');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  const toggleMute = () => {
    if (vapiRef.current && isCallActive) {
      vapiRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'idle': return 'Ready to connect';
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Connected';
      case 'listening': return 'Listening...';
      case 'ended': return 'Call ended';
      case 'error': return 'Connection error';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Voice Assistant</h2>
          <p className="text-slate-400">Speak freely about what's on your mind</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isCallActive ? 'active' : 'inactive'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center ${
                isCallActive 
                  ? 'bg-gradient-to-br from-violet-600 to-purple-600 animate-pulse-slow glow-effect' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-800'
              }`}>
                <Phone className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              
              {isCallActive && callStatus === 'listening' && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-violet-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-slate-200">{getStatusText()}</p>
            {isCallActive && (
              <p className="text-3xl font-bold text-violet-400 mt-2">{formatDuration(duration)}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {!isCallActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startCall}
              disabled={callStatus === 'connecting'}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed rounded-2xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {callStatus === 'connecting' ? 'Connecting...' : 'Start Call'}
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className={`p-4 rounded-2xl ${
                  isMuted 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-slate-700 hover:bg-slate-600'
                } transition-colors shadow-lg`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={endCall}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSpeaker}
                className={`p-4 rounded-2xl ${
                  isSpeakerOn 
                    ? 'bg-slate-700 hover:bg-slate-600' 
                    : 'bg-red-600 hover:bg-red-700'
                } transition-colors shadow-lg`}
              >
                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </motion.button>
            </>
          )}
        </div>

        {transcript.length > 0 && (
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              Conversation Transcript
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {transcript.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: item.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    item.role === 'user' 
                      ? 'bg-violet-600/30 border border-violet-500/50' 
                      : 'bg-slate-800/50 border border-slate-700/50'
                  }`}>
                    <p className="text-sm text-slate-200">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
          <p className="text-sm text-blue-200 text-center">
            💡 Tip: Speak clearly and take your time. The AI is here to listen and support you.
          </p>
        </div>
      </motion.div>
    </div>
  );
};


export default VoiceInterface