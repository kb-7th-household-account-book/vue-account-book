<script setup>
import MonthlySummary from '@/components/Transactions/MonthlySummary.vue';
import TransactionFilter from '@/components/Transactions/TransactionFilter.vue';
import TransactionList from '@/components/Transactions/TransactionList.vue';
</script>

<template>
  <div class="transaction-layout">
    <aside class="filter-section">
      <TransactionFilter />
    </aside>

    <main class="content-section">
        <MonthlySummary/>
        <TransactionList/>
    </main>
  </div>
</template>

<style scoped>
.transaction-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  min-height: 100vh;
}

.filter-section {
  padding: 24px;
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid #1F1F21;
  overflow-y: auto;
  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.content-section {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (max-width: 800px) {
  .transaction-layout {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid #1F1F21;
    padding: 20px;
  }
  
  .content-section {
    padding: 20px;
  }
}
</style>