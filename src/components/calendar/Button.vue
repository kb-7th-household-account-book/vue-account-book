<template>
  <button class="button" @click="addTransaction" :class="add.type">
    {{ add.name }}
  </button>
</template>
<script setup>
defineProps({
  add: {
    type: Object,
    required: true,
  },
});
const addTransaction = () => {
  // 거래 추가 로직
};
</script>
<style scoped>
.button {
  width: 100%;
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);

  height: 70px;
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
  border: none;
  font-size: 21px;
}
.todayTransaction {
  background-color: #ccc;
  border: none;
}
.fixedExpenses {
  border: none;
  color: white;
  background: linear-gradient(90deg, #c27aff 0%, #ad46ff 100%);
}
</style>
