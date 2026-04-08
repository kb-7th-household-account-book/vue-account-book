<script setup>
import { ref } from 'vue';

defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])

const dateInput = ref(null);

// 래퍼 영역(또는 아이콘) 클릭 시 달력 팝업 열기
const openDatePicker = () => {
    if (dateInput.value) {
        // 최신 브라우저에서 지원하는 기본 날짜 선택기 강제 호출
        try {
            dateInput.value.showPicker();
        } catch (error) {
            // showPicker를 지원하지 않는 구형 브라우저 대비 포커스 처리
            dateInput.value.focus();
        }
    }
}

</script>

<template>
    <section class="input-card">
    <p class="section-label">날짜</p>

    <div class="input-wrapper" @click="openDatePicker">
      <span class="icon">
        <img src="/public/images/DateIcon.svg" alt="날짜 아이콘" />
      </span>
      <input type="date" ref="dateInput" class="custom-input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </section>
</template>

<style scoped>
.input-card {
  background-color: #111111;
  border-radius: 20px;
  padding: 20px;
}

.section-label {
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 16px;
}

.input-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
  background-color: #1c1c1e;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

.icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.custom-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  color-scheme: dark; /* 달력 아이콘을 다크모드에 맞게 변경 */
  cursor: pointer; /* 텍스트 부분 클릭 반영 */
}

.custom-input::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>