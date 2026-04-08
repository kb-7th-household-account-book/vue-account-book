import apiClient from './index';

// 1. 유저 기본 정보 가져오기 (db.json의 "user")
export const getUserData = () => {
  return apiClient.get('/user');
};

// 2. 유저 통계 정보 가져오기 (db.json의 "user_stats")
export const getUserStats = () => {
  return apiClient.get('/user_stats');
};

// 3. 유저 정보 수정하기 (프로필 저장용)
// json-server에서 단일 객체를 수정할 때는 PATCH 메서드를 사용합니다.
export const updateUserData = (data) => {
  return apiClient.patch('/user', data);
};
