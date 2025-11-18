import { NextRequest, NextResponse } from 'next/server';

// Enhanced mock speech-to-text service
const mockSpeechToText = async (language: string = 'en') => {
  await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate processing delay
  
  const mockResponses = {
    en: [
      "Hello, how can I help you today?",
      "I would like to book a hotel room in Bangkok",
      "What time does the restaurant open?",
      "Could you help me with directions to the beach?",
      "Thank you very much for your assistance"
    ],
    th: [
      "สวัสดีครับ มีอะไรให้ช่วยไหมคะ",
      "ฉันต้องการจองห้องโรงแรมในกรุงเทพ",
      "ร้านอาหารเปิดกี่โมง",
      "ช่วยแนะนำทางไปชายหาดให้ฉันได้ไหม",
      "ขอบคุณมากสำหรับความช่วยเหลือ"
    ]
  };

  const responses = mockResponses[language as keyof typeof mockResponses] || mockResponses.en;
  const randomText = responses[Math.floor(Math.random() * responses.length)];
  
  return randomText;
};

export async function POST(request: NextRequest) {
  try {
    const { language = 'en' } = await request.json();
    
    console.log(`Mock speech-to-text for language: ${language}`);
    
    const transcribedText = await mockSpeechToText(language);

    return NextResponse.json({
      text: transcribedText,
      language,
      timestamp: new Date().toISOString(),
      note: 'Mock speech-to-text service (No API key configured)'
    });

  } catch (error) {
    console.error('Speech to text API error:', error);
    return NextResponse.json(
      { error: 'Speech to text failed' },
      { status: 500 }
    );
  }
}