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
      className={`p-4 rounded-full transition-all ${
        isRecording 
          ? "bg-red-500 text-white animate-pulse" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      title={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h12v12H6z"/>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  );
}