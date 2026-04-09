<script setup>
import { ref } from 'vue';
import GameSetup from '@/components/game/GameSetup.vue';
import GameBoard from '@/components/game/GameBoard.vue';
import GameResult from '@/components/game/GameResult.vue';

const currentPhase = ref('READY');

const startGamePhase = () => {
  currentPhase.value = 'PLAYING'; 
};

const handleGameOver = () => {
  currentPhase.value = 'LOADING'; 

  setTimeout(() => {
    currentPhase.value = 'END'; 
  }, 1500);
};
</script>

<template>
  <div class="top-container">
    <!-- <button @click="handleGameOver">게임끝내기</button> --> -->
    <div class="game-page-container">
      <GameSetup 
        v-if="currentPhase === 'READY'" 
        @start-game="startGamePhase" 
      />

      <GameBoard 
        v-else-if="currentPhase === 'PLAYING'" 
        @game-over="handleGameOver" 
      />

      <div v-else-if="currentPhase === 'LOADING'" class="loading-screen">
        <h1>🧾 팩트 폭격 준비 중... 🧾</h1>
      </div>

      <GameResult 
        v-else-if="currentPhase === 'END'" 
      />
    </div>
  </div>
</template>

<style scoped>
.top-container {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important; 

  font-family: 'Mona12', sans-serif;
  justify-content: center;
  display: flex;
}

.game-page-container {
  width: 720px;
  height: calc(100vh - 61px);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url('/public/images/game-start-2.gif');
  overflow: hidden;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.25rem;
  color: aqua;
  animation: blink 1s infinite alternate;
}
</style>
