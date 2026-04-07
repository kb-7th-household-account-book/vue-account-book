<script setup>
import MonthlyItem from './MonthlyItem.vue';

const summaryData = [
  { id: 1, label: '이번 달 수입', value: '₩3,500,000', comparison: '전월 대비 +12%', type: 'income' },
  { id: 2, label: '이번 달 지출', value: '₩2,850,000', comparison: '전월 대비 -5%', type: 'expense' },
  { id: 3, label: '순수익', value: '₩650,000', comparison: '저축률 18.6%', type: 'net-profit' },
  { id: 4, label: '거래 건수', value: '84건', comparison: '평균 일 2.8건', type: 'count' }
]
</script>

<template>
  <div class="summary-grid">
    <MonthlyItem 
      v-for="item in summaryData" 
      :key="item.id"
      :label="item.label"
      :value="item.value"
      :comparison-text="item.comparison"
      :color-class="item.type"
    />
  </div>
</template>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  width: 100%;
}

@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>