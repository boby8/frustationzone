import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui";

function Hero() {
  const navigate = useNavigate();
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [selectedMood, setSelectedMood] = useState("😡");

  const moods = ["😡", "😩", "😱", "🤯", "😤", "😵", "🙊"];

  const sampleFrustrations = [
    "Monday morning blues",
    "Code that won't cooperate",
    "Traffic that never moves",
    "Coffee machine rebellion",
    "Meetings that could be emails",
    "Technology acting up",
    "Deadlines chasing you",
    "Weather ruining plans",
    "Slow internet connection",
    "Forgetting where you put things",
  ];

  const handleLogoClick = () => {
    setLogoClicks((prev) => prev + 1);
    if (logoClicks >= 4) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 cursor-pointer"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Frustration Zone
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Release your stress, kick your problems, and find your inner peace
            </motion.p>
          </motion.div>

          {/* Mood Selector */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              How frustrated are you today?
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`text-3xl p-3 rounded-full transition-all duration-300 ${
                    selectedMood === mood
                      ? "bg-purple-500 scale-110 shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/targets")}
              icon="rocket"
            >
              Start Kicking
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/todos")}
              icon="plus"
            >
              Manage Tasks
            </Button>
          </motion.div>

          {/* Sample Frustrations Carousel */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              Popular frustrations to kick:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {sampleFrustrations.map((frustration, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigate("/targets")}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 hover:bg-purple-600/50 hover:text-white transition-all duration-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {frustration} 💢
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-2xl font-bold text-purple-400 mb-2">
                🔥 5,423
              </p>
              <p className="text-gray-300">frustrations kicked today!</p>
              <p className="text-sm text-gray-400 mt-2">
                Join the stress-busting movement
              </p>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-300 italic mb-2">
                "I kicked my Monday blues away and found my smile again."
              </p>
              <p className="text-sm text-gray-400">- Anonymous Stress Buster</p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p className="text-xl text-gray-300 mb-4">
              Still frustrated? What are you waiting for?
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/targets")}
              icon="rocket"
              className="text-2xl px-8 py-4"
            >
              Kick it already! 👟
            </Button>
          </motion.div>
        </div>

        {/* Easter Egg */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-purple-600 text-white p-8 rounded-2xl text-center max-w-md mx-4">
                <h3 className="text-2xl font-bold mb-4">🎉 Secret Unlocked!</h3>
                <p className="text-lg mb-4">
                  You've discovered the hidden frustration avatar!
                </p>
                <div className="text-6xl mb-4">🤖💥</div>
                <p className="text-sm">Keep clicking for more surprises!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Hero;
