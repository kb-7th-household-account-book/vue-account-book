<script setup>
import { computed } from 'vue';

// db.json 구조에 맞춘 최소 카테고리 데이터
const categories = [
  { id: 1, name: 'FOOD', label: '식비', icon: '🍜', color: '#FF7F50' },
  { id: 4, name: 'SHOPPING', label: '쇼핑', icon: '🛍️', color: '#FF69B4' },
  { id: 5, name: 'CULTURE', label: '문화', icon: '🎬', color: '#DA70D6' },
];

// 더미 데이터 유지
const rawItems = [
  { id: 1, name: 'FOOD', amount: '₩650,000', percent: 68 },
  { id: 2, name: 'SHOPPING', amount: '₩320,000', percent: 45 },
  { id: 3, name: 'CULTURE', amount: '₩280,000', percent: 40 },
];

const categoryItems = computed(() => {
  return rawItems.map((item, index) => {
    const category = categories.find((c) => c.name === item.name);

    let fillClass = 'category-item__fill--culture';
    if (index === 0) fillClass = 'category-item__fill--food';
    if (index === 1) fillClass = 'category-item__fill--shopping';

    return {
      ...item,
      label: category?.label ?? item.name,
      fillClass,
    };
  });
});
</script>

<template>
  <section class="category-section">
    <h3 class="section-title">카테고리별 지출 TOP3</h3>

    <div class="category-card">
      <div v-for="item in categoryItems" :key="item.id" class="category-item">
        <div class="category-item__header">
          <span class="category-item__label">{{ item.label }}</span>
          <span class="category-item__amount">{{ item.amount }}</span>
        </div>

        <div class="category-item__track">
          <div
            class="category-item__fill"
            :class="item.fillClass"
            :style="{ width: `${item.percent}%` }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-section {
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

.category-card {
  padding: 21px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.category-item__label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.category-item__amount {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.category-item__track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.category-item__fill {
  height: 100%;
  border-radius: 999px;
}

.category-item__fill--food {
  background: linear-gradient(90deg, #ff8904 0%, #ff6900 100%);
}

.category-item__fill--shopping {
  background: linear-gradient(90deg, #fb64b6 0%, #f6339a 100%);
}

.category-item__fill--culture {
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);
}
</style>
