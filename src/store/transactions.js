import { defineStore } from 'pinia';
import { ref, reactive, readonly, toRaw } from 'vue';
import { getTransactions, getTransactionsCount } from '@/api/transactions';

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
    endDate: formatDate(end)
  };
};

export const useTransactionStore = defineStore('transactions', () => {
  const _list = ref([]);           // 전체 거래 내역
  const _page = ref(1);            // 현재 페이지
  const _isLastPage = ref(false);  // 마지막 페이지 여부
  const _loading = ref(false);     // 로딩 상태
  const _counts = reactive({ all: 0, income: 0, expense: 0, categories: [] }); // 개수 상태
  const { startDate, endDate } = getDefaultDates(); // 날짜 상태

  
  // 기본 데이터 상태
  const _filters = reactive({
    type: 'all',
    startDate,
    endDate,
    categories: [],
    minAmount: 0,
    maxAmount: 2000000
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
        endDate: _filters.endDate 
      });
      
      const allData = Array.isArray(res) ? res : res.data || [];
      
      _counts.all = allData.length;
      _counts.income = allData.filter(t => t.type === 'income').length;
      _counts.expense = allData.filter(t => t.type === 'expense').length;

      const categoryMap = allData.reduce((acc, cur) => {
        if (!cur.category) return acc;
        acc[cur.category] = (acc[cur.category] || 0) + 1;
        return acc;
      }, {});

      _counts.categories = Object.entries(categoryMap).map(([name, count]) => ({
        category: name,
        count: count
      }));
    } catch (error) {
      console.error("카운트 계산 실패:", error);
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
      _list.value = isReset ? [...incomingData] : [..._list.value, ...incomingData];
      _page.value++;
    } else {
      _isLastPage.value = true;
    }

    } catch (error) {
      console.error("거래 내역 로드 실패:", error);
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
    init
  };
});