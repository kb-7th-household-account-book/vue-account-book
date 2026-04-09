import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUserData, getUserStats, updateUserData } from '@/api/user';
import apiClient from '@/api/index';

export const useUserStore = defineStore('user', () => {
  // 1. State (보관함: 초기값은 비워둡니다)
  const userData = ref({ email: '', imgUrl: '', nickname: '' });
  const userStats = ref({ usage_days: 0 });
  const transactions = ref([]);

  // 2. Getters (자동 계산기!)
  // 원본 배열의 길이를 세어서 '총 거래 건수'를 자동 계산합니다.
  const totalTransactionCount = computed(() => {
    return transactions.value.length;
  });

  // 거래 내역에서 사용된 '고유 카테고리 개수'를 자동 계산합니다.
  const usedCategoryCount = computed(() => {
    const uniqueCategories = new Set(transactions.value.map((t) => t.category));
    return uniqueCategories.size;
  });

  // 2. Action (데이터 가져오기)
  const fetchUserInfo = async () => {
    try {
      // 유저 정보와 거래 내역 원본을 같이 가져옵니다.
      const [userRes, txRes, statsRes] = await Promise.all([
        getUserData(),
        apiClient.get('/transactions'), // 임시로 직접 호출
        getUserStats(),
      ]);

      userData.value = userRes.data;
      transactions.value = txRes.data;
      userStats.value = statsRes.data; // 가져온 통계 데이터를 보관함에 넣음!
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  // 3. Action (데이터 수정하기)
  const updateProfile = async (newData) => {
    try {
      const response = await updateUserData(newData);
      userData.value = response.data; // 성공하면 은행 데이터도 최신으로 교체!
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return {
    userData,
    transactions,
    totalTransactionCount,
    usedCategoryCount,
    userStats,
    fetchUserInfo,
    updateProfile,
  };
});
