import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-800/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3 text-slate-200">MindCare AI</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">About Us</Link></li>
              <li><Link to="/features" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Features</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-slate-200">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">FAQ</Link></li>
              <li><a href="mailto:support@mindcare.ai" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-slate-200">Legal</h3>
            <ul className="space-y-2">
              <li><p className="text-sm text-slate-500 cursor-pointer">Privacy Policy</p></li>
              <li><p className="text-sm text-slate-500 cursor-pointer">Terms of Service</p></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-slate-200">Get Started</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-8 mt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2025 MindCare AI. Powered by Vapi AI. Not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer