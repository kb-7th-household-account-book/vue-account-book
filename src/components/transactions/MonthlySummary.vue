<script setup>
import { getMonthlySummary } from '@/api/transactions';
import { ref, computed, onMounted } from 'vue';
import MonthlyItem from './MonthlyItem.vue';

const rawData = ref(null);

const loadData = async () => {
  try {
    const res = await getMonthlySummary();
    if (res.data && res.data.length > 0) {
      rawData.value = res.data[0];
    }
  } catch (error) {
    console.error('monthlySummary 데이터 조회 실패:', error);
  }
}

onMounted(() => {
  loadData();
});

const summaryData = computed(() => {
  if (!rawData.value) return [];

  const source = rawData.value;

  return [
    { 
      id: 1, 
      label: '이번 달 수입', 
      value: `₩${source.income.toLocaleString()}`, 
      comparison: `전월 대비 ${source.income_change >= 0 ? '+' : ''}${source.income_change}%`, 
      type: 'income' 
    },
    { 
      id: 2, 
      label: '이번 달 지출', 
      value: `₩${source.expense.toLocaleString()}`, 
      comparison: `전월 대비 ${source.expense_change >= 0 ? '+' : ''}${source.expense_change}%`, 
      type: 'expense' 
    },
    { 
      id: 3, 
      label: '순수익', 
      value: `₩${source.net_income.toLocaleString()}`, 
      comparison: `저축률 ${source.savings_rate}%`, 
      type: 'net-profit' 
    },
    { 
      id: 4, 
      label: '거래 건수', 
      value: '84건', 
      comparison: '평균 일 2.8건', 
      type: 'count' 
    }
  ];
});
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