<script setup>
import Home3DImage from '@/components/Home3DImage.vue';
</script>

<template>
  <div class="home-container">
    <!-- 추후 헤더 등 상단 네비게이션이 들어갈 공간 -->
    <!-- <header class="home-header">Header</header> -->
    
    <main class="home-content">
      <div class="home-left-box">
        <Home3DImage />
      </div>

      <div class="home-right-box">
        <!-- 이번달 지출 / 이번달 통계 / 최근거래 목록 / 빠른추가 버튼 들어갈 자리 -->
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  /* 글로벌 영역(body)에 있던 배경색과 높이를 홈 화면에 적용하여 캡슐화 */
  background: #222;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.home-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* 왼쪽이 더 큼 */
  align-items: center;
  padding: 0 5vw;
}

@media (max-width: 768px) {
  .home-content {
    grid-template-columns: 1fr;
  }

  .home-right-box {
    display: block;
  }
}

</style>
