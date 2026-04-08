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
        <FullCalendar />
      </div>
      <div class="button-row">
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

.wrapper {
  max-width: 1350px; /* 달력 기준 */
  min-width: 1350px;

  margin: 0 auto; /* 가운데 정렬 */
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
