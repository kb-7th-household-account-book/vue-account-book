<script setup>
// 페이지 내부 컴포넌트 import
import TypeSelectionSection from '@/components/transaction-register/TypeSelectionSection.vue';
import TopMoneyField from '@/components/transaction-register/TopMoneyField.vue';
import TransactionDetailSection from '@/components/transaction-register/TransactionDetailSection.vue';
import MidSaveButton from '@/components/transaction-register/MidSaveButton.vue';
import BotSummaryList from '@/components/transaction-register/BotSummaryList.vue';
import BotRecentTransaction from '@/components/transaction-register/BotRecentTransaction.vue';
import BotQuickTip from '@/components/transaction-register/BotQuickTip.vue';

// API 파일 import
import { addTransaction } from '@/api/transactionsRegister';

// 라우터 기능 import
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// Vue 기능 import
import { onMounted, ref } from 'vue';
const selectedType = ref('income'); // 현재 선택된 지출 타입 관리 (income or expense)
const transactionAmount = ref(''); // 입력된 금액을 저장할 반응형 변수
const transactionDate = ref(route.query.date || '');
const transactionTime = ref({ period: 'AM', hour: '', minute: '' });
const transactionTitle = ref('');
const transactionCategory = ref('');
const transactionMemo = ref('');

const handleCancle = () => {
  router.push({ name: 'home' }); // home 경로로 이동
};

// 저장 버튼 클릭 시 실행될 함수
const handleSave = async () => {
  if (
    !transactionAmount.value ||
    !transactionTitle.value ||
    !transactionDate.value
  ) {
    alert('금액, 제목, 날짜는 필수 입력 항목입니다.');
    return;
  }

  // Payload
  let formattedHour = transactionTime.value.hour;
  if (transactionTime.value.period === '오후' && formattedHour < 12)
    formattedHour += 12;
  if (transactionTime.value.period === '오전' && formattedHour === 12)
    formattedHour = 0;

  const timeString = `${String(formattedHour).padStart(2, '0')}:${String(transactionTime.value.minute).padStart(2, '0')}`;

  const payload = {
    type: selectedType.value,
    title: transactionTitle.value,
    amount: Number(transactionAmount.value),
    date: transactionDate.value,
    time: timeString,
    category: transactionCategory.value,
    memo: transactionMemo.value,
  };

  try {
    console.log('서버로 전송할 데이터:', payload);
    await addTransaction(payload);

    alert('성공적으로 등록되었습니다!');
    router.push({ name: 'home' }); // home 경로로 이동
  } catch (error) {
    console.error('등록 실패:', error);
    alert('저장 중 오류가 발생했습니다. 다시 시도해주세요');
  }
};
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <header class="register-header">
        <div class="header-title">
          <h1>새 거래 등록</h1>
          <p class="header-subtitle">가계부를 꼼꼼하게 관리해보세요</p>
        </div>
        <button class="close-btn" @click="handleCancle" aria-label="닫기">
          <span class="icon">✕</span>
        </button>
      </header>

      <div class="register-layout">
        <!-- Main Form Section -->
        <main class="registration-form">
          <TypeSelectionSection
            v-model:selectedType="selectedType"
            animation-delay="0.1s"
          />

          <TopMoneyField v-model="transactionAmount" animation-delay="0.2s" />

          <TransactionDetailSection
            v-model:transactionDate="transactionDate"
            v-model:transactionTime="transactionTime"
            v-model:transactionCategory="transactionCategory"
            v-model:transactionTitle="transactionTitle"
            v-model:transactionMemo="transactionMemo"
            animation-delay="0.3s"
          />

          <div class="actions-row">
            <MidSaveButton @save="handleSave" />
          </div>
        </main>

        <!-- Sidebar / Info Section -->
        <aside class="registration-info">
          <div class="info-sticky">
            <BotSummaryList
              :type="selectedType"
              :amount="transactionAmount"
              :date="transactionDate"
              :category="transactionCategory"
            />

            <BotRecentTransaction />

            <BotQuickTip />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global Box Sizing for this page */
* {
  box-sizing: border-box;
}

/* Responsive Layout Grid */
.register-page {
  background-color: #0a0a0b;
  min-height: 100vh;
  color: #ffffff;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0; /* Vertical padding only, horizontal handled by container */
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

.register-container {
  max-width: 1000px; /* Reduced from 1200px for a more 'inset' look */
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 40px; /* Increased padding for the inward feel */
}

/* Header Styling */
.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.header-title h1 {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #8e8e93 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
}

.header-subtitle {
  font-size: 15px;
  color: #8e8e93;
}

.close-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Main Layout Grid */
.register-layout {
  display: grid;
  grid-template-columns: minmax(
    0,
    1fr
  ); /* Allow shrinking to prevent overflow */
  gap: 32px;
  align-items: start;
}

/* Desktop Dual Column */
@media (min-width: 1024px) {
  .register-layout {
    grid-template-columns: minmax(0, 1fr) 340px;
  }
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .register-page {
    padding: 20px 0;
  }
  .register-container {
    padding: 0 20px; /* Bring it closer to edges on mobile but still not touching */
    gap: 24px;
  }
  .header-title h1 {
    font-size: 24px;
  }
}

/* Form Layout */
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

/* Sidebar Info Layout */
.registration-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.info-sticky {
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions-row {
  margin-top: 8px;
}
</style>
