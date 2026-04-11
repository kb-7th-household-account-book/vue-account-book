<template>
  <div class="header">
    <span class="count-label">등록된 고정지출 [{{ items.length }}건]</span>
    <button class="refresh-icon-btn" @click="$emit('refresh')">
      <img src="@/assets/icons/Icon.svg" alt="arrow" class="icon-arrow" />
    </button>
  </div>
  <div class="list-wrapper">
    <div v-for="item in items" :key="item.id" class="fixed-item-card">
      <div class="purple-icon-circle">
        <!-- <img src="@/assets/icons/Icon.svg" alt="arrow" class="icon-arrow" /> -->
        📌
      </div>
      <div class="item-info">
        <p class="item-name">{{ item.title }}</p>
        <p class="item-cycle">{{ item.day }}일</p>
      </div>
      <div class="item-amount">-₩{{ item.expense?.toLocaleString() }}</div>
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
// 공통 버튼 컴포넌트 불러오기 (실제 경로에 맞게 수정)
import Button from '@/components/calendar/Button.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['add-action', 'refresh']);
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
  color: #777; /* 피그마의 흐릿한 회색 */
}

/* 오른쪽 상단 보라색 리프레시 버튼 */
.refresh-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ad46ff; /* 선명한 보라색 */
}
.refresh-icon-btn span {
  font-size: 20px;
}

.list-wrapper {
  max-height: 480px; /* 리스트 스크롤 영역 */
  overflow-y: auto;

  /* 스크롤바 전체 너비 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* 스크롤바 트랙 (바탕) */
  &::-webkit-scrollbar-track {
    background: transparent; /* 배경은 투명하게 해서 깔끔하게 */
  }

  /* 스크롤바 막대 (실제 움직이는 부분) */
  &::-webkit-scrollbar-thumb {
    /* 배경보다 약간 밝은 그레이로 설정 */
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2); /* 마우스 올릴 때만 살짝 선명하게 */
  }
}

/* 개별 지출 항목 카드 스타일 */
.fixed-item-card {
  background-color: #212121; /* 개별 카드는 배경보다 살짝 밝게 */
  border-radius: 24px; /* 카드 라운드 값 */
  padding: 18px 20px;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

/* 피그마 보라색 원형 아이콘 스타일 */
.purple-icon-circle {
  width: 48px;
  height: 48px;
  background-color: #ad46ff;
  border-radius: 50%; /* 완전한 원 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}
.purple-icon-circle span {
  font-size: 22px;
  color: white;
}

/* 이름 & 주기 정보 */
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

/* 금액 (피그마 붉은색) */
.item-amount {
  margin-left: auto; /* 금액을 오른쪽 끝으로 밀어줌 */
  color: #ff6b6b; /* 지출용 붉은색 */
  font-size: 18px;
  font-weight: 700;
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

/* Material Icons 사용을 위해 CDN 호출이 프로젝트 최상단에 되어있어야 합니다. 
   예: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
*/
</style>
