<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { onMounted } from 'vue';

// 부모(App)에서 전달받은 월별 데이터
// [{ date, income, expense, items: [] }]
const props = defineProps({
  monthlyData: Array,
  currentDate: String,
});

// 부모로 이벤트 전달 (날짜 선택)
const emit = defineEmits(['dateSelect']);

const selectDay = (dateStr, dayEl) => {
  // 기존 선택된 날짜 스타일 제거
  document
    .querySelectorAll('.fc-daygrid-day')
    .forEach((el) => el.classList.remove('selected-day'));

  // 현재 클릭한 날짜에 클래스 추가
  if (dayEl) dayEl.classList.add('selected-day');

  // 부모 컴포넌트로 선택된 날짜 전달
  emit('dateSelect', dateStr);
};

const handleDateClick = (info) => {
  selectDay(info.dateStr, info.dayEl);
};

const handleEventClick = (info) => {
  // 이벤트가 속한 날짜 셀 찾기
  const dayEl = info.el.closest('.fc-daygrid-day');
  selectDay(info.event.startStr, dayEl);
};

// 🔥 컴포넌트 마운트 후 오늘 날짜 자동 선택 스타일 적용
onMounted(() => {
  setTimeout(() => {
    const todayEl = document.querySelector(`.fc-day-today[data-date="${props.currentDate}"]`);
    if (todayEl) {
      todayEl.classList.add('selected-day');
    }
  }, 50);
});

// 🔥 FullCalendar에 넣을 이벤트 데이터 생성
// monthlyData → items → 이벤트로 변환
const events = props.monthlyData.flatMap((day) =>
  day.items.map((item) => ({
    date: day.date, // 이벤트 날짜
    extendedProps: item, // 추가 데이터 (amount, category 등)
  })),
);

// 🔥 이벤트(금액) 커스텀 렌더링
const renderEvent = (arg) => {
  const { amount } = arg.event.extendedProps;
  return {
    html: `
      <div style="font-size:11px; text-align:center;">
        <div style="color:${amount > 0 ? '#4dabf7' : '#ff6b6b'}">
          ${amount > 0 ? '+' : ''}${amount.toLocaleString()}
        </div>
      </div>
    `,
  };
};

// 🔥 FullCalendar 전체 설정
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  initialDate: props.currentDate, // 초기 달력 세팅 날짜 지정
  
  // 상단 헤더 (이전 / 제목 / 다음)
  headerToolbar: {
    left: 'prev title next',
    center: '',
    right: '',
  },

  fixedWeekCount: false, // 달마다 주 수 맞춤 (빈 줄 제거)
  dateClick: handleDateClick, // 날짜 클릭 이벤트
  eventClick: handleEventClick, // 지출, 수입 클릭 이벤트
  events: events, // 우리가 만든 이벤트 데이터
  eventContent: renderEvent, // 이벤트 커스텀 렌더링
  locale: 'ko',

  // 날짜 숫자만 표시 (1일 → 1)
  dayCellContent: (arg) => {
    return arg.date.getDate();
  },
  contentHeight: 'auto',
};
</script>

<style scoped>
:deep(.fc-scrollgrid),
:deep(.fc-scrollgrid-section > td) {
  border: none !important;
}

:deep(.fc-event *) {
  cursor: default !important;
  user-select: none;
}

:deep(.fc-toolbar-chunk) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.fc-header-toolbar) {
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px;
}

:deep(.fc-button) {
  background: none !important;
  border: none !important;
  color: white;
  font-size: 24px;
  box-shadow: none !important;
}

/* hover 효과 */
:deep(.fc-button:hover) {
  color: #ffb300;
}

:deep(.fc-toolbar-title) {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

/* 날짜 사이 간격 만들기 */
:deep(.fc-daygrid-day-frame) {
  margin: 6px;
}

/* 📅 날짜 카드 스타일 */
:deep(.fc-daygrid-day) {
  border: none;
  padding: 0;
}

/* 각 날짜 카드 */
:deep(.fc-daygrid-day-frame) {
  height: 90px;
  border-radius: 16px;
  border: none;
  padding: 8px;
  background: transparent;

  /* 💡 핵심: 배경을 그림자로 채움 (끊김 방지) */
  box-shadow: inset 0 0 0 9999px #e7e6c8;
  transition: all 0.2s ease;
}

/* 🌗 이전/다음 달 날짜 */
:deep(.fc-day-other .fc-daygrid-day-frame) {
  box-shadow: inset 0 0 0 9999px #5c5c4d;
  opacity: 0.6;
}

/* ⭐ 선택된 날짜 */
:deep(.selected-day .fc-daygrid-day-frame) {
  box-shadow: inset 0 0 0 9999px #ffb300;
  color: #ccc !important;
}

/* 일요일 */
:deep(.fc-col-header-cell:nth-child(1)) {
  color: #ff6b6b;
}

/* 토요일 */
:deep(.fc-col-header-cell:nth-child(7)) {
  color: #4dabf7;
}

/* 💰 이벤트 (금액 표시) */
:deep(.fc-event) {
  background: none !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  font-size: 11px;
  text-align: center;
}

/* 각 요일 cell */
:deep(.fc-col-header-cell) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(th) {
  color: #364153;
  background: none !important;
}
</style>
