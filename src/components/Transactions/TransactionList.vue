<script setup>
import TransactionItem from './TransactionItem.vue';

const groupedTransactions = [
  {
    date: "2026-04-07",
    income: 200000,
    expense: 15000,
    data: [
      { id: 1, type: "income", amount: 200000, time: "09:00", category: "SALARY", memo: "부업 입금" },
      { id: 2, type: "expense", amount: 12000, time: "12:30", category: "FOOD", memo: "점심 (돈까스)" },
      { id: 3, type: "expense", amount: 3000, time: "18:00", category: "TRANSPORT", memo: "지하철 퇴근" }
    ]
  },
  {
    date: "2026-04-06",
    income: 0,
    expense: 140000,
    data: [
      { id: 5, type: "expense", amount: 15000, time: "19:30", category: "FOOD", memo: "저녁 배달" },
      { id: 6, type: "expense", amount: 125000, time: "14:30", category: "SHOPPING", memo: "백화점 쇼핑" }
    ]
  }
];

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
          <span v-if="group.income > 0" class="income-text">
            수입 +₩{{ group.income.toLocaleString() }}
          </span>
          <span v-if="group.expense > 0" class="expense-text">
            지출 -₩{{ group.expense.toLocaleString() }}
          </span>
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