<script setup lang="ts">
import CategoryButton from '@/components/transactions/CategoryButton.vue';
import { computed } from 'vue';

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  }
});

const categoryMeta = {
  FOOD: { label: "식비", color: "#FF8904", endColor: "#FF637E", icon: "☕" },
  COFFEE: { label: "커피", color: "#FFB900", endColor: "#FF8904", icon: "🍜" },
  TRANSPORT: { label: "교통", color: "#51A2FF", endColor: "#00D3F3", icon: "🚗" },
  SHOPPING: { label: "쇼핑", color: "#FB64B6", endColor: "#FF637E", icon: "🛍️" },
  MEDICAL: { label: "의료", color: "#FF6467", endColor: "#FF637E", icon: "💊" },
  EDUCATION: { label: "교육", color: "#7C86FF", endColor: "#51A2FF", icon: "📚" },
  HOUSING: { label: "주거", color: "#00D492", endColor: "#05DF72", icon: "🏠" },
  FINANCE: { label: "금융", color: "#A684FF", endColor: "#C27AFF", icon: "💳" },
  CULTURE: { label: "문화", color: "#C27AFF", endColor: "#FB64B6", icon: "🎬"},
  OTHERS: { label: "기타", color: "#FFFFFF", endColor: "#B2BEC3", icon: "📌" }
};

const meta = computed(() => {
  const key = props.transaction.category as keyof typeof categoryMeta;
  
  return categoryMeta[key] || categoryMeta.OTHERS;
});

const formattedAmount = computed(() => {
  const prefix = props.transaction.type === 'income' ? '+' : '-';
  return `${prefix}₩${props.transaction.amount.toLocaleString()}`;
});

const formattedTime = computed(() => {
  const [hourStr, minute] = props.transaction.time.split(':');
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  hour = hour % 12;
  hour = hour ? hour : 12; 
  
  return `${hour}:${minute} ${ampm}`;
});

</script>

<template>
  <div class="transaction-item-layout">
    <div class="left-content">
      <div 
        class="icon-box" 
        :style="{ 
          background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.endColor || meta.color} 100%)` 
        }"
      >
        {{ meta.icon }}
      </div>
      <div class="text-group">
        <div class="title-top">
            <span class="title">{{ transaction.memo }}</span>
            <CategoryButton :category="meta.label" :color="meta.color" :background-color="`${meta.color}1A`" />
        </div>
        <span class="category-tag">추가 메모</span>
      </div>
    </div>

    <div class="right-section">
      <span :class="['amount', transaction.type]">{{ formattedAmount }}</span>
      <span class="time">{{ formattedTime }}</span>
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
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
  color: #51A2FF;
  font-weight: 600; 
  font-size: 16px;
}

.amount.expense {
  color: #FF637E;
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