<script setup>
import { onMounted, toRaw, watch } from 'vue';
import { useTransactionStore } from '@/store/transactions';
import LoadMoreButton from '@/components/transactions/LoadMoreButton.vue';
import MonthlySummary from '@/components/transactions/MonthlySummary.vue';
import TransactionFilter from '@/components/transactions/TransactionFilter.vue';
import TransactionList from '@/components/transactions/TransactionList.vue';

const store = useTransactionStore();

onMounted(() => {
  store.init();
});

watch(() => store.list, (newList) => {
  console.log('데이터 로드 완료:', toRaw(newList));
}, { deep: true });


watch(() => store.counts, (newCounts) => {
  console.log('데이터 로드 완료:', toRaw(newCounts));
}, { deep: true });
</script>

<template>
  <div class="transaction-layout">
    <aside class="filter-section">
      <TransactionFilter />
    </aside>

    <main class="content-section">
      <MonthlySummary />
      
      <TransactionList />
      
      <LoadMoreButton 
        v-if="!store.isLastPage" 
        @click="store.loadNextPage" 
      />
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