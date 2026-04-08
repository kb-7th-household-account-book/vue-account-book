<script setup>
import TransactionItem from './TransactionItem.vue';
import { useTransactionStore } from '@/store/transactions';
import { computed } from 'vue';

const store = useTransactionStore();

const groupedTransactions = computed(() => {
  const groups = {};

  store.list.forEach(item => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = {
        date: date,
        income: 0,
        expense: 0,
        data: []
      };
    }

    if (item.type === 'income') {
      groups[date].income += item.amount;
    } else {
      groups[date].expense += item.amount;
    }
    
    groups[date].data.push(item);
  });

  return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date));
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return {
    fullDate: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
    dayOfWeek: days[date.getDay()]
  };
};
</script>
<template>
  <div class="list-container">
    <LoadingSpinner v-if="store.loading && store.list.length === 0" />

    <template v-else-if="groupedTransactions.length > 0">
      <div 
        v-for="group in groupedTransactions" 
        :key="group.date" 
        class="transaction-group"
      >
        <div class="date-bar">
          <div class="date-info">
            {{ formatDate(group.date).fullDate }}
            <span class="day-of-week">({{ formatDate(group.date).dayOfWeek }})</span>
          </div>
          <div class="money-summary">
            <span v-if="group.income > 0" class="income-text">수입 +₩{{ group.income.toLocaleString() }}</span>
            <span v-if="group.expense > 0" class="expense-text">지출 -₩{{ group.expense.toLocaleString() }}</span>
          </div>
        </div>

        <div class="list-items-layout">
          <TransactionItem 
            v-for="item in group.data" 
            :key="item.id" 
            :transaction="item" 
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.transaction-group {
  width: 100%;
}

.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
}

.date-info {
  color: rgba(255, 255, 255, 0.9);
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
}

.day-of-week {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  padding-left: 4px;
}

.money-summary {
  display: flex;
  gap: 16px;
}

.income-text { color: #51A2FF; font-size: 14px; }
.expense-text { color: #FF637E; font-size: 14px; }

.list-items-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>