<script setup>
import { ref } from 'vue';
import { useGameStore } from '@/store/game';

const gameStore = useGameStore();
const showDetails = ref(false);

const handleRetry = () => {
  window.location.reload(); 
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div class="result-box">
    <h2 class="title">🧾 지수님의 팩폭 영수증 🧾</h2>
    
    <div class="receipt-content">
      <p>신나게 주워 담으신 아이템들...</p>
      <p>알고 보니 전부 이번 달 지출이었습니다!</p>
      
      <div class="total-score">
        <span>총 결제 금액</span>
        <span class="price">{{ gameStore.score.toLocaleString() }}원</span>
      </div>
    </div>

    <!-- 상세 내역 섹션 -->
    <button @click="toggleDetails" class="detail-toggle-btn">
      {{ showDetails ? '내역 접기' : '내역 상세보기' }}
    </button>

    <div v-if="showDetails" class="detail-section">
      <div class="detail-list">
        <div v-for="(item, index) in gameStore.fallingItems" :key="index" class="detail-item">
          <div class="item-title">{{ item.title }}</div>
          <span class="item-icon">{{ item.icon }}</span>
          <div v-if="item.memo" class="item-memo">{{ item.memo }}</div>
          <span class="item-amount">{{ item.amount.toLocaleString() }}원</span>
        </div>
      </div>
    </div>

    <button class="retry-btn" @click="handleRetry">현실 부정하고 다시 하기</button>
  </div>
</template>

<style scoped>
.result-box {
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
  color: aqua;
  width: 100vb;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.receipt-content {
  border-top: 2px dashed #ccc;
  border-bottom: 2px dashed #ccc;
  padding: 30px 0;
  margin-bottom: 30px;
}

.total-score {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.price {
  color: #e74c3c;
}

.detail-toggle-btn {
  background: none;
  border: none;
  color: aqua;
  font-family: 'Mona12', sans-serif;
  text-decoration: underline;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.8;
  transition: all 0.2s;
}

.detail-toggle-btn:hover {
  opacity: 1;
  color: #fff;
}

.detail-section {
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid aqua;
  border-radius: 0;
  padding: 0;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
}

/* 픽셀 느낌의 스크롤바 */
.detail-section::-webkit-scrollbar {
  width: 16px;
}

.detail-section::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.7);
  border-left: 2px solid aqua;
}

.detail-section::-webkit-scrollbar-thumb {
  background: aqua;
  border: 2px solid #000;
  background-clip: padding-box;
}

.detail-section::-webkit-scrollbar-thumb:hover {
  background: #00ffff;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 2px solid rgba(0, 255, 255, 0.2);
  font-size: 0.9rem;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s;
  gap: 12px;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item:hover {
  background-color: rgba(0, 255, 255, 0.1);
}

.item-title {
  color: #fff;
  font-weight: bold;
  word-break: break-word;
  flex: 1;
  font-size: 0.95rem;
}

.item-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  min-width: 24px;
  text-align: center;
}

.item-memo {
  color: #bbb;
  font-size: 0.75rem;
  flex: 0.6;
  text-align: left;
  word-break: break-word;
}

.item-amount {
  color: #e74c3c;
  font-weight: bold;
  min-width: 110px;
  text-align: right;
  flex-shrink: 0;
}

.retry-btn {
  /* 1. 기본 구조 */
  position: relative;
  padding: 18px 24px;
  background-color: #fff700; /* 쨍한 노란색 */
  color: #000;              /* 글자는 깔끔한 블랙 */
  border: 4px solid #000;    /* 두꺼운 검정 테두리 */
  border-radius: 0;          /* 픽셀 느낌을 위해 둥근 모서리 제거 */
  
  /* 2. 텍스트 설정 */
  font-family: 'Mona12', sans-serif;
  font-size: 1.4rem;
  font-weight: 900;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  text-transform: uppercase;
  
  /* 3. ⭐️ 게임기 버튼 같은 입체 그림자 ⭐️ */
  /* 오른쪽 아래로 두꺼운 그림자를 줘서 튀어나온 것처럼 보이게 합니다 */
  box-shadow: 6px 6px 0px #000;
  
  /* 4. 애니메이션 부드럽게 */
  transition: all 0.1s;
}

/* 마우스를 올렸을 때 */
.retry-btn:hover {
  background-color: #fff;   /* 하얗게 반짝이는 효과 */
  transform: translate(-2px, -2px); /* 살짝 떠오르는 느낌 */
  box-shadow: 8px 8px 0px #000;    /* 그림자도 같이 깊어짐 */
}

/* ⭐️ 버튼을 실제로 클릭했을 때 (핵심!) ⭐️ */
.retry-btn:active {
  /* 그림자 두께만큼 이동시키면 실제로 버튼이 꾹 눌리는 효과가 납니다 */
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0px #000; /* 그림자가 거의 사라짐 */
}

/* (보너스) "내역 상세보기" 버튼도 결을 맞춰볼까요? */
button:not(.retry-btn) {
  background: none;
  border: none;
  color: aqua;
  font-family: 'Mona12', sans-serif;
  text-decoration: underline;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.8;
}

button:not(.retry-btn):hover {
  opacity: 1;
  color: #fff;
}
</style>