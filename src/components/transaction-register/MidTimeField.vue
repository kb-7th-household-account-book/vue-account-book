<script setup>

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
      <button class="toggle-btn active">오전</button>
      <button class="toggle-btn">오후</button>
    </div>

    <div class="time-input-row">
      <div class="time-box">
        <input type="number" class="time-input" />
        <span>시</span>
      </div>
      <div class="time-box">
        <input type="number" class="time-input" />
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