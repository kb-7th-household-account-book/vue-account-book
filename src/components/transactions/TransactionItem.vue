<script setup lang="ts">
import CategoryButton from '@/components/transactions/CategoryButton.vue';

</script>

<template>
  <div class="transaction-item-layout">
    <div class="left-content">
      <div class="icon-box">💰</div>
      <div class="text-group">
        <div class="title-top">
            <span class="title">월급</span>
            <CategoryButton />
        </div>
        <span class="category-tag">급여</span>
      </div>
    </div>

    <div class="right-section">
      <span class="amount income">+200,000</span>
      <span class="time">09:00 AM</span>
    </div>
  </div>
</template>

<style scoped>
.transaction-item-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: transparent;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  font-size: 20px;
  background: linear-gradient(135deg, #FFB900 0%, #FE9A00 100%);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10);
  flex-shrink: 0;
}

.text-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.title { 
  color: #FFFFFF; 
  font-size: 16px; 
  font-weight: 500; 
}

.category-tag { 
  color: rgba(255, 255, 255, 0.4); 
  font-size: 12px; 
}

.amount.income { 
  color: #FFB347; 
  font-weight: 600; 
  font-size: 16px;
}

.time { 
  color: rgba(255, 255, 255, 0.3); 
  font-size: 12px; 
}

.title-top {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>