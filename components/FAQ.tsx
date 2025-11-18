"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "./data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-amanSand">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-center text-4xl mb-16 uppercase tracking-wide">
          FAQ
        </h2>

        <div className="space-y-6">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-amanCharcoal/20">
              <button
                className="w-full text-left px-6 py-4 text-xl flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <span>{open === i ? "-" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-4 opacity-80 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
