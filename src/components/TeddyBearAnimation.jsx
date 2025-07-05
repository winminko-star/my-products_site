import React from "react"; import { motion, useAnimation } from "framer-motion"; import { useEffect } from "react";

export default function TeddyBearAnimation() { const controls = useAnimation();

useEffect(() => { const sequence = async () => { // Start: fade-in + slight zoom await controls.start({ opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" }, });

// Loop: swing + head tilt + blink
  while (true) {
    await controls.start({ rotate: -5, transition: { duration: 0.8 } });
    await controls.start({ rotate: 5, transition: { duration: 0.8 } });
  }
};

sequence();

}, [controls]);

return ( <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "30px 0", }} > <motion.img src="/images/fried_rice.png" // ✅ Replace with teddy image path alt="Teddy Bear" initial={{ opacity: 0, scale: 0.9 }} animate={controls} style={{ width: "140px", height: "auto", borderRadius: "20px", }} /> </div> ); }

  
