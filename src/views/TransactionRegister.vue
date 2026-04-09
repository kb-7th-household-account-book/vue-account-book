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
        
        <header class="register-header">
            <h1>새 거래 등록</h1>
            <button class="close-btn" @click="handleCancle"> X </button>
        </header>

        <div class="RegisterTopView">
            <div class="type-toggle-container">
                <p class="type-toggle-label">거래 유형을 선택하세요</p>
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
                    >
                    </TopTypeButton>
                </div>
            </div>
        </div>
        <div class="money-field-wrapper">
            <TopMoneyField v-model="transactionAmount"/>
        </div>
        <div class="RegisterMidView"> 
            <div class="date-time-row">
                <MidDateField v-model="transactionDate"/>
                <MidTimeField v-model="transactionTime"/>
            </div>
            <div> 
                <MidCategoryButton v-model="transactionCategory"/>
            </div>
            <div> 
                <MidTransactionTitle v-model="transactionTitle"/>
                <MidMemoField v-model="transactionMemo"/>
            </div>
            <div> 
                <MidSaveButton
                    @save="handleSave"
                />
            </div>
        </div>
    
        <div class="RegisterBotView">
        <BotSummaryList 
            :type="selectedType"
            :amount="transactionAmount"
            :date="transactionDate"
            :category="transactionCategory"
        />
        <BotRecentTransaction />
        <BotQuickTip />
    </div>
    </div>

</template>

<style scoped>
/* 페이지 전체 뼈대 */
.register-page {
  background-color: #000000;
  min-height: 100vh;
  padding: 16px;
}

/* 헤더 영역 */
.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;
  margin-bottom: 20px;
  color: white;
}

.register-header h1 {
  font-size: 22px;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: #8e8e93;
  font-size: 24px;
  cursor: pointer;
}

/* Top, 유형 선택 카드 (어두운 배경) */
.RegisterTopView {
  background-color: #111111;
  border-radius: 24px;
  padding: 20px;
}

.type-toggle-label {
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 16px;
}

/* 가로 배치 */
.button-row {
  display: flex;
  gap: 12px; /* 두 버튼 사이의 간격 */
  width: 100%;
}

/* Top, 금액 입력 필드 */
.money-field-wrapper {
  margin-top: 24px;
}

/* Mid, 날짜 시간 반반씩 가로 배치 */
.date-time-row {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

/* 자식 컴포넌트가 동일한 너비를 가지도록 설정 */
.date-time-row > * {
    flex: 1;
}
</style>