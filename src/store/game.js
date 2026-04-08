import { defineStore } from 'pinia';
import { ref } from 'vue';

const rawTransactions = [
  { "id": 1, "type": "income", "title": "부업 입금", "amount": 200000, "date": "2026-04-07", "category": "FINANCE" },
  { "id": 2, "type": "expense", "title": "점심 (돈까스)", "amount": 12000, "date": "2026-04-07", "category": "FOOD" },
  { "id": 6, "type": "expense", "title": "백화점 쇼핑", "amount": 125000, "date": "2026-04-06", "category": "SHOPPING" },
  { "id": 7, "type": "expense", "title": "치과 검진", "amount": 55000, "date": "2026-04-05", "category": "MEDICAL" },
];

export const useGameStore = defineStore('game', () => {
  // -- State --
  const selectedYear = ref(2026);
  const selectedMonth = ref(4);
  const fallingItems = ref([]); // 하늘에서 떨어질 Top 20 아이템들
  const score = ref(0); // 획득한 금액

  // -- Actions --
  const extractTopExpenses = (year, month) => {
    selectedYear.value = year;
    selectedMonth.value = month;

    // 필터링: 지출 중 [연/월]과 일치하는 항목
    const filtered = rawTransactions.filter(item => {
      const itemDate = new Date(item.date);
      return item.type === 'expense' &&
             itemDate.getFullYear() === year &&
             (itemDate.getMonth() + 1) === month;
    });

    // 비싼 것 추출
    const sorted = filtered.sort((a, b) => b.amount - a.amount);
    const top20 = sorted.slice(0, 20);

    // 게임용 데이터로 맵핑 (랜덤 X좌표와 초기 Y좌표 부여)
    fallingItems.value = top20.map((item, index) => {
      return {
        ...item,
        // 화면 양끝 30px 여백을 두고 랜덤 X 좌표 생성
          x: Math.random() * (window.innerWidth - 60) + 30, 
        
        // 겹치지 않게 순서대로 일정한 간격(예: 200px)을 두고 위쪽에 대기시킴
          y: -100 - (index * 200), 
        isCaught: false // 바구니에 담겼는지 체크용
      };
    });
    
    console.log("게임 준비 완료! Top 20 타겟:", fallingItems.value);
  };

  return { selectedYear, selectedMonth, fallingItems, score, extractTopExpenses };
});