<template>
  <div class="header">
    <span class="count-label">등록된 고정지출 [{{ items.length }}건]</span>
    <button class="refresh-icon-btn" @click="$emit('refresh')">
      <img src="@/assets/icons/Icon.svg" alt="arrow" />
    </button>
  </div>
  <div class="list-wrapper">
    <div
      v-for="item in items"
      :key="item.id"
      class="fixed-item-card"
      :class="{ 'is-selected': selectedId === item.id }"
      @click="toggleSelect(item.id)"
    >
      <div class="purple-icon-circle">📌</div>
      <div class="item-info">
        <p class="item-name">{{ item.title }}</p>
        <p class="item-cycle">{{ item.day }}일</p>
      </div>
      <div class="amount-group">
        <div class="item-amount">-₩{{ item.expense?.toLocaleString() }}</div>

        <Transition name="fade">
          <div v-if="selectedId === item.id" class="action-buttons">
            <button class="edit-btn" @click.stop="$emit('edit-action', item)">
              <img
                src="@/assets/icons/editIcon.png"
                alt="arrow"
                class="edit-icon"
              />
            </button>
            <button class="delete-btn" @click.stop="onDelete(item)">
              <img
                src="@/assets/icons/deleteIcon.png"
                alt="arrow"
                class="delete-icon"
              />
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div v-if="items.length === 0" class="empty-state">
      고정 지출 내역이 없습니다.
    </div>
  </div>
  <div class="btn-area">
    <Button
      :add="{ id: 3, name: '+ 고정지출 추가', type: 'fixedExpenses' }"
      @action="(type) => $emit('add-action', type)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/calendar/Button.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'add-action',
  'refresh',
  'edit-action',
  'delete-action',
]);

const selectedId = ref(null);

// 항목 클릭 시 선택/해제 토글
const toggleSelect = (id) => {
  selectedId.value = selectedId.value === id ? null : id;
};

const onDelete = (item) => {
  if (confirm(`'${item.title}' 내역을 삭제하시겠습니까?`)) {
    emit('delete-action', item.id);
  }
  console.log(item);
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.count-label {
  font-size: 15px;
  color: #777;
}

.refresh-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.list-wrapper {
  max-height: 480px;
  overflow-y: auto;
  padding-top: 2px;
  padding-right: 5px; /* 스크롤바와 카드 사이 간격 */
}

/* 스크롤바 커스텀 */
.list-wrapper::-webkit-scrollbar {
  width: 5px;
}
.list-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.list-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

/* --- [수정/추가된 카드 스타일] --- */
.fixed-item-card {
  background-color: #212121;
  border-radius: 24px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent; /* 기본 테두리 투명 */
}

/* 클릭해서 선택되었을 때 스타일 */
.fixed-item-card.is-selected {
  background-color: #2a2a2a;
  border-color: #ad46ff; /* 보라색 테두리 추가 */
  transform: translateY(-2px); /* 살짝 떠오르는 효과 */
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.edit-btn {
  background: none; /* 배경 절대 없음 */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.6;
  box-shadow: none; /* 그림자도 제거 */
}

.edit-btn:hover {
  opacity: 1;
  transform: scale(1.1);
  background: none; /* 호버 시에도 배경 생기지 않게 */
}

.edit-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
}

/* ⭐ 삭제 버튼 스타일 (붉은색 계열) */
.delete-btn {
  background: none; /* 삭제 버튼도 투명하게 맞추면 더 예뻐 */
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
}

.delete-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.delete-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
}

.purple-icon-circle {
  width: 48px;
  height: 48px;
  background-color: #ad46ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.item-info .item-name {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.item-info .item-cycle {
  font-size: 14px;
  color: #666;
  margin: 6px 0 0 0;
}

/* --- [수정된 금액 & 버튼 그룹] --- */
.amount-group {
  margin-left: auto; /* 그룹 전체를 오른쪽 끝으로 */
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-amount {
  color: #ff6b6b;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

/* 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.btn-area {
  margin-top: 15px;
}

.empty-state {
  text-align: center;
  color: #444;
  padding: 40px 0;
  font-size: 14px;
}
</style>
