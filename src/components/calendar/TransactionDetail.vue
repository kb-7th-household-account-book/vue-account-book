<template>
  <div class="detail-container">
    <!-- 📅 1. 날짜 카드 -->
    <div class="card date-card">
      <p class="label">선택된 날짜</p>
      <h2>{{ formatDate(selectedDate) }}</h2>
      <span>{{ getDay(selectedDate) }}</span>
    </div>

    <!-- 💰 2. 수입/지출 카드 -->
    <div class="card summary-card">
      <div class="summary-item income">
        <p>수입</p>
        <h3>₩{{ selectedData?.income.toLocaleString() || 0 }}</h3>
      </div>

      <div class="divider"></div>

      <div class="summary-item expense">
        <p>지출</p>
        <h3>₩{{ selectedData?.expense.toLocaleString() || 0 }}</h3>
      </div>
    </div>

    <!-- 📋 3. 거래내역 카드 -->
    <div class="card list-card">
      <p class="list-title">
        거래 내역 ({{ selectedData?.items?.length || 0 }}건)
      </p>

      <div v-if="selectedData?.items?.length">
        <div v-for="item in selectedData.items" :key="item.id" class="item">
          <div class="left">
            <p class="title">{{ item.title }}</p>
            <span class="category">{{ item.category }}</span>
          </div>

          <div class="amount" :class="item.amount > 0 ? 'income' : 'expense'">
            {{ item.amount > 0 ? '+' : '' }}₩{{ item.amount.toLocaleString() }}
          </div>
        </div>
      </div>

      <div v-else class="empty">거래 내역 없음</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedDate: String,
  selectedData: Object,
});

/* 📅 날짜 포맷 */
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getDay = (dateStr) => {
  if (!dateStr) return '';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[new Date(dateStr).getDay()] + '요일';
};
</script>

<style scoped>
.detail-container {
  width: 100%;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  color: white;
}

/* 🔥 공통 카드 */
.card {
  border-radius: 20px;
  padding: 24px;
  background: #0b0f17;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
}

/* 📅 날짜 */
.date-card .label {
  font-size: 13px;
  color: #888;
}

.date-card h2 {
  font-size: 26px;
  font-weight: 700;
  margin: 6px 0;
}

.date-card span {
  font-size: 14px;
  color: #aaa;
}

/* 💰 수입/지출 */
.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-item {
  flex: 1;
}

.summary-item p {
  font-size: 13px;
  margin-bottom: 6px;
}

/* 수입 */
.summary-item.income h3 {
  color: #4dabf7;
  font-size: 22px;
}

/* 지출 */
.summary-item.expense h3 {
  color: #ff6b6b;
  font-size: 22px;
}

/* 가운데 선 */
.divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 20px;
}

/* 📋 리스트 */
.list-title {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 16px;
}

/* 아이템 */
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 16px;
  border-radius: 12px;

  background: #0f1623;
  margin-bottom: 10px;
  transition: 0.2s;
}

.item:hover {
  background: #162033;
}

/* 왼쪽 */
.title {
  font-size: 15px;
  font-weight: 600;
}

.category {
  font-size: 12px;
  color: #888;
}

/* 금액 */
.amount {
  font-size: 15px;
  font-weight: 600;
}

.amount.income {
  color: #4dabf7;
}

.amount.expense {
  color: #ff6b6b;
}

/* empty */
.empty {
  text-align: center;
  padding: 30px;
  color: #666;
}
</style>
