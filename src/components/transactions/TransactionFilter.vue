<script setup>
import PriceRangeSlider from './PriceRangeSlider.vue';
import FilterItem from './FilterItem.vue';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/store/transactions';
import { getDefaultDates } from '@/store/transactions';

const store = useTransactionStore();
const { filters, counts } = storeToRefs(store);
const currentDate = getDefaultDates();

// 기간 필터
const selectMonthFilter = (type) => {
    if (type === 'thisMonth') {
        store.setFilter('startDate', currentDate.startDate);
        store.setFilter('endDate', currentDate.endDate);
    } else {
        store.setFilter('startDate', '');
        store.setFilter('endDate', '');
    }
};

// 거래 유형 필터
const selectType = (typeValue) => {
  store.setFilter('type', typeValue);
};

// 카테고리 필터 핸들
const toggleCategory = (categoryName) => {
  const nextValue = filters.value.categories[0] === categoryName ? [] : [categoryName];

  store.setFilter('categories', nextValue);
};

const categoryMeta = {
  FOOD: { label: "식비", color: "#FF7F50" },
  COFFEE: { label: "커피", color: "#FFB347" },
  TRANSPORT: { label: "교통", color: "#00BFFF" },
  SHOPPING: { label: "쇼핑", color: "#FF69B4" },
  CULTURE: { label: "문화", color: "#DA70D6" },
  MEDICAL: { label: "의료", color: "#FF4D4D" },
  EDUCATION: { label: "교육", color: "#6495ED" },
  HOUSING: { label: "주거", color: "#00FA9A" },
  FINANCE: { label: "금융", color: "#BA55D3" },
  OTHERS: { label: "기타", color: "#FFFFFF" }
};

</script>

<template>
    <div class="filter-layout">
        <section class="filter-group">
            <h2>필터</h2>
        </section>

        <section class="filter-group">
            <h3>기간</h3>
            <div class="choose-month">
                <button 
                  :class="{ active: filters.startDate !== '' }" 
                  @click="selectMonthFilter('thisMonth')"
                >이번달</button>
                <button 
                  :class="{ active: filters.startDate === '' }" 
                  @click="selectMonthFilter('all')"
                >전체</button>
            </div>
            <div class="date-display" v-if="filters.startDate && filters.endDate">
                <span>{{ filters.startDate }}</span>
                <span>~</span>
                <span>{{ filters.endDate }}</span>
        </div>
        </section>

        <section class="filter-group">
            <h3 class="type">거래 유형</h3>
            <FilterItem 
                color="#FF7F50" 
                label="전체" 
                :count="counts.all"
                :active="filters.type === 'all'"
                @click="selectType('all')" 
            />
            <FilterItem 
                color="#00BFFF" 
                label="수입" 
                :count="counts.income"
                :active="filters.type === 'income'"
                @click="selectType('income')" 
            />
            <FilterItem 
                color="#023FFF" 
                label="지출" 
                :count="counts.expense"
                :active="filters.type === 'expense'"
                @click="selectType('expense')" 
            />
        </section>

        <section class="filter-group">
            <h3 class="type">카테고리</h3> 
            <FilterItem
                v-for="item in counts.categories"
                :key="item.category" 
                :color="categoryMeta[item.category]?.color || '#888'"
                :label="categoryMeta[item.category]?.label || item.category" 
                :count="item.count"
                :active="filters.categories[0] === item.category"
                @click="toggleCategory(item.category)"
            />
        </section>

        <section class="filter-group">
            <h3>금액 범위</h3>
            <PriceRangeSlider/>
        </section>
    </div>
</template>

<style scoped>
.filter-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: rgba(255, 255, 255, 0.50);
}

.filter-group h2 {
    color: rgba(255, 255, 255, 0.50);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.2px;
}

.filter-group h3 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.2px;
}

.type {
    padding-bottom: 16px;
}

.choose-month {
    display: flex;
    gap: 8px;
    padding-top: 8px;
    padding-bottom: 12px
}

.choose-month button {
    flex: 1;
    padding: 10px 0;
    border: none;
    border-radius: 14px;
    background-color: rgba(255, 255, 255, 0.05);
    
    color: rgba(255, 255, 255, 0.70);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.15px;

    cursor: pointer;
    transition: all 0.2s ease;
}

.choose-month button.active {
    background-color: #FFB347;
    color: #0A0A0B;
}

.date-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    padding: 0 4px;
}

.date-display span:nth-child(2) {
    margin: 0 8px;
}
</style>