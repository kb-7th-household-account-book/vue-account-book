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
  <div class="field-container">
    <p class="section-label">카테고리</p>

    <div class="category-grid">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['category-item', { active: modelValue === cat.id }]"
        :style="{ background: cat.bg }"
        @click="selectCategory(cat.id)"
        type="button"
      >
        <span class="icon">{{ cat.icon }}</span>
        <span class="label">{{ cat.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.field-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #8E8E93;
  margin: 0;
  padding-left: 4px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.category-item.active {
  border-color: #FFFFFF;
  transform: scale(0.95);
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.label {
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 640px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .icon {
    font-size: 18px;
  }
  .label {
    font-size: 12px;
  }
}
</style>