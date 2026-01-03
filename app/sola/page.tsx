"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MicButton from "./components/MicButton";
import TranslationBox from "./components/TranslationBox";
import UpgradeModal from "./components/UpgradeModal";
import LimitBadge from "./components/LimitBadge";

const ERROR_COPY = {
  unclear: {
    th: "ขอโทษนะคะ ฟังไม่ค่อยชัด ช่วยพูดใหม่ช้าๆ ได้ไหมคะ",
    en: "Sorry, I didn’t catch that — could you repeat slowly?"
  },
  ambiguous: {
    th: "อาจจะหมายความได้หลายแบบ ช่วยเล่าบริบทให้ฟังหน่อยได้ไหมคะ",
    en: "This could mean a few things — could you tell me the situation?"
  },
  rateLimit: {
    th: "คุณใช้สิทธิ์ครบจำนวนของวันนี้แล้ว อัปเกรดเป็น THAIBK+ เพื่อใช้งานไม่จำกัด",
    en: "You’ve reached today’s free limit. Upgrade to THAIBK+ for unlimited access."
  }
};

export default function SOLA() {
  // State
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"translate" | "learn">("translate");
  const [translationData, setTranslationData] = useState<{ thai: string, romanized: string, english: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const FREE_LIMIT = 5;

  const handleTranslate = async (textToTranslate: string = inputText) => {
    if (!textToTranslate.trim()) return;

    if (count >= FREE_LIMIT) {
      setErrorMsg(ERROR_COPY.rateLimit.en);
      setShowUpgrade(true);
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setTranslationData(null);

    try {
      const res = await fetch("/api/sola/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToTranslate, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429 || data.code === "RATE_LIMIT_EXCEEDED") {
          setErrorMsg(ERROR_COPY.rateLimit.en);
          setShowUpgrade(true);
        } else {
          throw new Error(data.error || "API Error");
        }
        return;
      }

      setTranslationData(data);
      setCount((prev: number) => prev + 1);

    } catch (error) {
      console.error("Translation failed:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = async (audioFile: File) => {
    setIsProcessing(true);
    setErrorMsg(null);

    if (count >= FREE_LIMIT) {
      setIsProcessing(false);
      setErrorMsg(ERROR_COPY.rateLimit.en);
      setShowUpgrade(true);
      return;
    }

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(audioFile);
      });

      const audio_base64 = await base64Promise;

      const res = await fetch("/api/sola/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio_base64 }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "RATE_LIMIT_EXCEEDED") {
          setErrorMsg(ERROR_COPY.rateLimit.en);
          setShowUpgrade(true);
          setIsProcessing(false);
          return;
        }
        throw new Error(data.error || "Speech API Error");
      }

      const transcribedText = data.text;
      if (!transcribedText) {
        setErrorMsg(ERROR_COPY.unclear.en);
        setIsProcessing(false);
        return;
      }

      setInputText(transcribedText);
      await handleTranslate(transcribedText);

    } catch (error) {
      console.error("Voice input failed:", error);
      setErrorMsg(ERROR_COPY.unclear.en);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#3B3A36] px-4 py-12 md:py-20 flex items-center justify-center selection:bg-[#3B3A36]/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        {/* Main Glass Container */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(59,58,54,0.1)] border border-white/50 overflow-hidden">

          <div className="p-8 md:p-16">
            {/* Elegant Header */}
            <header className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-serif tracking-[0.25em] text-[#3B3A36] mb-3">SOLA</h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-[#3B3A36]/20" />
                  <p className="text-[#3B3A36]/40 font-medium tracking-[0.3em] text-[10px] md:text-xs uppercase">
                    Self-Optimised Language Assistant
                  </p>
                  <div className="h-px w-8 bg-[#3B3A36]/20" />
                </div>
              </motion.div>

              {/* Sophisticated Mode Toggle */}
              <div className="mt-10 inline-flex bg-[#E8E3D9]/50 p-1.5 rounded-full border border-[#E8E3D9]/20 backdrop-blur-sm">
                {(["translate", "learn"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`relative px-8 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all duration-500 overflow-hidden ${mode === m
                      ? "text-[#F4F1EC] shadow-lg shadow-[#3B3A36]/20"
                      : "text-[#3B3A36]/40 hover:text-[#3B3A36]/60"
                      }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="activeMode"
                        className="absolute inset-0 bg-[#3B3A36]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{m.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </header>

            {/* Layout Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

              {/* Left Column: Input */}
              <div className="flex flex-col">
                <div className="relative group flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={mode === "translate" ? "Speak to translate..." : "Ask how to say..."}
                    className="w-full h-80 bg-white/50 border-2 border-[#E8E3D9]/50 rounded-[2.5rem] p-8 text-xl md:text-2xl leading-relaxed resize-none focus:border-[#3B3A36]/30 focus:ring-0 transition-all placeholder-[#3B3A36]/20 font-medium shadow-inner"
                    disabled={isProcessing}
                  />

                  {/* Premium Action Row */}
                  <div className="absolute bottom-8 right-8 flex items-center gap-4">
                    <AnimatePresence>
                      {inputText && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8, x: 10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: 10 }}
                          onClick={() => {
                            setInputText("");
                            setTranslationData(null);
                            setErrorMsg(null);
                          }}
                          className="p-4 bg-white/80 hover:bg-white rounded-full text-[#3B3A36]/30 hover:text-[#3B3A36] transition-all shadow-md group border border-white/50"
                        >
                          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <MicButton
                      onRecordingComplete={handleVoiceInput}
                      isProcessing={isProcessing}
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <button
                    onClick={() => handleTranslate()}
                    disabled={!inputText.trim() || isProcessing}
                    className="w-full relative group overflow-hidden bg-[#3B3A36] text-[#F4F1EC] py-6 rounded-[1.5rem] font-bold text-sm tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_-10px_rgba(59,58,54,0.3)] disabled:opacity-20 active:scale-[0.98]"
                  >
                    <span className="relative z-10">
                      {isProcessing ? "PROCESSING..." : mode === "translate" ? "INTERPRET" : "INQUIRE"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  </button>

                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-5 bg-red-500/5 text-red-600/80 rounded-2xl text-center text-xs font-semibold tracking-wider border border-red-500/10 backdrop-blur-sm uppercase"
                      >
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Output */}
              <div className="flex flex-col min-h-[400px]">
                <TranslationBox data={translationData} isLoading={isProcessing} />
              </div>

            </div>

            {/* Bottom Utility Bar */}
            <footer className="mt-16 pt-12 border-t border-[#E8E3D9]/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <LimitBadge count={count} limit={FREE_LIMIT} />
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="text-[10px] font-bold tracking-[0.2em] text-[#3B3A36]/40 hover:text-[#3B3A36] transition-colors uppercase"
                >
                  Membership Details
                </button>
                <div className="h-4 w-px bg-[#E8E3D9]/50" />
                <button
                  className="text-[10px] font-bold tracking-[0.2em] text-[#3B3A36]/40 hover:text-[#3B3A36] transition-colors uppercase"
                >
                  Privacy Policy
                </button>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}