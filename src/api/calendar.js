import apiClient from './index';

// 필터 없이 전체 거래 내역 가져오기
export const getAllTransactions = () => {
  return apiClient.get('/transactions');
};

// 고정 지출 내역 가져오기
export const getFixedDetails = () => {
  return apiClient.get('/fixed_details');
};

// 고정 지출 신규 생성 (해당 월 데이터가 아예 없을 때)
export const createFixedExpense = (data) => {
  return apiClient.post('/fixed_details', data);
};

// 고정 지출 수정 (해당 월 데이터가 이미 있을 때)
// export const updateFixedExpense = (id, data) => {
//   return apiClient.put(`/fixed_details/${id}`, data);
// };
