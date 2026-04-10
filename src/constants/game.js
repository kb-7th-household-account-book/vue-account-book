export const GAME_CONFIG = {
  BOARD_WIDTH: 720,        // 게임판 가로 너비 (Game.vue .game-page-container와 동일)
  PLAYER_SPEED: 7,         // 지갑 이동 속도
  ITEM_SPEED: 2,           // 아이템 기본 낙하 속도 (사용 안 함, 개별 속도 사용)
  ITEM_SPEED_MIN: 1.8,     // 아이템 최소 낙하 속도
  ITEM_SPEED_MAX: 3.0,     // 아이템 최대 낙하 속도
  ITEM_SIZE_MIN: 3,        // 아이템 최소 크기 (rem)
  ITEM_SIZE_MAX: 10,       // 아이템 최대 크기 (rem)
  PLAYER_WIDTH: 150,       // 플레이어 너비
  PLAYER_HEIGHT: 283,      // 플레이어 높이 (150 * 507 / 269)
  MAX_FALLING_ITEMS: 15,   // 동시에 낙하는 아이템의 최대 개수
  ITEM_SPAWN_OFFSET: -150, // 초기 Y 위치
  ITEM_SPACING: 150,       // 아이템 간격 (픽셀)
  GAME_END_DELAY: 3000     // 게임 종료 후 결과 화면으로 전환되기까지의 지연 시간 (ms)
};

// 랜덤 아이콘 리스트
export const RANDOM_ICONS = [
  '🪙', // 동전
  '🪙', // 동전
  '💵', // 지폐
  '💵', // 지폐
  '🎁', // 선물
  '🍷', // 와인
  '🍖', // 고기
  '🍒', // 체리
  '🏷️'  // 태그
];