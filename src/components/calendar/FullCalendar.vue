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
  color: #364153;
}
</style>
