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
    <p class="section-label">거래 제목</p>
    <div class="input-wrapper">
      <input
        type="text"
        class="title-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="거래 제목을 입력하세요 (예: 스타벅스)"
        maxlength="40"
      />
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

.input-wrapper {
  width: 100%;
}

.title-input {
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0 20px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.title-input:focus {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.title-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-size: 15px;
}
</style>