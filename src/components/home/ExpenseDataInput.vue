<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
const dateInput = ref(null);

const openDatePicker = () => {
  if (!dateInput.value) return;

  try {
    dateInput.value.showPicker();
  } catch (error) {
    dateInput.value.focus();
  }
};

const formattedDate = computed(() => {
  if (!props.modelValue) return '날짜를 선택하세요';

  const [year, month, day] = props.modelValue.split('-');
  if (!year || !month || !day) return '날짜를 선택하세요';

  return `${year}.${month}.${day}`;
});
</script>

<template>
  <div class="field-block">
    <label class="field-label">날짜</label>

    <div class="date-display-box" @click="openDatePicker">
      <span class="date-icon">
        <img src="/images/DateIcon.svg" alt="날짜 아이콘" />
      </span>

      <span class="date-display-text" :class="{ placeholder: !modelValue }">
        {{ formattedDate }}
      </span>

      <input
        ref="dateInput"
        type="date"
        class="hidden-date-input"
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.6);
}

.date-display-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 50px;
  padding: 14px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
}

.date-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.date-icon img {
  width: 18px;
  height: 18px;
  display: block;
}

.date-display-text {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.85);
}

.date-display-text.placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.hidden-date-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;

  color-scheme: dark;
}
</style>
