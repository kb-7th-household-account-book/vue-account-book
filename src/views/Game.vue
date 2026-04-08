<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Player from '@/components/game/Player.vue';

const playerX = ref(window.innerWidth / 2);

// 한 프레임(약 1/60초)당 이동할 속도. 
// 프레임 단위로 계속 실행되므로 기존 40에서 훨씬 작은 숫자로 줄여야 부드럽습니다.
const SPEED = 7; 

// 1. 현재 눌려있는 키의 상태를 저장하는 객체
const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

// 2. 키가 눌렸을 때 (상태를 true로)
const handleKeyDown = (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
};

// 3. 키에서 손을 뗐을 때 (상태를 false로)
const handleKeyUp = (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
};

// 4. 화면 밖 이탈 방지
const keepPlayerInside = () => {
  const minX = 30; 
  const maxX = window.innerWidth - 30; 
  
  if (playerX.value < minX) playerX.value = minX;
  if (playerX.value > maxX) playerX.value = maxX;
};

// 5. ⭐️ 핵심: 브라우저 주사율(보통 60fps)에 맞춰 계속 실행되는 게임 루프
let animationFrameId;

const gameLoop = () => {
  // 왼쪽 키가 눌려있으면 계속 빼기
  if (keys.ArrowLeft) {
    playerX.value -= SPEED;
    }
  
  // 오른쪽 키가 눌려있으면 계속 더하기
  if (keys.ArrowRight) {
    playerX.value += SPEED;
  }

  keepPlayerInside();

  // 다음 프레임에 자신을 다시 호출하여 무한 반복
  animationFrameId = requestAnimationFrame(gameLoop);
};

// 이벤트 리스너 등록 & 해제
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp); // keyup 이벤트 추가

  // 컴포넌트 마운트 시 게임 루프 가동!
  animationFrameId = requestAnimationFrame(gameLoop);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);

  // 컴포넌트 파괴 시 게임 루프 정지 (메모리 누수 방지)
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <div class="board">
    <Player :x="playerX" />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  width: 100%;
  height: calc(100vh - 61px);
  background-color: #f0f0f0; 
  overflow: hidden;
}
</style>