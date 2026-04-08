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
        <p class="section-label">메모 (선택)</p>
        <textarea
            class="memo-input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            placeholder="거래에 대한 메모를 입력하세요..."
            rows="3"
        >
        </textarea>
    </section>
</template>
<style scoped>
/* 공통 카드 스타일 */
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

/* 멀티라인 텍스트 입력창 스타일 */
.memo-input {
    width: 100%;
    background-color: #1c1c1e;
    border: none;
    border-radius: 16px;
    padding: 16px 20px;
    color: #ffffff;
    font-size: 15px;
    line-height: 1.5; /* 글 줄 간격 여유롭게 */
    outline: none;
    
    /* 텍스트창 전용 필수 설정 */
    resize: none; /* 우측 하단 크기 조절 손잡이 제거 */
    box-sizing: border-box; /* 패딩이 width에 포함되도록 하여 삐져나감 방지 */
    min-height: 100px;
}

.memo-input::placeholder {
    color: #48484a;
}
</style>