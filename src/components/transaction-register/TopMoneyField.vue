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
    <section class="input-card">
        <p class="section-label">금액</p>
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
/* 카드 배경 */
.input-card {
    background-color: #111111;
    border-radius: 24px;
    padding: 20px;
    margin-bottom: 20px;
}

.section-label {
    font-size: 14px;
    color: #8e8e93;
    margin-bottom: 16px;
    display: block;
}

/* 입력창 래퍼 */
.amount-input-wrapper {
    position: flex;
    align-items: center;
    background-color: #1c1c1e;
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 12px;
}

.currency-symbol {
    color: #8e8e93;
    font-size: 20px;
    margin-right: 12px;
    font-weight: 500;
}

.amount-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 24px;
}

.amount-input::placeholder {
  color: #48484a;
}

/* 빠른 추가 버튼 */
.quick-add-row {
  display: flex;
  gap: 8px;
  width: 100%;
}

.quick-btn {
  flex: 1;
  background-color: #1c1c1e;
  border: none;
  border-radius: 12px;
  padding: 14px 0;
  color: #a1a1aa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.quick-btn:active {
  background-color: #2c2c2e;
}

/* input type="number" 일 때 우측 화살표 숨기기 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>