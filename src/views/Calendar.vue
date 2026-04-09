<template>
  <div class="body">
    <div class="wrapper">
      <div class="account-row">
        <AccountBox
          v-for="account in accounts"
          :key="account.id"
          :account="account"
        />
      </div>
      <div class="calendar">
        <FullCalendar
          :monthlyData="monthlyData"
          @dateSelect="handleDateSelect"
          :currentDate="selectedDate"
        />
      </div>
      <div class="button-row">
        <Button v-for="add in adds" :key="add.id" :add="add" />
      </div>
      <div>
        <TransactionDetail
          :selectedDate="selectedDate"
          :selectedData="selectedData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AccountBox from '@/components/calendar/AccountBox.vue';
import FullCalendar from '@/components/calendar/FullCalendar.vue';
import Button from '@/components/calendar/Button.vue';
import TransactionDetail from '@/components/calendar/TransactionDetail.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

/* 🔥 오늘 날짜 */
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/* route.params.date 에 값이 있으면 그 값을 사용하고, 없으면 getToday() 실행 */
const selectedDate = ref(route.query.date || getToday());

/* 🔥 FullCalendar에서 날짜 받기 */
const handleDateSelect = (date) => {
  selectedDate.value = date;
};
const monthlyData = [
  {
    date: '2026-04-07',
    income: 200000,
    expense: 45000,
    items: [
      { id: 1, title: '월급', category: '급여', amount: 200000 },
      { id: 2, title: '점심', category: '식비', amount: -12000 },
    ],
  },
  {
    date: '2026-04-11',
    income: 100000,
    expense: 20000,
    items: [{ id: 3, title: '용돈', category: '기타', amount: 100000 }],
  },
];

const selectedData = computed(() => {
  const result = monthlyData.find((d) => {
    return d.date === selectedDate.value;
  });
  return result;
});

const accounts = [
  { id: 1, name: '총 수입', balance: '3,600,000', type: 'totalIncome' },
  { id: 2, name: '총 지출', balance: '2,850,000', type: 'totalExpenditure' },
  { id: 3, name: '순수익', balance: '650,000', type: 'profit' },
];

const adds = [
  { id: 1, name: '+ 거래 추가', type: 'transaction' },
  { id: 2, name: '+ 이 날에게 거래 추가', type: 'todayTransaction' },
  { id: 3, name: '+ 고정지출 추가', type: 'fixedExpenses' },
];
</script>

<style scoped>
.body {
  background-color: #000;
}

.wrapper {
  max-width: 1350px;
  min-width: 1350px;
  margin: 0 auto;
  padding-bottom: 80px;
}

.account-row {
  display: flex;
  gap: 15px;
}

.calendar {
  padding: 20px 0;
}

.button-row {
  display: flex;
  gap: 15px;
}
</style>
