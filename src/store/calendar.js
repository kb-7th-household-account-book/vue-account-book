import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { getAllTransactions, getFixedDetails } from '@/api/calendar';

export const useCalendarStore = defineStore('calendar', () => {
  const _allList = ref([]);
  const _fixedList = ref([]);
  const _loading = ref(false);

  // 현재 캘린더가 보여주고 있는 연-월 (기본값: 오늘 날짜의 YYYY-MM)
  const currentYearMonth = ref(new Date().toISOString().slice(0, 7));

  // 데이터 가져오기 (고정 지출 포함)
  const fetchAllData = async () => {
    _loading.value = true;
    try {
      const res = await getAllTransactions();
      _allList.value = res.data || res;
    } finally {
      _loading.value = false;
    }
  };

  const fetchFixedDate = async () => {
    _loading.value = true;
    try {
      const res = await getFixedDetails();
      _fixedList.value = res.data || res;
    } finally {
      _loading.value = false;
    }
  };

  // [월별 합계] - 변동 지출 + 고정 지출 합산
  const monthlySummary = computed(() => {
    // A. 변동 지출 필터링
    const filtered = _allList.value.filter((t) =>
      t.date.startsWith(currentYearMonth.value),
    );

    const income = filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const variableExpense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // B. 고정 지출 찾기
    const currentMonthNum = parseInt(currentYearMonth.value.split('-')[1]);
    const fixedData = _fixedList.value.find((f) => f.month === currentMonthNum);
    const fixedExpense = fixedData ? fixedData.total_fixed_expense : 0;

    return {
      income,
      expense: variableExpense + fixedExpense, // 💡 변동 + 고정 지출 합산
      fixedExpense, // 필요시 별도로 확인하기 위해 추가
      profit: income - (variableExpense + fixedExpense),
      month: currentYearMonth.value.split('-')[1],
    };
  });

  // [날짜별 그룹화] - (이전과 동일)
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

  // 외부에서 연-월을 변경할 수 있는 함수
  const setCurrentMonth = (dateStr) => {
    currentYearMonth.value = dateStr.slice(0, 7);
  };

  return {
    allList: readonly(_allList),
    fixedList: readonly(_fixedList),
    currentYearMonth,
    monthlySummary,
    dailyDataMap,
    fetchFixedDate,
    fetchAllData,
    setCurrentMonth,
    loading: readonly(_loading),
  };
});
