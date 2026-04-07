<script setup>
import TransactionItem from './TransactionItem.vue';
</script>

<template>
  <div class="transaction-group">
    <div class="date-bar">
      <div class="date-info">
        2024년 4월 7일 
        <span class="day-of-week">(금요일)</span>
      </div>
      
      <div class="money-summary">
        <span class="income-text">수입 +₩200,000</span>
        <span class="expense-text">지출 -₩45,000</span>
      </div>
    </div>

    <div class="list-items-layout">
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
    </div>
  </div>
</template>

<style scoped>
.transaction-group {
  margin-bottom: 32px;
  width: 100%;
}

.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  width: 100%;
}

.date-info {
  color: rgba(255, 255, 255, 0.9);
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.15px;
}

.day-of-week {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-weight: 400;
  padding-left: 4px;
}

.money-summary {
  display: flex;
  gap: 16px;
}

.income-text {
  color: #51A2FF;
  font-size: 14px;
  font-weight: 400;
}

.expense-text {
  color: #FF637E;
  font-size: 14px;
  font-weight: 400;
}

.list-items-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden; /* 내부 아이템의 border-bottom 등이 삐져나가지 않게 */
}
</style>