<template>
  <div class="profile-card">
    <div class="avatar-section">
      <div class="avatar-circle">
        <span class="placeholder-text">{{
          // 이미지 파일 없을 경우, 맨 앞 글자
          user.nickname ? user.nickname[0] : '👤'
        }}</span>
      </div>
      <button class="camera-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0834 3.3335H7.91675L5.83341 5.8335H3.33341C2.89139 5.8335 2.46746 6.00909 2.1549 6.32165C1.84234 6.63421 1.66675 7.05814 1.66675 7.50016V15.0002C1.66675 15.4422 1.84234 15.8661 2.1549 16.1787C2.46746 16.4912 2.89139 16.6668 3.33341 16.6668H16.6667C17.1088 16.6668 17.5327 16.4912 17.8453 16.1787C18.1578 15.8661 18.3334 15.4422 18.3334 15.0002V7.50016C18.3334 7.05814 18.1578 6.63421 17.8453 6.32165C17.5327 6.00909 17.1088 5.8335 16.6667 5.8335H14.1667L12.0834 3.3335Z"
            stroke="black"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 13.3335C11.3807 13.3335 12.5 12.2142 12.5 10.8335C12.5 9.45278 11.3807 8.3335 10 8.3335C8.61929 8.3335 7.5 9.45278 7.5 10.8335C7.5 12.2142 8.61929 13.3335 10 13.3335Z"
            stroke="black"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <p class="email-text">{{ user.email }}</p>

    <button class="edit-profile-btn">프로필 수정</button>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';

defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      // 부모가 데이터 안 줬을 때, 에러나지 않도록 임시로 채워줌
      email: 'example@email.com',
      imgUrl: '',
      nickname: '유저',
    }),
  },
});
</script>

<style scoped>
.profile-card {
  background-color: #121213;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.avatar-section {
  position: relative;
  margin-bottom: 15px;
}
.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #fff;
}
.camera-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffb800;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.email-text {
  color: #a0a0a0;
  margin-bottom: 20px;
  font-size: 14px;
}
.edit-profile-btn {
  background-color: #ffb800;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  cursor: pointer;
}
</style>
