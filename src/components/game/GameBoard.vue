<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Player from '@/components/game/Player.vue';
import { useGameStore } from '@/store/game';
import { categoryMeta } from '@/constants/category';

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
  // 플레이어 이동
  if (keys.ArrowLeft) playerX.value -= PLAYER_SPEED;
  if (keys.ArrowRight) playerX.value += PLAYER_SPEED;
  keepPlayerInside();

  // 아이템 낙하
  gameStore.fallingItems.forEach(item => {
    if (!item.isCaught) {
      item.y += ITEM_SPEED;
      
      // 화면 맨 아래를 벗어나면 삭제
      if (item.y > window.innerHeight) {
        item.isCaught = true; 
      }
    }
  });

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
    <div 
      v-for="item in gameStore.fallingItems" 
      :key="item.id"
      class="falling-item"
      v-show="!item.isCaught" 
      :style="{ left: `${item.x}px`, top: `${item.y}px` }"
    >
      <div 
        class="icon-badge"
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

.item-box {
  background-color: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translate(-50%, -50%); 
}

.price {
  font-weight: bold;
  color: #e74c3c;
  font-size: 1.1rem;
}

.title {
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
}

.icon-badge {
  font-size: 3rem;
}
</style>