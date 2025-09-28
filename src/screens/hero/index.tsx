import { motion } from "motion/react";

function Hero() {
  return (
    <motion.div
      className="hero relative bg-purple-200 p-8 rounded-2xl text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Kick Your Stress Away!
      </motion.h1>

      <motion.button
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:shadow-lg transition-all duration-300"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/targets")}
      >
        Start Kicking 🚀
      </motion.button>
      {/* Floating bubbles */}
      <motion.div
        className="absolute top-4 left-4 w-8 h-8 bg-white/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-8 right-8 w-6 h-6 bg-white/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-6 left-12 w-4 h-4 bg-white/50 rounded-full"
        animate={{
          y: [0, -12, 0],
          x: [0, 6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full"
        animate={{
          y: [0, -25, 0],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
    </motion.div>
  );
}

export default Hero;
