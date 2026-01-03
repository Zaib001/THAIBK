"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TranslationResult {
  thai: string;
  romanized: string;
  english: string;
}

interface TranslationBoxProps {
  data: TranslationResult | null;
  isLoading?: boolean;
}

export default function TranslationBox({ data, isLoading }: TranslationBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeak = async (textToSpeak: string) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      const res = await fetch("/api/sola/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          lang: "th"
        }),
      });

      if (!res.ok) throw new Error("TTS Failed");

      const data = await res.json();
      const audioSrc = `data:audio/mpeg;base64,${data.audio_base64}`;
      const audio = new Audio(audioSrc);

      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (e) {
      console.error("Audio playback error", e);
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "th-TH";
        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8 bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-white/40 shadow-inner">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-2 border-r-2 border-[#3B3A36] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#3B3A36]/10 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#3B3A36] font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Interpreting</p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-[#3B3A36] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-12 text-center bg-white/20 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-[#E8E3D9]">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-[#E8E3D9]/50 rounded-full flex items-center justify-center mb-8 shadow-inner"
        >
          <svg className="w-10 h-10 text-[#3B3A36]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </motion.div>
        <h3 className="text-[#3B3A36] font-serif uppercase tracking-[0.2em] text-lg mb-2">Awaiting Input</h3>
        <p className="text-[#3B3A36]/30 text-xs font-medium tracking-widest uppercase">Type or speak above to begin</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.thai}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col space-y-6"
      >
        {/* Romanized (Gold Ribbon Style) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <span className="px-5 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-[0.15em] rounded-full border border-[#D4AF37]/20 uppercase">
            {data.romanized}
          </span>
        </motion.div>

        {/* Thai Card (Primary focus) */}
        <div className="group relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 border border-white shadow-[0_20px_40px_-15px_rgba(59,58,54,0.05)] text-center relative overflow-hidden group-hover:shadow-[0_25px_50px_-12px_rgba(59,58,54,0.1)] transition-all duration-700"
          >
            {/* Subtle Gold Pulse in corner */}
            <div className="absolute top-0 right-0 p-1">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_10px_#D4AF37]" />
            </div>

            <p className="text-4xl md:text-6xl font-bold text-[#3B3A36] leading-[1.4] font-noto-thai">
              {data.thai}
            </p>

            {/* Float-up Actions */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <button
                onClick={() => handleSpeak(data.thai)}
                disabled={isPlaying}
                className="w-12 h-12 bg-[#3B3A36] text-[#F4F1EC] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#3B3A36]/30 disabled:opacity-50"
              >
                {isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                  />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828 2.828a9 9 0 010-12.728" /></svg>
                )}
              </button>
              <button
                onClick={() => handleCopy(data.thai)}
                className="w-12 h-12 bg-white text-[#3B3A36] border border-[#E8E3D9] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* English Translation (Subtle Card) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex-1 bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 border border-white/40 shadow-sm flex items-center justify-center text-center"
        >
          <div>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-[#3B3A36]/30 mb-4 font-bold">Meaning</span>
            <p className="text-[#3B3A36] text-xl md:text-2xl leading-relaxed font-medium italic">
              “{data.english}”
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}