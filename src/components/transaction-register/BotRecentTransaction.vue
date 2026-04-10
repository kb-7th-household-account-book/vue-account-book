<script setup>
import { ref, onMounted } from 'vue';

// 카테고리 매핑 (영문 ID -> 아이콘 및 한글)
const categoryMap = {
    'FOOD': { label: '식비', icon: '🍜' },
    'COFFEE': { label: '커피', icon: '☕' },
    'TRANSPORT': { label: '교통', icon: '🚗' },
    'SHOPPING': { label: '쇼핑', icon: '🛍️' },
    'CULTURE': { label: '문화', icon: '🎬' },
    'MEDICAL': { label: '의료', icon: '💊' },
    'EDUCATION': { label: '교육', icon: '📚' },
    'HOUSING': { label: '주거', icon: '🏠' },
    'FINANCE': { label: '금융', icon: '💳' },
    'OTHERS': { label: '기타', icon: '🏷️' }
}

const getCategoryInfo = (categoryId) => {
    return categoryMap[categoryId] || categoryMap['OTHERS'];
}

// 최근거래 리스트 저장
const recentTransactions = ref([]);
// 데이터 로드 로직 (json-server에서 가져온다고 가정)
const fetchRecentTransactions = async () => {
    try {
        // Todo: 실제 json-server 연동 시 리팩토링 예정( API 파일 내부 작성하여 코드 분리 )
        // --- API 연결 전 UI 확인용 임시 데이터 ---
        const rawData = [
            { "id": 3, "type": "expense", "amount": 3000, "date": "2026-04-07", "category": "TRANSPORT" },
            { "id": 2, "type": "expense", "amount": 12000, "date": "2026-04-07", "category": "FOOD" },
            { "id": 1, "type": "income", "amount": 200000, "date": "2026-04-07", "category": "SALARY" }
        ];
        
        recentTransactions.value = rawData.slice(0, 3);
    } catch (error) {
        console.error('최근 거래 내역을 불러오는 중 오류 발생:', error);
    }
};

// 화면에 렌더링될 때 데이터 로드
onMounted(() => {
    fetchRecentTransactions();
});
</script>
<template>
    <section class="recent-transactions-card">
        <h2 class="section-title">최근 거래</h2>
        
        <ul class="recent-list">
            <li v-for="item in recentTransactions" :key="item.id" class="recent-item">
                <div class="left-content">
                    <span class="icon-orb">{{ getCategoryInfo(item.category).icon }}</span>
                    <div class="text-group">
                        <span class="category-name">{{ getCategoryInfo(item.category).label }}</span>
                        <span class="date-text">{{ item.date }}</span>
                    </div>
                </div>
                
                <span class="amount" :class="{ 'expense': item.type === 'expense', 'income': item.type === 'income' }">
                    {{ item.type === 'expense' ? '-' : '+' }}{{ item.amount.toLocaleString() }}
                </span>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.recent-transactions-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 24px;
    backdrop-filter: blur(12px);
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.5s;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
}

.recent-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px; 
}

.recent-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    transition: all 0.2s ease;
}

.recent-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.08);
}

.left-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.icon-orb {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.text-group {
    display: flex;
    flex-direction: column;
}

.category-name {
    font-size: 15px;
    color: #ffffff;
    font-weight: 600;
}

.date-text {
    font-size: 12px;
    color: #8E8E93;
    margin-top: 2px;
}

.amount {
    font-size: 15px;
    font-weight: 700;
    color: #8E8E93; 
}

.amount.expense {
    color: #FF637E;
}

.amount.income {
    color: #51A2FF;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>