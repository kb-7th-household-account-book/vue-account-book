import apiClient from './index';

// 1. 월별 요약 데이터
export const getMonthlyStats = (month) => {
  return apiClient.get(`/monthly_stats?month=${month}`);
};

// 2. 1년치 월별 데이터
export const getAllMonthlyStats = () => {
  return apiClient.get('/monthly_stats');
};

// 3. 고정 지출 내역
export const getFixedDetails = (month) => {
  return apiClient.get(`/fixed_details?month=${month}`);
};

// 4. 카테고리별 통계
export const getStatistics = (month) => {
  return apiClient.get(`/statistics?month=${month}`);
};

// 5. 최근 거래 내역
export const getRecentTransactions = () => {
  return apiClient.get('/transactions?_sort=date,time&_order=desc,desc&_limit=4');
};

// 6. 거래 추가
export const addTransaction = (data) => {
  return apiClient.post('/transactions', data);
};

// 카테고리 금액 직접 계산을 위해 전체 거래내역 가져오기
export const getAllTransactions = () => {
  return apiClient.get('/transactions');
};
