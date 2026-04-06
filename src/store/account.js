import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAccountStore = defineStore('account', () => {
  // 현재 선택된 '월 (Month)' 정보 보관 (기본값: 접속한 날짜의 달)
  const currentMonth = ref(new Date().getMonth() + 1);
  
  // 전체 가계부 로직(수입/지출 내역 배열) 보관
  const transactions = ref([]);

  // 추후 카테고리 필터나 상태 변경 함수 등을 여기에 추가
  // const addTransaction = (data) => { ... }

  return { currentMonth, transactions };
});
