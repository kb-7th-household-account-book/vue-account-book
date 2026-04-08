// src/api/game.js
import apiClient from './index'; // axios.create()를 export한 파일 경로를 맞춰주세요!

export const getTransactions = async () => {
  const response = await apiClient.get('/transactions');
  return response.data; 
};