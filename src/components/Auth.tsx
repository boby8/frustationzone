import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { BackgroundEffects } from "./auth/BackgroundEffects";
import { AuthForm } from "./auth/AuthForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleAuth,
    clearError,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await handleAuth(isLogin);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8 relative overflow-hidden">
      <BackgroundEffects />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel - Light & Chilling */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative p-12 h-full flex flex-col justify-center">
              {/* Main Title */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.h1
                  className="text-6xl font-bold text-slate-800 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Frustration
                  </span>
                  <br />
                  <span className="text-4xl text-slate-700">Zone</span>
                </motion.h1>
                <motion.p
                  className="text-xl text-slate-600 max-w-md leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  Take a deep breath, relax, and let's make your day better
                  together.
                </motion.p>
              </motion.div>

              {/* Chilling Elements */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-semibold">
                      Breathe Easy
                    </h4>
                    <p className="text-slate-600 text-sm">Relax and unwind</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">☁️</span>
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-semibold">Stay Calm</h4>
                    <p className="text-slate-600 text-sm">
                      Peaceful environment
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-semibold">Feel Good</h4>
                    <p className="text-slate-600 text-sm">
                      Positive vibes only
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <AuthForm
            isLogin={isLogin}
            email={email}
            password={password}
            loading={loading}
            error={error}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onToggleMode={toggleMode}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
