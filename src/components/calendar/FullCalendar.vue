<template>
  <div class="calendar-fixed-box">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  dailyDataMap: Object, // 부모가 준 날짜별 요약 데이터
  fixedList: Array, // 고정 지출 데이터
  currentDate: String,
});

const emit = defineEmits(['dateSelect', 'changeMonth']);

const visibleYearMonth = ref(props.currentDate.substring(0, 7)); // 초기값 '2026-04'

/* --- 💡 날짜 선택 스타일 유지 (건드리지 않음) --- */
const selectDay = (dateStr, dayEl) => {
  document
    .querySelectorAll('.fc-daygrid-day')
    .forEach((el) => el.classList.remove('selected-day'));

  if (dayEl) dayEl.classList.add('selected-day');
  emit('dateSelect', dateStr);
};

const handleDatesSet = (arg) => {
  const year = arg.view.currentStart.getFullYear();
  const month = String(arg.view.currentStart.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${year}-${month}`;

  visibleYearMonth.value = yearMonth; // 내부 상태 업데이트 (이벤트 재계산 트리거)
  emit('changeMonth', yearMonth); // 부모에게 알림
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
  const dailyEvents = [];

  // 1️⃣ 기존 변동 지출 & 수익 처리
  if (props.dailyDataMap) {
    Object.values(props.dailyDataMap).forEach((day) => {
      if (day.income > 0) {
        dailyEvents.push({
          date: day.date,
          order: 1,
          extendedProps: { amount: day.income, type: 'income' },
        });
      }
      if (day.expense > 0) {
        dailyEvents.push({
          date: day.date,
          order: 2,
          extendedProps: { amount: day.expense, type: 'expense' },
        });
      }
    });
  }

  // 2️⃣ 🎯 고정 지출 처리 (visibleYearMonth 기준)
  if (props.fixedList && visibleYearMonth.value) {
    const [year, month] = visibleYearMonth.value.split('-');

    props.fixedList.forEach((item) => {
      const startDate = new Date(item.start_date);
      const targetDateStr = `${year}-${month}-${String(item.day).padStart(2, '0')}`;
      const targetDate = new Date(targetDateStr);

      // 날짜 유효성 체크
      if (isNaN(targetDate.getTime())) return;

      // 시작일 조건 및 삭제 로직 체크
      if (
        startDate <= targetDate &&
        (!item.deleted_at || new Date(item.deleted_at) > targetDate)
      ) {
        dailyEvents.push({
          date: targetDateStr,
          order: 3,
          extendedProps: {
            amount: item.expense,
            type: 'fixed',
            name: item.name,
          },
        });
      }
    });
  }

  return dailyEvents;
});

const renderEvent = (arg) => {
  const { amount, type } = arg.event.extendedProps;
  const colors = {
    income: '#4dabf7', // 파랑
    expense: '#ff6b6b', // 빨강
    fixed: '#ad46ff', // 🎯 고정지출 보라
  };
  const color = colors[type] || '#ffffff';
  const prefix = type === 'income' ? '+' : '-';

  return {
    html: `
      <div style="font-size:11px; font-weight: 700; text-align: right; width: 100%; padding-right: 4px; color: ${color};">
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
  gap: 6px;
}

/* 전체 달력 크기 조정 */
.calendar-fixed-box {
  width: 100%;
  max-width: 700px; /* 100px 셀 7개 + 간격 고려한 적정 수치 */
  min-width: 700px;
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
  width: 85px;
  aspect-ratio: 1 / 1;
  color: black;
  border-radius: 16px;
  background-color: #e7e6c8;
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin: 6px;
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
