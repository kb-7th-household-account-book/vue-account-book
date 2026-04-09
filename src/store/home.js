import { defineStore } from 'pinia';
import { reactive, readonly } from 'vue';
import {
  getMonthlyStats,
  getAllMonthlyStats,
  getFixedDetails,
  getRecentTransactions,
  addTransaction,
  getAllTransactions,
} from '@/api/home';

export const useHomeStore = defineStore('home', () => {
  const state = reactive({
    currentMonth: 4,
    summary: { income: 0, expense: 0, net_income: 0 },
    monthlyList: [],
    fixedExpense: { total: 0, items: [] },
    topCategories: [],
    recentTransactions: [],
  });

  const categoryLabels = {
    FOOD: '식비',
    COFFEE: '카페/간식',
    TRANSPORT: '교통',
    SHOPPING: '쇼핑',
    CULTURE: '문화/여가',
    MEDICAL: '의료',
    EDUCATION: '교육',
    HOUSING: '주거/통신',
    FINANCE: '금융',
    OTHERS: '기타',
  };

  const fetchHomeData = async () => {
    const month = state.currentMonth;

    // 1. 1년치 월별 데이터
    try {
      const res = await getAllMonthlyStats();
      state.monthlyList = res.data;
    } catch (e) {
      console.error('월별 통계 실패', e);
    }

    // 2. 이번 달 요약
    try {
      const res = await getMonthlyStats(month);
      if (res.data.length > 0) state.summary = res.data[0];
    } catch (e) {
      console.error('이번 달 요약 실패', e);
    }

    // 3. 고정 지출 요약
    try {
      const res = await getFixedDetails(month);
      if (res.data.length > 0) {
        state.fixedExpense = {
          total: res.data[0].total_fixed_expense,
          items: res.data[0].items,
        };
      }
    } catch (e) {
      console.error('고정 지출 실패', e);
    }

    // 4. 카테고리 TOP 3 (금액 계산 + 한글 라벨 적용!)
    try {
      const res = await getAllTransactions();
      const allTransactions = res.data;
      const categoryMap = {};

      allTransactions.forEach((tx) => {
        if (tx.type === 'expense') {
          if (!categoryMap[tx.category]) {
            categoryMap[tx.category] = {
              id: tx.category,
              label: categoryLabels[tx.category] || tx.category,
              amount: 0,
            };
          }
          categoryMap[tx.category].amount += tx.amount;
        }
      });

      state.topCategories = Object.values(categoryMap)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    } catch (e) {
      console.error('카테고리 통계 직접 계산 실패', e);
    }

    // 5. 최근 거래 내역
    try {
      const res = await getRecentTransactions();
      state.recentTransactions = res.data;
    } catch (e) {
      console.error('최근 거래 실패', e);
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      await fetchHomeData();
    } catch (error) {
      console.error('거래 추가 실패:', error);
    }
  };

  return {
    state: readonly(state),
    fetchHomeData,
    createTransaction,
  };
});
