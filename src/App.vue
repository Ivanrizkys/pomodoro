<script setup>
import AppLayout from "./components/AppLayout.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue";
import PomodoroActivity from "./components/PomodoroActivity.vue";
</script>
<template>
  <AppLayout>
    <PomodoroTimer />
    <PomodoroActivity />
  </AppLayout>
</template>
