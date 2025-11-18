"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 500], [0, 22]); // subtle parallax float

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[92vh] overflow-hidden rounded-3xl"
    >

      {/* Background Video with slow zoom */}
      <motion.video
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="/Feedback_04.mp4"
      />

      {/* Depth Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/50" /> */}

      {/* Main Content */}
      



      {/* Floating Card 2 */}
      <motion.div
        style={{ y: floatY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 1.7, ease: "easeOut" }}
        className="absolute bottom-24 right-20 backdrop-blur-2xl bg-white/10 border border-white/25 rounded-2xl p-6 w-[190px] shadow-xl text-center"
      >
        <p className="text-xs uppercase tracking-widest text-white/70">
          New Members
        </p>
        <p className="text-4xl font-light text-white">162</p>
        <p className="text-xs text-white/60 mt-1">This Month</p>
      </motion.div>

      {/* Trusted Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.4 }}
        className="absolute bottom-6 w-full text-center text-white/70 text-xs tracking-wider"
      >
        Trusted by new residents, long-term expats, students, remote workers, and families.
      </motion.div>

    </section>
  );
}
