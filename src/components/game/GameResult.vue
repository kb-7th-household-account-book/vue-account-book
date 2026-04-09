<script setup>
import { useGameStore } from '@/store/game';

const gameStore = useGameStore();

const handleRetry = () => {
  window.location.reload(); 
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

    <button class="retry-btn" @click="handleRetry">현실 부정하고 다시 하기</button>
  </div>
</template>

<style scoped>
.result-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
  color: #333;
  width: 400px;
  border-top: 15px solid #333;
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

.retry-btn {
  padding: 12px 24px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
}

.retry-btn:hover {
  background-color: #555;
}
</style>