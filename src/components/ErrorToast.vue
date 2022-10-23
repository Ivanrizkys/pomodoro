<script setup>
import ErrorIcon from "./icons/ErrorIcon.vue";

defineProps({
  isError: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <div
    class="absolute py-2 px-3 bg-red-500 rounded-sm left-10 flex items-center gap-4 transition-[top] duration-500"
    :style="{
      top: isError ? '24px' : '-40px',
    }"
  >
    <ErrorIcon />
    <p class="text-white">
      <slot />
    </p>
  </div>
</template>
