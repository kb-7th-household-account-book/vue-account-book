<script setup>
defineProps({
  color: { type: String, default: '#FF7F50' },
  label: { type: String, required: true },
  count: { type: Number, default: 0 }
});
</script>

<template>
  <div class="filter-item">
    <div class="left-section">
      <span class="dot" :style="{ backgroundColor: color }"></span>
      <span class="label">{{ label }}</span>
    </div>
    <span class="count">{{ count }}건</span>
  </div>
</template>

<style scoped>
.filter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  cursor: pointer;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.label {
    color: rgba(255, 255, 255, 0.60);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.15px;
}

.count {
    color: rgba(255, 255, 255, 0.40);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
}

.filter-item:hover .label {
  color: white;
}
</style>