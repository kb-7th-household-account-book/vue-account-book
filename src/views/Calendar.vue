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
      <FullCalendar :monthlyData="monthlyData" @dateSelect="handleDateSelect" />
      <div class="button-row">
        <Button
          v-for="add in adds"
          :key="add.id"
          :add="add"
          @action="handleButtonAction"
        />
      </div>
      <FixedExpenseModal
        :show="isModalOpen"
        @close="isModalOpen = false"
        @save="saveFixedExpense"
      />
      <div class="transaction">
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
import FixedExpenseModal from '@/components/calendar/FixedExpenseModal.vue';

const route = useRoute();

// ⭐ 모달 오픈 상태 관리 변수
const isModalOpen = ref(false);

const handleButtonAction = (type) => {
  if (type === 'fixedExpenses') {
    // 💡 "+ 고정지출 추가" 버튼 클릭 시 모달 오픈
    isModalOpen.value = true;
    console.log(type);
  }
  // ... 다른 버튼 로직 생략 ...
};

// ⭐ 모달에서 '저장' 버튼을 눌렀을 때 실행될 함수
const saveFixedExpense = (newExpense) => {
  // 💡 여기서 실제 DB 저장 API를 호출하거나, monthlyData를 업데이트하는 로직을 넣으세요.
  console.log('부모에서 받은 저장 데이터:', newExpense);
  alert(`"${newExpense.title}" 고정지출이 저장되었습니다.`);
};

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
    date: '2026-04-06',
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
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
}

.wrapper {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column; /* 세로로 쌓기 */
  padding-bottom: 80px;
}

.account-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0 10px;
  width: 100%;
  justify-items: center; /* 내부 아이템 중앙 정렬 */
}

/* 2. 하단 버튼 영역 (그리드로 수정) */
.button-row {
  display: grid;
  /* 버튼은 박스보다 조금 더 작아도 예쁘니 280px 정도로 설정해 볼게요 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0 10px;
  width: 100%;
  justify-items: center;
}

.account-row > *,
.button-row > * {
  width: 100%;
  /* 창이 아주 넓어질 때 혼자 너무 길어지지 않도록 피그마 느낌의 너비 제한 */
  max-width: 300px;
}
</style>
