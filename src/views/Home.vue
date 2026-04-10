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
.home-container {
  padding: 48px 32px 48px 32px;
  width: 100%;
}

.home-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
}

.home-top-box {
  padding: 20px 20px;
  min-height: 460px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.home-bottom-box {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
}

/* 왼쪽 / 오른쪽 공통 */
.home-bottom-left,
.home-bottom-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

@media (max-width: 1100px) {
  .home-bottom-box {
    grid-template-columns: 1fr;
  }
}
</style>
