<script setup>
import { ref, watch } from 'vue';

// 1. 상태 정의
const period = ref('오전');
const hour = ref('')
const minute = ref('');

// 2. 부모에게 전달할 emit 정의
const emit = defineEmits(['update:time']);

// 오전/오후 변경 함수
const togglePeriod = (p) => {
    period.value = p;
}

// 시(Hour) 로직: 0~24 제한 및 오전/오후 자동 토글
watch(hour, (newVal) => {
  if (newVal === '') return;
  let val = parseInt(newVal);

  if (val > 24) hour.value = 24;
  if (val < 0) hour.value = 0;

  // 12시 기준 자동 토글 (사용자 편의성)
  if (val >= 12 && val <= 24) {
    period.value = '오후';
  } else {
    period.value = '오전';
  }
});

// 분(Minute) 로직: 0~59 제한
watch(minute, (newVal) => {
  if (newVal === '') return;
  let val = parseInt(newVal);

  if (val > 59) minute.value = 59;
  if (val < 0) minute.value = 0;
});

</script>
<template>
  <div class="field-container">
    <div class="time-header">
      <p class="section-label">시간</p>
      <span class="time-icon">
        <img src="/images/TimeIcon.svg" alt="시간 아이콘" />
      </span>
    </div>

    <div class="time-controls">
      <div class="toggle-row">
        <button
          type="button"
          class="toggle-btn"
          :class="{ active: period === '오전' }"
          @click="togglePeriod('오전')"
        >
          오전
        </button>
        <button
          type="button"
          class="toggle-btn"
          :class="{ active: period === '오후' }"
          @click="togglePeriod('오후')"
        >
          오후
        </button>
      </div>

      <div class="time-input-row">
        <div class="time-box">
          <input
            type="number"
            class="time-input"
            v-model="hour"
            placeholder="00"
            min="1"
            max="12"
          />
          <span class="unit">시</span>
        </div>
        <div class="time-box">
          <input
            type="number"
            class="time-input"
            v-model="minute"
            placeholder="00"
            min="0"
            max="59"
          />
          <span class="unit">분</span>
        </div>
      </div>
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

.time-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 4px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #8E8E93;
  margin: 0;
}

.time-icon {
  display: flex;
  align-items: center;
  opacity: 0.6;
}

.time-icon img {
  width: 16px;
  height: 16px;
  filter: invert(1);
}

.time-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toggle-row {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
  color: #8E8E93;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background-color: #FFB340;
  border-color: #FFB340;
  color: #000000;
  box-shadow: 0 4px 12px rgba(255, 179, 64, 0.2);
}

.time-input-row {
  display: flex;
  gap: 12px;
}

.time-box {
  display: flex;
  flex: 1;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 14px;
  height: 52px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.time-box:focus-within {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.time-input {
  flex: 1;
  width: 100%;
  background-color: transparent;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  min-width: 0;
}

.unit {
  font-size: 13px;
  color: #8E8E93;
  font-weight: 500;
  margin-left: 4px;
}

/* input type="number" arrows hide */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>