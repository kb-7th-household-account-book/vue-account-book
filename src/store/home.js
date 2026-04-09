import { defineStore } from 'pinia';
import { reactive, readonly } from 'vue';
import {
  getMonthlyStats,
  getAllMonthlyStats,
  getFixedDetails,
  getStatistics,
  getRecentTransactions,
  addTransaction,
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

  const fetchHomeData = async () => {
    try {
      const month = state.currentMonth;

      const [statsRes, allStatsRes, fixedRes, catRes, recentRes] = await Promise.all([
        getMonthlyStats(month),
        getAllMonthlyStats(),
        getFixedDetails(month),
        getStatistics(month),
        getRecentTransactions(),
      ]);

      if (statsRes.data.length > 0) {
        const { income, expense, net_income } = statsRes.data[0];
        state.summary = { income, expense, net_income };
      }

      state.monthlyList = allStatsRes.data;

      if (fixedRes.data.length > 0) {
        state.fixedExpense = {
          total: fixedRes.data[0].total_fixed_expense,
          items: fixedRes.data[0].items,
        };
      }

      if (catRes.data.length > 0) {
        const sortedCategories = [...catRes.data[0].category_counts]
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);
        state.topCategories = sortedCategories;
      }

      state.recentTransactions = recentRes.data;
    } catch (error) {
      console.error('홈 데이터 로딩 실패:', error);
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
