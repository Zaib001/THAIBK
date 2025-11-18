"use client";

interface Props {
  onTranscribed: (text: string) => void;
}

export default function VoiceRecorder({ onTranscribed }: Props) {
  let recognition: any;

  const startRecording = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscribed(transcript);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startRecording}
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition"
    >
      🎙 Speak
    </button>
  );
}
