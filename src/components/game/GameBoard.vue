<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Player from '@/components/game/Player.vue';
import { useGameStore } from '@/store/game';
import { categoryMeta } from '@/constants/category';
import { GAME_CONFIG } from '@/constants/game';

const emit = defineEmits(['game-over']);
const gameStore = useGameStore();
const playerX = ref(GAME_CONFIG.BOARD_WIDTH / 2);

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
  const minX = 40; 
  const maxX = GAME_CONFIG.BOARD_WIDTH - 40; 
  if (playerX.value < minX) playerX.value = minX;
  if (playerX.value > maxX) playerX.value = maxX;
};

let animationFrameId;

const gameLoop = () => {
  if (keys.ArrowLeft) playerX.value -= GAME_CONFIG.PLAYER_SPEED;
  if (keys.ArrowRight) playerX.value += GAME_CONFIG.PLAYER_SPEED;
  keepPlayerInside();

  const PLAYER_Y_ZONE = window.innerHeight - 100;

  gameStore.fallingItems.forEach(item => {
    if (!item.isCaught) {
      item.y += GAME_CONFIG.ITEM_SPEED;
      
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
      SCORE
    <p>{{ gameStore.score.toLocaleString() }}</p>
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
  padding: 15px 30px;
  z-index: 100; 
  white-space: nowrap;
  color: black;
}

.score-board p {
  color: #fff700; 
  font-size: 2.5rem;
  
  /* ⭐️ 마법의 한 줄: X축이동 Y축이동 번짐(0) 색상 */
  text-shadow: 4px 4px 0px #000000; 
  
  /* (보너스) 글자 주변에 까만 테두리까지 넣으면 훨씬 게임판 점수 같습니다! */
  /* 아래 코드를 쓰시려면 위의 text-shadow 대신 이거 하나만 쓰시면 됩니다. */
  /* text-shadow: 
    -2px -2px 0 #000, 
     2px -2px 0 #000, 
    -2px  2px 0 #000, 
     2px  2px 0 #000,
     6px  6px 0px #222; /* 이게 핵심 입체 그림자! */
}
</style>