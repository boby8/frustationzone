import { motion } from "motion/react";
import { Button, Input, Card, Alert } from "../ui";

interface AuthFormProps {
  isLogin: boolean;
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

export const AuthForm = ({
  isLogin,
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
}: AuthFormProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Card
        className="w-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl"
        padding="lg"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-2xl font-bold text-white relative z-10">
              FZ
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-center text-slate-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {isLogin ? "Welcome Back" : "Join Us"}
        </motion.h1>

        <motion.p
          className="text-center text-slate-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {isLogin
            ? "Sign in to continue your peaceful journey"
            : "Create your account and start relaxing"}
        </motion.p>

        <form onSubmit={onSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <Input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="pl-12 py-4 text-lg border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/50"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="pl-12 py-4 text-lg border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/50"
              />
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert type="error">{error}</Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              loading={loading}
              fullWidth
              icon="rocket"
              className="py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            </Button>
          </motion.div>
        </form>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <p className="text-slate-600 text-lg">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors ml-2 underline decoration-2 underline-offset-4"
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};
