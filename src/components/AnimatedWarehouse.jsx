import React from 'react';
import { motion } from 'framer-motion';

const AnimatedWarehouse = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Simple animated warehouse illustration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Warehouse Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl"
        >
          🏭
        </motion.div>
      </motion.div>

      {/* Floating boxes */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-10 top-10 text-4xl"
      >
        📦
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute right-10 top-16 text-4xl"
      >
        📦
      </motion.div>

      {/* Moving truck */}
      <motion.div
        animate={{ x: [-100, 100] }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute bottom-0 text-4xl"
      >
        🚚
      </motion.div>
    </div>
  );
};

export default AnimatedWarehouse;
