<script setup>
import Header from './components/Header.vue'
import TransactionRegister from './views/TransactionRegister.vue'
</script>

<template>
  <Header />
  <TransactionRegister />
  <!-- <router-view />  -->

</template>

<style>
/* 글로벌 초기화 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
