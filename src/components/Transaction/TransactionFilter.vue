<script setup>
// 필요한 로직은 여기에!
</script>

<template>
    <div class="filter-layout">
        <section class="filter-group">
            <h3>기간</h3>
            </section>

        <section class="filter-group">
            <h3>거래 유형</h3>
            </section>

        <section class="filter-group">
            <h3>카테고리</h3>
            </section>

        <section class="filter-group">
            <h3>금액 범위</h3>
            </section>
    </div>
</template>

<style scoped>
.filter-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  color: #FFFFFF;
}

.filter-group h3 {
  font-size: 14px;
  color: #8E8E93;
  margin-bottom: 15px;
  font-weight: 500;
}
</style>