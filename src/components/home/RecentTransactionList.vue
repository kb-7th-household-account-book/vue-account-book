<script setup>
import { computed } from 'vue';
import { useHomeStore } from '@/store/home';

const store = useHomeStore();

const categories = [
  { id: 'FOOD', label: '식비', icon: '🍜', bg: 'linear-gradient(135deg, #FF7657, #FF5252)' },
  { id: 'COFFEE', label: '커피', icon: '☕', bg: 'linear-gradient(135deg, #FFB03A, #FF9800)' },
  { id: 'TRANSPORT', label: '교통', icon: '🚗', bg: 'linear-gradient(135deg, #42C2FF, #00A6FF)' },
  { id: 'SHOPPING', label: '쇼핑', icon: '🛍️', bg: 'linear-gradient(135deg, #FF6699, #FF3366)' },
  { id: 'CULTURE', label: '문화', icon: '🎬', bg: 'linear-gradient(135deg, #D466FF, #B833FF)' },
  { id: 'MEDICAL', label: '의료', icon: '💊', bg: 'linear-gradient(135deg, #FF5C6A, #FF3344)' },
  { id: 'EDUCATION', label: '교육', icon: '📚', bg: 'linear-gradient(135deg, #6699FF, #3366FF)' },
  { id: 'HOUSING', label: '주거', icon: '🏠', bg: 'linear-gradient(135deg, #33E68C, #00CC66)' },
  { id: 'FINANCE', label: '금융', icon: '💳', bg: 'linear-gradient(135deg, #B366FF, #8C33FF)' },
  { id: 'OTHERS', label: '기타', icon: '🏷️', bg: 'linear-gradient(135deg, #6c6c70, #48484a)' },
];

// 스토어의 데이터를 화면에 맞게 가공
const transactions = computed(() => {
  return store.state.recentTransactions.map((tx) => {
    // 날짜 변환 (예: 2026-04-05 -> 4월 5일)
    const [, month, day] = tx.date.split('-');
    const formattedDate = `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;

    return {
      ...tx,
      displayDate: formattedDate,
      displayAmount: `₩${tx.amount.toLocaleString()}`,
    };
  });
});

const getCategoryInfo = (categoryId) => {
  return (
    categories.find((item) => item.id === categoryId) ||
    categories.find((item) => item.id === 'OTHERS')
  );
};
</script>

<template>
  <section class="recent-section">
    <h3 class="section-title">최근 거래 목록</h3>

    <div class="recent-card">
      <div v-for="transaction in transactions" :key="transaction.id" class="recent-row">
        <div class="recent-row__left">
          <div
            class="recent-row__icon"
            :style="{ background: getCategoryInfo(transaction.category).bg }"
          >
            <span>{{ getCategoryInfo(transaction.category).icon }}</span>
          </div>

          <div class="recent-row__text">
            <p class="recent-row__title">{{ transaction.title }}</p>
            <p class="recent-row__date">{{ transaction.displayDate }}</p>
          </div>
        </div>

        <p class="recent-row__amount">{{ transaction.displayAmount }}</p>
      </div>

      <div v-if="transactions.length === 0" class="empty-state">최근 거래 내역이 없습니다.</div>
    </div>
  </section>
</template>
<style scoped>
.recent-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.44px;
}

.recent-card {
  padding: 5px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.recent-row {
  min-height: 72px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 14px;
}

.recent-row__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.recent-row__icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0px 4px 6px -4px rgba(0, 0, 0, 0.1),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.recent-row__icon span {
  font-size: 18px;
  line-height: 1;
}

.recent-row__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.recent-row__title {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.recent-row__date {
  margin: 0;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.recent-row__amount {
  margin: 0;
  flex-shrink: 0;
  color: #ff637e;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

/* RecentTransactionList.vue <style scoped> */
@media (max-width: 768px) {
  .recent-row {
    padding: 12px;
    gap: 12px;
  }

  .recent-row__icon {
    width: 36px;
    height: 36px;
  }

  .recent-row__title {
    font-size: 14px;
  }

  .recent-row__amount {
    font-size: 15px;
  }
}
</style>
