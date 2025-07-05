import React from "react";
import { motion } from "framer-motion";
import "../index.css";

export default function TeddyAnimation() {
  return (
    <div className="teddy-container">
      <motion.div
        className="teddy-wrapper"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        {/* 🧸 Teddy bear image */}
        <motion.img
          src="/images/cute_teddy.png" // 📝 သင်ပုံတင်ထားတဲ့နာမည်နဲ့အတူ
          alt="Teddy Bear"
          className="teddy-img"
          animate={{
            rotate: [0, -2, 2, -2, 0], // ✅ Head tilt
            y: [0, 2, -2, 2, 0],       // ✅ Swing
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* 👋 Paw wave */}
        <motion.div
          className="teddy-paw"
          animate={{
            rotate: [0, 20, -20, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 4,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          👋
        </motion.div>
      </motion.div>
    </div>
  );
            }
