"use client";

import { useState, useRef, useEffect } from "react";

interface MicButtonProps {
  onRecordingComplete: (audioFile: File) => void;
  isProcessing: boolean;
}

import { motion, AnimatePresence } from "framer-motion";

interface MicButtonProps {
  onRecordingComplete: (audioFile: File) => void;
  isProcessing: boolean;
}

export default function MicButton({ onRecordingComplete, isProcessing }: MicButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        onRecordingComplete(file);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClick = () => {
    if (isProcessing) return;
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative">
      {/* Pulse Aura */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#D4AF37]/30"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-[#D4AF37]/20"
            />
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        disabled={isProcessing}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 shadow-[0_10px_30px_-5px_rgba(212,175,55,0.3)] border border-[#D4AF37]/20 group overflow-hidden ${isRecording
            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/40"
            : "bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#B8860B]"
          } ${isProcessing ? "opacity-20 grayscale cursor-not-allowed" : ""}`}
      >
        {/* Brass Shine Overlay */}
        {!isRecording && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        )}

        {isRecording ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 bg-white rounded-sm shadow-[0_0_10px_white]"
          />
        ) : (
          <svg
            className="w-7 h-7 text-[#3B3A36]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}

        {/* Animated Recording Bar (Visualizer-lite) */}
        {isRecording && (
          <div className="absolute bottom-3 flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 8, 4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-white rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
}