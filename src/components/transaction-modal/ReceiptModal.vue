<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="receipt">
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

      <div class="action-buttons">
        <button class="btn-icon btn-delete" @click="$emit('delete')">
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
            xmlns="http://www.w3.org/2000/svg"
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
import { onMounted, onUnmounted } from 'vue'; // 🌟 1. 생명주기 함수 가져오기
import receiptSvg from '@/assets/icons/receipt.svg';
// 부모 컴포넌트(팀원 리스트)에서 이 데이터를 넘겨줄 겁니다!
const props = defineProps({
  transaction: {
    type: Object,
    // 데이터가 안 넘어왔을 때 보여줄 임시 가짜 데이터 (작업용)
    default: () => ({
      id: 1,
      date: '2026.04.08',
      time: '19:00',
      category: '식비',
      categoryIcon: '🍜',
      memo: '가족 외식',
      amount: 215000,
      type: 'expense', // 'expense' | 'income'
    }),
  },
});

// 부모에게 보낼 이벤트들
const emit = defineEmits(['close', 'edit', 'delete']);

// ESC 키 눌렀을 때 실행될 함수
const handleEsc = (e) => {
  if (e.key === 'Escape') {
    emit('close'); // 부모한테 닫으라고 신호 보내기!
  }
};

// 컴포넌트가 화면에 나타날 때(Mounted) 리스너 등록
onMounted(() => {
  window.addEventListener('keydown', handleEsc);
});

// 컴포넌트가 사라질 때(Unmounted) 리스너 제거 (중요!)
onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc);
});
</script>

<style scoped>
/* 전체 화면 덮는 어두운 배경 */
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

/* 모달 전체 컨테이너 */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 🧾 영수증 디자인 */
.receipt {
  background-color: #111113; /* 다크모드 영수증 배경 */
  width: 320px;
  padding: 30px 24px;
  border-radius: 8px;
  color: #d1d1d1;
  font-family: 'Courier Prime', monospace; /* 영수증 특유의 폰트 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}

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

/* 점선 구분선 */
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
  align-items: center; /*삭제 가능함*/
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
.memo-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.memo-box {
  padding: 16px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  min-height: 65px; /* 여기서 메모 박스의 높이를 조절할 수 있습니다! */
  line-height: 1.5;
  word-break: break-all; /* 글자가 길어지면 자동으로 줄바꿈 */
}
.memo-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.memo-text {
  margin: 0;
  color: #fff;
  font-size: 14px;
}

/* 합계 영역 */
.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-weight: bold;
  color: #ff3b30;
}
.receipt-total .label {
  font-weight: bold;
  font-size: 16px;
}
.receipt-total .amount {
  font-size: 23px !important;
  font-weight: bold;
}
.amount.expense {
  font-size: 20px;
  color: #ff4d4d;
} /* 지출은 빨간색 */
.amount.income {
  font-size: 20px;
  color: #ffffff;
} /* 수입은 파란색 */

/* 하단 바코드 & 인사말 */
.receipt-footer {
  text-align: center;
  margin-top: 30px;
}
.barcode {
  height: 30px;
  width: 100%;
  /* 바코드 무늬를 그라데이션으로 구현 */
  background: repeating-linear-gradient(
    90deg,
    #fff,
    #fff 2px,
    transparent 2px,
    transparent 4px,
    #fff 4px,
    #fff 5px,
    transparent 5px,
    transparent 8px
  );
  opacity: 0.3;
  margin-bottom: 10px;
}
.thank-you {
  font-size: 12px;
  color: #666;
  letter-spacing: 2px;
  margin: 0;
}

/* 🔘 하단 플로팅 버튼들 */
.action-buttons {
  display: flex;
  gap: 12px;
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
  transition: all 0.2s;
}
.btn-icon:hover {
  background-color: #3a3a3b;
}

.btn-delete {
  background-color: #3d1c24;
} /* 삭제 버튼은 약간 붉은 배경 */
.btn-delete:hover {
  background-color: #4d232d;
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  color: #000;
  border: none;
  padding: 0 24px;
  height: 48px;
  border-radius: 24px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-text:hover {
  background-color: #e0e0e0;
}
.barcode-img {
  width: 100%; /* 영수증 가로폭에 꽉 차게 */
  height: auto; /* 높이는 비율에 맞춰서 자동 조절 */
  max-height: 40px; /* 너무 뚱뚱해지지 않게 최대 높이만 제한 */
  margin-bottom: 10px;
}
.field-box {
  padding: 6px 12px; /* 박스 안쪽 여백 */
  border-radius: 4px; /* 모서리 둥글게 */
  color: #fff; /* 글씨 색상을 하얀색으로 */
  font-size: 14px; /* 글씨 크기 */
  min-width: 140px; /* 박스의 가로 최소 길이를 고정해서 삐뚤빼뚤해지지 않게 함 */
  text-align: right;
}
.receipt-total .label {
  color: #fff; /* 👈 TOTAL 글씨는 다시 하얀색으로! */
  font-size: 20px; /* 👈 16px에서 20px 정도로 키우면 시원시원합니다! */
  font-weight: bold; /* 👈 더 굵게 강조 */
}
</style>
