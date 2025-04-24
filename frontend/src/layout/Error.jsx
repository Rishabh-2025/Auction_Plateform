import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200 text-center p-4">
      <motion.img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" // 404 GIF
        alt="404 Not Found"
        className="w-80 h-80 object-contain mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-5xl font-bold text-[#0099A8] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! Page not found.
      </motion.h1>

      <motion.p
        className="text-gray-700 mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      <motion.button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#0099A8] text-white rounded-2xl shadow-md hover:shadow-lg hover:bg-[#007c8a] transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go back to Home
      </motion.button>
    </div>
  );
};

export default Error;
