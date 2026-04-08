<script setup>
const count = "3";
</script>

<template>
    <button class="button-layout">더보기 ({{ count }}건 더 있음)</button>
</template>

<style scoped>
.button-layout{
    display: flex;
    padding: 13.5px 22.625px 12.5px 23px;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.70);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.15px;
    align-self: center;
}
</style>