<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const box = ref(null);
const router = useRouter();

const nextSlide = () => {
  const items = box.value.querySelectorAll('.item');
  box.value.appendChild(items[0]);
};

const prevSlide = () => {
  const items = box.value.querySelectorAll('.item');
  box.value.prepend(items[items.length - 1]);
};

// 클릭 시 캘린더로 이동하는 함수
const goToCalendar = (month) => {
  // month 4 -> '2026-04-01' 변환
  console.log(`${month}월 이미지 클릭됨`);
  const targetDate = `2026-${String(month).padStart(2, '0')}-01`;
  router.push({ name: 'calendar', query: { date: targetDate } });
}
</script>

<template>
  <div class="carousel-wrapper">
    <div class="box" ref="box">
      <div class="item" @click="goToCalendar(1)"><img src="/images/1.jpg"></div>
      <div class="item" @click="goToCalendar(2)"><img src="/images/2.jpg"></div>
      <div class="item" @click="goToCalendar(3)"><img src="/images/3.jpg"></div>
      <div class="item" @click="goToCalendar(4)"><img src="/images/4.jpg"></div>
      <div class="item" @click="goToCalendar(5)"><img src="/images/5.jpg"></div>
      <div class="item" @click="goToCalendar(6)"><img src="/images/6.jpg"></div>
      <div class="item" @click="goToCalendar(7)"><img src="/images/7.jpg"></div>
      <div class="item" @click="goToCalendar(8)"><img src="/images/8.jpg"></div>
      <div class="item" @click="goToCalendar(9)"><img src="/images/9.jpg"></div>
      <div class="item" @click="goToCalendar(10)"><img src="/images/10.jpg"></div>
      <div class="item" @click="goToCalendar(11)"><img src="/images/11.jpg"></div>
      <div class="item" @click="goToCalendar(12)"><img src="/images/12.jpg"></div>
    </div>
    <div class="buttons">
      <span class="prev" @click="prevSlide"></span>
      <span class="next" @click="nextSlide"></span>
    </div>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.box {
  position: relative;
  display: flex;
  transform-style: preserve-3d;
  perspective: 500px;
  width: 100%;
  height: 400px;
}

.box .item {
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 100px);
  width: 200px;
  height: 300px;
  background: #fff;
  transition: 0.5s;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transform-origin: bottom;
  user-select: none;
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0002);
  cursor: pointer;
}

.box .item:nth-child(1) {
  transform: translate3d(-250px, 0, 0) scale(0.8) rotateY(25deg);
  z-index: 1;
  opacity: 0;
}

.box .item:nth-child(2) {
  transform: translate3d(-250px, 0, 0) scale(0.8) rotateY(25deg);
  z-index: 2;
}

.box .item:nth-child(3) {
  transform: translate3d(-150px, 0, 0) scale(0.9) rotateY(15deg);
  z-index: 3;
}

.box .item:nth-child(4) {
  transform: translate3d(0px, 0, 0) scale(1) rotateY(0deg);
  z-index: 4;
}

.box .item:nth-child(5) {
  transform: translate3d(150px, 0, 0) scale(0.9) rotateY(-15deg);
  z-index: 5;
}

.box .item:nth-child(6) {
  transform: translate3d(250px, 0, 0) scale(0.8) rotateY(-25deg);
  z-index: 6;
}

.box .item:nth-child(n+7) {
  transform: translate3d(250px, 0, 0) scale(0.8) rotateY(-25deg);
  z-index: -1;
  opacity: 0;
}

.box .item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buttons {
  display: flex;
  gap: 30px; /* 버튼 사이 간격 */
  margin-top: 20px; /* 3D 박스와의 간격 */
}

.buttons span {
  position: relative;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}

.buttons span:hover {
  opacity: 1;
}

.buttons span::before {
  content: '';
  position: absolute;
  left: 20px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  rotate: -45deg;
}

.buttons span.next::before {
  content: '';
  position: absolute;
  left: 15px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  rotate: 135deg;
}
</style>
