"use client";

import { useState, useEffect } from "react";
import MicButton from "./components/MicButton";
import TranslationBox from "./components/TranslationBox";
import UpgradeModal from "./components/UpgradeModal";
import LimitBadge from "./components/LimitBadge";

// Mock translation function for demonstration
const mockTranslate = async (text: string, sourceLang: "th" | "en", targetLang: "th" | "en") => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  if (sourceLang === "en" && targetLang === "th") {
    return `${text}`;
  } else if (sourceLang === "th" && targetLang === "en") {
    return `${text}`;
  }
  return text;
};

export default function SOLA() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [sourceLang, setSourceLang] = useState<"th" | "en">("en");
  const [targetLang, setTargetLang] = useState<"th" | "en">("th");
  const [isTranslating, setIsTranslating] = useState(false);

  const [count, setCount] = useState(0);
  const FREE_LIMIT = 5;

  // Sample phrases for quick testing
  const samplePhrases = {
    en: [
      "Hello, how are you today?",
      "I would like to book a hotel room",
      "What time does the restaurant open?",
      "Could you help me with directions?",
      "Thank you very much for your assistance"
    ],
    th: [
      "สวัสดีครับ วันนี้คุณเป็นอย่างไรบ้าง",
      "ฉันต้องการจองห้องโรงแรม",
      "ร้านอาหารเปิดกี่โมง",
      "ช่วยแนะนำทางให้ฉันได้ไหม",
      "ขอบคุณมากสำหรับความช่วยเหลือ"
    ]
  };

  const swapLanguages = () => {
    const newSourceLang = targetLang;
    const newTargetLang = sourceLang;
    
    setSourceLang(newSourceLang);
    setTargetLang(newTargetLang);
    
    // Swap texts if both are populated
    if (inputText && translatedText) {
      setInputText(translatedText);
      setTranslatedText(inputText);
    } else if (translatedText) {
      setInputText(translatedText);
      setTranslatedText("");
    }
  };

  const handleSamplePhrase = (phrase: string) => {
    setInputText(phrase);
  };

  async function handleTranslate() {
    if (!inputText.trim()) return;

    if (count >= FREE_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    setIsTranslating(true);
    try {
      // Try real API first, fall back to mock
      let translated;
      try {
        const res = await fetch("/api/sola/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            text: inputText,
            sourceLang,
            targetLang 
          }),
        });

        if (res.ok) {
          const data = await res.json();
          translated = data.translated;
        } else {
          throw new Error("API failed");
        }
      } catch {
        // Fallback to mock translation
        translated = await mockTranslate(inputText, sourceLang, targetLang);
      }

      setTranslatedText(translated);
      setCount(prev => prev + 1);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }

  const handleMicResult = (text: string) => {
    setInputText(prev => prev + (prev ? " " : "") + text);
  };

  const clearTexts = () => {
    setInputText("");
    setTranslatedText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F1EC] to-[#E8E3D9] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#3B3A36] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E8E3D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#3B3A36]">
              SOLA Translator
            </h1>
          </div>
          <p className="text-lg text-[#3B3A36]/80 max-w-2xl mx-auto">
            Professional real-time translation between Thai and English with voice input
          </p>
        </div>

        {/* Usage Limit */}
        <div className="flex justify-center mb-8">
          <LimitBadge count={count} limit={FREE_LIMIT} />
        </div>

        {/* Translation Interface - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8E3D9]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#3B3A36] rounded-full"></div>
                <h2 className="text-xl font-semibold text-[#3B3A36]">Source Text</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <select 
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value as "th" | "en")}
                  className="border-0 bg-[#E8E3D9] text-[#3B3A36] rounded-lg px-3 py-1 text-sm font-semibold focus:ring-2 focus:ring-[#E8E3D9]"
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="th">🇹🇭 Thai</option>
                </select>
                
                <button
                  onClick={clearTexts}
                  className="p-2 text-[#3B3A36]/60 hover:text-[#3B3A36] transition-colors"
                  title="Clear all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Phrases */}
            <div className="mb-4">
              <p className="text-sm text-[#3B3A36]/60 mb-2">Try sample phrases:</p>
              <div className="flex flex-wrap gap-2">
                {samplePhrases[sourceLang].slice(0, 3).map((phrase, index) => (
                  <button
                    key={index}
                    onClick={() => handleSamplePhrase(phrase)}
                    className="text-xs bg-[#E8E3D9] text-[#3B3A36] px-3 py-1 rounded-full hover:bg-[#E8E3D9]/80 transition-colors border border-[#E8E3D9]"
                  >
                    {phrase.slice(0, 20)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Area */}
            <div className="relative mb-4">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={sourceLang === 'en' 
                  ? "Type or speak in English...\n\nExample: Hello, how can I help you today?" 
                  : "พิมพ์หรือพูดภาษาไทย...\n\nตัวอย่าง: สวัสดีครับ มีอะไรให้ช่วยไหมคะ"}
                className="w-full h-64 border-2 border-[#E8E3D9] rounded-xl p-4 text-lg resize-none focus:border-[#3B3A36] focus:ring-4 focus:ring-[#E8E3D9] transition-all placeholder-[#3B3A36]/40 bg-white"
                rows={8}
              />
              
              {/* Character Count */}
              <div className="absolute bottom-3 left-4 text-sm text-[#3B3A36]/40">
                {inputText.length} characters
              </div>
              
              {/* Mic Button */}
              <div className="absolute bottom-4 right-4">
                <MicButton 
                  setText={handleMicResult}
                  setIsRecording={setIsRecording}
                  language={sourceLang}
                />
              </div>
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="w-full bg-[#3B3A36] disabled:bg-[#3B3A36]/40 text-[#E8E3D9] px-6 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-3 shadow-lg hover:bg-[#3B3A36]/90 disabled:hover:bg-[#3B3A36]/40"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#E8E3D9] border-t-transparent"></div>
                  Translating...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Translate Now
                </>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8E3D9]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#3B3A36] rounded-full"></div>
                <h2 className="text-xl font-semibold text-[#3B3A36]">Translation</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value as "th" | "en")}
                  className="border-0 bg-[#E8E3D9] text-[#3B3A36] rounded-lg px-3 py-1 text-sm font-semibold focus:ring-2 focus:ring-[#E8E3D9]"
                >
                  <option value="th">🇹🇭 Thai</option>
                  <option value="en">🇺🇸 English</option>
                </select>
                
                <button
                  onClick={swapLanguages}
                  className="p-2 bg-[#E8E3D9] hover:bg-[#E8E3D9]/80 rounded-lg transition-colors"
                  title="Swap languages"
                >
                  <svg className="w-5 h-5 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
            </div>

            <TranslationBox 
              text={translatedText} 
              language={targetLang}
              isLoading={isTranslating}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E8E3D9]">
            <div className="w-12 h-12 bg-[#E8E3D9] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#3B3A36] mb-2">Voice Input</h3>
            <p className="text-[#3B3A36]/70 text-sm">Speak naturally in both languages</p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E8E3D9]">
            <div className="w-12 h-12 bg-[#E8E3D9] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#3B3A36] mb-2">Instant Results</h3>
            <p className="text-[#3B3A36]/70 text-sm">Real-time translation</p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E8E3D9]">
            <div className="w-12 h-12 bg-[#E8E3D9] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#3B3A36] mb-2">Secure</h3>
            <p className="text-[#3B3A36]/70 text-sm">Your data is protected</p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E8E3D9]">
            <div className="w-12 h-12 bg-[#E8E3D9] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#3B3A36] mb-2">Smart AI</h3>
            <p className="text-[#3B3A36]/70 text-sm">Context-aware translations</p>
          </div>
        </div>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}