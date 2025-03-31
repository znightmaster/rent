<template>
  <div class="scroll-button" :class="{ 'bottom': !isAtTop }" @click="toggleScroll">
    <span :class="isAtTop ? 'arrow-down' : 'arrow-up'"></span>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const lastScrollPosition = ref(0);
const isAtTop = ref(true);

const toggleScroll = () => {
  if (isAtTop.value) {
    lastScrollPosition.value = window.scrollY; // Сохраняем текущую позицию
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    isAtTop.value = false;
  } else {
    window.scrollTo({ top: lastScrollPosition.value || 0, behavior: 'smooth' });
    isAtTop.value = true;
  }
};

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const clientHeight = window.innerHeight;

  isAtTop.value = scrollTop <= 0;
  if (scrollTop + clientHeight >= scrollHeight) {
    isAtTop.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-button {
  position: fixed;
  left: 20px;
  top: 110px; /* Начально наверху */
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: top 0.4s ease-in-out, background 0.3s;
}

.scroll-button:hover {
  background: #f0f0f0;
}

.scroll-button.bottom {
  top: auto;
  bottom: 20px;
}

.arrow-up,
.arrow-down {
  display: block;
  width: 20px;
  height: 20px;
  border-left: 4px solid teal;
  border-bottom: 4px solid teal;
  transition: transform 0.3s;
}

.arrow-down {
  transform: rotate(-45deg);
}

.arrow-up {
  transform: rotate(135deg);
}
</style>