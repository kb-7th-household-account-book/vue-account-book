<script setup>
const fixedExpenses = [
  { id: 1, label: '총 고정 지출', amount: '1,000,000원', color: 'yellow' },
  { id: 2, label: '보험료', amount: '1,000,000원', color: 'purple' },
  { id: 3, label: '유선본 비용', amount: '1,000,000원', color: 'pink' },
];
</script>

<template>
  <section class="fixed-section">
    <div class="fixed-header">
      <h3 class="section-title">고정 지출 내역 요약</h3>
    </div>

    <div class="fixed-card">
      <div v-for="item in fixedExpenses" :key="item.id" class="fixed-row">
        <div class="fixed-row__left">
          <span class="fixed-row__dot" :class="`fixed-row__dot--${item.color}`"></span>
          <span class="fixed-row__label">{{ item.label }}</span>
        </div>

        <span class="fixed-row__amount">{{ item.amount }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fixed-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fixed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.44px;
}

.fixed-card {
  padding: 21px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fixed-row {
  min-height: 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.fixed-row__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.fixed-row__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  flex-shrink: 0;
}

.fixed-row__dot--yellow {
  background-color: #ffb900;
}

.fixed-row__dot--purple {
  background-color: #c27aff;
}

.fixed-row__dot--pink {
  background-color: #ff637e;
}

.fixed-row__label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.fixed-row__amount {
  flex-shrink: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
</style>
