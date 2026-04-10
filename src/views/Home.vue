<script setup>
import { onMounted } from 'vue';
import { useHomeStore } from '@/store/home';

import Home3DImage from '@/components/Home3DImage.vue';
import SummaryCard from '@/components/home/SummaryCard.vue';
import QuickExpenseAdd from '@/components/home/QuickExpenseAdd.vue';
import RecentTransactionList from '@/components/home/RecentTransactionList.vue';
import MonthlySummary from '@/components/home/MonthlySummary.vue';
import FixedExpenseSummary from '@/components/home/FixedExpenseSummary.vue';
import CategoryTop3 from '@/components/home/CategoryTop3.vue';
import AISmartQuickAdd from '@/components/home/AISmartQuickAdd.vue';

const homeStore = useHomeStore();

onMounted(() => {
  homeStore.fetchHomeData();
});
</script>

<template>
  <div class="home-container">
    <main class="home-content">
      <section class="home-top-box">
        <Home3DImage />
      </section>

      <section class="home-bottom-box">
        <div class="home-bottom-left">
          <AISmartQuickAdd />
          <SummaryCard />
          <QuickExpenseAdd />
          <RecentTransactionList />
        </div>

        <div class="home-bottom-right">
          <MonthlySummary />
          <FixedExpenseSummary />
          <CategoryTop3 />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

/* 전체 컨테이너 */
.home-container {
  background-color: #0a0a0b;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px; /* 🔥 통일감 핵심 */
  padding: 40px 40px; /* 🔥 좌우 여백 */
  overflow-x: hidden;
}

/* 전체 흐름 */
.home-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 상단 (3D 등) */
.home-top-box {
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 하단 레이아웃 */
.home-bottom-box {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); /* 🔥 양쪽 다 중요 */
  gap: 32px;
  align-items: start;
}

/* 왼쪽 / 오른쪽 내부 정렬 */
.home-bottom-left,
.home-bottom-right {
  display: flex;
  flex-direction: column;
  gap: 24px; /* 🔥 각 컴포넌트 간격 */
  min-width: 0;
}

/* 태블릿 이하 */
@media (max-width: 1024px) {
  .home-bottom-box {
    grid-template-columns: 1fr;
  }
}

/* 모바일 */
@media (max-width: 768px) {
  .home-container {
    padding: 20px 20px; /* 🔥 모바일도 통일 */
  }

  .home-top-box {
    min-height: 260px;
  }
}
</style>
