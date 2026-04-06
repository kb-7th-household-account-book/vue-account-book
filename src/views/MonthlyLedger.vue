 <!-- 월 캘린더 칠판(CalendarBoard) + 기타 기능 버튼들(통계, 내역 추가 등) -->
<script setup>
import CalendarBoard from '@/components/CalendarBoard.vue';
</script>

<template>
  <div class="ledger-page">
    <h2 style="color: white;">월별 가계부 화면 (Layer 1)</h2>
    <!-- 실질적인 달력 구조 뼈대 부품 마운트 -->
    <CalendarBoard />
  </div>
</template>

<style scoped>
.ledger-page {
  /* 글로벌 App.vue 배경이었던 어두운 컬러에 맞게 조정 (추후 자유롭게 디자인) */
  background: #222;
  min-height: 100vh;
  padding: 20px;
}
</style>
