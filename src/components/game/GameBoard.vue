<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Player from '@/components/game/Player.vue';
import { useGameStore } from '@/store/game';
import { categoryMeta } from '@/constants/category';

const emit = defineEmits(['game-over']);
const gameStore = useGameStore();
const playerX = ref(window.innerWidth / 2);

const PLAYER_SPEED = 7; 
const ITEM_SPEED = 2;

const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

const handleKeyDown = (event) => {
  if (keys.hasOwnProperty(event.key)) keys[event.key] = true;
};

const handleKeyUp = (event) => {
  if (keys.hasOwnProperty(event.key)) keys[event.key] = false;
};

const keepPlayerInside = () => {
  const minX = 30; 
  const maxX = window.innerWidth - 30; 
  if (playerX.value < minX) playerX.value = minX;
  if (playerX.value > maxX) playerX.value = maxX;
};

let animationFrameId;

const gameLoop = () => {
  if (keys.ArrowLeft) playerX.value -= PLAYER_SPEED;
  if (keys.ArrowRight) playerX.value += PLAYER_SPEED;
  keepPlayerInside();

  const PLAYER_Y_ZONE = window.innerHeight - 100;

  gameStore.fallingItems.forEach(item => {
    if (!item.isCaught) {
      item.y += ITEM_SPEED;
      
      const isAtPlayerY = item.y >= PLAYER_Y_ZONE && item.y <= window.innerHeight;
      const itemHitRadius = (item.size * 16) / 2; 
      const playerHitRadius = 40; 
      const isAtPlayerX = Math.abs(item.x - playerX.value) < (itemHitRadius + playerHitRadius);

      if (isAtPlayerY && isAtPlayerX) {
        item.isCaught = true; 
        gameStore.score += item.amount;
      } else if (item.y > window.innerHeight + 100) {
        item.isCaught = true; 
      }
    }
  });

  // 종료 조건: 아이템이 생성되었고 && 모든 아이템이 사라졌을 때
  const isGameOver = gameStore.fallingItems.length > 0 && gameStore.fallingItems.every(item => item.isCaught);

  if (isGameOver) {
    cancelAnimationFrame(animationFrameId); 
    emit('game-over'); 
    return;
  }

  animationFrameId = requestAnimationFrame(gameLoop);
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  animationFrameId = requestAnimationFrame(gameLoop);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <div class="board">
    <div class="score-board">
      획득한 금액 💰 <span>{{ gameStore.score.toLocaleString() }}</span>원
    </div>

    <div 
      v-for="item in gameStore.fallingItems" 
      :key="item.id"
      class="falling-item"
      v-show="!item.isCaught" 
      :style="{ left: `${item.x}px`, top: `${item.y}px` }"
    >
      <div 
        class="icon-badge"
        :style="{ fontSize: `${item.size}rem` }"
      >
        {{ categoryMeta[item.category]?.icon || '💸' }}
      </div>
    </div>

    <Player :x="playerX" />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0; 
  overflow: hidden;
}

.falling-item {
  position: absolute;
  pointer-events: none; 
}

.icon-badge {
  transform: translate(-50%, -50%); 
  line-height: 1;
}

.score-board {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%); 
  font-size: 2rem;
  font-weight: 900;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 30px;
  border-radius: 50px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  z-index: 100; 
  white-space: nowrap;
}

.score-board span {
  color: #ff4757; 
  font-size: 2.5rem;
}
</style>