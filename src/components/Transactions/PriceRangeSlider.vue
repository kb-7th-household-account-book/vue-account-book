<script setup>
import { ref } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

const priceRange = ref([0, 1000000])

const formatPrice = (val) => '₩' + val.toLocaleString()
</script>

<template>
  <div class="price-filter">
    <div class="label-row">
      <span>최소</span>
      <span>최대</span>
    </div>

    <Slider
      v-model="priceRange"
      :min="0"
      :max="1000000"
      :step="10000"
      :tooltips="false"
      class="custom-slider"
    />

    <div class="value-row">
      <span>{{ formatPrice(priceRange[0]) }}</span>
      <span>{{ formatPrice(priceRange[1]) }}</span>
    </div>
  </div>
</template>

<style>
:root {
  --slider-connect-bg: #FFB347;         /* 채워지는 막대 색상 */
  --slider-tooltip-bg: #FFB347;
  --slider-handle-bg: #FFB347;          /* 손잡이 색상 */
  --slider-handle-ring-color: #0A0A0B;  /* 손잡이 테두리 */
  --slider-bg: #1F1F21;                 /* 빈 막대 색상 */
  --slider-handle-width: 10px;
  --slider-handle-height: 10px;
  --slider-handle-top: -2px;
  --slider-handle-shadow: none;
  --slider-handle-ring-width: 0;
}

.slider-handle:hover {
  transform: scale(2);
  transition: transform 0.2s ease;
}

.custom-slider {
  margin-top: 20px;
  margin-bottom: 10px;
}

.label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 16px;
    color: rgba(255, 255, 255, 0.40);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
}

.value-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 6px;
    color: rgba(255, 255, 255, 0.60);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
}
</style>