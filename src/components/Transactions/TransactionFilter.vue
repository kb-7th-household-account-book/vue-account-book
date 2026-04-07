<script setup>
import FilterItem from './FilterItem.vue';
import PriceRangeSlider from './PriceRangeSlider.vue';
</script>

<template>
    <div class="filter-layout">
        <section class="filter-group">
            <h2>필터</h2>
        </section>

        <section class="filter-group">
            <h3>기간</h3>
            <div class="choose-month">
                <button class="active">이번달</button>
                <button>전체</button>
            </div>
            <div class="date-display">
                <span>2026.04.01</span>
                <span>~</span>
                <span>2026.04.30</span>
            </div>
        </section>

        <section class="filter-group">
            <h3 class="type">거래 유형</h3>
            <FilterItem color="#FF7F50" label="전체" :count="84" />
            <FilterItem color="#00BFFF" label="수입" :count="12" />
            <FilterItem color="#023FFF" label="지출" :count="12" />
        </section>

        <section class="filter-group">
            <h3 class="type">카테고리</h3> 
            <FilterItem color="#FF7F50" label="식비" :count="84" />
            <FilterItem color="#00BFFF" label="교통비" :count="12" />
            <FilterItem color="#FB64B6" label="쇼핑" :count="32" />
            <FilterItem color="#C27AFF" label="문화생활" :count="8" />
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