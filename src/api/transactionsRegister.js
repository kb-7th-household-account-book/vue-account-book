import apiClient from "./index";

/**
 * 전 거래 내역을 조회하여 다음 순차 ID를 생성합니다.
 * @returns {Promise<string>} - 다음 ID 문자열
 */
const getNextId = async () => {
    const { data } = await apiClient.get('/transactions');
    if (!data || data.length === 0) return "1";
    
    // ID들을 숫자로 변환하여 가장 큰 값을 찾습니다.
    const ids = data.map(item => parseInt(item.id)).filter(id => !isNaN(id));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    
    return String(maxId + 1);
}

// 거래 내역 추가 (POST)
// 이제 프론트엔드에서 수동으로 ID를 계산하여 서버의 무작위 생성을 방지합니다.
export const addTransaction = async (data) => {
    const nextId = await getNextId();
    const payload = { ...data, id: nextId };
    return apiClient.post('/transactions', payload);
}

// 거래 내역 수정 (PATCH)
export const updateTransaction = (id, data) => {
    return apiClient.patch(`transactions/${id}`, data);
}

// 거래 내역 삭제 (DELETE)
export const deleteTransaction = (id) => {
    return apiClient.delete(`transactions/${id}`);
}