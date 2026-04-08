import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserData, getUserStats, updateUserData } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  // 1. State (보관함: 초기값은 비워둡니다)
  const userData = ref({ email: '', imgUrl: '', nickname: '' });
  const userStats = ref({
    total_transaction_count: 0,
    usage_days: 0,
    category_count: 0,
  });

  // 2. Action (데이터 가져오기)
  const fetchUserInfo = async () => {
    try {
      // API 두 개를 동시에 호출해서 빠르게 가져옵니다.
      const [dataRes, statsRes] = await Promise.all([
        getUserData(),
        getUserStats(),
      ]);

      userData.value = dataRes.data;
      userStats.value = statsRes.data;
    } catch (error) {
      console.error('유저 정보를 불러오는데 실패했습니다:', error);
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

  return { userData, userStats, fetchUserInfo, updateProfile };
});
