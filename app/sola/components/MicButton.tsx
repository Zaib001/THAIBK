import { useState } from "react";

interface MicButtonProps {
  setText: (text: string) => void;
  setIsRecording: (recording: boolean) => void;
  language: "th" | "en";
}

export default function MicButton({ setText, setIsRecording, language }: MicButtonProps) {
  const [isRecording, setIsRecordingLocal] = useState(false);

  const handleMicClick = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecordingLocal(false);
      setIsRecording(false);
      // Simulate speech-to-text result
      setTimeout(() => {
        setText(language === 'en' 
          ? "This is a simulated voice input result." 
          : "นี่คือผลลัพธ์จากการป้อนเสียงจำลอง");
      }, 1000);
    } else {
      // Start recording
      setIsRecordingLocal(true);
      setIsRecording(true);
    }
  };

  return (
    <button
      onClick={handleMicClick}
      className={`p-4 rounded-2xl transition-all duration-300 shadow-lg ${
        isRecording 
          ? "bg-red-500 text-white animate-pulse shadow-red-500/25" 
          : "bg-[#E8E3D9] text-[#3B3A36] hover:bg-[#E8E3D9]/80 hover:scale-105"
      }`}
      title={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? (
        <div className="relative">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
          </div>
        </div>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  );
}