import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Header() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-colors ${
      isActive
        ? 'text-violet-400 font-semibold'
        : 'text-slate-300 hover:text-violet-400'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl glow-effect">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">MindCare AI</h1>
              <p className="text-xs text-slate-400">Your Mental Health Companion</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/features" className={navLinkClass}>
                Features
              </NavLink>
              <NavLink to="/support" className={navLinkClass}>
                Support
              </NavLink>
            </nav>
            {user ? (
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 rounded-xl font-semibold transition-all duration-300 text-sm text-white flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300 text-sm text-white"
              >
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header