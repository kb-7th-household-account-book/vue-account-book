<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: { type: String, default: 'income' },
    amount: { type: [Number, String], default: '' },
    date: { type: String, default: '' },
    category: { type: String, default: '' }
});

// 1. 금액 포맷팅 (예: 215000 -> 215,000)
const formattedAmount = computed(() => {
    if (!props.amount) return '0';
    return Number(props.amount).toLocaleString();
});

//  2. 카테고리 ID를 한국어/아이콘으로 변환하기 위한 맵
const categoryMap = {
    'FOOD': { label: '식비', icon: '🍜' },
    'COFFEE': { label: '커피', icon: '☕' },
    'TRANSPORT': { label: '교통', icon: '🚗' },
    'SHOPPING': { label: '쇼핑', icon: '🛍️' },
    'CULTURE': { label: '문화', icon: '🎬' },
    'MEDICAL': { label: '의료', icon: '💊' },
    'EDUCATION': { label: '교육', icon: '📚' },
    'HOUSING': { label: '주거', icon: '🏠' },
    'FINANCE': { label: '금융', icon: '💳' }
};

const categoryInfo = computed(() => {
    return categoryMap[props.category] || null;
});
</script>

<template>
    <section class="summary-card">
        <p class="section-label">입력된 요약</p>
        
        <ul class="summary-list">
            <li class="summary-item">
                <span class="label">유형</span>
                <span :class="['value', type === 'income' ? 'text-income' : 'text-expense']">
                    {{ type === 'income' ? '수입' : (type === 'expense' ? '지출' : '-') }}
                </span>
            </li>

            <li class="summary-item">
                <span class="label">금액</span>
                <span class="value">₩{{ formattedAmount }}</span>
            </li>

            <li class="summary-item">
                <span class="label">날짜</span>
                <span class="value">{{ date || '-' }}</span>
            </li>

            <li class="summary-item">
                <span class="label">카테고리</span>
                <span class="value" v-if="categoryInfo">
                    {{ categoryInfo.icon }} {{ categoryInfo.label }}
                </span>
                <span class="value text-muted" v-else>선택 안됨</span>
            </li>
        </ul>
    </section>
</template>

<style scoped>
/* 공통 카드 스타일 */
.summary-card {
    background-color: #111111;
    border-radius: 20px;
    padding: 20px 24px;
    margin-bottom: 20px;
}

.section-label {
    font-size: 14px;
    color: #8e8e93;
    margin-bottom: 20px;
}

/* 리스트 스타일 제거 및 간격 설정 */
.summary-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px; /* 각 항목 간의 넉넉한 세로 간격 */
}

/* 개별 항목 가로 배치 (양끝 정렬) */
.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-size: 14px;
    color: #8e8e93;
}

.value {
    font-size: 16px;
    color: #ffffff; /* 기본값은 흰색 */
    font-weight: 500;
}

/* 수입/지출 색상 포인트 */
.text-income {
    color: #2c6bed; /* 파란색 (이미지 참고) */
}
.text-expense {
    color: #FF637E; /* 빨간색 */
}
.text-muted {
    color: #48484a;
}
</style>