<script setup>
import TopTypeButton from './TopTypeButton.vue';

defineProps({
  selectedType: String,
  animationDelay: {
    type: String,
    default: '0.1s'
  }
});

defineEmits(['update:selectedType']);
</script>

<template>
  <section class="type-selection-section" :style="{ animationDelay: animationDelay }">
    <h2 class="section-title">거래 유형</h2>
    <div class="button-row">
      <TopTypeButton 
        label="수입"
        sub-label="급여, 보너스 등"
        icon="💰"
        active-color="#2c6bed"
        bg-gradient="linear-gradient(135deg, #51A2FF 0%, #2B7FFF 100%)"
        :is-active="selectedType === 'income'"
        @click="$emit('update:selectedType', 'income')"
      />
      <TopTypeButton
        label="지출"
        sub-label="식비, 쇼핑 등"
        icon="💸"
        active-color="#FF637E"
        bg-gradient="linear-gradient(135deg, #FF637E 0%, #FF2056 100%)"
        :is-active="selectedType === 'expense'"
        @click="$emit('update:selectedType', 'expense')"
      />
    </div>
  </section>
</template>

<style scoped>
.type-selection-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: 32px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  min-width: 0;
  backdrop-filter: blur(12px);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.type-selection-section:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .type-selection-section {
    padding: 24px;
    border-radius: 24px;
  }
}

@media (max-width: 480px) {
  .button-row {
    flex-direction: column;
    gap: 12px;
  }
  .type-selection-section {
    padding: 20px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

