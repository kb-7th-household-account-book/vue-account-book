<script setup>
defineProps({
  category: {
    type: String,
    default: '카테고리'
  },
  color: {
    type: String,
    default: '#00BC7D'
  },
  backgroundColor: {
    type: String,
    default: 'rgba(0, 188, 125, 0.20)'
  }
})
</script>

<template>
  <div 
    class="category-tag" 
    :style="{ color: color, backgroundColor: backgroundColor }"
  >
    {{ category }}
  </div>
</template>

<style scoped>
.category-tag {
  display: inline-flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  
  font-family: Inter;
  font-size: 11px;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
}
</style>