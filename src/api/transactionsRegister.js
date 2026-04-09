import apiClient from "./index";

// 거래 내역 추가 (POST)
export const addTransaction  = (data) => {
    return apiClient.post('/transactions', data);
}

// 거래 내역 수정 (PATCH)
export const updateTransaction = (id, data) => {
    return apiClient.patch(`transactions/${id}`, data);
}

// 거래 내역 삭제 (DELETE)
export const deleteTransaction = (id) => {
    return apiClient.delete(`transactions/${id}`, data)
}