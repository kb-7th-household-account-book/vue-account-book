<template>
  <div class="profile-card">
    <div class="avatar-section">
      <div class="avatar-circle">
        <div
          v-if="user.imgUrl"
          class="profile-image"
          :style="{ backgroundImage: `url(${user.imgUrl})` }"
        ></div>

        <span v-else class="placeholder-text">
          <span class="placeholder-text-content">
            {{ user.nickname ? user.nickname[0] : '👤' }}
          </span>
        </span>
      </div>

      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        style="display: none"
        @change="handleFileUpload"
      />

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
    <button class="edit-profile-btn" @click="openEditModal">프로필 수정</button>

    <div v-if="isModalOpen" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>프로필 수정</h3>
          <button class="close-icon-btn" @click="closeEditModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>이름 (닉네임)</label>
            <input
              type="text"
              v-model="editForm.nickname"
              placeholder="이름을 입력하세요"
              @keyup.enter="saveProfile"
            />
          </div>
          <div class="input-group">
            <label>이메일</label>
            <input
              type="email"
              v-model="editForm.email"
              placeholder="이메일을 입력하세요"
              @keyup.enter="saveProfile"
            />
          </div>
          <button class="save-btn" @click="saveProfile">저장하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';
import { ref, reactive } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-profile']);

/ 사진 업로드 기능
const fileInput = ref(null);

const triggerUpload = () => {
  fileInput.value.click(); // 숨겨진 input을 강제 클릭!
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 임시 URL을 만들어서 이미지를 미리보기 할 수 있게 해줍니다.
    const tempUrl = URL.createObjectURL(file);
    // 사진만 바뀐 새 데이터를 부모에게 전송
    emit('update-profile', { ...props.user, imgUrl: tempUrl });
  }
};

// 2. 프로필 수정 모달 기능
const isModalOpen = ref(false);
const editForm = reactive({ nickname: '', email: '' });

const openEditModal = () => {
  // 모달을 열 때, 기존 데이터를 폼에 채워줍니다.
  editForm.nickname = props.user.nickname;
  editForm.email = props.user.email;
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
};

const saveProfile = () => {
  // 이름과 이메일이 바뀐 새 데이터를 부모에게 전송
  emit('update-profile', {
    ...props.user,
    nickname: editForm.nickname,
    email: editForm.email,
  });
  closeEditModal();
};
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
  overflow: hidden;
  position: relative; /* 자식 요소 배치를 위해 */
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px); /* 뒷배경을 살짝 흐리게 해서 고급스럽게 */
}
.modal-content {
  background-color: #1a1a1b; /* 기존 카드보다 살짝 밝은 다크그레이 */
  width: 90%;
  max-width: 360px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
}
.modal-header h3 {
  margin: 0;
  color: #fff;
  font-size: 18px;
}
.close-icon-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 24px 20px;
}
.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.input-group label {
  color: #aaa;
  font-size: 13px;
}
.input-group input {
  background-color: #0a0a0b;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 14px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}
.input-group input:focus {
  border-color: #ffb800;
} /* 입력창 클릭 시 노란색 테두리 */

.save-btn {
  width: 100%;
  padding: 16px;
  margin-top: 10px;
  background-color: #ffb800;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile-image {
  width: 100%;
  height: 100%;
  background-size: cover; /* 🌟 비율을 유지하며 원형을 꽉 채웁니다 */
  background-position: center; /* 🌟 이미지를 중앙에 배치합니다 */
  border-radius: 50%; /* 안전장치 */
}
.placeholder-text {
  /* 이미지 위에 겹쳐 보이지 않도록 절대 위치로 중앙 배치 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.placeholder-text-content {
  /* 닉네임 첫 글자가 이미지 뒤에 가려져도 이상하지 않게 투명도 조정 */
  opacity: 0.8;
}
</style>
