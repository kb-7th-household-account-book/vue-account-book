<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { onMounted } from 'vue';

const transactions = [
  {
    date: '2026-04-01',
    items: [
      { type: 'income', amount: 200000 },
      { type: 'expense', amount: -45000 },
    ],
  },
];

const handleDateClick = (info) => {
  // 기존 선택 제거
  document
    .querySelectorAll('.fc-daygrid-day')
    .forEach((el) => el.classList.remove('selected-day'));

  // 클릭한 날짜 선택
  info.dayEl.classList.add('selected-day');
};

onMounted(() => {
  setTimeout(() => {
    const todayEl = document.querySelector('.fc-day-today');
    if (todayEl) {
      todayEl.classList.add('selected-day');
    }
  }, 0);
});
const events = transactions.flatMap((day) =>
  day.items.map((item) => ({
    date: day.date,
    extendedProps: item,
  })),
);

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

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  events: events,
  eventContent: renderEvent,
  locale: 'ko',
  dayCellContent: (arg) => {
    return arg.date.getDate();
  },
  height: 'auto',
};
</script>

<style scoped>
/* FullCalendar 전체 영역 */
:deep(.fc) {
  background: #e7e6c8;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

:deep(.fc-scrollgrid),
:deep(.fc-scrollgrid-section),
:deep(.fc-scrollgrid-section > td),
:deep(.fc-view-harness),
:deep(.fc-view) {
  border: none !important;
}

/* 기본 테이블 배경 제거 */
:deep(.fc-scrollgrid),
:deep(.fc-scrollgrid table) {
  background: transparent !important;
  border: none !important;
}

/* 기본 테두리 제거 */
:deep(.fc-theme-standard td),
:deep(.fc-theme-standard th) {
  border: none !important;
}

/* 날짜 사이 간격 만들기 */
:deep(.fc-daygrid-body table) {
  border-collapse: separate !important;
  border-spacing: 12px !important; /* 카드 사이 간격 */
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
  box-shadow: inset 0 0 0 9999px #5c5c4d; /* 어두운 색 */
  opacity: 0.6;
}

/* ⭐ 선택된 날짜 */
:deep(.selected-day .fc-daygrid-day-frame) {
  box-shadow: inset 0 0 0 9999px #ffb300;
  color: #ccc !important; /* 원하는 색으로 변경 */
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
/* header 전체 wrapper */
:deep(.fc-scrollgrid-section-header) {
  background: transparent !important;
  border: none !important;
}

/* 요일 row */
:deep(.fc-col-header) {
  background: transparent !important;
  border: none !important;
}

/* 각 요일 cell */
:deep(.fc-col-header-cell) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* 🧹 헤더 제거 (원하면) */
:deep(.fc-header-toolbar) {
  display: none;
}

/* 🔥 요일(header) 배경만 제거 */
:deep(.fc-scrollgrid-section-header) {
  background: transparent !important;
}

:deep(.fc-col-header) {
  background: transparent !important;
}

:deep(.fc-col-header-cell) {
  background: transparent !important;
}
:deep(th) {
  color: #364153;
  background: none !important;
}
</style>
