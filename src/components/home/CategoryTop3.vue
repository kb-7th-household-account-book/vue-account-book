<script setup>
const categoryItems = [
  { id: 1, label: '식비', amount: '₩650,000', percent: 68, type: 'food' },
  { id: 2, label: '쇼핑', amount: '₩320,000', percent: 45, type: 'shopping' },
  { id: 3, label: '스포츠', amount: '₩280,000', percent: 40, type: 'sports' },
];
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
            :class="`category-item__fill--${item.type}`"
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

.category-item__fill--sports {
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);
}
</style>
