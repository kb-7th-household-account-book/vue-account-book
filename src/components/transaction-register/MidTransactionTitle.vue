<script setup>
defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])
</script>

<template>
    <section class="input-card">
        <p class="section-label">거래 제목</p>
        <div class="input-wrapper">
            <input
                type="text"
                class="title-input"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                placeholder="거래 제목을 입력하세요 (예: 스타벅스)"
                maxlength="40"
            />
        </div>
    </section>
</template>

<style scoped>
.input-card {
    background-color: #111111;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
}

.section-label {
    font-size: 14px;
    color: #8e8e93;
    margin-bottom: 16px;
}

.input-wrapper {
    width: 100%;
}

.title-input {
    width: 100%;
    height: 56px; /* 한 줄 입력창에 적합한 높이 */
    background-color: #1c1c1e;
    border: 1px solid transparent; /* 포커스 효과를 위한 투명 테두리 */
    border-radius: 16px;
    padding: 0 20px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    box-sizing: border-box;
    transition: all 0.2s ease;
}

/* 포커스 시 시각적 피드백 */
.title-input:focus {
    border-color: #ffb340;
    background-color: #252528;
}

.title-input::placeholder {
    color: #48484a;
    font-size: 15px;
}
</style>