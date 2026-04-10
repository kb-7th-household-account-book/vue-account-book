<template>
  <div class="calendar-center-wrapper">
    <div class="calendar-fixed-box">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { onMounted, computed } from 'vue';

const props = defineProps({
  dailyDataMap: Object, // 부모가 준 날짜별 요약 데이터
  currentDate: String,
});

const emit = defineEmits(['dateSelect', 'changeMonth']);

/* --- 💡 날짜 선택 스타일 유지 (건드리지 않음) --- */
const selectDay = (dateStr, dayEl) => {
  document
    .querySelectorAll('.fc-daygrid-day')
    .forEach((el) => el.classList.remove('selected-day'));

  if (dayEl) dayEl.classList.add('selected-day');
  emit('dateSelect', dateStr);
};

const handleDatesSet = (arg) => {
  // arg.view.currentStart는 해당 월의 1일 날짜를 가리킵니다.
  const year = arg.view.currentStart.getFullYear();
  const month = String(arg.view.currentStart.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${year}-${month}`;

  // 부모에게 현재 달력에 보이는 연-월을 보냄
  emit('changeMonth', yearMonth);
};

const handleDateClick = (info) => {
  selectDay(info.dateStr, info.dayEl);
};

const handleEventClick = (info) => {
  const dayEl = info.el.closest('.fc-daygrid-day');
  selectDay(info.event.startStr, dayEl);
};

onMounted(() => {
  setTimeout(() => {
    const todayEl = document.querySelector(
      `.fc-daygrid-day[data-date="${props.currentDate}"]`,
    );
    if (todayEl) {
      todayEl.classList.add('selected-day');
    }
  }, 100); // 데이터 로딩 시간을 고려해 약간의 딜레이
});

/* --- 📊 데이터 연동: 수입/지출 합계 요약 --- */
const events = computed(() => {
  if (!props.dailyDataMap) return [];

  return Object.values(props.dailyDataMap).flatMap((day) => {
    const dailyEvents = [];
    if (day.income > 0) {
      dailyEvents.push({
        date: day.date,
        order: 1, // 수입 위로
        extendedProps: { amount: day.income, type: 'income' },
      });
    }
    if (day.expense > 0) {
      dailyEvents.push({
        date: day.date,
        order: 2, // 지출 아래로
        extendedProps: { amount: day.expense, type: 'expense' },
      });
    }
    return dailyEvents;
  });
});

const renderEvent = (arg) => {
  const { amount, type } = arg.event.extendedProps;
  const color = type === 'income' ? '#4dabf7' : '#ff6b6b';
  const prefix = type === 'income' ? '+' : '-';

  return {
    html: `
      <div style="font-size:12px; font-weight: 700; text-align: right; width: 100%; padding-right: 4px; color: ${color};">
        ${prefix}${amount.toLocaleString()}
      </div>
    `,
  };
};

/* --- ⚙️ 캘린더 설정 --- */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  initialDate: props.currentDate,
  headerToolbar: {
    left: 'prev title next',
    center: '',
    right: '',
  },
  fixedWeekCount: false,
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  datesSet: handleDatesSet,
  events: events.value,
  eventOrder: 'order',
  eventContent: renderEvent,
  locale: 'ko',
  dayCellContent: (arg) => arg.date.getDate(),
  contentHeight: 'auto',
}));
</script>

<style scoped>
/* 모든 테이블 관련 요소의 보더와 아웃라인을 0으로 강제 */
:deep(.fc-theme-standard .fc-scrollgrid),
:deep(.fc-theme-standard td),
:deep(.fc-theme-standard th),
:deep(.fc-scrollgrid-section > *),
:deep(.fc-scroller-harness),
:deep(.fc-scroller) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* 이벤트 내부의 기본 파란색 바(bg) 제거 */
:deep(.fc-v-event),
:deep(.fc-h-event) {
  background-color: transparent !important;
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

.calendar-center-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 전체 달력 크기 조정 */
.calendar-fixed-box {
  width: 100%;
  max-width: 1000px; /* 100px 셀 7개 + 간격 고려한 적정 수치 */
  min-width: 1000px;
}

/* 테이블 레이아웃 고정 (간격 유지의 핵심) */
:deep(.fc-scrollgrid),
:deep(.fc-datagrid-body),
:deep(.fc-col-header) {
  border-collapse: separate !important; /* collapse면 margin이 안 먹습니다 */
  border-spacing: 12px !important; /* 여기서 셀 사이 간격을 조절하세요 */
  border: none !important;
}

/* 날짜 카드 크기 및 비율 고정 */
:deep(.fc-daygrid-day-frame) {
  width: 128px;
  height: 128px;
  aspect-ratio: 1 / 1;
  color: black;
  border-radius: 16px;
  background-color: #e7e6c8;
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 8px;
  box-sizing: border-box;
  transition: all 0.2s;
}

/* 날짜 셀 자체의 보더와 배경 제거 (중첩 방지) */
:deep(.fc-daygrid-day) {
  background: transparent !important;
}

/* 이전/다음 달 스타일 */
:deep(.fc-day-other .fc-daygrid-day-frame) {
  background-color: #e7e6c8 !important;
  opacity: 0.3;
}

/* 선택된 날짜 */
:deep(.selected-day .fc-daygrid-day-frame) {
  background-color: #ffb300 !important;
}

/* 요일 헤더 정렬 */
:deep(.fc-col-header-cell-cushion) {
  font-weight: 600;
}

/* 일요일/토요일 색상 */
:deep(.fc-col-header-cell:nth-child(1) .fc-col-header-cell-cushion) {
  color: #ff6b6b;
}
:deep(.fc-col-header-cell:nth-child(7) .fc-col-header-cell-cushion) {
  color: #4dabf7;
}

/* 툴바 및 기타 텍스트 스타일 */
:deep(.fc-toolbar-title) {
  color: white;
  font-size: 22px;
  font-weight: bold;
}

:deep(.fc-button) {
  background: transparent !important;
  border: none !important;
  color: white !important;
}

:deep(th) {
  font-size: 18px;
  color: #364153;
}
</style>
