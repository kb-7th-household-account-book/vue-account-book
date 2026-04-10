import OpenAI from 'openai';

// Vite 환경 변수에서 API Key를 가져옵니다.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // 프론트엔드에서 직접 호출하기 위해 필요한 설정입니다.
});

/**
 * 사용자의 자연어 입력을 분석하여 가계부 작업(등록, 수정, 삭제)을 결정합니다.
 * @param {string} userInput - 사용자가 입력한 텍스트
 * @param {Array} recentTransactions - 참고할 최근 거래 내역 목록
 * @returns {Promise<Object>} - 분석된 의도와 데이터
 */
export const analyzeTransaction = async (userInput, recentTransactions = []) => {
  if (!apiKey) {
    throw new Error('OpenAI API Key가 설정되지 않았습니다. .env.local 파일을 확인해주세요.');
  }

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

  // 최근 내역을 AI가 읽을 수 있는 텍스트로 변환
  const contextList = recentTransactions
    .map(tx => `[ID: ${tx.id}] ${tx.date} ${tx.title} (${tx.amount}원, ${tx.category})`)
    .join('\n');

  const systemPrompt = `
당신은 가계부 관리 비서입니다. 사용자의 입력을 분석하여 등록(CREATE), 수정(UPDATE), 삭제(DELETE) 중 하나의 의도를 파악하고 지정된 JSON 형식으로 응답하세요.

[현재 상태]
- 오늘 날짜: ${currentDate}
- 현재 시간: ${currentTime}
- 최근 거래 내역:
${contextList || "(최근 내역 없음)"}

[의도 판단 규칙]
1. 등록(CREATE): 새로운 내역을 추가하려는 경우. (예: "오늘 점심 1만원")
2. 수정(UPDATE): 기존 내역을 고치려는 경우. (예: "아까 순대국 1만원을 8천원으로 바꿔줘")
3. 삭제(DELETE): 기존 내역을 지우려는 경우. (예: "방금 등록한 순대국 지워줘")

[카테고리 목록]
FOOD, COFFEE, TRANSPORT, SHOPPING, CULTURE, MEDICAL, EDUCATION, HOUSING, FINANCE, OTHERS

[응답 가이드라인]
- UPDATE 또는 DELETE인 경우 반드시 "targetId"를 최근 거래 내역의 ID 중에서 찾아 포함하세요.
- 응답은 반드시 다음 JSON 구조여야 합니다:
{
  "intent": "CREATE" | "UPDATE" | "DELETE",
  "targetId": number | null,
  "data": {
    "type": "income" | "expense",
    "title": "내용",
    "amount": 숫자,
    "date": "YYYY-MM-DD",
    "time": "HH:mm",
    "category": "CATEGORY_ID",
    "memo": ""
  }
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    });


    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("AI 분석 오류:", error);
    throw error;
  }
};
