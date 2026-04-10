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

      <FullCalendar
        :dailyDataMap="calendarStore.dailyDataMap"
        @dateSelect="handleDateSelect"
        :currentDate="selectedDate"
        @changeMonth="handleMonthChange"
      />

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
import FixedExpenseModal from '@/components/calendar/FixedExpenseModal.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCalendarStore } from '@/store/calendar';
import { categoryMeta } from '@/constants/category';

const calendarStore = useCalendarStore();
const route = useRoute();
const isModalOpen = ref(false);

/* --- 날짜 선택 관련 로직 --- */
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const selectedDate = ref(route.query.date || getToday());

// 데이터 로드
onMounted(async () => {
  await calendarStore.fetchAllData();
  await calendarStore.fetchFixedData();
});

/* --- 상단 계좌 정보 데이터 --- */
const accounts = computed(() => {
  const summary = calendarStore.monthlySummary;
  return [
    {
      id: 1,
      name: `${summary.month}월 총 수입`,
      balance: summary.income.toLocaleString(),
      type: 'totalIncome',
    },
    {
      id: 2,
      name: `${summary.month}월 총 지출`,
      balance: summary.expense.toLocaleString(),
      type: 'totalExpenditure',
    },
    {
      id: 3,
      name: '순수익',
      balance: summary.profit.toLocaleString(),
      type: 'profit',
    },
  ];
});

const handleDateSelect = (date) => {
  selectedDate.value = date;
};

const handleMonthChange = (yearMonth) => {
  // 스토어의 기준 월을 업데이트함 -> monthlySummary가 자동으로 재계산됨
  calendarStore.setCurrentMonth(yearMonth);
};

// 상세 내역에 전달할 데이터 (Store에서 선택 날짜만 쏙)
const selectedData = computed(() => {
  // 1. 방어 코드
  if (!calendarStore.dailyDataMap) {
    return { items: [], income: 0, expense: 0 };
  }

  const dateKey = selectedDate.value;
  const rawData = calendarStore.dailyDataMap[dateKey] || {
    items: [],
    income: 0,
    expense: 0,
  };

  // 2. JS 방식으로 카테고리 정보 매칭
  const enrichedItems = rawData.items.map((item) => {
    const meta = categoryMeta[item.category] || categoryMeta.OTHERS;

    return {
      ...item,
      icon: meta.icon,
      label: meta.label,
      color: meta.color,
    };
  });

  return {
    ...rawData,
    items: enrichedItems,
  };
});

/* --- 버튼 및 모달 로직 --- */
const handleButtonAction = (type) => {
  if (type === 'fixedExpenses') {
    isModalOpen.value = true;
  }
};

const saveFixedExpense = async (newExpense) => {
  try {
    const { month, title, amount } = newExpense;

    await calendarStore.addFixedItem(month, title, amount);

    alert('고정 지출이 저장되었습니다!');
    isModalOpen.value = false;
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    alert('저장에 실패했습니다.');
  }
};

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
  justify-content: center;
}
.wrapper {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}
.account-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0 10px;
  width: 100%;
  justify-items: center;
}
.button-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0 10px;
  width: 100%;
  justify-items: center;
}
.account-row > *,
.button-row > * {
  width: 100%;
  max-width: 300px;
}
</style>
