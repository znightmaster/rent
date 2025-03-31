<template>
  <div>
    <button type="button" class="burger-menu" :class="{ active: isOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

</script>

<style lang="scss" scoped>

.burger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    height: 4px;
    background: teal;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  span:nth-child(1) {
    width: 100%;
  }

  span:nth-child(2) {
    width: 70%;
  }

  span:nth-child(3) {
    width: 40%;
  }

  &.active {
    span:nth-child(1) {
      width: 40%;
    }

    span:nth-child(2) {
      width: 70%;
    }

    span:nth-child(3) {
      width: 100%;
    }
  }
}

</style>