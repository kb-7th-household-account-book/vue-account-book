<template>
  <header class="app-header">
    <nav class="nav-links">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/calendar" class="nav-item">캘린더</router-link>
      <router-link to="/register" class="nav-item">가계 등록</router-link>
      <router-link to="/transactions" class="nav-item">거래 내역</router-link>
    </nav>

    <div class="header-icons">
      <router-link to="/settings" class="user-icon-btn">
        <span class="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 14V12.6667C12.6667 11.9594 12.3858 11.2811 11.8857 10.781C11.3856 10.281 10.7073 10 10 10H6.00004C5.2928 10 4.61452 10.281 4.11442 10.781C3.61433 11.2811 3.33337 11.9594 3.33337 12.6667V14"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </router-link>
      <button class="location-btn">
        <span class="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 6.66683C13.3333 9.9955 9.64063 13.4622 8.40063 14.5328C8.28511 14.6197 8.14449 14.6667 7.99996 14.6667C7.85543 14.6667 7.71481 14.6197 7.59929 14.5328C6.35929 13.4622 2.66663 9.9955 2.66663 6.66683C2.66663 5.25234 3.22853 3.89579 4.22872 2.89559C5.22892 1.8954 6.58547 1.3335 7.99996 1.3335C9.41445 1.3335 10.771 1.8954 11.7712 2.89559C12.7714 3.89579 13.3333 5.25234 13.3333 6.66683Z"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0a0a0b;
  border-bottom: 1px solid #0a0a0b;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: #666666;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;
}

/* 🌟 수정됨: router-link-exact-active 로 변경! */
.nav-item.router-link-exact-active {
  color: #ffb800;
  font-weight: bold;
}

.nav-item:hover {
  color: #aaaaaa;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-icon-btn {
  /* 🌟 수정됨: 평소에는 투명 배경에 회색 아이콘 */
  background-color: transparent;
  color: #666666;
  border: none;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 클릭 되었을 때만 노랑! */
.user-icon-btn.router-link-exact-active {
  background-color: #2a1f00;
  color: #ffb800;
}

.location-btn {
  background: none;
  border: none;
  color: #666666; /* 기본 아이콘 색상 일치 */
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.location-btn:hover {
  color: #aaaaaa;
}
</style>
