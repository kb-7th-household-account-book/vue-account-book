import { defineStore } from 'pinia';
import { ref, reactive, readonly, toRaw } from 'vue';
import {
  getTransactions,
  getTransactionsCount,
  deleteTransactionAPI,
  updateTransactionAPI,
} from '@/api/transactions';

// YYYY-MM-DD 형식의 현재 달 시작/종료일 반환
export const getDefaultDates = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const offset = now.getTimezoneOffset() * 60000;

  const formatDate = (date) => {
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split('T')[0];
  };

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

export const useTransactionStore = defineStore('transactions', () => {
  const _list = ref([]); // 전체 거래 내역
  const _page = ref(1); // 현재 페이지
  const _isLastPage = ref(false); // 마지막 페이지 여부
  const _loading = ref(false); // 로딩 상태
  const _counts = reactive({ all: 0, income: 0, expense: 0, categories: [] }); // 개수 상태
  const { startDate, endDate } = getDefaultDates(); // 날짜 상태

  // 기본 데이터 상태
  const _filters = reactive({
    type: 'all',
    startDate,
    endDate,
    categories: [],
    minAmount: 0,
    maxAmount: 2000000,
  });

  // 외부 컴포넌트는 읽기만 가능
  const list = readonly(_list);
  const filters = readonly(_filters);
  const isLastPage = readonly(_isLastPage);
  const loading = readonly(_loading);
  const counts = readonly(_counts);

  const updateCounts = async () => {
    try {
      const res = await getTransactionsCount({
        startDate: _filters.startDate,
        endDate: _filters.endDate,
      });

      const allData = Array.isArray(res) ? res : res.data || [];

      _counts.all = allData.length;
      _counts.income = allData.filter((t) => t.type === 'income').length;
      _counts.expense = allData.filter((t) => t.type === 'expense').length;

      const categoryMap = allData.reduce((acc, cur) => {
        if (!cur.category) return acc;
        acc[cur.category] = (acc[cur.category] || 0) + 1;
        return acc;
      }, {});

      _counts.categories = Object.entries(categoryMap).map(([name, count]) => ({
        category: name,
        count: count,
      }));
    } catch (error) {
      console.error('카운트 계산 실패:', error);
    }
  };

  // 데이터 불러오기
  const fetchList = async (isReset = false) => {
    if (_loading.value) return;

    if (isReset) {
      _page.value = 1;
      _list.value = [];
      _isLastPage.value = false;
    }

    _loading.value = true;

    try {
      const res = await getTransactions({ ..._filters, page: _page.value });

      let incomingData = [];
      if (Array.isArray(res)) {
        incomingData = res;
      } else if (res.data && Array.isArray(res.data)) {
        incomingData = res.data;
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        incomingData = res.data.data;
      }

      if (incomingData.length > 0) {
        if (incomingData.length < 10) _isLastPage.value = true;
        _list.value = isReset
          ? [...incomingData]
          : [..._list.value, ...incomingData];
        _page.value++;
      } else {
        _isLastPage.value = true;
      }
    } catch (error) {
      console.error('거래 내역 로드 실패:', error);
    } finally {
      _loading.value = false;
    }
  };

  // 필터 업데이트 함수
  const setFilter = (key, value) => {
    _filters[key] = value;

    // 날짜 변경 시 거래 유형 개수도 다시 계산
    if (key === 'startDate' || key === 'endDate') {
      updateCounts();
    }

    fetchList(true);
  };

  const setFilters = (filters) => {
    Object.entries(filters).forEach(([key, value]) => {
      _filters[key] = value;
    });

    if ('startDate' in filters || 'endDate' in filters) {
      updateCounts();
    }

    fetchList(true);
  };

  // 페이지네이션 함수
  const loadNextPage = () => {
    if (!_isLastPage.value) {
      fetchList(false);
    }
  };

  const init = async () => {
    await updateCounts();
    await fetchList(true);
  };

  // 거래 내역 삭제 로직
  const deleteTransaction = async (id) => {
    try {
      // 1. DB에서 삭제
      await deleteTransactionAPI(id);

      // 2. 화면 리스트에서 즉시 제거 (부드러운 UI)
      _list.value = _list.value.filter((item) => item.id !== id);

      // 3. (선택) 전체 개수(counts)를 다시 계산해서 상단 필터 카운트도 맞춰줌
      updateCounts();
    } catch (error) {
      console.error('거래 내역 삭제 실패:', error);
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      // 1. DB에 수정된 데이터 전송
      const res = await updateTransactionAPI(id, updatedData);

      // json-server는 업데이트 성공 시 수정된 객체를 res.data로 돌려줍니다.
      const newData = res.data || updatedData;

      // 2. 리스트에서 해당 ID를 찾아 데이터 교체 (화면 즉시 반영)
      const index = _list.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        _list.value[index] = newData;
      }

      // 3. 금액이나 카테고리가 바뀌었을 수 있으니 카운트 다시 계산
      updateCounts();
    } catch (error) {
      console.error('거래 내역 수정 실패:', error);
    }
  };
  return {
    list,
    filters,
    counts,
    isLastPage,
    loading,
    fetchList,
    setFilter,
    setFilters,
    loadNextPage,
    init,
    deleteTransaction,
    updateTransaction,
  };
});
