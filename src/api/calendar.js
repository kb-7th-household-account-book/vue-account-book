import apiClient from './index';

// 필터 없이 전체 거래 내역 가져오기
export const getAllTransactions = () => {
  return apiClient.get('/transactions');
};

export const getFixedDetails = () => {
  return apiClient.get('/fixed_details');
};

// 고정 지출 추가 (POST)
export const addFixedExpense = (data) => {
  return apiClient.post('/fixed_details', data);
};
