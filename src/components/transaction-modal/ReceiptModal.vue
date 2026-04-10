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
              <span v-if="!isEditing" class="value">{{ editForm.date }}</span>
              <input
                v-else
                v-model="editForm.date"
                type="date"
                class="edit-input"
              />
            </div>
            <div class="row">
              <span class="label">TIME:</span>
              <span v-if="!isEditing" class="value">{{ editForm.time }}</span>
              <input
                v-else
                v-model="editForm.time"
                type="time"
                class="edit-input"
              />
            </div>
          </div>

          <div class="divider"></div>

          <div class="receipt-section">
            <div class="row">
              <span class="label">CATEGORY:</span>
              <span v-if="!isEditing" class="value">
                {{ editForm.categoryIcon }}{{ editForm.category }}
              </span>
              <div v-else class="edit-flex">
                <input
                  v-model="editForm.categoryIcon"
                  type="text"
                  class="edit-input short"
                  placeholder="이모지"
                />
                <input
                  v-model="editForm.category"
                  type="text"
                  class="edit-input"
                  placeholder="카테고리명"
                />
              </div>
            </div>

            <div class="memo-container">
              <span class="label">ITEM (Memo):</span>
              <div v-if="!isEditing" class="memo-box">
                {{ editForm.memo || '내용 없음' }}
              </div>
              <textarea
                v-else
                v-model="editForm.memo"
                class="edit-textarea"
                placeholder="메모를 입력하세요"
              ></textarea>
            </div>
          </div>

          <div class="divider"></div>

          <div class="receipt-total">
            <span class="label">TOTAL</span>

            <div v-if="!isEditing" class="amount" :class="editForm.type">
              {{ editForm.type === 'expense' ? '-' : '+' }}₩{{
                editForm.amount.toLocaleString()
              }}
            </div>

            <div v-else class="edit-flex right">
              <select
                v-model="editForm.type"
                class="edit-input short select-bg"
              >
                <option value="expense">지출(-)</option>
                <option value="income">수입(+)</option>
              </select>
              <input
                v-model.number="editForm.amount"
                type="number"
                class="edit-input amount-input"
              />
            </div>
          </div>

          <div class="receipt-footer">
            <img :src="receiptSvg" alt="영수증 바코드" class="barcode-img" />
            <p class="thank-you">THANK YOU</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          v-if="!isEditing"
          class="btn-icon btn-delete"
          @click="startDelete"
        >
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

        <button class="btn-text btn-edit" @click="toggleEdit">
          <template v-if="!isEditing">
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
          </template>
          <template v-else> 저장하기 </template>
        </button>

        <button class="btn-icon btn-close" @click="handleClose">
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
import { useTransactionStore } from '@/store/transactions';
import receiptSvg from '@/assets/icons/receipt.svg';

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);
const store = useTransactionStore();

const isDeleting = ref(false);
const isEditing = ref(false);

// 원본 데이터 보호 위해 복사본 만듦
const editForm = ref({ ...props.transaction });

const startDelete = () => {
  isDeleting.value = true;
  setTimeout(async () => {
    await store.deleteTransaction(props.transaction.id);
    emit('close');
  }, 1000); // 애니메이션 시간 확보
};

// 수정/저장 토글 로직
const toggleEdit = async () => {
  if (isEditing.value) {
    // 저장하기를 눌렀을 때: 스토어 업데이트 API 호출!
    await store.updateTransaction(props.transaction.id, editForm.value);
    isEditing.value = false; // 폼 닫기
  } else {
    // 수정하기를 눌렀을 때
    isEditing.value = true;
  }
};

// 닫기 로직 (수정 중에 닫으면 원상복구)
const handleClose = () => {
  if (isEditing.value) {
    editForm.value = { ...props.transaction }; // 수정한 거 초기화
    isEditing.value = false;
  } else {
    emit('close');
  }
};

const handleEsc = (e) => {
  if (e.key === 'Escape') handleClose();
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
.memo-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 👈 내용을 왼쪽 끝으로 밀착 */
  gap: 8px; /* 라벨과 메모 사이 간격 살짝 조정 */
  margin-top: 10px;
  width: 100%; /* 부모 너비 꽉 채우기 */
}

/* 영수증 컨테이너: 그리드를 사용하여 자식들이 정확히 겹치게 설정 */
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
  font-weight: normal;
  text-align: right;
}
.memo-box {
  width: 100%; /* 너비 확보 */
  padding: 4px 0; /* 좌우 여백을 없애서 라벨과 시작선을 일치시킴 */
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  min-height: 40px; /* 너무 길지 않게 적당히 조절 */
  line-height: 1.6;
  word-break: break-all;
  text-align: left; /* 텍스트 왼쪽 정렬 명시 */
  font-size: 13px; /* 원하는 크기로 숫자를 바꿔주세요 (예: 16px) */
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
.edit-textarea {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  padding: 12px;
  border-radius: 6px;
  width: 100%;
  min-height: 80px;
  resize: vertical;
  outline: none;
  text-align: left; /* 👈 입력창도 왼쪽 정렬 */
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
