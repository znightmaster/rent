<template>
  <div
    class="relative flex flex-col items-center justify-between max-w-[918px] w-full h-fit gap-16 bg-white/30 backdrop-blur-md rounded-lg space-x-4 p-20">
    <div class="flex gap-200 w-full">
      <div class="flex flex-col text-center w-1/2">
        <label class="text-sm text-gray-600">От</label>
        <input
          type="number"
          class="border p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div class="flex flex-col text-center w-1/2">
        <label class="text-sm text-gray-600">До</label>
        <input
          type="number"
          class="border p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
    </div>

    <div class="relative w-full mt-6">
      <div class="absolute w-full h-2 bg-gray-300 rounded"></div>
      <div class="absolute h-2 bg-teal-700 rounded"></div>

      <input type="range"
             class="absolute w-full appearance-none bg-transparent pointer-events-none"/>
      <input type="range"
             class="absolute w-full appearance-none bg-transparent pointer-events-none"/>
    </div>

    <p class="text-center text-gray-700 mt-4">
      Выбранный диапазон: <span class="font-semibold">30 000 KZT</span> — <span class="font-semibold">120 000 KZT</span>
    </p>
  </div>
</template>
<script setup>

</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 14px solid #007bff;
  transform: translateY(-5px);
  -webkit-appearance: none;
}

input[type="range"]::-moz-range-thumb {
  pointer-events: all;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 14px solid #007bff;
}
</style>