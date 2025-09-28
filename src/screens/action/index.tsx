import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const actions = [
  { id: "kick", name: "Kick", emoji: "👟", color: "bg-red-500" },
  { id: "roast", name: "Roast", emoji: "🍅", color: "bg-orange-500" },
  { id: "punch", name: "Punch", emoji: "👊", color: "bg-blue-500" },
  { id: "scream", name: "Scream", emoji: "😱", color: "bg-purple-500" },
  { id: "throw", name: "Throw", emoji: "💥", color: "bg-yellow-500" },
  { id: "dance", name: "Dance", emoji: "💃", color: "bg-pink-500" },
];

interface ActionPageProps {
  target: {
    id: string;
    name: string;
    avatar: string;
    color: string;
  };
  onActionComplete: (action: string) => void;
  onBack: () => void;
}

function ActionPage({ target, onActionComplete, onBack }: ActionPageProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleAction = (action: (typeof actions)[0]) => {
    setIsAnimating(true);
    setLastAction(action.id);

    setTimeout(() => {
      setIsAnimating(false);
      onActionComplete(action.id);
    }, 500); // Reduced time for faster feedback
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="mb-8 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Targets
        </motion.button>

        {/* Target Display */}
        <motion.div
          className={`${target.color} p-8 rounded-3xl text-center mb-12 relative overflow-hidden`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={
              isAnimating
                ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            {target.avatar}
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {target.name}
          </h2>

          <p className="text-lg text-gray-600">Choose your weapon of choice!</p>

          {/* Action effects overlay */}
          <AnimatePresence>
            {isAnimating && lastAction && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-6xl"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    rotate: [0, 360],
                    y: [0, -50, 0],
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {actions.find((a) => a.id === lastAction)?.emoji}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              className={`${action.color} p-6 rounded-2xl text-white font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50`}
              onClick={() => handleAction(action)}
              disabled={isAnimating}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-2">{action.emoji}</div>
              <div>{action.name}</div>
            </motion.button>
          ))}
        </div>

        {/* Action feedback */}
        <AnimatePresence>
          {isAnimating && lastAction && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-2xl font-bold text-gray-800">
                {actions.find((a) => a.id === lastAction)?.name}ing{" "}
                {target.name}... 💥
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Actions Message */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-gray-600">
            Keep going! You can perform as many actions as you want.
            <br />
            <span className="text-sm text-gray-500">
              Each action will be logged in your activity feed.
            </span>
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => (window.location.href = "/activity")}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Activity Feed
          </motion.button>

          <motion.button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Choose Different Target
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ActionPage;
