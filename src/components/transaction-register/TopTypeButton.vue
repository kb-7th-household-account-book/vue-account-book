<template>
    <button
        :class="['type-button', {active: isActive}]"
        @click="$emit('click')"
    >
        <div class="icon-box" :style="{ background: bgGradient}">
            <span class="icon"> {{ icon }}</span>
        </div>
        <div class="text-group">
            <span class="label">{{ label }}</span>
            <span class="sub-label">{{ subLabel }}</span>
        </div>
    </button>
</template>

<script setup>
defineProps({
    label: String,
    subLabel: String,
    icon: String,
    bgGradient: String,
    isActive: Boolean,
});
defineEmits(['click']);
</script>

<style scoped>
.type-button {
    flex: 1;  /* 부모 컨테이너 내에서 반반씩 차지 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #1c1c1e; /* 비활성 상태 배경 */
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* 활성화(선택) 되었을 때 스타일 */
.type-button.active {
    background-color: rgba(44, 107, 237, 0.15);
    border-color: #2c6bed;
}

/* 아이콘 box */
.icon-box {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 12px;
}

.text-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.label {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
}

.sub-label {
    font-size: 12px;
    color: #8e8e93;
}
</style>

