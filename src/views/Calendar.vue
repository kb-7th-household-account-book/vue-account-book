<template>
  <div class="body">
    <div class="margin">
      <div class="flex">
        <AccountBox
          v-for="account in accounts"
          :key="account.id"
          :account="account"
        />
      </div>
    </div>
    <div class="calendar">
      <FullCalendar />
    </div>
    <div class="margin">
      <div class="flex">
        <Button v-for="add in adds" :key="add.id" :add="add" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AccountBox from '@/components/calendar/AccountBox.vue';
import FullCalendar from '@/components/calendar/FullCalendar.vue';
import Button from '@/components/calendar/Button.vue';

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
.margin {
  margin: 0 80px;
}
.flex {
  width: 100%;
  display: flex;
  gap: 15px;
}
.calendar {
  padding: 20px;
  margin: 10px 80px;
}
</style>
