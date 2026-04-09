import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { getAllTransactions } from '@/api/calendar';

export const useCalendarStore = defineStore('calendar', () => {
  const _allList = ref([]);
  const _loading = ref(false);

  // 현재 캘린더가 보여주고 있는 연-월 (기본값: 오늘 날짜의 YYYY-MM)
  const currentYearMonth = ref(new Date().toISOString().slice(0, 7));

  // 1. [월별 합계] - 현재 설정된 currentYearMonth에 해당하는 데이터만 합계
  const monthlySummary = computed(() => {
    const filtered = _allList.value.filter((t) =>
      t.date.startsWith(currentYearMonth.value),
    );

    const income = filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      profit: income - expense,
      month: currentYearMonth.value.split('-')[1], // "04" 같은 월 정보
    };
  });

  // 2. [날짜별 그룹화] - (이전과 동일)
  const dailyDataMap = computed(() => {
    return _allList.value.reduce((acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = { date: cur.date, income: 0, expense: 0, items: [] };
      }
      if (cur.type === 'income') acc[cur.date].income += cur.amount;
      else acc[cur.date].expense += cur.amount;
      acc[cur.date].items.push(cur);
      return acc;
    }, {});
  });

  const fetchAllData = async () => {
    _loading.value = true;
    try {
      const res = await getAllTransactions();
      _allList.value = res.data || res;
    } finally {
      _loading.value = false;
    }
  };

  // 외부에서 연-월을 변경할 수 있는 함수
  const setCurrentMonth = (dateStr) => {
    currentYearMonth.value = dateStr.slice(0, 7);
  };

  return {
    allList: readonly(_allList),
    currentYearMonth,
    monthlySummary,
    dailyDataMap,
    fetchAllData,
    setCurrentMonth,
    loading: readonly(_loading),
  };
});
