import apiClient from "./index";

export const getMonthlySummary = () => {
    return apiClient.get('/monthly_stats');
}

export const getTransactions = (filters) => {
  const params = new URLSearchParams();

  // 최신순 정렬
  params.append("_sort", "date,time");
  params.append("_order", "desc,desc");

  // 페이지네이션 (한 번에 10개씩)
  // 부모에서 filters.page를 관리한다고 가정
  const page = filters.page || 1;
  const limit = 10; 
  params.append("_page", page);
  params.append("_limit", limit);

  // 필터 조건들
  if (filters.startDate) params.append("date_gte", filters.startDate);
  if (filters.endDate) params.append("date_lte", filters.endDate);

  if (filters.type && filters.type !== 'all') {
    params.append("type", filters.type);
  }

  // 카테고리 다중 선택
  if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach(cat => params.append("category", cat));
  }

  if (filters.minAmount !== undefined) params.append("amount_gte", filters.minAmount);
  if (filters.maxAmount !== undefined) params.append("amount_lte", filters.maxAmount);

  return apiClient.get(`/transactions?${params.toString()}`);
};