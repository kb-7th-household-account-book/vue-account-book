<script setup>
import { ref } from 'vue';
import GameSetup from '@/components/game/GameSetup.vue';
import GameBoard from '@/components/game/GameBoard.vue';

const currentPhase = ref('READY');

const startGamePhase = () => {
  currentPhase.value = 'PLAYING'; 
};

const handleGameOver = () => {
  currentPhase.value = 'END'; 
};
</script>

<template>
  <div class="game-page-container">
    
    <GameSetup 
      v-if="currentPhase === 'READY'" 
      @start-game="startGamePhase" 
    />

    <GameBoard 
      v-else-if="currentPhase === 'PLAYING'" 
      @game-over="handleGameOver" 
    />

    <div v-else-if="currentPhase === 'END'" class="ending-screen">
      <h1>팩트 폭격 준비 중... 🧾</h1>
    </div>

  </div>
</template>

<style scoped>
.game-page-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9ecef;
  overflow: hidden; /* 안전장치 */
}

.ending-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  background-color: #fff;
  color: black;
}
</style>

<style>
html, body {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important; 
}
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>