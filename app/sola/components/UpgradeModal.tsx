"use client";

import { motion, AnimatePresence } from "framer-motion";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#3B3A36]/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-[3rem] max-w-lg w-full overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-white/20"
          >
            {/* Sophisticated Header */}
            <div className="bg-[#3B3A36] p-12 text-center relative overflow-hidden">
              {/* Abstract Brass Circles */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[60px]" />
              <div className="absolute top-20 -left-10 w-40 h-40 bg-[#E8E3D9]/5 rounded-full blur-[40px]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#F4F1EC]/10 rounded-[1.5rem] flex items-center justify-center mb-6 border border-[#F4F1EC]/10 backdrop-blur-md">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-serif text-[#F4F1EC] mb-2 tracking-[0.2em] uppercase">THAIBK+</h2>
                <p className="text-[#F4F1EC]/40 text-[10px] font-bold tracking-[0.4em] uppercase">Evelating Your Journey</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-10 md:p-14 bg-[#F4F1EC]">
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-5xl font-serif text-[#3B3A36]">£5.99</span>
                  <span className="text-[#3B3A36]/40 font-bold text-xs tracking-widest uppercase">/ Monthly</span>
                </div>
                <p className="text-[#3B3A36]/60 text-sm font-medium leading-[1.8] max-w-[280px] mx-auto">
                  Expand your horizons with unlimited SOLA interpretations and exclusive relocation insights.
                </p>
              </div>

              {/* Premium Feature List */}
              <div className="space-y-4 mb-12">
                {[
                  "Unlimited SOLA Interpretations",
                  "Priority Multimodal STT/TTS",
                  "Early Access: Relocation Hub"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-4 px-6 py-4 bg-white/60 rounded-[1.25rem] border border-white shadow-sm">
                    <div className="w-5 h-5 bg-[#3B3A36]/5 rounded-full flex items-center justify-center border border-[#3B3A36]/10">
                      <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#3B3A36] text-xs font-bold tracking-wider uppercase">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Stack */}
              <div className="space-y-4">
                <button className="w-full bg-[#3B3A36] text-[#F4F1EC] px-8 py-5 rounded-[1.5rem] font-bold text-xs tracking-[0.25em] transition-all hover:bg-[#2C2B28] hover:shadow-2xl hover:shadow-[#3B3A36]/20 active:scale-[0.98] uppercase">
                  Begin Journey
                </button>
                <button
                  className="w-full text-[#3B3A36]/30 hover:text-[#3B3A36] transition-colors py-2 text-[10px] font-bold tracking-[0.3em] uppercase"
                  onClick={onClose}
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}