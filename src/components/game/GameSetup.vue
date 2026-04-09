<script setup>
import { ref } from 'vue';
import { useGameStore } from '@/store/game';

const emit = defineEmits(['start-game']); 
const gameStore = useGameStore();

const today = new Date();
const inputYear = ref(today.getFullYear());
const inputMonth = ref(today.getMonth() + 1);

const handleStart = async () => {
  await gameStore.extractTopExpenses(inputYear.value, inputMonth.value);
  
  emit('start-game'); 
};
</script>

<template>
  <div class="setup-box">
    <h2>일단 다 담아!</h2>
    <div>🪙💰💴💶💷💸💳🧾</div>
    <p>원하는 아이템을 다 담아볼까요?</p>
    <div class="inputs">
      <select v-model="inputYear">
        <option :value="2025">2025년</option>
        <option :value="2026">2026년</option>
      </select>
      <select v-model="inputMonth">
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>
    </div>
    <button @click="handleStart">소비 내역 불러오기!</button>
  </div>
</template>

<style scoped>
.setup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: black;
}
select, button {
  padding: 10px;
  font-family: 'Mona12', sans-serif;
  font-size: 1.2rem;
}
button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Mona12', sans-serif;
}
button:hover {
  background-color: #ff5252;
}
</style>