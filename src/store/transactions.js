import { defineStore } from 'pinia';
import { ref, reactive, readonly } from 'vue';
import { getTransactions } from '@/api/transactions';

// YYYY-MM-DD 형식의 현재 달 시작/종료일 반환
const getDefaultDates = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0]
  };
};

export const useTransactionStore = defineStore('transactions', () => {
  const _list = ref([]);           // 전체 거래 내역
  const _page = ref(1);            // 현재 페이지
  const _isLastPage = ref(false);  // 마지막 페이지 여부
  const _loading = ref(false);     // 로딩 상태
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
    fetchList(true); // 필터 변경 시 자동으로 데이터 리셋 후 다시 호출
  };

  // 페이지네이션 함수
  const loadNextPage = () => {
    if (!_isLastPage.value) {
      fetchList(false);
    }
  };

  return {
    list,
    filters,
    isLastPage,
    loading,
    fetchList,
    setFilter,
    loadNextPage
  };
});