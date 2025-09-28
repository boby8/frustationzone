import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { BackgroundEffects } from "./auth/BackgroundEffects";
import { FrustrationBanner } from "./auth/FrustrationBanner";
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
          <FrustrationBanner />

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
