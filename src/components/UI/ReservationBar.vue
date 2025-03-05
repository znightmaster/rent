<template>
  <div class="relative flex justify-center items-center min-h-screen">
    <div class="relative flex items-center justify-between w-[918px] h-[102px] bg-white/30 backdrop-blur-md rounded-lg p-4 space-x-4">
      <div class="flex flex-col">
        <label for="check-in" class="text-gray-700 font-medium">Заезд</label>
        <input type="date" id="check-in" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
      </div>

      <div class="flex flex-col">
        <label for="check-out" class="text-gray-700 font-medium">Выезд</label>
        <input type="date" id="check-out" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
      </div>

      <div class="flex flex-col">
        <label for="guests" class="text-gray-700 font-medium">Гостей</label>
        <select id="guests" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>
      </div>

      <button class="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition">
        Поиск
      </button>
    </div>
  </div>

</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>