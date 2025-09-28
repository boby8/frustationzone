import { motion } from "motion/react";

export const FrustrationBanner = () => {
  return (
    <motion.div
      className="hidden lg:block relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="relative h-full flex items-center justify-center">
        {/* Radial Burst Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400 opacity-80"></div>
          {/* Radial stripes */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  background: `conic-gradient(from ${
                    i * 30
                  }deg, transparent 0deg, rgba(59, 130, 246, 0.3) 15deg, transparent 30deg)`,
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Frustration Zone Banner */}
        <motion.div
          className="relative z-10 transform rotate-3"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 px-12 py-8 rounded-2xl shadow-2xl border-4 border-purple-700 relative">
            {/* 3D Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl transform translate-x-1 translate-y-1 -z-10"></div>

            {/* Text */}
            <div className="text-center">
              <motion.h1
                className="text-5xl font-black text-white mb-2 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                FRUSTRATION
              </motion.h1>
              <motion.h2
                className="text-4xl font-black text-white tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                ZONE
              </motion.h2>
            </div>

            {/* Warning/Comic Style Elements */}
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-white text-sm font-bold">!</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-white text-xs">⚡</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};
