"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { sections } from "./data/data";

export default function ParallelScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Watch scroll and update which section is "active"
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (sections.length <= 1) return;
    const idx = Math.round(value * (sections.length - 1));
    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#111] text-white py-20 md:py-40"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-6">

        {/* LEFT COLUMN – TEXT SCROLLS NORMALLY */}
        <div className="space-y-20 md:space-y-0">
          {sections.map((item, idx) => (
            <div
              key={idx}
              className="min-h-[70vh] md:min-h-screen flex flex-col justify-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-base md:text-lg opacity-80"
              >
                {item.text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN – STICKY IMAGE WITH FADE + SCALE */}
        <div className="relative md:sticky md:top-28 h-[40vh] sm:h-[50vh] md:h-[70vh]">
          {sections.map((item, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0"
              animate={{
                opacity: currentIndex === idx ? 1 : 0,
                scale: currentIndex === idx ? 1 : 0.95,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                priority={idx === 0}
                className="object-cover rounded-xl shadow-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
