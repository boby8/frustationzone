import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const targets = [
  { id: "boss", name: "Boss", avatar: "👔", color: "bg-red-100" },
  { id: "client", name: "Client", avatar: "💼", color: "bg-blue-100" },
  { id: "monday", name: "Monday", avatar: "😴", color: "bg-gray-100" },
  { id: "exams", name: "Exams", avatar: "📚", color: "bg-yellow-100" },
  { id: "traffic", name: "Traffic", avatar: "🚗", color: "bg-orange-100" },
  { id: "ex", name: "Ex", avatar: "💔", color: "bg-pink-100" },
  { id: "taxes", name: "Taxes", avatar: "💰", color: "bg-green-100" },
  { id: "bugs", name: "Bugs", avatar: "🐛", color: "bg-purple-100" },
];

function TargetsPage() {
  const navigate = useNavigate();
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Choose Your Target 🎯
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Who's getting the boot today?
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {targets.map((target, index) => (
            <motion.button
              key={target.id}
              className={`p-6 rounded-2xl ${
                target.color
              } border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                selectedTarget === target.id
                  ? "border-red-500 shadow-xl scale-105"
                  : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => {
                setSelectedTarget(target.id);
                setTimeout(() => navigate(`/action/${target.id}`), 300);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">{target.avatar}</div>
              <div className="text-lg font-semibold text-gray-800">
                {target.name}
              </div>
            </motion.button>
          ))}
        </div>

        {selectedTarget && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-gray-600">
              Great choice! Let's kick some{" "}
              {targets.find((t) => t.id === selectedTarget)?.name.toLowerCase()}
              ! 🚀
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default TargetsPage;
