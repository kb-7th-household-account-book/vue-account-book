<script setup>
import LedgerItem from './LedgerItem.vue';
</script>

<template>
  <div class="calendar-board">
    <h3 style="color: yellow;">이곳은 달력 전체 UI 영역입니다 (Layer 3)</h3>
    <p style="color: white; font-size: 14px;">1~12월 달력 틀이 한 번만 렌더링 됩니다.</p>
    
    <!-- 달력 안 칸칸이 들어갈 요소 -->
    <LedgerItem />
    <LedgerItem />
  </div>
</template>

<style scoped>
.calendar-board {
  border: 1px solid #777;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
}
</style>
