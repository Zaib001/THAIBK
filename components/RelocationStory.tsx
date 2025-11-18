"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useInView } from "framer-motion";

// Define types
interface Step {
  image: string;
  title: string;
  text: string;
}

interface StepComponentProps {
  step: Step;
  index: number;
  totalSteps: number;
}

// Use local images instead
const steps: Step[] = [
  {
    image: "/images/packing-moving.jpg",
    title: "Packing & Moving",
    text: "Every journey begins with a decision to go. We make the first steps smooth."
  },
  {
    image: "/images/arrival-thailand.jpg", 
    title: "Arrival in Thailand",
    text: "Step into warm air, slow light, and a new rhythm of life."
  },
  {
    image: "/images/finding-home.jpg",
    title: "Finding Your Home",
    text: "From condos to villas — the right space helps life settle."
  },
  {
    image: "/images/receiving-keys.jpg",
    title: "Receiving The Keys",
    text: "A small moment — a big shift. This is where your story roots."
  },
];

function StepComponent({ step, index, totalSteps }: StepComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative mb-16 last:mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Side with Parallax */}
        <motion.div 
          style={{ y }}
          className={`flex-1 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
        >
          <motion.div 
            style={{ scale }}
            className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
          >
            <Image
              src={step.image}
              width={600}
              height={400}
              alt={step.title}
              className="w-full h-[300px] md:h-[400px] object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/5"></div>
            
            {/* Step Number Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3, type: "spring" }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-amanCharcoal text-amanLinen rounded-full flex items-center justify-center text-xl font-semibold shadow-lg border-4 border-white"
            >
              {index + 1}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          className={`flex-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} space-y-6`}
        >
          <div className="text-center md:text-left">
            <motion.span 
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              className="inline-block px-4 py-2 bg-amanCharcoal/10 text-amanCharcoal rounded-full text-sm font-medium mb-4"
            >
              Step {index + 1}
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              className="text-3xl md:text-4xl font-light tracking-wide text-amanCharcoal mb-6 leading-tight"
            >
              {step.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.9 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
              className="text-xl text-gray-700 leading-relaxed opacity-90"
            >
              {step.text}
            </motion.p>
          </div>
          
          {/* Decorative Element */}
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
            className="flex items-center gap-4 pt-4"
          >
            <div className="w-12 h-0.5 bg-amanCharcoal/30"></div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.9 }}
              className="text-sm text-gray-500 font-medium"
            >
              {index === totalSteps - 1 ? "Your journey begins" : "Your journey continues"}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-6 h-6 bg-amanCharcoal rounded-full border-4 border-white shadow-lg hidden md:block"
      />
    </motion.div>
  );
}

export default function RelocationStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.8]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity }}
      className="py-28 bg-amanLinen relative overflow-hidden"
    >
      {/* Subtle Background Pattern with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amanCharcoal via-transparent to-amanCharcoal"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-amanCharcoal mb-6">
            Your Relocation Journey
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            From first steps to new beginnings — we guide you through every moment of your transition to Thailand.
          </motion.p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical Timeline Line with Scroll Progress */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amanCharcoal/10 hidden md:block">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-amanCharcoal/30 origin-top"
            />
          </div>
          
          {steps.map((step, index) => (
            <StepComponent 
              key={index} 
              step={step} 
              index={index} 
              totalSteps={steps.length} 
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-12 border-t border-amanCharcoal/10"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to begin your Thai adventure?
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amanCharcoal text-amanLinen px-8 py-4 rounded-lg hover:bg-amanCharcoal/90 transition-all duration-300 shadow-lg font-medium"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
} 