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
  <div class="setup-container">
    <p class="game-title">NOIR VAULT</p>
    
    <div class="setup-box">
      <div class="inputs">
        <select v-model="inputYear">
          <option :value="2025">2025년</option>
          <option :value="2026">2026년</option>
        </select>
        <select v-model="inputMonth">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
        </select>
      </div>
      <button class="play-button" @click="handleStart">
        <img src="/images/play.png" alt="play" width="200" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.setup-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* ⭐️ 전체 요소를 중앙 정렬하기 쉽게 flex 설정 */
  display: flex;
  flex-direction: column;
  align-items: center; 
}

/* ⭐️ 정중앙 상단 타이틀 */
.game-title {
  position: absolute;
  top: 150px;   /* 상단에서 적당히 내려오게 조정 */
  left: 50%;    /* 왼쪽에서 50% 지점 */
  transform: translateX(-50%); /* 본인 너비의 절반만큼 왼쪽으로 밀어서 완벽한 중앙 */
  font-weight: 600;
  color: aqua; /* 지수님의 aqua 유지! */
  font-size: 6rem; /* 중앙이니까 좀 더 크게 키워봤어요 */
  margin: 0;
  text-align: center;
  white-space: nowrap; /* 글자가 줄바꿈되지 않게 고정 */
  
  /* 아케이드 느낌을 위한 입체 그림자 */
  text-shadow: 6px 6px 0px #000;
}

.setup-box {
  display: flex;
  flex-direction: column;
  align-items: center; /* ⭐️ 박스 내부 요소(select, button)도 중앙 정렬 */
  gap: 30px;
  
  /* ⭐️ 하단에 배치하기 위해 padding-top 조절 */
  padding-top: 500px; 
}

.inputs {
  display: flex;
  gap: 15px; /* 연도와 월 사이 간격 */
}

select {
  padding: 12px 20px;
  font-family: 'Mona12', sans-serif;
  font-size: 1.2rem;
  border: 3px solid #000;
  background: #fff;
}

.play-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  /* ⭐️ 버튼이 살짝 두근거리는 효과 (선택사항) */
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>