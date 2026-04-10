import apiClient from "./index";

/**
 * 전 거래 내역을 조회하여 다음 순차 ID를 생성합니다.
 * @returns {Promise<number>} - 다음 ID 숫자
 */
const getNextId = async () => {
    try {
        const response = await apiClient.get('/transactions');
        let transactions = [];
        if (Array.isArray(response.data)) {
            transactions = response.data;
        } else if (response.data && Array.isArray(response.data.transactions)) {
            transactions = response.data.transactions;
        } else if (response.data && typeof response.data === 'object') {
            const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
            transactions = possibleArray || [];
        }

        if (transactions.length === 0) return 1;
        
        // ID들을 숫자로 추출하여 가장 큰 값을 찾습니다.
        const ids = transactions
            .map(item => Number(item.id))
            .filter(id => !isNaN(id) && id > 0);
            
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return maxId + 1;
    } catch (error) {
        console.error('[API] getNextId failed, falling back to 1:', error);
        return 1;
    }
}

// 거래 내역 추가 (POST)
export const addTransaction = async (data) => {
    const nextId = await getNextId();
    
    // 데이터에서 혹시 모를 id 필드를 제거하고, 우리가 계산한 '숫자형' id를 첫 번째로 넣습니다.
    const { id: _, ...rest } = data;
    const payload = { 
        id: nextId, 
        ...rest 
    };
    
    console.log('[API] Sending Numeric ID Payload:', payload);
    return apiClient.post('/transactions', payload);
}

// 거래 내역 수정 (PATCH)
export const updateTransaction = (id, data) => {
    const { id: _, ...rest } = data;
    return apiClient.patch(`/transactions/${String(id)}`, rest);
}

// 거래 내역 삭제 (DELETE)
export const deleteTransaction = (id) => {
    return apiClient.delete(`/transactions/${String(id)}`);
}