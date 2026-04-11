<template>
  <button class="button" @click="handleButtonClick" :class="add.type">
    {{ add.name }}
  </button>
</template>

<script setup>
const props = defineProps({
  add: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['action']);

const handleButtonClick = () => {
  // 타입별 분기 처리
  switch (props.add.type) {
    case 'transaction':
      // 일반 거래 추가 로직
      break;
    case 'todayTransaction':
      // 선택된 날짜에 추가하는 로직
      break;
    case 'fixedExpenses':
      // 고정 지출 추가 로직
      break;
  }

  // 부모 컴포넌트(Calendar.vue)로 타입 전달
  emit('action', props.add.type);
};
</script>

<style scoped>
.button {
  width: 100%;
  height: 55px; /* Grid 레이아웃에 맞춰 높이 조정 */
  border-radius: 18px; /* 피그마의 라운드 값 반영 (image_310579.jpg) */
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(to right, #ffb900, #fe9a00);
  color: #000;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.8;
}

/* 피그마와 동일한 버튼 색상 적용 */
.todayTransaction {
  background-color: #e7e6c8; /* + 이 날에게 거래 추가 색상 (연한 베이지) */
  color: #333;
}

.fixedExpenses {
  background: linear-gradient(to right, #c27aff, #ad46ff);
  color: white;
}
</style>
