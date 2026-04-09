export const GAME_CONFIG = {
  BOARD_WIDTH: 720,      // 게임판 가로 너비 (Game.vue .game-page-container와 동일)
  PLAYER_SPEED: 7,       // 지갑 이동 속도
  ITEM_SPEED: 2,         // 아이템 낙하 속도
  ITEM_SIZE_MIN: 3,      // 아이템 최소 크기 (rem)
  ITEM_SIZE_MAX: 10,     // 아이템 최대 크기 (rem)
  // 플레이어 실제 이미지 크기: 269 × 507 (비율 유지 스케일)
  PLAYER_WIDTH: 150,     // 플레이어 너비
  PLAYER_HEIGHT: 283     // 플레이어 높이 (150 * 507 / 269)
};