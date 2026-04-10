// src/store/game.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTransactions } from '@/api/game';
import { GAME_CONFIG, RANDOM_ICONS } from '@/constants/game';

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
      const top15 = sorted.slice(0, 15);

      // 최고 금액 찾기
      const maxAmount = top15.length > 0 ? top15[0].amount : 1;

      fallingItems.value = top15.map((item, index) => {
        const calculatedSize = GAME_CONFIG.ITEM_SIZE_MIN + (GAME_CONFIG.ITEM_SIZE_MAX - GAME_CONFIG.ITEM_SIZE_MIN) * (item.amount / maxAmount);
        // 각 아이템별 무작위 낙하 속도 할당
        const randomSpeed = GAME_CONFIG.ITEM_SPEED_MIN + Math.random() * (GAME_CONFIG.ITEM_SPEED_MAX - GAME_CONFIG.ITEM_SPEED_MIN);
        // 랜덤 아이콘 선택
        const randomIcon = RANDOM_ICONS[Math.floor(Math.random() * RANDOM_ICONS.length)];

        return {
          ...item,
          x: Math.random() * (GAME_CONFIG.BOARD_WIDTH - 60) + 30, 
          y: -100 - (index * 120),  // 간격을 100에서 120으로 늘림 (게임 시간 원래 대로 20초)
          isCaught: false,
          size: calculatedSize,
          speed: randomSpeed, // 👈 각 아이템의 개별 낙하 속도
          icon: randomIcon // 👈 랜덤 아이콘
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