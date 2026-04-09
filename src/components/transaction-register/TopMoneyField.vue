<script setup> 
const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: ''
    }
});

const emit = defineEmits(['update:modelValue'])

// 금액 빠른 추가 버튼 데이터
const quickAddOptions = [
    { label: '+1만', value: 10000 },
    { label: '+5만', value: 50000 },
    { label: '+10만', value: 100000 },
    { label: '+50만', value: 500000 },
]

// 직접 입력했을 때 부모로 값 전달
const onInput = (event) => {
    emit('update:modelValue', Number(event.target.value))
}

// 버튼을 눌렀을 때 기존 금액에 더해서 부모로 전달
const addAmount = (valueToAdd) => {
    const currentAmount = Number(props.modelValue) || 0;
    emit('update:modelValue', currentAmount + valueToAdd)
}
</script>
<template>
    <section class="money-input-card" :style="{ animationDelay: animationDelay }">
        <h2 class="section-title">금액 입력</h2>
        <div class="amount-input-wrapper">
            <span class="currency-symbol">₩</span>
            <input 
                type="number"
                :value="modelValue"
                @input="onInput"
                placeholder="0"
                class="amount-input"
            />
        </div>

        <div class="quick-add-row">
            <button
                v-for="btn in quickAddOptions"
                :key="btn.label"
                @click="addAmount(btn.value)"
                class="quick-btn"
            >
                {{ btn.label }}
            </button>
        </div>
    </section>
</template>

<style scoped>
.money-input-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: 32px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  min-width: 0;
  backdrop-filter: blur(12px);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.money-input-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
}

/* 입력창 래퍼 */
.amount-input-wrapper {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 20px 24px;
    margin-bottom: 16px;
    transition: all 0.2s ease;
}

.amount-input-wrapper:focus-within {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
}

.currency-symbol {
    color: #8e8e93;
    font-size: 24px;
    margin-right: 16px;
    font-weight: 500;
}

.amount-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 32px;
    font-weight: 700;
    width: 100%;
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.15);
}

/* 빠른 추가 버튼 */
.quick-add-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.quick-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 0;
  color: #a1a1aa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.quick-btn:active {
  transform: scale(0.96);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* input type="number" 일 때 우측 화살표 숨기기 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

@media (max-width: 480px) {
  .quick-add-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>