<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay">
        <div class="modal-box">
          <div class="modal-header">
            <h3>{{ initialData ? '고정지출 수정' : '고정지출 추가' }}</h3>
            <button @click="close" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <label>시작일 설정</label>
              <input
                type="date"
                v-model="expenseData.start_date"
                class="input-dark"
                @change="updateDayFromDate"
              />
            </div>
            <div class="input-group">
              <label>고정지출 내역</label>
              <input
                type="text"
                v-model="expenseData.title"
                placeholder="예: 월세, 넷플릭스 구독료 등"
                class="input-dark"
              />
            </div>
            <div class="input-group">
              <label>금액</label>
              <div class="amount-input-wrapper">
                <span class="currency">₩</span>
                <input
                  type="number"
                  v-model="expenseData.amount"
                  placeholder="0"
                  class="input-dark amount-input"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="close" class="btn-cancel">취소</button>
            <button @click="save" class="btn-save">
              {{ initialData ? '수정 완료' : '저장' }} &#10003;
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useCalendarStore } from '@/store/calendar';

// 부모에게서 모달 노출 여부를 props로 받습니다.
const props = defineProps({
  show: Boolean,
  initialData: Object,
  getToday: Function,
});

// 부모에게 닫기(close)와 저장(save) 신호를 보냅니다.
const emit = defineEmits(['close', 'save']);

const calendarStore = useCalendarStore(); // 2. 스토어 사용 준비

// 입력 폼 데이터를 저장할 반응형 객체
const expenseData = reactive({
  id: null, // ⭐ id 필드 추가
  start_date: props.getToday(),
  day: parseInt(props.getToday().split('-')[2]),
  title: '',
  amount: 0,
});

const updateDayFromDate = () => {
  if (expenseData.start_date) {
    expenseData.day = parseInt(expenseData.start_date.split('-')[2]);
  }
};

// 모달이 열릴 때마다 입력 폼 초기화 (선택 사항)
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      if (props.initialData) {
        // [수정 모드] 데이터 채우기
        expenseData.id = props.initialData.id;
        expenseData.title = props.initialData.title;
        expenseData.amount = props.initialData.expense; // 금액 매칭
        expenseData.start_date = props.initialData.start_date;
        expenseData.day = props.initialData.day;
      } else {
        // [추가 모드] 초기화
        const today = props.getToday();
        expenseData.id = null;
        expenseData.title = '';
        expenseData.amount = 0;
        expenseData.start_date = today;
        expenseData.day = parseInt(today.split('-')[2]);
      }
    }
  },
);

const close = () => {
  emit('close');
};

const save = () => {
  // 간단한 유효성 검사 (금액 숫자 변환 등) 후 부모에게 데이터 전달
  const finalData = {
    id: expenseData.id,
    title: expenseData.title,
    expense: Number(expenseData.amount),
    start_date: expenseData.start_date,
    day: expenseData.day,
  };

  if (!finalData.start_date || !finalData.title || finalData.expense === 0) {
    alert('모든 항목을 올바르게 입력해주세요.');
    return;
  }

  emit('save', finalData);

  close();
};
</script>

<style scoped>
/* 1. ⭐ 모달 오버레이 (배경 흐리게 + 화면 중앙 정렬) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 반투명 배경 */
  backdrop-filter: blur(5px); /* ⭐ 배경 흐리게 처리 (blur) */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 요소보다 위에 오도록 */
}

/* 2. 실제 모달 상자 (image_6.png 스타일 반영) */
.modal-box {
  width: 100%;
  max-width: 450px; /* 적당한 모달 너비 */
  background-color: #1a1a1a; /* 짙은 회색 배경 */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* 3. 모달 헤더 (보라색 영역) */
.modal-header {
  background-color: #ad46ff; /* 이미지의 보라색 적용 */
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}
.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.close-btn:hover {
  color: white;
}

.input-dark {
  color-scheme: dark; /* 달력 팝업 어둡게 */
}
.input-dark::-webkit-calendar-picker-indicator {
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(240deg); /* 보라색 아이콘 */
}

/* 4. 모달 본문 (입력 폼) */
.modal-body {
  padding: 25px 20px;
}
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
}

/* 5. 짙은색 인풋 스타일 */
.input-dark {
  width: 100%;
  background-color: #262626; /* 입력창 배경 */
  border: 1px solid #333; /* 옅은 테두리 */
  color: white;
  padding: 12px 15px;
  border-radius: 12px;
  font-size: 14px;
  box-sizing: border-box; /* 패딩 포함 너비 계산 */
  transition: border-color 0.2s;
}
.input-dark::placeholder {
  color: #555;
}
.input-dark:focus {
  outline: none;
  border-color: #ad46ff; /* 포커스 시 보라색 테두리 */
}

/* 금액 입력창 (₩ 표시 포함) */
.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.currency {
  position: absolute;
  left: 15px;
  color: #666;
  font-size: 16px;
}
.amount-input {
  padding-left: 35px; /* ₩ 기호 공간 확보 */
  font-size: 16px;
}

/* 6. 모달 푸터 (버튼 영역) */
.modal-footer {
  padding: 0 20px 25px 20px;
  display: flex;
  gap: 15px;
}
.btn-cancel,
.btn-save {
  flex: 1; /* 버튼 너비 똑같이 나눠갖기 */
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-cancel:hover,
.btn-save:hover {
  opacity: 0.9;
}

/* 취소 버튼 스타일 (어두운 회색) */
.btn-cancel {
  background-color: #2d2d2d;
  color: #888;
}

/* 저장 버튼 스타일 (보라색) */
.btn-save {
  background-color: #ad46ff;
  color: white;
}

/* 7. ⭐ 모달 등장/퇴장 애니메이션 (Transition) */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 모달이 등장할 때 상자가 살짝 커지는 효과 */
.modal-enter-active .modal-box {
  transition: transform 0.3s ease-out;
}
.modal-enter-from .modal-box {
  transform: scale(0.9);
}
</style>
