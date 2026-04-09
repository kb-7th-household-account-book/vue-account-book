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
  <section class="input-card">
    <div class="time-wrapper">
        <p class="section-label">시간 </p>
        <span class="time-icon">
            <img src="/public/images/TimeIcon.svg" alt="시간 아이콘"/>
        </span>
    </div>
    
    <div class="toggle-row">
      <button 
        type="button"
        class="toggle-btn" 
        :class="{ active: period === '오전' }"
        @click="togglePeriod('오전')"
      >오전</button>
      <button 
        type="button"
        class="toggle-btn" 
        :class="{ active: period === '오후' }"
        @click="togglePeriod('오후')"
      >오후</button>
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
        <span>시</span>
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
        <span>분</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.time-wrapper {
    display: flex;
    gap: 4px;
}
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

.toggle-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.toggle-btn {
  flex: 1;
  background-color: #1c1c1e;
  color: #8e8e93;
  border: none;
  border-radius: 12px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

/* Todo: 버튼 활성화 시 노란색 배경 */
.toggle-btn.active {
  background-color: #ffb340; 
  color: #000;
}

.time-input-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.time-box {
  display: flex;
  flex: 1;
  align-items: center;
  background-color: #1c1c1e;
  color: #8e8e93;
  border-radius: 12px; 
  padding: 12px 16px; 
  font-size: 14px;
  transition: all 0.2s;
}

.time-input {
  flex: 1; /* 박스 내부 남는 공간을 다 차지 */
  width: 60px;
  background-color: transparent; /* 배경은 부모(box)가 가지고 있으므로 투명하게 */
  border: none;
  color: white;
  text-align: center;
  font-size: 20px; /* 숫자를 더 크게 해서 크기감을 줌 */
  font-weight: bold;
  outline: none;
}

/* input type="number" 일 때 우측 화살표 숨기기 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>