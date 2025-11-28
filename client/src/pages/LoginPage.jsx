import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;  
    setIsSubmitting(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message);
        console.error(error);
      } else {
        toast.success("Check your inbox to confirm your account");
      }
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[70vh]"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl glow-effect group-hover:shadow-violet-500/50 transition-shadow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">MindCare AI</h1>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-slate-100">Get Started Free</h2>
            <p className="text-slate-400 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-5 h-5" />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </motion.button>

            <Link to="/login/email" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-white"
              >
                <LogIn className="w-5 h-5" />
                Login with Email
              </motion.button>
            </Link>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginPage;







