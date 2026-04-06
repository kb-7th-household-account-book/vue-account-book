<script setup>
import { ref } from 'vue';

const box = ref(null);

const nextSlide = () => {
  const items = box.value.querySelectorAll('.item');
  box.value.appendChild(items[0]);
};

const prevSlide = () => {
  const items = box.value.querySelectorAll('.item');
  box.value.prepend(items[items.length - 1]);
};
</script>

<template>
  <div class="box" ref="box">
    <div class="item"><img src="/images/1.jpg"></div>
    <div class="item"><img src="/images/2.jpg"></div>
    <div class="item"><img src="/images/3.jpg"></div>
    <div class="item"><img src="/images/4.jpg"></div>
    <div class="item"><img src="/images/5.jpg"></div>
    <div class="item"><img src="/images/6.jpg"></div>
    <div class="item"><img src="/images/7.jpg"></div>
    <div class="item"><img src="/images/8.jpg"></div>
    <div class="item"><img src="/images/9.jpg"></div>
    <div class="item"><img src="/images/10.jpg"></div>
    <div class="item"><img src="/images/11.jpg"></div>
    <div class="item"><img src="/images/12.jpg"></div>
  </div>
  <div class="buttons">
    <span class="prev" @click="prevSlide"></span>
    <span class="next" @click="nextSlide"></span>
  </div>
</template>

<style scoped>
/* App.vue / box.css에서 3D 전용 컴포넌트 동작을 위한 요소들만 이관 */
.box {
  position: relative;
  display: flex;
  transform-style: preserve-3d;
  perspective: 500px;
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
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0002)
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
  position: absolute;
  bottom: 75px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
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
