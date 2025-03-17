<template>
  <div class="flex flex-col items-center gap-40 justify-center w-full px-20">

    <transition-group name="list" appear>
      <apartment-list-card
        v-for="item in data"
        :key="item.id"
        :data="item"
        img="/img/Banner8.png"/>
    </transition-group>

  </div>
</template>

<script setup>
import ApartmentListCard from '@/components/UI/ApartmentListCard.vue';
import { useMainStore } from '@/stores/counter.js';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const store = useMainStore();

</script>

<style lang="scss" scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
}

</style>

