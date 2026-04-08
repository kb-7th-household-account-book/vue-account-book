<template>
  <div class="settings-page">
    <h2 class="page-title">설정</h2>

    <ProfileCard :user="userData" @update-profile="handleProfileUpdate" />

    <SettingMenuList />

    <div class="stats-grid">
      <div class="stat-box">
        <p class="stat-label">총 거래 건수</p>
        <p class="stat-value">
          {{ userStats.total_transaction_count.toLocaleString() }}건
        </p>
      </div>
      <div class="stat-box">
        <p class="stat-label">사용 기간</p>
        <p class="stat-value">{{ userStats.usage_days }}일</p>
      </div>
      <div class="stat-box">
        <p class="stat-label">카테고리</p>
        <p class="stat-value">{{ userStats.category_count }}개</p>
      </div>
    </div>

    <button class="logout-btn">
      <span class="logout-icon"
        ><svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
            stroke="#FF637E"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.3333 14.1668L17.4999 10.0002L13.3333 5.8335"
            stroke="#FF637E"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.5 10H7.5"
            stroke="#FF637E"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      로그아웃
    </button>
    <footer class="app-footer-info">
      <p class="app-version">가계부 v1.0.0</p>
      <p class="app-copyright">© 2026 All rights reserved</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ProfileCard from '@/components/settings/ProfileCard.vue';
import SettingMenuList from '@/components/settings/SettingMenuList.vue';

// 🌟 db.json 구조를 참고한 Mock Data 상태 관리
const userData = reactive({
  email: 'jisu@email.com',
  imgUrl: '',
  nickname: '박지수',
});

const userStats = reactive({
  total_transaction_count: 1247,
  usage_days: 186,
  category_count: 10, // db.json에 맞춰 10개로 렌더링
});

const handleProfileUpdate = (newData) => {
  userData.email = newData.email;
  userData.nickname = newData.nickname;
  userData.imgUrl = newData.imgUrl;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.settings-page {
  background-color: #0a0a0b;
  min-height: 100vh;
  padding: 20px;
  color: #ffffff;
}
.page-title {
  font-size: 24px;
  margin-bottom: 24px;
}
.stats-grid {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.stat-box {
  flex: 1;
  background-color: #121213;
  border-radius: 12px;
  padding: 20px;
}
.stat-label {
  color: #888;
  font-size: 12px;
  margin: 0 0 10px 0;
}
.stat-value {
  color: #fff;
  font-size: 20px;
  margin: 0;
  font-weight: bold;
}
.logout-btn {
  width: 100%;
  padding: 18px;
  background-color: #210a12;
  color: #ff4d4d;
  border: 1px solid #3d1c24;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: 1;
}
.app-footer-info {
  margin-top: 40px; /* 로그아웃 버튼과 충분한 간격을 줍니다 */
  text-align: center; /* 글씨를 가운데 정렬합니다 */
  padding-bottom: 20px; /* 화면 맨 아래 딱 붙지 않게 여백을 줍니다 */
}

.app-version {
  color: #666; /* 눈에 띄지 않는 흐린 회색 */
  font-size: 12px;
  margin-bottom: 4px; /* 두 줄 사이의 좁은 간격 */
}

.app-copyright {
  color: #444; /* 버전 정보보다 더 흐린 색상 */
  font-size: 11px;
  margin: 0;
}
.logout-icon {
  /* 아이콘을 감싸는 span도 flex로 만들면 훨씬 정교해집니다 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 만약 아이콘이 '미세하게' 위로 올라가 보인다면 아래 주석을 풀어 조절하세요 */
  /* transform: translateY(1px); */
}
</style>
