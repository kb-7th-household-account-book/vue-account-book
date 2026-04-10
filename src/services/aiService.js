import OpenAI from 'openai';

// Vite 환경 변수에서 API Key를 가져옵니다.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // 프론트엔드에서 직접 호출하기 위해 필요한 설정입니다.
});

/**
 * 사용자의 자연어 입력을 분석하여 가계부 데이터 구조로 반환합니다.
 * @param {string} userInput - 사용자가 입력한 텍스트 (예: "오늘 스타벅스 5000원")
 * @returns {Promise<Object>} - 분석된 가계부 데이터 객체
 */
export const analyzeTransaction = async (userInput) => {
  if (!apiKey) {
    throw new Error('OpenAI API Key가 설정되지 않았습니다. .env.local 파일을 확인해주세요.');
  }

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

  // 시스템 프롬프트: AI에게 성격과 규칙을 부여합니다.
  const systemPrompt = `
당신은 가계부 기록 전문가입니다. 사용자의 입력을 분석하여 지정된 JSON 형식으로만 응답하세요.

[규칙]
1. 오늘 날짜는 ${currentDate}, 현재 시간은 ${currentTime}입니다. 이를 바탕으로 "오늘", "어제" 등을 분석하세요.
2. 금액(amount)은 숫자만 추출하세요.
3. 거래 유형(type)은 'income'(수입) 또는 'expense'(지출) 중 하나로 분류하세요. 명시되지 않으면 기본값은 'expense'입니다.
4. 카테고리(category)는 반드시 다음 목록 중 하나로만 선택하세요:
   - FOOD (식비, 간식, 외식)
   - COFFEE (커피, 카페, 음료)
   - TRANSPORT (버스, 택시, 지하철, 주유)
   - SHOPPING (마트, 의류, 쇼핑)
   - CULTURE (영화, 공연, 도서)
   - MEDICAL (병원, 약국)
   - EDUCATION (학원, 책 구입)
   - HOUSING (월세, 공과금)
   - FINANCE (이체, 보험, 저축)
   - OTHERS (그 외 기타)
5. 시간(time)은 HH:mm 형식으로 추출하세요. 명시되지 않으면 현재 시간(${currentTime})을 사용하세요.
6. 응답은 반드시 다음 구조의 JSON이어야 하며, 다른 설명은 포함하지 마세요:
{
  "type": "income" | "expense",
  "title": "거래 장소 또는 내용",
  "amount": 10000,
  "date": "YYYY-MM-DD",
  "time": "HH:mm",
  "category": "CATEGORY_ID",
  "memo": "추가 메모 (없으면 빈 문자열)"
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 빠르고 저렴한 최신 소형 모델을 사용합니다.
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ],
      response_format: { type: "json_object" }, // JSON 응답 강제
      temperature: 0, // 답변의 일관성을 위해 0으로 설정
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("AI 분석 오류:", error);
    throw error;
  }
};
