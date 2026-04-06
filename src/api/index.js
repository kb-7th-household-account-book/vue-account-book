import axios from 'axios';

// json-server의 기본 주소. package.json 스크립트에 4000 포트로 띄우도록 설정됨
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// [예시] 가계부 내역 전부 가져오기 
// 컴포넌트 측에서는 import { getLedgerList } from '@/api' 로 쉽게 사용 가능
export const getLedgerList = () => {
  return apiClient.get('/transactions');
};

export default apiClient;
