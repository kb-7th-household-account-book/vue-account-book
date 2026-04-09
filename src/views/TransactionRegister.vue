<script setup>
// 페이지 내부 컴포넌트 import
import TopTypeButton from '@/components/transaction-register/TopTypeButton.vue';
import TopMoneyField from '@/components/transaction-register/TopMoneyField.vue';
import MidDateField from '@/components/transaction-register/MidDateField.vue';
import MidTimeField from '@/components/transaction-register/MidTimeField.vue';
import MidCategoryButton from '@/components/transaction-register/MidCategoryButton.vue';
import MidMemoField from '@/components/transaction-register/MidMemoField.vue';
import MidSaveButton from '@/components/transaction-register/MidSaveButton.vue';
import MidTransactionTitle from '@/components/transaction-register/MidTransactionTitle.vue';
import BotSummaryList from '@/components/transaction-register/BotSummaryList.vue';
import BotRecentTransaction from '@/components/transaction-register/BotRecentTransaction.vue';
import BotQuickTip from '@/components/transaction-register/BotQuickTip.vue';

// API 파일 import
import { addTransaction } from '@/api/transactionsRegister';

// 라우터 기능 import
import { useRouter } from 'vue-router';
const router = useRouter();

// Vue 기능 import
import { ref } from 'vue';
const selectedType = ref('income'); // 현재 선택된 지출 타입 관리 (income or expense)
const transactionAmount = ref(''); // 입력된 금액을 저장할 반응형 변수
const transactionDate = ref('');
const transactionTime = ref({ period: 'AM', hour: '', minute: ''});
const transactionTitle = ref('');
const transactionCategory = ref('');
const transactionMemo = ref('');

const handleCancle = () => {
    router.push({ name: 'home'}); // home 경로로 이동
};

// 저장 버튼 클릭 시 실행될 함수
const handleSave = async () => {
    if (!transactionAmount.value || !transactionTitle.value || !transactionDate.value) {
        alert('금액, 제목, 날짜는 필수 입력 항목입니다.');
        return; 
    }
    
    // Payload 
    let formattedHour = transactionTime.value.hour;
    if (transactionTime.value.period === '오후' && formattedHour < 12) formattedHour += 12;
    if (transactionTime.value.period === '오전' && formattedHour === 12) formattedHour = 0;
    
    const timeString = `${String(formattedHour).padStart(2, '0')}:${String(transactionTime.value.minute).padStart(2, '0')}`;

    const payload = {
        type: selectedType.value,
        title: transactionTitle.value,
        amount: Number(transactionAmount.value),
        date: transactionDate.value,
        time: timeString,
        category: transactionCategory.value,
        memo: transactionMemo.value
    }
    
    try {
        console.log('서버로 전송할 데이터:', payload)
        await addTransaction(payload);

        alert('성공적으로 등록되었습니다!');
        router.push({ name: 'home'}); // home 경로로 이동
    } catch (error) {
        console.error('등록 실패:', error);
        alert('저장 중 오류가 발생했습니다. 다시 시도해주세요')
    }
}  

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
          <section class="form-card type-selection-card">
            <h2 class="section-title">거래 유형</h2>
            <div class="button-row">
              <TopTypeButton 
                label="수입"
                sub-label="급여, 보너스 등"
                icon="💰"
                active-color="#2c6bed"
                bg-gradient="linear-gradient(135deg, #51A2FF 0%, #2B7FFF 100%)"
                :is-active="selectedType === 'income'"
                @click="selectedType = 'income'"
              />
              <TopTypeButton
                label="지출"
                sub-label="식비, 쇼핑 등"
                icon="💸"
                active-color="#FF637E"
                bg-gradient="linear-gradient(135deg, #FF637E 0%, #FF2056 100%)"
                :is-active="selectedType === 'expense'"
                @click="selectedType = 'expense'"
              />
            </div>
          </section>

          <section class="form-card amount-card">
            <h2 class="section-title">금액 입력</h2>
            <TopMoneyField v-model="transactionAmount"/>
          </section>

          <section class="form-card details-card">
            <h2 class="section-title">상세 정보</h2>
            <div class="date-time-row">
              <MidDateField v-model="transactionDate"/>
              <MidTimeField v-model="transactionTime"/>
            </div>
            <div class="field-group">
              <MidCategoryButton v-model="transactionCategory"/>
            </div>
            <div class="field-group">
              <MidTransactionTitle v-model="transactionTitle"/>
              <MidMemoField v-model="transactionMemo"/>
            </div>
          </section>

          <div class="actions-row">
            <MidSaveButton @save="handleSave" />
          </div>
        </main>

        <!-- Sidebar / Info Section -->
        <aside class="registration-info">
          <div class="info-sticky">
            <section class="info-card summary-card">
              <h2 class="section-title">등록 요약</h2>
              <BotSummaryList 
                :type="selectedType"
                :amount="transactionAmount"
                :date="transactionDate"
                :category="transactionCategory"
              />
            </section>
            
            <section class="info-card recent-card">
              <h2 class="section-title">최근 거래</h2>
              <BotRecentTransaction />
            </section>

            <section class="info-card tip-card">
              <BotQuickTip />
            </section>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid & Layout */
.register-page {
  background-color: #0A0A0B;
  min-height: 100vh;
  color: #FFFFFF;
  padding: 40px 20px;
  overflow-x: hidden;
}

.register-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  background: linear-gradient(135deg, #FFFFFF 0%, #8E8E93 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
}

.header-subtitle {
  font-size: 15px;
  color: #8E8E93;
}

.close-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Main Layout Grid */
.register-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

/* Desktop Dual Column */
@media (min-width: 1024px) {
  .register-layout {
    grid-template-columns: 1fr 360px;
  }
}

/* Form Sections */
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: 32px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.form-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Type Buttons */
.button-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 480px) {
  .button-row {
    flex-direction: column;
  }
}

/* Details Section */
.date-time-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.date-time-row > * {
  flex: 1;
}

@media (max-width: 640px) {
  .date-time-row {
    flex-direction: column;
  }
}

.field-group {
  margin-bottom: 24px;
}

.field-group:last-child {
  margin-bottom: 0;
}

/* Sidebar Info Section */
.registration-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-sticky {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(8px);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-card, .info-card {
  animation: fadeIn 0.5s ease-out forwards;
}

.type-selection-card { animation-delay: 0.1s; }
.amount-card { animation-delay: 0.2s; }
.details-card { animation-delay: 0.3s; }
.summary-card { animation-delay: 0.4s; }
</style>