<script setup>
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

const transactions = [
  { id: 1, category: 'FOOD', title: '마라탕', date: '4월 5일', amount: '₩15,000' },
  { id: 2, category: 'COFFEE', title: '아이스 아메리카노', date: '4월 5일', amount: '₩4,500' },
  { id: 3, category: 'TRANSPORT', title: '택시비', date: '4월 4일', amount: '₩12,800' },
  { id: 4, category: 'SHOPPING', title: '올리브영', date: '4월 4일', amount: '₩21,500' },
];

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
            <p class="recent-row__date">{{ transaction.date }}</p>
          </div>
        </div>

        <p class="recent-row__amount">{{ transaction.amount }}</p>
      </div>
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
</style>
