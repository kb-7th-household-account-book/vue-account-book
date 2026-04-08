<script setup>
defineProps({
  label: String,
  value: String,
  comparisonText: String,
  colorClass: String
})
</script>

<template>
  <div :class="['summary-card', colorClass]">
    <span class="card-label">{{ label }}</span>
    <h2 class="card-value">{{ value }}</h2>
    <span class="card-comparison">{{ comparisonText }}</span>
  </div>
</template>

<style scoped>
.summary-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 140px;
  transition: all 0.3s ease;
  color: #FFFFFF;

  box-shadow: 
    0px 20px 25px -5px rgba(0, 0, 0, 0.10), 
    0px 8px 10px -6px rgba(0, 0, 0, 0.10);
}

.summary-card::after {
  content: '';
  position: absolute;
  top: -70px;
  right: -70px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  
  background: radial-gradient(
    circle, 
    rgba(255, 255, 255, 0.2) 70%, 
    rgba(255, 255, 255, 0) 90%
  );
  z-index: 0;
  pointer-events: none;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 25px 30px -5px rgba(0, 0, 0, 0.20);
}

.income { 
  background: linear-gradient(135deg, rgba(43, 127, 255, 0.90) 0%, rgba(21, 93, 252, 0.90) 100%); 
}
.expense { 
  background: linear-gradient(135deg, rgba(255, 59, 107, 0.90) 0%, rgba(181, 26, 65, 0.90) 100%); 
}
.net-profit { 
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.90) 0%, rgba(30, 138, 61, 0.90) 100%); 
}
.count { 
  background: linear-gradient(135deg, rgba(175, 82, 222, 0.90) 0%, rgba(118, 46, 156, 0.90) 100%); 
}

.card-label, .card-value, .card-comparison {
  position: relative;
  z-index: 1;
}

.card-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  margin: 4px 0;
  letter-spacing: -0.5px;
}

.card-comparison {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}
</style>