import apiClient from "./index";

export const getMonthlySummary = () => {
  const currentMonth = new Date().getMonth() + 1;
  return apiClient.get(`/monthly_stats?month=${currentMonth}`);
}

export const getTransactions = (filters) => {
  const params = new URLSearchParams();

  // 정렬
  params.append("_sort", "-date");
  params.append("_sort", "-time");

  // 페이지네이션
  const page = filters.page || 1;
  const limit = 10;

  params.append("_page", page.toString());
  params.append("_per_page", limit.toString());

  // 날짜 필터
  if (filters.startDate) params.append("date_gte", filters.startDate);
  if (filters.endDate) params.append("date_lte", filters.endDate);

  // 거래 유형 필터
  if (filters.type && filters.type !== 'all') {
    params.append("type", filters.type);
  }

  // 카테고리 필터
  if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach(cat => {
      params.append("category", cat);
    });
  }

  // 금액 범위 필터
  if (filters.minAmount !== undefined && filters.minAmount !== '') {
    params.append("amount_gte", filters.minAmount.toString());
  }

  // maxAmount가 설정되어 있고, 무의미하게 작은 값이 아닐 때만 추가
  if (filters.maxAmount !== undefined && filters.maxAmount !== '' && filters.maxAmount > 0) {
    params.append("amount_lte", filters.maxAmount.toString());
  }

  const queryString = params.toString();
  
  return apiClient.get(`/transactions?${queryString}`);
};