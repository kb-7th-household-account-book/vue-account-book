<script setup>
import { GAME_CONFIG } from '@/constants/game';

defineProps({
  x: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="player" :style="{ left: `${x}px` }">
    <img 
      src="/images/player.png" 
      alt="플레이어"
      :style="{
        width: GAME_CONFIG.PLAYER_WIDTH + 'px',
        height: GAME_CONFIG.PLAYER_HEIGHT + 'px'
      }"
    />
  </div>
</template>

<style scoped>
.player {
  position: absolute;
  bottom: 30px;
  transform: translateX(-50%);
}

.player img {
  display: block;
  object-fit: contain;
}
</style>