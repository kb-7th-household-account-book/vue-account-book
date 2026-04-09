<script setup>
import Home3DImage from '@/components/Home3DImage.vue';
import SummaryCard from '@/components/home/SummaryCard.vue';
import QuickExpenseAdd from '@/components/home/QuickExpenseAdd.vue';
import RecentTransactionList from '@/components/home/RecentTransactionList.vue';
import MonthlySummary from '@/components/home/MonthlySummary.vue';
import FixedExpenseSummary from '@/components/home/FixedExpenseSummary.vue';
import CategoryTop3 from '@/components/home/CategoryTop3.vue';
</script>

<template>
  <div class="home-container">
    <main class="home-content">
      <!-- 🔹 상단 3D 영역 -->
      <section class="home-top-box">
        <Home3DImage />
      </section>

      <!-- 🔹 하단 (피그마 기준 영역) -->
      <section class="home-bottom-box">
        <!-- 왼쪽 -->
        <div class="home-bottom-left">
          <SummaryCard />
          <QuickExpenseAdd />
          <RecentTransactionList />
        </div>

        <!-- 오른쪽 -->
        <div class="home-bottom-right">
          <MonthlySummary />
          <FixedExpenseSummary />
          <CategoryTop3 />
        </div>
      </section>
    </main>
  </div>
</template>

<!-- 🔹 Home 전용 레이아웃 -->
<style scoped>
.home-container {
  padding: 48px 32px 48px 32px;
  width: 100%;
}

/* 전체 구조 */
.home-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  margin: 120px 32px;
}

/* 🔹 상단 (3D 영역) */
.home-top-box {
  padding: 120px 116.5px;
  min-height: 460px;
  box-sizing: border-box;
}

/* 🔹 하단 2컬럼 */
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

/* 🔹 반응형 */
@media (max-width: 1100px) {
  .home-bottom-box {
    grid-template-columns: 1fr;
  }
}
</style>
