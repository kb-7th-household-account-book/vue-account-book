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
    <section class="summary-info-card">
        <h2 class="section-title">입력 데이터 요약</h2>
        
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
.summary-info-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 24px;
    backdrop-filter: blur(12px);
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.4s;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
}

.summary-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.summary-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.label {
    font-size: 14px;
    color: #8E8E93;
}

.value {
    font-size: 15px;
    color: #ffffff;
    font-weight: 500;
}

.text-income {
    color: #51A2FF;
}

.text-expense {
    color: #FF637E;
}

.text-muted {
    color: rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>