import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import {
  getAllTransactions,
  getFixedDetails,
  createFixedExpense,
  // updateFixedExpense,
} from '@/api/calendar';

export const useCalendarStore = defineStore('calendar', () => {
  const _allList = ref([]);
  const _fixedList = ref([]);
  const _loading = ref(false);

  // 현재 캘린더가 보여주고 있는 연-월 (기본값: 오늘 날짜의 YYYY-MM)
  const currentYearMonth = ref(new Date().toISOString().slice(0, 7));

  // 모든 거래내역 데이터 가져오기 (고정 지출 포함)
  const fetchAllData = async () => {
    _loading.value = true;
    try {
      const res = await getAllTransactions();
      _allList.value = res.data || res;
    } finally {
      _loading.value = false;
    }
  };

  const fetchFixedData = async () => {
    _loading.value = true;
    try {
      const res = await getFixedDetails();
      _fixedList.value = res.data || res;
    } finally {
      _loading.value = false;
    }
  };

  const getValidFixedItemsForMonth = (yearMonth) => {
    const [year, month] = yearMonth.split('-').map(Number);

    return _fixedList.value.filter((item) => {
      // 시작일(start_date)이 현재 보고 있는 월보다 이전이거나 같아야 함
      const startDate = new Date(item.start_date);
      const viewDate = new Date(year, month - 1, item.day || 1);

      const isStarted = startDate <= viewDate;
      // deleted_at 로직은 일단 제외 (나중에 필요시 추가)
      return isStarted;
    });
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

  // [날짜별 그룹화]
  const dailyDataMap = computed(() => {
    return _allList.value.reduce((acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = { date: cur.date, income: 0, expense: 0, items: [] };
      }
      if (cur.type === 'income') {
        acc[cur.date].income += cur.amount;
      } else if (cur.type === 'expense') {
        // 🎯 고정 지출을 제외한 순수 변동 지출만 합산 (빨간색용)
        acc[cur.date].expense += cur.amount;
      }
      acc[cur.date].items.push(cur);
      return acc;
    }, {});
  });

  // 외부에서 연-월을 변경할 수 있는 함수
  const setCurrentMonth = (dateStr) => {
    currentYearMonth.value = dateStr.slice(0, 7);
  };

  // 공통 로직: 수정된 아이템 배열을 받아서 합계를 계산하고 서버에 PUT 하는 함수
  // const _updateFixedMonth = async (monthId, updatedItems) => {
  //   const newTotal = updatedItems.reduce((sum, item) => sum + item.expense, 0);
  //   const target = _fixedList.value.find((f) => f.id === monthId);

  //   const updatedObject = {
  //     ...target,
  //     total_fixed_expense: newTotal,
  //     items: updatedItems,
  //   };

  //   await updateFixedExpense(monthId, updatedObject);
  //   await fetchFixedData(); // 최신 고정지출 갱신
  // };

  // 1. 추가 로직
  const addFixedItem = async (name, expense, day, startDate) => {
    const newFixed = {
      name,
      expense: parseInt(expense),
      day: parseInt(day),
      start_date: startDate || new Date().toISOString().slice(0, 10),
    };

    await createFixedExpense(newFixed);
    await fetchFixedData(); // 마스터 데이터 갱신
  };

  // 2. 수정 로직 (아이템 하나만 선택해서 수정)
  // const editFixedItem = async (monthId, itemId, newName, newExpense) => {
  //   const target = _fixedList.value.find((f) => f.id === monthId);
  //   if (!target) return;

  //   const updatedItems = target.items.map((item) =>
  //     item.id === itemId
  //       ? { ...item, name: newName, expense: newExpense }
  //       : item,
  //   );

  //   await _updateFixedMonth(monthId, updatedItems);
  // };

  // 3. 삭제 로직 (아이템 하나만 선택해서 삭제)
  // const deleteFixedItem = async (monthId, itemId) => {
  //   const target = _fixedList.value.find((f) => f.id === monthId);
  //   if (!target) return;

  //   // 해당 ID만 제외하고 필터링
  //   const updatedItems = target.items.filter((item) => item.id !== itemId);

  //   await _updateFixedMonth(monthId, updatedItems);
  // };

  return {
    allList: readonly(_allList),
    fixedList: readonly(_fixedList),
    currentYearMonth,
    monthlySummary,
    dailyDataMap,
    fetchFixedData,
    fetchAllData,
    addFixedItem,
    // editFixedItem,
    // deleteFixedItem,
    setCurrentMonth,
    loading: readonly(_loading),
  };
});
