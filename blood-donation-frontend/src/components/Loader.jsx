import React from "react";
import { motion } from "framer-motion";
import { Heart, Droplet } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center py-16 gap-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-20 w-20 rounded-full border-8 border-transparent bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-xl"
        />
        
        <div className="relative h-20 w-20 rounded-full border-8 border-red-200 dark:border-red-900/50 border-t-red-600 dark:border-t-red-500 shadow-2xl">
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-red-400/30 dark:border-red-600/30" />
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Droplet className="h-10 w-10 text-red-600 dark:text-red-400" fill="currentColor" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <Heart className="h-6 w-6 text-red-600 dark:text-red-400 fill-current animate-pulse" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Finding available donors...
          </span>
          <Heart className="h-6 w-6 text-red-600 dark:text-red-400 fill-current animate-pulse" />
        </motion.div>

        <div className="flex gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="h-3 w-3 bg-red-500 dark:bg-red-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}