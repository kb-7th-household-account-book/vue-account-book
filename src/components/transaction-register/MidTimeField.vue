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

/* 이미지처럼 활성화 시 노란색 배경 */
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
  align-items: center;
  color: #8e8e93;
  font-size: 14px;
}

.time-input {
  width: 60px;
  background-color: #1c1c1e;
  border: none;
  border-radius: 8px;
  padding: 10px;
  color: white;
  text-align: center;
  font-size: 16px;
  margin-right: 8px;
  outline: none;
}

/* input type="number" 일 때 우측 화살표 숨기기 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>