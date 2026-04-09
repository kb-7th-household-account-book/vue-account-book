<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="main-content">
    <router-view /> 
  </div>

</template>

<style>
/* 글로벌 초기화 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content {
  margin-top: 60px;
}
</style>
