<script setup>
import MidDateField from './MidDateField.vue';
import MidTimeField from './MidTimeField.vue';
import MidCategoryButton from './MidCategoryButton.vue';
import MidTransactionTitle from './MidTransactionTitle.vue';
import MidMemoField from './MidMemoField.vue';

defineProps({
  transactionDate: String,
  transactionTime: Object,
  transactionCategory: String,
  transactionTitle: String,
  transactionMemo: String,
  animationDelay: {
    type: String,
    default: '0.2s'
  }
});

defineEmits([
  'update:transactionDate',
  'update:transactionTime',
  'update:transactionCategory',
  'update:transactionTitle',
  'update:transactionMemo'
]);
</script>

<template>
  <section class="details-section" :style="{ animationDelay: animationDelay }">
    <h2 class="section-title">상세 정보</h2>
    
    <div class="date-time-row">
      <MidDateField 
        :modelValue="transactionDate" 
        @update:modelValue="$emit('update:transactionDate', $event)"
      />
      <MidTimeField 
        :modelValue="transactionTime" 
        @update:modelValue="$emit('update:transactionTime', $event)"
      />
    </div>

    <div class="field-group">
      <MidCategoryButton 
        :modelValue="transactionCategory" 
        @update:modelValue="$emit('update:transactionCategory', $event)"
      />
    </div>

    <div class="field-group">
      <MidTransactionTitle 
        :modelValue="transactionTitle" 
        @update:modelValue="$emit('update:transactionTitle', $event)"
      />
      <MidMemoField 
        :modelValue="transactionMemo" 
        @update:modelValue="$emit('update:transactionMemo', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.details-section {
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

.details-section:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E93;
  margin-bottom: 24px;
}

.date-time-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.date-time-row > * {
  flex: 1;
  min-width: 0; /* Ensure children can shrink */
}

@media (max-width: 768px) {
  .details-section {
    padding: 24px;
    border-radius: 24px;
  }
}

@media (max-width: 640px) {
  .date-time-row {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .details-section {
    padding: 20px;
  }
}

.field-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group:last-child {
  margin-bottom: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

