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
      <div class="calendar-and-fixed-layout">
        <div class="calendar-center-wrapper">
          <FullCalendar
            :dailyDataMap="calendarStore.dailyDataMap"
            :fixedList="calendarStore.fixedList"
            :currentDate="selectedDate"
            @dateSelect="handleDateSelect"
            @changeMonth="handleMonthChange"
          />
        </div>
        <div class="fixed-container">
          <FixedExpenseList
            :items="currentFixedItems"
            @add-action="handleButtonAction"
            @refresh="calendarStore.fetchFixedData()"
          />
        </div>
      </div>
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
import FixedExpenseList from '@/components/calendar/FixedExpenseList.vue';
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

// 지금 화면에 "보이고 있는" 연-월 (기본값은 오늘 날짜 기준)
const currentViewMonth = ref(selectedDate.value.substring(0, 7)); // 예: '2026-04'

/* 고정 지출 필터링 */
const currentFixedItems = computed(() => {
  if (!calendarStore.fixedList) return [];
  const [viewYear, viewMonth] = currentViewMonth.value.split('-').map(Number);

  // 비교를 위해 해당 월의 마지막 날짜를 기준으로 잡음 (안전하게 28일)
  const viewDate = new Date(viewYear, viewMonth - 1, 28);

  return calendarStore.fixedList.filter((item) => {
    const startDate = new Date(item.start_date);

    // 조건 1: 고정지출 시작일이 현재 보고 있는 달보다 이전이거나 같아야 함
    const isStarted = startDate <= viewDate;

    // 조건 2: 삭제되지 않았거나, 삭제일이 현재 달보다 이후여야 함 (보존 로직)
    const isNotDeleted =
      !item.deleted_at || new Date(item.deleted_at) > viewDate;

    return isStarted && isNotDeleted;
  });
});

const handleMonthChange = (yearMonth) => {
  currentViewMonth.value = yearMonth; // 예: '2026-05'로 변경 시 자동 리렌더링
  calendarStore.setCurrentMonth(yearMonth);
};

// 상세 내역에 전달할 데이터 (Store에서 선택 날짜만 쏙)
const selectedData = computed(() => {
  if (!calendarStore.dailyDataMap) {
    return { items: [], income: 0, expense: 0 };
  }

  const dateKey = selectedDate.value;
  const rawData = calendarStore.dailyDataMap[dateKey] || {
    items: [],
    income: 0,
    expense: 0,
  };

  const dayOnly = Number(dateKey.split('-')[2]);

  // 1. 고정 지출 매핑
  const fixedItemsForDay = currentFixedItems.value
    .filter((f) => Number(f.day) === dayOnly)
    .map((f) => ({
      ...f,
      id: `fixed-${f.id}`,
      amount: f.expense,
      title: f.title,
      type: 'fixed',
      category: 'FIXED',
    }));

  const combinedItems = [...rawData.items, ...fixedItemsForDay];

  // 2. 카테고리 메타데이터 결합
  const enrichedItems = combinedItems.map((item) => {
    const categoryKey = item.type === 'fixed' ? 'FIXED' : item.category;
    const meta = categoryMeta[categoryKey] || categoryMeta.OTHERS;

    return {
      ...item,
      icon: meta.icon,
      label: meta.label,
      color: meta.color,
      endColor: meta.endColor,
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
  max-width: 1200px;
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
.calendar-and-fixed-layout {
  display: flex;
  gap: 40px; /* 나란히 배치된 두 요소 사이의 간격 */
  width: 100%;
  margin: 20px 0;
  align-items: flex-start; /* 세로 높이가 달라도 위쪽 정렬 */
}
.calendar-center-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 태블릿 이하 해상도에서는 세로로 배치 */
@media (max-width: 1100px) {
  .calendar-and-fixed-layout {
    flex-direction: column;
  }
}

.fixed-container {
  background-color: #121212; /* 더 짙은 다크 배경 */
  border-radius: 32px; /* 피그마의 아주 둥근 값 반영 */
  padding: 28px;
  width: 100%;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
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
