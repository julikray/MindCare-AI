import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, HelpCircle, Mail } from 'lucide-react';
import { Accordion, AccordionItem } from '../components/Accordion';


function SupportPage()  {
  const faqs = [
    {
      question: 'Is MindCare AI a replacement for a therapist?',
      answer: 'No. MindCare AI is designed to be a supportive tool for mental wellness but is not a substitute for professional medical advice, diagnosis, or treatment from a qualified healthcare provider.'
    },
    {
      question: 'Are my conversations private?',
      answer: 'Yes, absolutely. We prioritize your privacy. Conversations are processed in real-time and are not stored. Your interactions are anonymous and confidential.'
    },
    {
      question: 'How does the voice assistant work?',
      answer: 'Our voice assistant uses advanced AI from Vapi to understand and respond to you in a natural, conversational way. Simply start a call and speak as you normally would.'
    },
    // {
    //   question: 'What languages are supported?',
    //   answer: 'We support over 10 languages, including English, Spanish, French, German, Chinese, and more.'
    // },
    {
      question: 'I\'m having a technical issue, what should I do?',
      answer: 'If you encounter any technical problems, please try refreshing the page.'
    }
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
            Support &
            <span className="text-gradient"> Resources</span>
          </h1>
          <p className="text-lg text-slate-400">
            Find answers to your questions and learn how to get help.
          </p>
        </div>

        <div className="space-y-12">
          <div className="p-6 bg-red-900/20 border border-red-800/50 rounded-2xl">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-red-300">In Case of Emergency</h2>
                <p className="text-red-300/80 mt-1">
                  If you are in a crisis or any other person may be in danger, please do not use this site. Contact a crisis hotline or your local emergency services immediately.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-violet-400" />
              Frequently Asked Questions
            </h2>
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} title={faq.question}>
                  <p>{faq.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-7 h-7 text-violet-400" />
              Contact Us
            </h2>
            <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
              <p className="text-slate-300">
                For technical support, feedback, or other inquiries, please feel free to reach out to our team.
              </p>
              <a 
                href="mailto:support@mindcare.ai" 
                className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
              >
                Email Support
              </a>
            </div>
          </div> */}

        </div>
      </div>
    </motion.div>
  );
};


export default SupportPage