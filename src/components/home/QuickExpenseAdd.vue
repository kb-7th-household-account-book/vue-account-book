<script setup>
import { ref } from 'vue';
import ExpenseDateInput from '@/components/home/ExpenseDataInput.vue';

const isModalOpen = ref(false);

const form = ref({
  type: 'expense',
  date: '',
  amount: '',
  category: 'FOOD',
  memo: '',
});

const categories = [
  {
    id: 'FOOD',
    label: '식비',
    icon: '🍜',
    bg: 'linear-gradient(135deg, #FF7657, #FF5252)',
  },
  {
    id: 'COFFEE',
    label: '커피',
    icon: '☕',
    bg: 'linear-gradient(135deg, #FFB03A, #FF9800)',
  },
  {
    id: 'TRANSPORT',
    label: '교통',
    icon: '🚗',
    bg: 'linear-gradient(135deg, #42C2FF, #00A6FF)',
  },
  {
    id: 'OTHERS',
    label: '기타',
    icon: '🏷️',
    bg: 'linear-gradient(135deg, #6c6c70, #48484a)',
  },
];

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const selectType = (type) => {
  form.value.type = type;
};

const selectCategory = (categoryId) => {
  form.value.category = categoryId;
};

const saveExpense = () => {
  console.log('저장 데이터:', form.value);

  closeModal();

  form.value = {
    type: 'expense',
    date: '',
    amount: '',
    category: 'FOOD',
    memo: '',
  };
};
</script>

<template>
  <div class="quick-expense-add">
    <button class="quick-add-button" @click="openModal">빠른 지출 추가</button>

    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="quick-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-title">빠른 등록</div>

          <button class="close-button" @click="closeModal" aria-label="닫기" type="button">
            ✕
          </button>
        </div>

        <div class="modal-body">
          <div class="type-toggle">
            <button
              class="type-button"
              :class="{ active: form.type === 'income' }"
              @click="selectType('income')"
              type="button"
            >
              수입
            </button>

            <button
              class="type-button"
              :class="{ active: form.type === 'expense' }"
              @click="selectType('expense')"
              type="button"
            >
              지출
            </button>
          </div>

          <ExpenseDateInput v-model="form.date" />

          <div class="field-block">
            <label class="field-label">금액</label>

            <div class="amount-input-wrap">
              <span class="currency">₩</span>
              <input v-model="form.amount" type="number" class="amount-input" placeholder="0" />
            </div>
          </div>

          <div class="field-block">
            <label class="field-label">카테고리</label>

            <div class="category-grid">
              <button
                v-for="category in categories"
                :key="category.id"
                type="button"
                class="category-button"
                :class="{ selected: form.category === category.id }"
                :style="form.category === category.id ? { background: category.bg } : {}"
                @click="selectCategory(category.id)"
              >
                <div class="category-emoji">{{ category.icon }}</div>
                <div class="category-label">{{ category.label }}</div>
              </button>
            </div>
          </div>

          <div class="field-block">
            <label class="field-label">메모 제목</label>

            <textarea
              v-model="form.memo"
              class="memo-input"
              placeholder="메모 제목을 입력하세요(예: 스타벅스)"
            />
          </div>

          <button class="save-button" @click="saveExpense" type="button">저장 ✓</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-expense-add {
  width: 100%;
}

.quick-add-button {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 9999;
}

.quick-modal {
  width: 100%;
  max-width: 512px;
  background-color: #0f0f10;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  transform: scale(0.9);
  transform-origin: center;
}

.modal-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 0 32px;
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);
}

.modal-title {
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.45px;
  font-weight: 500;
  color: #000000;
}

.close-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.1);
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.type-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.type-button {
  height: 56px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.type-button.active {
  background: linear-gradient(117deg, #ffb900 0%, #fe9a00 100%);
  color: #000000;
  box-shadow:
    0 4px 6px -4px rgba(254, 154, 0, 0.2),
    0 10px 15px -3px rgba(254, 154, 0, 0.2);
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.6);
}

.amount-input-wrap {
  position: relative;
}

.currency {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.amount-input {
  width: 100%;
  height: 50px;
  padding: 14px 16px 14px 40px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  letter-spacing: -0.15px;
  font-family: inherit;
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.amount-input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-button {
  height: 102px;
  border: 1px solid transparent;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  padding: 12px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.category-button:hover {
  transform: translateY(-2px);
}

.category-button.selected {
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.28),
    0 0 18px rgba(255, 255, 255, 0.14);
}

.category-button.selected .category-emoji,
.category-button.selected .category-label {
  color: #ffffff;
}

.category-emoji {
  font-size: 24px;
  line-height: 32px;
}

.category-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.memo-input {
  width: 100%;
  height: 90px;
  resize: none;
  padding: 14px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.15px;
  font-family: inherit;
}

.memo-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.save-button {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(90deg, #ffb900 0%, #fe9a00 100%);
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.31px;
  cursor: pointer;
  font-family: inherit;
}
</style>
