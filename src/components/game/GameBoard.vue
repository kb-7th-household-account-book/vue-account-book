<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Player from '@/components/game/Player.vue';
import { useGameStore } from '@/store/game';
import { categoryMeta } from '@/constants/category';
import { GAME_CONFIG } from '@/constants/game';

const emit = defineEmits(['game-over']);
const gameStore = useGameStore();

// 플레이어 초기 위치 (가운데)
const playerX = ref(GAME_CONFIG.BOARD_WIDTH / 2);

// 스코어 애니메이션 상태
const isBumping = ref(false);

// 점수가 오를 때마다 팡! 커지는 효과 트리거
watch(() => gameStore.score, (newScore, oldScore) => {
  if (newScore > oldScore) {
    isBumping.value = true;
    setTimeout(() => {
      isBumping.value = false;
    }, 150);
  }
});

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

/**
 * 플레이어 이동 제한 (히트박스 크기 반영)
 * 플레이어: 150px × 283px, centerX 기준으로 ±75px
 */
const keepPlayerInside = () => {
  const playerHalfWidth = GAME_CONFIG.PLAYER_WIDTH / 2; // 75px
  const minX = playerHalfWidth;
  const maxX = GAME_CONFIG.BOARD_WIDTH - playerHalfWidth;
  
  if (playerX.value < minX) playerX.value = minX;
  if (playerX.value > maxX) playerX.value = maxX;
};

let animationFrameId;

const gameLoop = () => {
  // 1. 이동 처리
  if (keys.ArrowLeft) playerX.value -= GAME_CONFIG.PLAYER_SPEED;
  if (keys.ArrowRight) playerX.value += GAME_CONFIG.PLAYER_SPEED;
  keepPlayerInside();

  // 2. [정밀 히트박스 설정]
  const playerBottom = window.innerHeight - 30; // bottom: 30px 기준
  const playerTop = playerBottom - GAME_CONFIG.PLAYER_HEIGHT;
  const playerLeft = playerX.value - (GAME_CONFIG.PLAYER_WIDTH / 2);
  const playerRight = playerX.value + (GAME_CONFIG.PLAYER_WIDTH / 2);

  // 3. 아이템 낙하 및 충돌 체크
  gameStore.fallingItems.forEach(item => {
    if (!item.isCaught) {
      item.y += GAME_CONFIG.ITEM_SPEED;
      
      // 아이템 크기를 픽셀로 변환 (1rem = 16px)
      const itemSizePx = item.size * 16;
      const itemHalfSize = itemSizePx / 2;
      const itemLeft = item.x - itemHalfSize;
      const itemRight = item.x + itemHalfSize;
      const itemTop = item.y - itemHalfSize;
      const itemBottom = item.y + itemHalfSize;
      
      // AABB (Axis-Aligned Bounding Box) 충돌 판정
      // 플레이어 크기(150 × 283)와 아이템의 정확한 교집합 판정
      const isColliding = 
        !(itemRight < playerLeft || itemLeft > playerRight || 
          itemBottom < playerTop || itemTop > playerBottom);

      if (isColliding) {
        item.isCaught = true; 
        gameStore.score += item.amount;
      } else if (item.y > window.innerHeight + 100) {
        // 화면 밖으로 나간 경우
        item.isCaught = true; 
      }
    }
  });

  // 4. 게임 종료 조건
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
      <p :class="{ 'bump': isBumping }">{{ gameStore.score.toLocaleString() }}</p>
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
  overflow: hidden;
  /* 배경은 부모(Game.vue)에서 설정한 이미지가 비쳐 보임 */
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  /* 전광판 깜빡임 효과 */
  animation: neon-glow 1s infinite alternate;
}

.score-board p {
  color: #fff700; 
  font-size: 2.5rem;
  font-family: 'Mona12', sans-serif;
  text-shadow: 
    -2px -2px 0 #000, 
     2px -2px 0 #000, 
    -2px  2px 0 #000, 
     2px  2px 0 #000,
     6px  6px 0px #222;
     
  transition: transform 0.1s ease-out;
  display: inline-block;
}

/* 점수 획득 시 펌핑 효과 */
.score-board p.bump {
  transform: scale(1.2);
  color: #ffffff; /* 순간적으로 흰색 발광 */
  text-shadow: 0 0 15px #fff700;
}

.falling-item {
  position: absolute;
  pointer-events: none; 
}

.icon-badge {
  transform: translate(-50%, -50%); 
  line-height: 1;
}

@keyframes neon-glow {
  from { opacity: 0.85; }
  to { opacity: 1; }
}
</style>