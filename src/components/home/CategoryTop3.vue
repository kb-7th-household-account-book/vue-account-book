<script setup>
import { computed } from 'vue';
import { useHomeStore } from '@/store/home';

const store = useHomeStore();

const categoryItems = computed(() => {
  const topStats = store.state.topCategories;
  if (!topStats || topStats.length === 0) return [];

  // Top 3 전체 건수 합계를 구해서 퍼센테이지(%) 바 길이를 계산합니다.
  const top3TotalCount = topStats.reduce((sum, item) => sum + item.count, 0);

  return topStats.map((item, index) => {
    // 1위, 2위, 3위 바 색상 지정
    let fillClass = 'category-item__fill--culture'; // 기본(3위)
    if (index === 0) fillClass = 'category-item__fill--food'; // 1위
    if (index === 1) fillClass = 'category-item__fill--shopping'; // 2위

    const percent = top3TotalCount > 0 ? Math.round((item.count / top3TotalCount) * 100) : 0;

    return {
      id: item.id,
      label: item.label, // db.json에 있는 한글 라벨 사용 (예: "식비")
      amount: `${item.count}건`, // DB에 맞게 금액 대신 '건수'로 표시
      percent,
      fillClass,
    };
  });
});
</script>

<template>
  <section class="category-section">
    <h3 class="section-title">카테고리별 지출 TOP3 (결제 건수)</h3>

    <div class="category-card">
      <template v-if="categoryItems.length > 0">
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
      </template>
      <div v-else class="empty-state">결제 내역이 없습니다.</div>
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

.empty-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}
</style>
