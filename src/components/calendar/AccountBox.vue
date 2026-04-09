<template>
  <div class="container" :class="account.type">
    <span>{{ account.name }}</span>
    <p>₩{{ account.balance }}</p>
  </div>
</template>
<script setup>
defineProps({
  account: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.container {
  border: 1px solid rgba(43, 127, 255, 0.2);
  border-radius: 24px;
  background-color: #0c1424;
  width: 100%;
  height: 100px;
  padding: 20px;
  margin: 20px;
}

span {
  color: rgba(142, 197, 255, 0.7);
}
p {
  color: #fff;
  font-size: 24px;
  margin-top: 10px;
}

.totalExpenditure span {
  color: rgba(255, 32, 86, 0.7);
}
.totalExpenditure {
  background-color: rgb(255, 161, 173, 0.2);
  border: 1px solid rgb(255, 161, 173, 0.2);
}

.profit span {
  color: rgba(0, 188, 125, 0.7);
}
.profit {
  background-color: rgb(94, 233, 181, 0.2);
  border: 1px solid rgb(94, 233, 181, 0.2);
}
</style>
