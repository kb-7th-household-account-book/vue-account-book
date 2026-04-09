<script setup>
import { computed, ref } from 'vue';

const currentPage = ref(0);

const monthlyData = [
  { month: '1월', netProfit: 58240 },
  { month: '2월', netProfit: 58240 },
  { month: '3월', netProfit: 58240 },
  { month: '4월', netProfit: 58240 },
  { month: '5월', netProfit: 58240 },
  { month: '6월', netProfit: -12400 },
  { month: '7월', netProfit: 76120 },
  { month: '8월', netProfit: 32800 },
  { month: '9월', netProfit: -5400 },
  { month: '10월', netProfit: 91200 },
  { month: '11월', netProfit: 48750 },
  { month: '12월', netProfit: -22000 },
];

const visibleMonths = computed(() => {
  const start = currentPage.value * 6;
  return monthlyData.slice(start, start + 6);
});

const togglePage = () => {
  currentPage.value = currentPage.value === 0 ? 1 : 0;
};

const formatProfit = (value) => {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${Math.abs(value).toLocaleString()}원`;
};
</script>

<template>
  <section class="monthly-summary">
    <div class="summary-header">
      <h3>월별 수입 및 지출 요약</h3>
    </div>

    <div class="summary-card">
      <div v-for="item in visibleMonths" :key="item.month" class="summary-row">
        <span class="month">{{ item.month }}</span>
        <span class="profit">{{ formatProfit(item.netProfit) }}</span>
      </div>

      <button class="arrow-button" @click="togglePage" aria-label="다음 반기 보기">
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L10 10L18 2"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.monthly-summary {
  width: 100%;
  color: #f5f5f5;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
}

.summary-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #f2f2f2;
  white-space: nowrap;
}

.summary-card {
  min-height: 400px;
  padding: 27px 21px 1px 21px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.02),
    0 10px 30px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}

.month {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.profit {
  font-size: 20px;
  font-weight: 500;
  color: #ffffff 40%;
  letter-spacing: 0.2px;
}

.arrow-button {
  margin: 1px auto 0;
  width: 44px;
  height: 44px;
  border: none;
  padding: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.arrow-button:hover {
  transform: translateY(2px);
  opacity: 0.8;
}

.arrow-button:active {
  transform: translateY(4px);
}

@media (max-width: 768px) {
  .summary-header {
    gap: 12px;
    margin-bottom: 16px;
  }

  .summary-header h3 {
    font-size: 16px;
  }

  .summary-card {
    min-height: auto;
    padding: 24px 20px 1px 20px;
    border-radius: 22px;
  }

  .summary-row {
    padding: 16px 8px;
  }

  .month,
  .profit {
    font-size: 17px;
  }
}
</style>
