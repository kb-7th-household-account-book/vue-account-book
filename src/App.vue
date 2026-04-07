<script setup>
import TransactionRegister from './views/TransactionRegister.vue'
</script>

<template>
  <div class="app-container">
    <TransactionRegister />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #000; /* 전체 배경을 검은색으로 고정 */
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.app-container {
  min-height: 100vh;
}
</style>

<!-- <script setup>
</script>

<template>
  <router-view />
</template>

<style>
/* 글로벌 초기화 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style> -->
