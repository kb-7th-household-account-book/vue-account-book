<script setup>
import { ref } from 'vue';
import GameSetup from '@/components/game/GameSetup.vue';
import GameBoard from '@/components/game/GameBoard.vue';

// -- 게임 상태 관리 --
// READY -> PLAYING -> END
const currentPhase = ref('READY');

const startGamePhase = () => {
  currentPhase.value = 'PLAYING'; 
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
    />

  </div>
</template>

<style scoped>
.game-page-container {
  width: 100%;
  height: calc(100vh - 61px);
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>