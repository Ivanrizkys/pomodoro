<script setup>
import ButtonCounter from './ButtonCounter.vue';
</script>
<template>
  <div class="w-3/5 md:w-auto shrink basis-[340px] pt-32 md:pt-60 mx-auto md:mx-0">
    <div
      class="w-full aspect-square rounded-full bg-primary-200 shadow-inner p-[22px]"
    >
      <div
        class="w-full h-full bg-gradient-to-b from-error-100 to-error-200 shadow-inner rounded-full p-[22px]"
      >
        <div
          class="w-full h-full border-4 border-primary-200/50 rounded-full flex justify-center items-center"
        >
          <p class="text-primary-0 font-light text-4xl min-[905px]:text-6xl">25:00</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center md:justify-start gap-x-8 mt-11 min-[790px]:mt-14">
      <div class="w-full  max-w-[40px] sm:max-w-[60px]">
        <ButtonCounter></ButtonCounter>
      </div>
      <div class="w-full max-w-[40px] sm:max-w-[60px]">
        <ButtonCounter></ButtonCounter>
      </div>
      <button
        class="w-full max-w-[40px] sm:max-w-[60px] min-[790px]:max-w-[155px] aspect-square min-[790px]:h-[60px] rounded-[58px] bg-success shadow-md"
      ></button>
    </div>
  </div>
</template>
