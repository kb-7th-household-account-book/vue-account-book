<script setup>
defineProps({
  x: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="player" :style="{ left: `${x}px` }">
    👛 </div>
</template>

<style scoped>
.player {
  position: absolute;
  bottom: 30px;
  font-size: 4rem;
  transform: translateX(-50%);
}
</style>