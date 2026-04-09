<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

// 클릭 시 영문 ID를 부모(v-model)로 전달
const selectCategory = (categoryId) => {
    emit('update:modelValue', categoryId);
};

// 매핑 테이블과 이미지 기반 데이터 구성
const categories = [
    { id: 'FOOD', label: '식비', icon: '🍜', bg: 'linear-gradient(135deg, #FF7657, #FF5252)' },
    { id: 'COFFEE', label: '커피', icon: '☕', bg: 'linear-gradient(135deg, #FFB03A, #FF9800)' },
    { id: 'TRANSPORT', label: '교통', icon: '🚗', bg: 'linear-gradient(135deg, #42C2FF, #00A6FF)' },
    { id: 'SHOPPING', label: '쇼핑', icon: '🛍️', bg: 'linear-gradient(135deg, #FF6699, #FF3366)' },
    { id: 'CULTURE', label: '문화', icon: '🎬', bg: 'linear-gradient(135deg, #D466FF, #B833FF)' },
    { id: 'MEDICAL', label: '의료', icon: '💊', bg: 'linear-gradient(135deg, #FF5C6A, #FF3344)' },
    { id: 'EDUCATION', label: '교육', icon: '📚', bg: 'linear-gradient(135deg, #6699FF, #3366FF)' },
    { id: 'HOUSING', label: '주거', icon: '🏠', bg: 'linear-gradient(135deg, #33E68C, #00CC66)' },
    { id: 'FINANCE', label: '금융', icon: '💳', bg: 'linear-gradient(135deg, #B366FF, #8C33FF)' },
    { id: 'OTHERS', label: '기타', icon: '🏷️', bg: 'linear-gradient(135deg, #6c6c70, #48484a)' }
];
</script>

<template>
    <section class="input-card">
        <p class="section-label">카테고리</p>
        
        <div class="category-grid">
            <button 
                v-for="cat in categories" 
                :key="cat.id"
                :class="['category-item', { active: modelValue === cat.id }]"
                :style="{ background: cat.bg }"
                @click="selectCategory(cat.id)"
            >
                <span class="icon">{{ cat.icon }}</span>
                <span class="label">{{ cat.label }}</span>
            </button>
        </div>
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

/*  1행 배치 */
.category-grid {
    display: flex;
    gap: 16px;
}

/* 개별 버튼 스타일 */
.category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */

    width: 100%;
    max-width: 200px; 
    margin: 0 auto;  /* 칸 안에서 버튼을 가운데로 정렬 */

    border-radius: 16px;
    border: 2px solid transparent; /* active 상태 테두리를 위한 공간 확보 */
    cursor: pointer;
    transition: transform 0.1s ease, border-color 0.2s ease;
}

/* 선택(활성화) 되었을 때 테두리 표시 */
.category-item.active {
    border-color: #b8b8b8b7;
    transform: scale(0.95); /* 눌린 듯한 효과 */
}

.icon {
    font-size: 20px;
    margin-bottom: 4px;
}

.label {
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
}
</style>