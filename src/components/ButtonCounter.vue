<script setup>
const emit = defineEmits(["handleClick"]);
</script>
<template>
  <button
    @click="emit('handleClick')"
    class="w-full aspect-square rounded-full bg-primary-300 flex justify-center items-center shadow-md font-light text-[#555555]"
  >
    <slot />
  </button>
</template>
