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
  <div class="field-container">
    <p class="section-label">날짜</p>

    <div class="input-wrapper" @click="openDatePicker">
      <span class="icon">
        <img src="/public/images/CalendarIcon.png" alt="날짜 아이콘" />
      </span>
      <input 
        type="date" 
        ref="dateInput" 
        class="custom-input" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
      />
    </div>
  </div>
</template>

<style scoped>
.field-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #8E8E93;
  margin: 0;
  padding-left: 4px;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px 16px;
  height: 56px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.input-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.icon {
  display: flex;
  align-items: center;
  opacity: 0.7;
}

.icon img {
  width: 20px;
  height: 20px;
}

.custom-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  color-scheme: dark;
  cursor: pointer;
  min-width: 0;
}

.custom-input::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>