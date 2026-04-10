<script setup>
import { ref } from 'vue';
import { analyzeTransaction } from '@/services/aiService';
import { addTransaction } from '@/api/transactionsRegister';
import { useTransactionStore } from '@/store/transactions';

const transactionStore = useTransactionStore();

const userInput = ref('');
const isLoading = ref(false);
const showPreview = ref(false);
const analyzedData = ref(null);

// AI 분석 실행
const handleAnalyze = async () => {
  if (!userInput.value.trim()) return;

  isLoading.value = true;
  try {
    const result = await analyzeTransaction(userInput.value);
    analyzedData.value = result;
    showPreview.value = true;
  } catch (error) {
    alert(error.message || 'AI 분석 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};

// 가계부 등록 확정
const handleConfirm = async () => {
  try {
    await addTransaction(analyzedData.value);
    alert('가계부에 성공적으로 등록되었습니다!');
    
    // 데이터 갱신 (홈 화면 목록 등에 즉시 반영)
    await transactionStore.init();
    
    // 상태 초기화
    userInput.value = '';
    showPreview.value = false;
    analyzedData.value = null;
  } catch (error) {
    console.error('등록 실패:', error);
    alert('저장 중 오류가 발생했습니다.');
  }
};

const handleCancel = () => {
  showPreview.value = false;
  analyzedData.value = null;
};

// 카테고리 ID를 한글 레이블로 변환
const categoryLabels = {
  FOOD: '식비',
  COFFEE: '커피',
  TRANSPORT: '교통',
  SHOPPING: '쇼핑',
  CULTURE: '문화',
  MEDICAL: '의료',
  EDUCATION: '교육',
  HOUSING: '주거',
  FINANCE: '금융',
  OTHERS: '기타'
};
</script>

<template>
  <div class="ai-quick-add">
    <div class="card-header">
      <div class="title-row">
        <span class="ai-icon">✨</span>
        <h3>AI 스마트 퀵 등록</h3>
      </div>
      <p class="subtitle">말하듯 편하게 적어보세요</p>
    </div>

    <div class="input-section" :class="{ loading: isLoading }">
      <div class="input-wrapper">
        <input 
          v-model="userInput" 
          placeholder="예: 오늘 점심 만원 김밥천국" 
          @keyup.enter="handleAnalyze"
          :disabled="isLoading || showPreview"
        />
        <button 
          @click="handleAnalyze" 
          :disabled="isLoading || !userInput || showPreview"
          class="analyze-btn"
        >
          <span v-if="!isLoading">분석</span>
          <div v-else class="spinner"></div>
        </button>
      </div>
    </div>

    <!-- AI 분석 결과 미리보기 (확인 단계) -->
    <Transition name="fade-slide">
      <div v-if="showPreview && analyzedData" class="preview-card">
        <div class="preview-content">
          <div class="preview-header">
            <span class="badge" :class="analyzedData.type">
              {{ analyzedData.type === 'income' ? '수입' : '지출' }}
            </span>
            <span class="preview-date">{{ analyzedData.date }}</span>
          </div>
          
          <div class="preview-main">
            <div class="info-item">
              <span class="label">내용</span>
              <span class="value">{{ analyzedData.title }}</span>
            </div>
            <div class="info-item">
              <span class="label">금액</span>
              <span class="value amount">{{ analyzedData.amount.toLocaleString() }}원</span>
            </div>
            <div class="info-item">
              <span class="label">태그</span>
              <span class="value category">{{ categoryLabels[analyzedData.category] || '기타' }}</span>
            </div>
          </div>
        </div>

        <div class="preview-actions">
          <button @click="handleCancel" class="cancel-btn">취소</button>
          <button @click="handleConfirm" class="confirm-btn">이대로 등록</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ai-quick-add {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card-header {
  margin-bottom: 20px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.ai-icon {
  font-size: 20px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #FFFFFF;
}

.subtitle {
  font-size: 14px;
  color: #8E8E93;
  margin: 0;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 8px 8px 8px 20px;
  transition: all 0.2s ease;
}

.input-wrapper:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.analyze-btn {
  background: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 14px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;
}

.analyze-btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.analyze-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

/* AI 분석 결과 프리뷰 섹션 */
.preview-card {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.preview-content {
  padding: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.badge {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.badge.income {
  background: rgba(52, 199, 89, 0.2);
  color: #34C759;
}

.badge.expense {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
}

.preview-date {
  font-size: 13px;
  color: #8E8E93;
}

.preview-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #8E8E93;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #FFFFFF;
}

.value.amount {
  font-size: 18px;
  color: #FFB340;
}

.preview-actions {
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-actions button {
  flex: 1;
  padding: 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn {
  color: #8E8E93;
  border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.cancel-btn:hover {
  background: rgba(255, 59, 48, 0.1);
}

.confirm-btn {
  color: #FFB340;
}

.confirm-btn:hover {
  background: rgba(255, 179, 64, 0.1);
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0,0,0,0.1);
  border-top: 3px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
