<script setup>
</script>
<template>
    <section class="input-card">
    <p class="section-label">날짜</p>
    <div class="input-wrapper">
      <span class="icon">
        <img src="/public/images/DateIcon.svg" alt="날짜 아이콘" />
      </span>
      <input type="date" class="custom-input" />
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
  align-items: center;
  background-color: #1c1c1e;
  border-radius: 12px;
  padding: 12px 16px;
}

.icon {
  margin-right: 12px;
  font-size: 18px;
}

.custom-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  color-scheme: dark; /* 달력 아이콘을 다크모드에 맞게 변경 */
}
</style>