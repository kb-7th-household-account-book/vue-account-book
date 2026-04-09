// src/store/game.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTransactions } from '@/api/game';
import { GAME_CONFIG } from '@/constants/game';

export const useGameStore = defineStore('game', () => {
  const selectedYear = ref(2026);
  const selectedMonth = ref(4);
  const fallingItems = ref([]);
  const score = ref(0);
  const isLoading = ref(false);

    const extractTopExpenses = async (year, month) => {
    score.value = 0;
    selectedYear.value = year;
    selectedMonth.value = parseInt(month);
    isLoading.value = true;

    try {
      const rawTransactions = await getTransactions();

      const filtered = rawTransactions.filter(item => {
        const itemDate = new Date(item.date);
        return item.type === 'expense' &&
               itemDate.getFullYear() === selectedYear.value &&
               (itemDate.getMonth() + 1) === selectedMonth.value;
      });

      const sorted = filtered.sort((a, b) => b.amount - a.amount);
      const top20 = sorted.slice(0, 20);

      // ⭐️ 최고 금액 찾기 (비율 계산의 기준점)
      const maxAmount = top20.length > 0 ? top20[0].amount : 1;

      fallingItems.value = top20.map((item, index) => {
        // ⭐️ 크기 계산: 최소 3rem ~ 최대 15rem (원하는 만큼 더 키워도 됩니다!)
        const calculatedSize = GAME_CONFIG.ITEM_SIZE_MIN + (GAME_CONFIG.ITEM_SIZE_MAX - GAME_CONFIG.ITEM_SIZE_MIN) * (item.amount / maxAmount);

        return {
          ...item,
          x: Math.random() * (GAME_CONFIG.BOARD_WIDTH - 60) + 30, 
          y: -100 - (index * 200), 
          isCaught: false,
          size: calculatedSize // 👈 계산된 크기를 객체에 쏙 넣어줍니다.
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