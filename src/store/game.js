import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTransactions } from '@/api/game';

export const useGameStore = defineStore('game', () => {
  // -- State --
  const selectedYear = ref(2026);
  const selectedMonth = ref(4);
  const fallingItems = ref([]); // 하늘에서 떨어질 Top 20 아이템들
  const score = ref(0); // 획득한 금액
  const isLoading = ref(false); // 로딩 상태

  // -- Actions --
  const extractTopExpenses = async (year, month) => {
    selectedYear.value = year;
    selectedMonth.value = parseInt(month);
    isLoading.value = true;

    try {
      const rawTransactions = await getTransactions();

      // 필터링: 지출 중 [연/월]과 일치하는 항목
      const filtered = rawTransactions.filter(item => {
        const itemDate = new Date(item.date);
        return item.type === 'expense' &&
               itemDate.getFullYear() === selectedYear.value &&
               (itemDate.getMonth() + 1) === selectedMonth.value;
      });

      // 비싼 것부터 정렬 후 Top 20 자르기
      const sorted = filtered.sort((a, b) => b.amount - a.amount);
      const top20 = sorted.slice(0, 20);

      // 게임용 데이터로 맵핑
      fallingItems.value = top20.map((item, index) => {
        return {
          ...item,
          // 화면 양끝 30px 여백을 두고 랜덤 X 좌표 생성
          x: Math.random() * (window.innerWidth - 60) + 30, 
          // 겹치지 않게 위쪽에서 순서대로 대기
          y: -100 - (index * 200), 
          isCaught: false 
        };
      });
      
      console.log(`${month}월 게임 데이터 준비 완료!`, fallingItems.value);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다 😭", error);
    } finally {
      isLoading.value = false;
    }
  };

  return { selectedYear, selectedMonth, fallingItems, score, isLoading, extractTopExpenses };
});