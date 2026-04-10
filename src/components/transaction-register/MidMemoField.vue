<script setup>
defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field-container">
    <p class="section-label">메모 (선택)</p>
    <textarea
      class="memo-input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="거래에 대한 메모를 입력하세요..."
      rows="3"
    ></textarea>
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

.memo-input {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px 20px;
  color: #FFFFFF;
  font-size: 15px;
  line-height: 1.5;
  outline: none;
  resize: none;
  box-sizing: border-box;
  min-height: 120px;
  transition: all 0.2s ease;
}

.memo-input:focus {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.memo-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
</style>