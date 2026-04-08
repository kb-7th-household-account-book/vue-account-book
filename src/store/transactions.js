import { defineStore } from 'pinia';
import { ref, reactive, readonly } from 'vue';
import { getTransactions } from '@/api/transactions';

export const useTransactionStore = defineStore('transactions', () => {
  const _list = ref([]);           // 전체 거래 내역
  const _page = ref(1);            // 현재 페이지
  const _isLastPage = ref(false);  // 마지막 페이지 여부
  const _loading = ref(false);     // 로딩 상태
  
  const _filters = reactive({
    type: 'all',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    categories: [],
    minAmount: 0,
    maxAmount: 1000000
  });

  // Read-only: 외부 컴포넌트는 읽기만 가능
  const list = readonly(_list);
  const filters = readonly(_filters);
  const isLastPage = readonly(_isLastPage);
  const loading = readonly(_loading);
  
  // 데이터 불러오기
  const fetchList = async (isReset = false) => {
    if (_loading.value) return; // 중복 요청 방지
    
    if (isReset) {
      _page.value = 1;
      _list.value = [];
      _isLastPage.value = false;
    }

    _loading.value = true;
    
    try {
      const { data } = await getTransactions({ ..._filters, page: _page.value });
      
      if (data.length < 10) _isLastPage.value = true;
      _list.value = [..._list.value, ...data];
      _page.value++;
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