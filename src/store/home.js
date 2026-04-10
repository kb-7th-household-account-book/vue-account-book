import { defineStore } from 'pinia';
import { reactive, readonly } from 'vue';
import {
  getMonthlyStats,
  getAllMonthlyStats,
  getFixedDetails,
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

    // 4. 🌟 카테고리 TOP 3 & 최근 거래 내역 (프론트에서 직접 처리!)
    try {
      const res = await getAllTransactions();
      const allTransactions = res.data;
      const categoryMap = {};

      // 카테고리 금액 합산 로직
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

      // [4-1] 카테고리 정렬 (금액 기준)
      state.topCategories = Object.values(categoryMap)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

      // [4-2] 🌟 최근 거래 내역 정렬 (날짜/시간 조합해서 최신순으로 4개 자르기)
      state.recentTransactions = [...allTransactions]
        .sort((a, b) => {
          const dateTimeA = (a.date || '') + (a.time || '');
          const dateTimeB = (b.date || '') + (b.time || '');
          return dateTimeB.localeCompare(dateTimeA); // 내림차순
        })
        .slice(0, 4);
    } catch (e) {
      console.error('데이터 직접 계산 실패', e);
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
