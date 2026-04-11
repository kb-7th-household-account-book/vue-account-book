import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import {
  getAllTransactions,
  getFixedDetails,
  createFixedExpense,
  updateFixedExpense,
  deleteFixedExpense,
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
    const fixedExpense = _fixedList.value.reduce((sum, f) => {
      const currentViewDate = new Date(currentYearMonth.value + '-01');
      const startDate = new Date(f.start_date);

      // 🎯 시작일이 현재 달보다 이전이거나 같을 때만 더하기
      if (
        startDate <= currentViewDate ||
        (startDate.getFullYear() === currentViewDate.getFullYear() &&
          startDate.getMonth() === currentViewDate.getMonth())
      ) {
        return sum + (f.expense || 0);
      }

      return sum;
    }, 0);

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

  // 추가 로직
  const addFixedItem = async (title, expense, day, startDate) => {
    const newFixed = {
      title: title,
      expense: expense,
      day: day,
      start_date: startDate,
    };

    await createFixedExpense(newFixed);
    await fetchFixedData(); // 마스터 데이터 갱신
  };

  // 수정 로직
  const updateFixedItem = async (id, updateData) => {
    try {
      const response = await updateFixedExpense(id, {
        title: updateData.title,
        expense: updateData.expense,
        day: updateData.day,
        start_date: updateData.start_date,
      });

      const index = _fixedList.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        _fixedList.value[index] = response.data;
      }

      console.log('수정 완료:', response.data);
    } catch (error) {
      console.error('고정 지출 수정 실패:', error);
      throw error;
    }
  };

  // 삭제 로직
  const deleteFixedItem = async (id) => {
    try {
      await deleteFixedExpense(id);

      _fixedList.value = _fixedList.value.filter((item) => item.id !== id);

      console.log(`ID: ${id} 항목 삭제 완료`);
    } catch (error) {
      console.error('고정 지출 삭제 실패:', error);
      throw error;
    }

    await fetchFixedData();
  };

  return {
    allList: readonly(_allList),
    fixedList: readonly(_fixedList),
    currentYearMonth,
    monthlySummary,
    dailyDataMap,
    fetchFixedData,
    fetchAllData,
    addFixedItem,
    updateFixedItem,
    deleteFixedItem,
    setCurrentMonth,
    loading: readonly(_loading),
  };
});
