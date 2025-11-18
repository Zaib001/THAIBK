interface TranslationBoxProps {
  text: string;
  language: "th" | "en";
  isLoading?: boolean;
}

export default function TranslationBox({ text, language, isLoading }: TranslationBoxProps) {
  const handleCopy = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    }
  };

  const handleSpeak = () => {
    if (text && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'th-TH';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleDownload = () => {
    if (text) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translation-${language}-${new Date().getTime()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="rounded-2xl p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 rounded-full ${
            language === 'en' ? 'bg-blue-500' : 'bg-purple-500'
          }`}></div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {language === 'en' ? 'English Translation' : 'การแปลภาษาไทย'}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI-powered translation
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {text && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all transform hover:scale-105"
              title="Listen to translation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828 2.828a9 9 0 010-12.728" />
              </svg>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all transform hover:scale-105"
              title="Download translation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium"
              title="Copy to clipboard"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
        )}
      </div>

      {/* Translation Content */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-black animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-700">Translating your text</p>
              <p className="text-sm text-gray-500 mt-1">Processing with AI engine...</p>
            </div>
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : text ? (
          <div className="space-y-4">
            {/* Translation Text */}
            <div className={`p-6 bg-white rounded-xl border-2 border-gray-100 shadow-sm ${
              language === 'th' ? 'font-noto-thai' : 'font-sans'
            }`}>
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {text}
              </p>
            </div>
            
            {/* Translation Stats */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Just now
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {text.length} characters
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {text.split(' ').length} words
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  language === 'en' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {language === 'en' ? 'EN' : 'TH'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-500 mb-1">Ready for Translation</p>
              <p className="text-sm text-gray-400">
                Your translated text will appear here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quality Indicator */}
      {text && !isLoading && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Translation Complete</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              High quality
            </div>
          </div>
        </div>
      )}
    </div>
  );
}