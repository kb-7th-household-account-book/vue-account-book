<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="receipt-container" :class="{ tearing: isDeleting }">
        <div
          v-for="part in ['top-piece', 'bottom-piece']"
          :key="part"
          :class="['receipt', part]"
        >
          <div class="receipt-header">
            <h2>NOIR VAULT</h2>
            <p>RECEIPT OF TRANSACTION</p>
          </div>

          <div class="divider"></div>

          <div class="receipt-section">
            <div class="row">
              <span class="label">DATE:</span>
              <span class="value">{{ transaction.date }}</span>
            </div>
            <div class="row">
              <span class="label">TIME:</span>
              <span class="value">{{ transaction.time }}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="receipt-section">
            <div class="row">
              <span class="label">CATEGORY:</span>
              <span class="value">
                {{ transaction.categoryIcon }}{{ transaction.category }}
              </span>
            </div>

            <div class="memo-container">
              <span class="label">ITEM (Memo):</span>
              <div class="memo-box">
                {{ transaction.memo || '내용 없음' }}
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="receipt-total">
            <span class="label">TOTAL</span>
            <div
              class="amount"
              :class="{
                expense: transaction.type === 'expense',
                income: transaction.type === 'income',
              }"
            >
              {{ transaction.type === 'expense' ? '-' : '+' }}₩{{
                transaction.amount.toLocaleString()
              }}
            </div>
          </div>

          <div class="receipt-footer">
            <img :src="receiptSvg" alt="영수증 바코드" class="barcode-img" />
            <p class="thank-you">THANK YOU</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn-icon btn-delete" @click="startDelete">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
              fill="#ff4d4d"
            />
          </svg>
        </button>

        <button class="btn-text btn-edit" @click="$emit('edit')">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/vue"
          >
            <path
              d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
              fill="black"
            />
          </svg>
          수정하기
        </button>

        <button class="btn-icon btn-close" @click="$emit('close')">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="#999"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import receiptSvg from '@/assets/icons/receipt.svg';

const props = defineProps({
  transaction: {
    type: Object,
    default: () => ({
      id: 1,
      date: '2026.04.08',
      time: '19:00',
      category: '식비',
      categoryIcon: '🍜',
      memo: '가족 외식',
      amount: 215000,
      type: 'expense',
    }),
  },
});

const emit = defineEmits(['close', 'edit', 'delete']);
const isDeleting = ref(false);

const startDelete = () => {
  isDeleting.value = true;
  setTimeout(() => {
    emit('delete', props.transaction.id);
    emit('close');
  }, 1000); // 애니메이션 시간 확보
};

const handleEsc = (e) => {
  if (e.key === 'Escape') emit('close');
};

onMounted(() => window.addEventListener('keydown', handleEsc));
onUnmounted(() => window.removeEventListener('keydown', handleEsc));
</script>

<style scoped>
/* 배경 및 기본 정렬 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 🌟 영수증 컨테이너: 그리드를 사용하여 자식들이 정확히 겹치게 설정 */
.receipt-container {
  display: grid;
  grid-template-areas: 'overlap';
  width: 320px;
  min-height: 500px;
}

/* 🧾 영수증 스타일 (인호 님 원본 스타일 보존) */
.receipt {
  grid-area: overlap; /* 🌟 정확하게 한 자리에 겹침 */
  background-color: #111113;
  width: 320px;
  padding: 30px 24px;
  border-radius: 8px;
  color: #d1d1d1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  /* 찢어지기 전에는 하나의 영수증처럼 보이게 설정 */
}

/* 영수증 내부 디테일 */
.receipt-header {
  text-align: center;
  margin-bottom: 20px;
}
.receipt-header h2 {
  font-size: 20px;
  color: #fff;
  letter-spacing: 2px;
  margin: 0 0 5px 0;
}
.receipt-header p {
  font-size: 10px;
  color: #888;
  margin: 0;
  letter-spacing: 1px;
}
.divider {
  border-top: 1px dashed #444;
  margin: 15px 0;
}
.receipt-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.label {
  color: #888;
  font-size: 14px;
}
.value {
  color: #fff;
  font-weight: bold;
  text-align: right;
}
.memo-box {
  padding: 16px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  min-height: 65px;
  line-height: 1.5;
  word-break: break-all;
}
.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-weight: bold;
}
.receipt-total .label {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.amount {
  font-size: 23px !important;
  font-weight: bold;
}
.amount.expense {
  color: #ff4d4d;
}
.amount.income {
  color: #4da6ff;
}
.barcode-img {
  width: 100%;
  height: auto;
  max-height: 40px;
  margin-bottom: 10px;
}
.thank-you {
  font-size: 12px;
  color: #666;
  letter-spacing: 2px;
  text-align: center;
}

/* 🎬 찢어지는 비행 애니메이션 로직 */

/* 상단 조각: 지그재그 윗부분 + 위로 날아감 */
.tearing .top-piece {
  pointer-events: none;
  z-index: 2;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 50%,
    95% 46%,
    90% 52%,
    85% 47%,
    80% 51%,
    75% 46%,
    70% 53%,
    65% 47%,
    60% 52%,
    55% 46%,
    50% 54%,
    45% 47%,
    40% 52%,
    35% 46%,
    30% 53%,
    25% 47%,
    20% 52%,
    15% 46%,
    10% 53%,
    5% 47%,
    0% 52%
  );
  animation: fly-away-up 0.8s forwards ease-in 0.2s;
}

/* 하단 조각: 지그재그 아랫부분 + 아래로 날아감 */
.tearing .bottom-piece {
  pointer-events: none;
  z-index: 1;
  clip-path: polygon(
    0% 52%,
    5% 47%,
    10% 53%,
    15% 46%,
    20% 52%,
    25% 47%,
    30% 53%,
    35% 46%,
    40% 52%,
    45% 47%,
    50% 54%,
    55% 46%,
    60% 52%,
    65% 47%,
    70% 53%,
    75% 46%,
    80% 52%,
    85% 47%,
    90% 53%,
    95% 46%,
    100% 50%,
    100% 100%,
    0% 100%
  );
  animation: fly-away-down 0.8s forwards ease-in 0.2s;
}

/* 상단 비상 키프레임 */
@keyframes fly-away-up {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-600px) rotate(-15deg);
    opacity: 0;
  }
}

/* 하단 추락 키프레임 */
@keyframes fly-away-down {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(600px) rotate(15deg);
    opacity: 0;
  }
}

/* 버튼 스타일 (인호 님 원본) */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: #2a2a2b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn-delete {
  background-color: #3d1c24;
}
.btn-text {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  color: #000;
  border-radius: 24px;
  padding: 0 24px;
  height: 48px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>
