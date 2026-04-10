<script setup>
import TransactionItem from './TransactionItem.vue';
import ReceiptModal from '@/components/transaction-modal/ReceiptModal.vue';
import { useTransactionStore } from '@/store/transactions';
import { computed, ref, onMounted } from 'vue';

const store = useTransactionStore();

onMounted(() => {
  store.init(); // 앱 켜지자마자 스토어한테 "카테고리랑 리스트 다 가져와!" 하고 명령
});

const groupedTransactions = computed(() => {
  const groups = {};

  store.list.forEach((item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = {
        date: date,
        income: 0,
        expense: 0,
        data: [],
      };
    }

    if (item.type === 'income') {
      groups[date].income += item.amount;
    } else {
      groups[date].expense += item.amount;
    }

    groups[date].data.push(item);
  });

  return Object.values(groups).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
});

const renderedCount = computed(() => {
  return groupedTransactions.value.reduce(
    (acc, group) => acc + group.data.length,
    0,
  );
});

const remainingCount = computed(() => {
  // filters.type에 따라 전체 개수(all, income, expense)를 동적으로 가져오면 더 정확해요!
  const total = store.counts[store.filters.type] || store.counts.all;
  const diff = total - renderedCount.value;
  return diff > 0 ? diff : 0;
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  return {
    fullDate: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
    dayOfWeek: days[date.getDay()],
  };
};
const isModalOpen = ref(false); // 모달 스위치
const selectedTx = ref(null); // 클릭한 거래 정보 바구니

// 리스트 클릭 시 실행 (모달 열기)
const openModal = (item) => {
  selectedTx.value = item;
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  selectedTx.value = null;
};

// 임시: 수정/삭제 함수
const handleEdit = () => {
  //alert('수정 버튼 클릭! 나중에 수정 폼으로 연결합니다.');
};
const handleDelete = () => {
  //alert('삭제 버튼 클릭! 나중에 스토어의 삭제 액션과 연결합니다.');
  closeModal();
};
</script>

<template>
  <div class="list-container">
    <template v-if="groupedTransactions.length > 0">
      <div
        v-for="group in groupedTransactions"
        :key="group.date"
        class="transaction-group"
      >
        <div class="date-bar">
          <div class="date-info">
            {{ formatDate(group.date).fullDate }}
            <span class="day-of-week"
              >({{ formatDate(group.date).dayOfWeek }})</span
            >
          </div>
          <div class="money-summary">
            <span v-if="group.income > 0" class="income-text"
              >수입 +₩{{ group.income.toLocaleString() }}</span
            >
            <span v-if="group.expense > 0" class="expense-text"
              >지출 -₩{{ group.expense.toLocaleString() }}</span
            >
          </div>
        </div>

        <div class="list-items-layout">
          <TransactionItem
            v-for="item in group.data"
            :key="item.id"
            :transaction="item"
            @click="openModal(item)"
            style="cursor: pointer"
          />
        </div>
      </div>
    </template>
    <button
      v-if="!store.isLastPage && remainingCount > 0"
      class="button-layout"
      @click="store.loadNextPage"
    >
      더보기 ({{ remainingCount }}건 더 있음)
    </button>

    <ReceiptModal
      v-if="isModalOpen"
      :transaction="selectedTx"
      @close="closeModal"
      @edit="handleEdit"
      @delete="handleDelete"
    />
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

.income-text {
  color: #51a2ff;
  font-size: 14px;
}
.expense-text {
  color: #ff637e;
  font-size: 14px;
}

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

.button-layout {
  display: flex;
  padding: 13.5px 22.625px 12.5px 23px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.15px;
  align-self: center;
  cursor: pointer;
}
</style>
