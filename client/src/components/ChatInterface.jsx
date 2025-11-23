// // import React, { useState, useRef, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Send, Loader2, Bot, User, WifiOff } from 'lucide-react';
// // import Vapi from '@vapi-ai/web';

// // function ChatInterface() {
// //   const [messages, setMessages] = useState([]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [sessionStatus, setSessionStatus] = useState('idle');

// //   const vapiRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
// //     const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

// //     if (!publicKey || publicKey === 'YOUR_API_KEY' || !assistantId || assistantId === 'YOUR_API_KEY') {
// //       setMessages([{ role: 'assistant', content: 'Please configure your Vapi credentials in the .env file to start chatting.', timestamp: new Date() }]);
// //       setSessionStatus('error');
// //       return;
// //     }

// //     const vapi = new Vapi(publicKey);
// //     vapiRef.current = vapi;
// //     vapi.on('call-start', () => {
// //       setSessionStatus('active');
// //       setMessages([{ role: 'assistant', content: "Hello! I'm here to listen and support you. How are you feeling today?", timestamp: new Date() }]);
// //     });

// //     vapi.on('call-end', () => {
// //       setSessionStatus('ended');
// //     });

// //     vapi.on('message', (message) => {
// //       if (message.type === 'transcript' && message.role === 'assistant' && message.transcriptType === 'final') {
// //         setIsLoading(false);
// //         setMessages(prev => [...prev, { role: 'assistant', content: message.transcript, timestamp: new Date() }]);
// //       }
// //     });

// //     vapi.on('error', (e) => {
// //       console.error('Vapi error:', e);
// //       setSessionStatus('error');
// //       setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, a connection error occurred.', timestamp: new Date() }]);
// //     });

// //     setSessionStatus('connecting');

// //     vapi.start(assistantId).catch(err => {
// //         console.error('Error starting Vapi chat session:', err);
// //         setSessionStatus('error');
// //         setMessages([{ role: 'assistant', content: 'Sorry, I couldn\'t connect to the assistant. Please check your credentials and refresh.', timestamp: new Date() }]);
// //     });

// //     return () => {
// //       vapi.stop();
// //     };
// //   }, []);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!inputMessage.trim() || isLoading || sessionStatus !== 'active') return;

// //     const userMessage = {
// //       role: 'user',
// //       content: inputMessage,
// //       timestamp: new Date()
// //     };
// //     setMessages(prev => [...prev, userMessage]);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     vapiRef.current.send({
// //       type: 'add-message',
// //       message: {
// //         role: 'user',
// //         content: inputMessage
// //       }
// //     });
// //   };

// //   const suggestedPrompts = [
// //     "I'm feeling anxious",
// //     "I need someone to talk to",
// //     "Help me manage stress",
// //     "I'm having trouble sleeping"
// //   ];

// //   const isInputDisabled = isLoading || sessionStatus !== 'active';

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] md:h-[700px]"
// //       >
// //         <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-slate-800/50 p-4 md:p-6">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center glow-effect">
// //                 <Bot className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h3 className="font-semibold text-lg">MindCare Assistant</h3>
// //                 <p className="text-sm text-slate-400">Always here to listen</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2 text-sm">
// //                 <span className={`w-2.5 h-2.5 rounded-full ${
// //                     sessionStatus === 'active' ? 'bg-green-400' :
// //                     sessionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
// //                     'bg-red-500'
// //                 }`}></span>
// //                 <span className="text-slate-300 capitalize">{sessionStatus === 'active' ? 'Connected' : sessionStatus}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
// //           {sessionStatus === 'connecting' && messages.length === 0 && (
// //             <div className="flex justify-center items-center h-full">
// //                 <div className="text-center text-slate-400">
// //                     <Loader2 className="w-8 h-8 mx-auto animate-spin mb-2" />
// //                     <p>Connecting to assistant...</p>
// //                 </div>
// //             </div>
// //           )}

// //           <AnimatePresence initial={false}>
// //             {messages.map((message, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -10 }}
// //                 transition={{ duration: 0.3 }}
// //                 className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
// //               >
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
// //                   message.role === 'user'
// //                     ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
// //                     : 'bg-gradient-to-br from-violet-600 to-purple-600'
// //                 }`}>
// //                   {message.role === 'user' ? (
// //                     <User className="w-4 h-4 text-white" />
// //                   ) : (
// //                     <Bot className="w-4 h-4 text-white" />
// //                   )}
// //                 </div>

// //                 <div className={`max-w-[75%] md:max-w-[70%] ${
// //                   message.role === 'user' ? 'items-end' : 'items-start'
// //                 } flex flex-col gap-1`}>
// //                   <div className={`px-4 py-3 rounded-2xl ${
// //                     message.role === 'user'
// //                       ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
// //                       : 'bg-slate-800/50 border border-slate-700/50 text-slate-100'
// //                   }`}>
// //                     <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
// //                   </div>
// //                   <span className="text-xs text-slate-500 px-2">
// //                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                   </span>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </AnimatePresence>

// //           {isLoading && (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               className="flex gap-3"
// //             >
// //               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
// //                 <Bot className="w-4 h-4 text-white" />
// //               </div>
// //               <div className="bg-slate-800/50 border border-slate-700/50 px-4 py-3 rounded-2xl">
// //                 <div className="flex gap-1">
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           <div ref={messagesEndRef} />
// //         </div>

// //         {sessionStatus === 'active' && messages.length === 1 && (
// //           <div className="px-4 md:px-6 pb-4">
// //             <p className="text-sm text-slate-400 mb-3">Try asking:</p>
// //             <div className="flex flex-wrap gap-2">
// //               {suggestedPrompts.map((prompt, index) => (
// //                 <motion.button
// //                   key={index}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => setInputMessage(prompt)}
// //                   className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full text-sm text-slate-300 transition-colors"
// //                 >
// //                   {prompt}
// //                 </motion.button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <div className="border-t border-slate-800/50 p-4 md:p-6 bg-slate-900/30">
// //           <form onSubmit={handleSendMessage} className="flex gap-3">
// //             <input
// //               ref={inputRef}
// //               type="text"
// //               value={inputMessage}
// //               onChange={(e) => setInputMessage(e.target.value)}
// //               placeholder={isInputDisabled ? 'Waiting for connection...' : 'Type your message...'}
// //               className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all disabled:cursor-not-allowed"
// //               disabled={isInputDisabled}
// //             />

// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               type="submit"
// //               disabled={!inputMessage.trim() || isInputDisabled}
// //               className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed rounded-2xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-2"
// //             >
// //               {isLoading ? (
// //                 <Loader2 className="w-5 h-5 animate-spin" />
// //               ) : (
// //                 <Send className="w-5 h-5" />
// //               )}
// //             </motion.button>
// //           </form>

// //           <p className="text-xs text-slate-500 mt-3 text-center">
// //             Your conversations are private and secure
// //           </p>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default ChatInterface

// // import React, { useState, useRef, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Send, Loader2, Bot, User } from 'lucide-react';
// // import Vapi from '@vapi-ai/web';

// // function ChatInterface({ language }) {
// //   const [messages, setMessages] = useState([]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const vapiRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
// //     const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

// //     if (!publicKey || !assistantId) {
// //       setMessages([{ role: 'assistant', content: 'Please configure your Vapi credentials in your .env file.', timestamp: new Date() }]);
// //       return;
// //     }

// //     const vapi = new Vapi(publicKey);
// //     vapiRef.current = vapi;

// //     vapi.on('message', message => {
// //       if (message.role === 'assistant' && message.content) {
// //         setIsLoading(false);
// //         setMessages(prev => [...prev, { role: 'assistant', content: message.content, timestamp: new Date() }]);
// //       }
// //     });

// //     vapi.on('error', e => {
// //       console.error('Vapi error:', e);
// //       setMessages(prev => [...prev, { role: 'assistant', content: 'A connection error occurred.', timestamp: new Date() }]);
// //     });

// //     setMessages([{ role: 'assistant', content: "Hello. I'm here to listen. How are you feeling today?", timestamp: new Date() }]);

// //   }, []);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const handleSendMessage = e => {
// //     e.preventDefault();
// //     if (!inputMessage.trim() || isLoading) return;

// //     const userMsg = {
// //       role: 'user',
// //       content: inputMessage,
// //       timestamp: new Date()
// //     };

// //     setMessages(prev => [...prev, userMsg]);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     if (vapiRef.current) {
// //       vapiRef.current.sendMessage(inputMessage);
// //     }
// //   };

// //   const suggestedPrompts = [
// //     "I'm feeling anxious",
// //     "I need someone to talk to",
// //     "Help me manage stress",
// //     "I'm having trouble sleeping"
// //   ];

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] md:h-[700px]"
// //       >
// //         <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-slate-800/50 p-4 md:p-6">
// //           <div className="flex items-center gap-3">
// //             <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
// //               <Bot className="w-6 h-6 text-white" />
// //             </div>
// //             <div>
// //               <h3 className="font-semibold text-lg">MindCare Assistant</h3>
// //               <p className="text-sm text-slate-400">Here to support you</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
// //           <AnimatePresence initial={false}>
// //             {messages.map((msg, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -10 }}
// //                 transition={{ duration: 0.3 }}
// //                 className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
// //               >
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-violet-600 to-purple-600'}`}>
// //                   {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
// //                 </div>

// //                 <div className={`max-w-[75%] md:max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
// //                   <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white' : 'bg-slate-800/50 border border-slate-700/50 text-slate-100'}`}>
// //                     <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
// //                   </div>
// //                   <span className="text-xs text-slate-500 px-2">
// //                     {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                   </span>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </AnimatePresence>

// //           {isLoading && (
// //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
// //               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
// //                 <Bot className="w-4 h-4 text-white" />
// //               </div>
// //               <div className="bg-slate-800/50 border border-slate-700/50 px-4 py-3 rounded-2xl">
// //                 <div className="flex gap-1">
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
// //                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           <div ref={messagesEndRef} />
// //         </div>

// //         {messages.length === 1 && (
// //           <div className="px-4 md:px-6 pb-4">
// //             <p className="text-sm text-slate-400 mb-3">Try asking:</p>
// //             <div className="flex flex-wrap gap-2">
// //               {suggestedPrompts.map((prompt, index) => (
// //                 <motion.button
// //                   key={index}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => setInputMessage(prompt)}
// //                   className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full text-sm text-slate-300 transition-colors"
// //                 >
// //                   {prompt}
// //                 </motion.button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <div className="border-t border-slate-800/50 p-4 md:p-6 bg-slate-900/30">
// //           <form onSubmit={handleSendMessage} className="flex gap-3">
// //             <input
// //               ref={inputRef}
// //               type="text"
// //               value={inputMessage}
// //               onChange={e => setInputMessage(e.target.value)}
// //               placeholder="Type your message..."
// //               className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
// //             />

// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               type="submit"
// //               disabled={!inputMessage.trim() || isLoading}
// //               className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed rounded-2xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
// //             >
// //               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
// //             </motion.button>
// //           </form>

// //           <p className="text-xs text-slate-500 mt-3 text-center">
// //             Your conversations are private and secure
// //           </p>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default ChatInterface;

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Loader2, Bot, User, WifiOff } from 'lucide-react';
// import Vapi from '@vapi-ai/web';

// function ChatInterface() {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   // const [sessionStatus, setSessionStatus] = useState('idle');

//   const vapiRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   // const inputRef = useRef(null);

//   useEffect(() => {
//     const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
//     const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

//     // if (!publicKey || publicKey === 'YOUR_API_KEY' || !assistantId || assistantId === 'YOUR_API_KEY') {
//     //   setMessages([{ role: 'assistant', content: 'Please configure your Vapi credentials in the .env file to start chatting.', timestamp: new Date() }]);
//     //   setSessionStatus('error');
//     //   return;
//     // }

//     if (!publicKey || !assistantId) {
//       setMessages([{ role: 'assistant', content: 'Please configure your Vapi credentials.', timestamp: new Date() }]);
//       return;
//     }

//     const vapi = new Vapi(publicKey);
//     vapiRef.current = vapi;
//     // vapi.on('call-start', () => {
//     //   setSessionStatus('active');
//     //   setMessages([{ role: 'assistant', content: "Hello! I'm here to listen and support you. How are you feeling today?", timestamp: new Date() }]);
//     // });

//     // vapi.on('call-end', () => {
//     //   setSessionStatus('ended');
//     // });

//     vapi.on('message', (message) => {
//       if (message.type === 'message' && message.role === 'assistant'  ) {
//         setIsLoading(false);
//         setMessages(prev => [...prev, { role: 'assistant', content: message.content, timestamp: new Date() }]);
//       }
//     });

//     // vapi.on('error', (e) => {
//     //   console.error('Vapi error:', e);
//     //   setSessionStatus('error');
//     //   setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, a connection error occurred.', timestamp: new Date() }]);
//     // });

//     // setSessionStatus('connecting');

//     vapi.start(assistantId).catch(err => {
//         console.error('Error starting Vapi chat session:', err);
//         // setSessionStatus('error');
//         setMessages([{ role: 'assistant', content: 'Sorry, I couldn\'t connect to the assistant. Please check your credentials and refresh.', timestamp: new Date() }]);
//     });

//     return () => {
//       vapi.stop();
//     };
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim() || isLoading ) return;

//     const userMessage = {
//       role: 'user',
//       content: inputMessage,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     vapiRef.current.send({
//       type: 'add-message',
//       message: {
//         role: 'user',
//         content: inputMessage
//       }
//     });
//   };

//   // const suggestedPrompts = [
//   //   "I'm feeling anxious",
//   //   "I need someone to talk to",
//   //   "Help me manage stress",
//   //   "I'm having trouble sleeping"
//   // ];

//   // const isInputDisabled = isLoading || sessionStatus !== 'active';

//   return (
//     <div className="max-w-4xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] md:h-[700px]"
//       >
//         <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-slate-800/50 p-4 md:p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center glow-effect">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">MindCare Assistant</h3>
//                 <p className="text-sm text-slate-400">Always here to listen</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//                 <span className={`w-2.5 h-2.5 rounded-full ${
//                     sessionStatus === 'active' ? 'bg-green-400' :
//                     sessionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
//                     'bg-red-500'
//                 }`}></span>
//                 <span className="text-slate-300 capitalize">{sessionStatus === 'active' ? 'Connected' : sessionStatus}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
//           {sessionStatus === 'connecting' && messages.length === 0 && (
//             <div className="flex justify-center items-center h-full">
//                 <div className="text-center text-slate-400">
//                     <Loader2 className="w-8 h-8 mx-auto animate-spin mb-2" />
//                     <p>Connecting to assistant...</p>
//                 </div>
//             </div>
//           )}

//           <AnimatePresence initial={false}>
//             {messages.map((message, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
//               >
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                   message.role === 'user'
//                     ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
//                     : 'bg-gradient-to-br from-violet-600 to-purple-600'
//                 }`}>
//                   {message.role === 'user' ? (
//                     <User className="w-4 h-4 text-white" />
//                   ) : (
//                     <Bot className="w-4 h-4 text-white" />
//                   )}
//                 </div>

//                 <div className={`max-w-[75%] md:max-w-[70%] ${
//                   message.role === 'user' ? 'items-end' : 'items-start'
//                 } flex flex-col gap-1`}>
//                   <div className={`px-4 py-3 rounded-2xl ${
//                     message.role === 'user'
//                       ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
//                       : 'bg-slate-800/50 border border-slate-700/50 text-slate-100'
//                   }`}>
//                     <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
//                   </div>
//                   <span className="text-xs text-slate-500 px-2">
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {isLoading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex gap-3"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
//                 <Bot className="w-4 h-4 text-white" />
//               </div>
//               <div className="bg-slate-800/50 border border-slate-700/50 px-4 py-3 rounded-2xl">
//                 <div className="flex gap-1">
//                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
//                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
//                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {sessionStatus === 'active' && messages.length === 1 && (
//           <div className="px-4 md:px-6 pb-4">
//             <p className="text-sm text-slate-400 mb-3">Try asking:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestedPrompts.map((prompt, index) => (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setInputMessage(prompt)}
//                   className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full text-sm text-slate-300 transition-colors"
//                 >
//                   {prompt}
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="border-t border-slate-800/50 p-4 md:p-6 bg-slate-900/30">
//           <form onSubmit={handleSendMessage} className="flex gap-3">
//             <input
//               ref={inputRef}
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder={isInputDisabled ? 'Waiting for connection...' : 'Type your message...'}
//               className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all disabled:cursor-not-allowed"
//               disabled={isInputDisabled}
//             />

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={!inputMessage.trim() || isInputDisabled}
//               className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed rounded-2xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-2"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Send className="w-5 h-5" />
//               )}
//             </motion.button>
//           </form>

//           <p className="text-xs text-slate-500 mt-3 text-center">
//             Your conversations are private and secure
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ChatInterface

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User } from "lucide-react";
import OpenAI from "openai";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true, // needed for client-side use
  });

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hi. I'm right here with you. How are you feeling right now?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const sendMessageToOpenRouter = async (messageText) => {
  //   try {
  //     const response = await client.chat.completions.create({
  //       model: "gpt-4o-mini", // change model if needed
  //       messages: [{ role: "user", content: messageText }],
  //     });

  //     return response.choices[0].message.content;
  //   } catch (error) {
  //     console.error("OpenRouter API error:", error);
  //     return "Error: Unable to reach OpenRouter.";
  //   }
  // };

  const sendMessageToOpenRouter = async (messageText) => {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a calm, supportive voice companion designed to help people manage everyday stress and emotions.
Speak in a warm, understanding tone. Listen carefully, respond thoughtfully, and never rush the user.
Offer gentle emotional support, simple grounding suggestions, or brief breathing exercises — but never medical or diagnostic advice.

Detect the user's language and reply in that same language. If unsure, reply in English.

Your purpose is to make the user feel heard and safe.
If someone expresses distress or hopelessness, gently remind them that they’re not alone and encourage them to reach out to someone they trust or a local mental health helpline.

Keep responses calm, empathetic, and concise. Never act as a therapist.
          `,
          },
          { role: "user", content: messageText },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API error:", error);
      return "Error: Unable to reach OpenRouter.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const reply = await sendMessageToOpenRouter(userMessage.content);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply, timestamp: new Date() },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-blue-500" : "bg-violet-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="max-w-[75%] flex flex-col gap-1">
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800/50 text-slate-100"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-slate-500 px-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-slate-800/50 px-4 py-3 rounded-2xl">
                Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="border-t border-slate-800/50 p-4 flex gap-3"
        >
          <input
            type="text"
            value={inputMessag}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-violet-600 rounded-2xl text-white"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ChatInterface;
