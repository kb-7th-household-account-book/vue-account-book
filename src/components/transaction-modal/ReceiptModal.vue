<template>
  <div class="modal-overlay" @click.self="handleClose">
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
                {{ displayCategory.icon }} {{ displayCategory.label }}
              </span>

              <select
                v-else
                v-model="editForm.category"
                class="edit-input select-bg"
              >
                <option
                  v-for="cat in store.categoriesList"
                  :key="cat.id"
                  :value="cat.name"
                >
                  {{ cat.icon }} {{ cat.label }}
                </option>
              </select>
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

          <div class="receipt-total" :class="{ 'editing-total': isEditing }">
            <span class="label">TOTAL</span>

            <div v-if="!isEditing" class="amount" :class="editForm.type">
              {{ editForm.type === 'expense' ? '-' : '+' }}₩{{
                editForm.amount.toLocaleString()
              }}
            </div>
            <div v-else class="edit-total-wrapper">
              <div class="type-toggle">
                <button
                  type="button"
                  :class="['type-btn', { active: editForm.type === 'income' }]"
                  @click="editForm.type = 'income'"
                >
                  수입
                </button>
                <button
                  type="button"
                  :class="['type-btn', { active: editForm.type === 'expense' }]"
                  @click="editForm.type = 'expense'"
                >
                  지출
                </button>
              </div>

              <div class="amount-wrapper">
                <span class="currency">₩</span>
                <input
                  v-model.number="editForm.amount"
                  type="number"
                  class="amount-input"
                />
              </div>
            </div>
          </div>

          <div class="receipt-footer">
            <img :src="receiptSvg" alt="영수증 바코드" class="barcode-img" />
            <p class="thank-you">THANK YOU</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <template v-if="!isEditing">
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
          <button class="btn-text btn-edit" @click="toggleEdit">
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
        </template>

        <template v-else>
          <button class="btn-icon btn-cancel-edit" @click="handleClose">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <button class="btn-save-edit" @click="toggleEdit">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            저장
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
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

// 카테고리 변환 로직
const displayCategory = computed(() => {
  const rawCategory = editForm.value.category; // 예: "FOOD", "COFFEE"

  // 1. 만약 스토어에 카테고리 데이터가 아직 안 불러와졌다면? (방어 코드)
  if (!store.categoriesList || store.categoriesList.length === 0) {
    return { icon: editForm.value.categoryIcon || '📌', label: rawCategory };
  }

  // 2. 스토어 목록에서 db.json의 name이나 id와 일치하는 것을 찾음
  const found = store.categoriesList.find((c) => {
    const target = String(rawCategory).trim().toUpperCase();
    return (
      String(c.name).toUpperCase() === target || // "FOOD" 매칭
      String(c.id).toUpperCase() === target || // "1" 매칭
      String(c.label).toUpperCase() === target // "식비" 매칭
    );
  });

  // 3. 찾았다면 db.json에 있는 아이콘(🍜)과 한글 라벨(식비) 반환!
  if (found) {
    return { icon: found.icon, label: found.label };
  }

  // 그래도 못 찾으면 원본 반환
  return { icon: editForm.value.categoryIcon || '📌', label: rawCategory };
});

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
  text-align: right;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  /*font-weight: bold !important; 
  font-size: 16px !important;*/
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
.edit-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  text-align: right;
  outline: none;
  font-size: 14px;
  font-weight: normal;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  color-scheme: dark;
}
select.select-bg {
  width: auto;
  text-align: right;
  cursor: pointer;
}
select.select-bg option {
  background-color: #111113;
  color: #fff;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-weight: bold;
}
.receipt-total.editing-total {
  align-items: flex-start;
} /* 수정 시 토글버튼 공간 확보 */
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
/* 🌟 수입/지출 토글 및 금액 입력 래퍼 */
.edit-total-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.type-toggle {
  display: flex;
  background: #222;
  border-radius: 4px;
  overflow: hidden;
}
.type-btn {
  background: transparent;
  border: none;
  color: #888;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.type-btn.active:first-child {
  background: #4da6ff;
  color: #fff;
} /* 수입: 파란색 */
.type-btn.active:last-child {
  background: #ff4d4d;
  color: #fff;
} /* 지출: 빨간색 */

.amount-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  border-radius: 6px;
}
.amount-wrapper .currency {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.amount-input {
  background: transparent;
  border: none;
  width: 110px;
  font-size: 20px;
  color: #fff;
  text-align: right;
  outline: none;
  font-weight: bold;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  -moz-appearance: textfield;
}
.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0; /* 크롬, 사파리, 엣지 화살표 숨기기 */
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
  align-items: center;
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
.btn-cancel-edit {
  background-color: #2a2a2b;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.btn-save-edit {
  background-color: #00d26a;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px;
  height: 48px;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 15px rgba(0, 210, 106, 0.3);
}
.btn-save-edit:hover {
  transform: scale(1.05);
}
.btn-cancel-edit:hover {
  background-color: #444;
}
</style>
