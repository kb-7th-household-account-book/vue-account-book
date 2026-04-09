<script setup>
const summaryCards = [
  {
    id: 1,
    title: '총지출',
    amount: '1,000,000원',
    icon: '💸',
    type: 'expense',
  },
  {
    id: 2,
    title: '순수익',
    amount: '500,000원',
    icon: '📈',
    type: 'profit',
  },
  {
    id: 3,
    title: '총수입',
    amount: '1,000,000원',
    icon: '💰',
    type: 'income',
  },
];
</script>

<template>
  <section class="summary-section">
    <h3 class="section-title">이번달 가계부 요약</h3>

    <div class="summary-list">
      <article
        v-for="card in summaryCards"
        :key="card.id"
        class="summary-item"
        :class="`summary-item--${card.type}`"
      >
        <div class="summary-item__content">
          <div class="summary-item__text">
            <p class="summary-item__label">{{ card.title }}</p>
            <p class="summary-item__amount">{{ card.amount }}</p>
          </div>

          <div class="summary-item__icon" :class="`summary-item__icon--${card.type}`">
            <span>{{ card.icon }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
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

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item {
  min-height: 96px;
  padding: 21px;
  border-radius: 16px;
  border: 1px solid transparent;
  overflow: hidden;
}

.summary-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.summary-item__text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-item__label {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.summary-item__amount {
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.07px;
}

.summary-item__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0px 4px 6px -4px rgba(0, 0, 0, 0.1),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.summary-item__icon span {
  font-size: 20px;
  line-height: 1;
}

.summary-item--expense {
  border-color: rgba(255, 32, 86, 0.2);
  background: linear-gradient(117deg, rgba(255, 32, 86, 0.1) 0%, rgba(236, 0, 63, 0.1) 100%);
}

.summary-item--expense .summary-item__label {
  color: rgba(255, 161, 173, 0.7);
}

.summary-item__icon--expense {
  background: linear-gradient(117deg, #ff637e 0%, #ff2056 100%);
}

.summary-item--profit {
  border-color: rgba(0, 188, 125, 0.2);
  background: linear-gradient(117deg, rgba(0, 188, 125, 0.1) 0%, rgba(0, 153, 102, 0.1) 100%);
}

.summary-item--profit .summary-item__label {
  color: rgba(94, 233, 181, 0.7);
}

.summary-item__icon--profit {
  background: linear-gradient(117deg, #00d492 0%, #00bc7d 100%);
}

.summary-item--income {
  border-color: rgba(43, 127, 255, 0.2);
  background: linear-gradient(117deg, rgba(43, 127, 255, 0.1) 0%, rgba(21, 93, 252, 0.1) 100%);
}

.summary-item--income .summary-item__label {
  color: rgba(142, 197, 255, 0.7);
}

.summary-item__icon--income {
  background: linear-gradient(117deg, #51a2ff 0%, #2b7fff 100%);
}
</style>
