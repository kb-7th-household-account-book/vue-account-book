<template>
    <div class="action-button-row">
        <button class="btn btn-cancel" @click="$emit('cancel')">
            취소
        </button>

        <button class="btn btn-save" @click="$emit('save')">
            저장하기 <span class="check-icon">✓</span>
        </button>
    </div>
</template>

<script setup>
// 부모 컴포넌트로 전달할 이벤트 정의
defineEmits(['cancel', 'save']);
</script>

<style scoped>
/* 버튼들을 가로로 나란히 배치 */
.action-button-row {
    display: flex;
    gap: 12px;
    margin-top: 10px; /* 위쪽 컴포넌트와의 여백 */
    margin-bottom: 20px;
}

/* 버튼 공통 스타일 */
.btn {
    flex: 1; /* 두 버튼이 1:1 비율로 너비를 가짐 */
    padding: 16px 0;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.1s ease;
}

/* 눌렸을 때 살짝 작아지는 애니메이션 */
.btn:active {
    transform: scale(0.98);
}

/* 취소 버튼: 어두운 배경, 회색 글씨 */
.btn-cancel {
    background-color: #1c1c1e;
    color: #8e8e93;
}

/* 저장 버튼: 포인트 컬러(노란색), 검은 글씨 */
.btn-save {
    background-color: #ffb340; 
    color: #000000;
}

.check-icon {
    margin-left: 4px;
    font-weight: bold;
}
</style>