import { NextRequest, NextResponse } from 'next/server';

// Enhanced mock translation service
const mockTranslationService = async (text: string, sourceLang: string, targetLang: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  const translations: Record<string, Record<string, string>> = {
    'en-th': {
      'hello': 'สวัสดี',
      'thank you': 'ขอบคุณ',
      'how are you': 'คุณเป็นอย่างไรบ้าง',
      'good morning': 'สวัสดีตอนเช้า',
      'i love thailand': 'ฉันรักประเทศไทย',
      'where is the bathroom': 'ห้องน้ำอยู่ที่ไหน',
      'how much does this cost': 'นี่ราคาเท่าไหร่',
      'can you help me': 'คุณช่วยฉันได้ไหม',
      'what is your name': 'คุณชื่ออะไร',
      'nice to meet you': 'ยินดีที่ได้รู้จัก'
    },
    'th-en': {
      'สวัสดี': 'hello',
      'ขอบคุณ': 'thank you',
      'คุณเป็นอย่างไรบ้าง': 'how are you',
      'สวัสดีตอนเช้า': 'good morning',
      'ฉันรักประเทศไทย': 'i love thailand',
      'ห้องน้ำอยู่ที่ไหน': 'where is the bathroom',
      'นี่ราคาเท่าไหร่': 'how much does this cost',
      'คุณช่วยฉันได้ไหม': 'can you help me',
      'คุณชื่ออะไร': 'what is your name',
      'ยินดีที่ได้รู้จัก': 'nice to meet you'
    }
  };

  const key = `${sourceLang}-${targetLang}`;
  const lowerText = text.toLowerCase();
  
  // Check if we have a direct translation
  if (translations[key] && translations[key][lowerText]) {
    return translations[key][lowerText];
  }
  
  // Fallback mock translation
  if (sourceLang === 'en' && targetLang === 'th') {
    return `(การแปล) ${text} - นี่คือการแปลภาษาไทยตัวอย่างจาก THAIBK`;
  } else if (sourceLang === 'th' && targetLang === 'en') {
    return `(Translation) ${text} - This is a sample English translation from THAIBK`;
  }
  
  return text;
};

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log(`Mock translation: ${sourceLang} → ${targetLang} - "${text}"`);
    
    const translatedText = await mockTranslationService(text, sourceLang, targetLang);

    return NextResponse.json({
      translated: translatedText,
      sourceLang,
      targetLang,
      timestamp: new Date().toISOString(),
      note: 'Mock translation service (No API key configured)'
    });

  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}