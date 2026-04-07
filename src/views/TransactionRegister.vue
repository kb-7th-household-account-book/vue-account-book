<script setup>
import TopTypeButton from '@/components/transaction-register/TopTypeButton.vue';
import TopMoneyField from '@/components/transaction-register/TopMoneyField.vue';
import { ref } from 'vue';

const selectedType = ref('income'); // 현재 선택된 지출 타입 관리 (income or expense)
const transactionAmount = ref(''); // 입력된 금액을 저장할 반응형 변수

</script>
<template>
    <div class="register-page">
        
        <header class="register-header">
            <h1>새 거래 등록</h1>
            <button class="close-btn"> X </button>
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
            <div> 날짜 선택 컨테이너 </div>
            <div> 시간 선택 컨테이너 </div>
            <div> 카테고리 컨테이너 </div>
            <div> 메모 텍스트 필드 컨테이너 </div>
            <div> 저장 버튼 컨테이너 </div>
        </div>
    
        <div class="RegisterBotView">
            <div> 입력된 요약 컨테이너 </div>
            <div> 최근 거래 리스트 컨테이너</div>
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

/* 컴포넌트 간의 간격 */
.money-field-wrapper {
  margin-top: 24px;
}
</style>