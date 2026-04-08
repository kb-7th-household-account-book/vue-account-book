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
    date: '2026-04-02',
    items: [
      { type: 'income', amount: 200000 },
      { type: 'expense', amount: -45000 },
    ],
  },
  {
    date: '2026-04-08',
    items: [
      { type: 'income', amount: 200000 },
      { type: 'expense', amount: -45000 },
    ],
  },
  {
    date: '2026-04-11',
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
  console.log('선택된 날짜:', info.dateStr);
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
  headerToolbar: {
    left: 'prev title next',
    center: '',
    right: '',
  },

  fixedWeekCount: false, // 6주가 기본인데 5주로 줄이기
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
:deep(.fc-scrollgrid),
:deep(.fc-scrollgrid-section > td) {
  border: none !important;
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
