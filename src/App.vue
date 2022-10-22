<script setup>
import { ref } from "vue";
import AppLayout from "./components/AppLayout.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue";
import PomodoroActivity from "./components/PomodoroActivity.vue";

const state = ref({
  counting: false,
  timeRemaining: 0,
  showFormNote: false,
  startCounting: 0,
  endCounting: 0,
  expectedCounting: 25,
  notes: "",
});

const timerRef = ref(null);

const handleFormNotes = () => {
  state.value.showFormNote = true;
};

const handleStartCounting = () => {
  state.value.counting = true;
  state.value.notes = timerRef.value.notes;
  state.value.showFormNote = false;
  state.value.startCounting = Date.now();
  timerRef.value.countDownEl.start();
};

const handleStopCounting = () => {
  state.value.endCounting = Date.now();
  timerRef.value.countDownEl.end();
  console.log("state nya adalah", state.value);
};

const handleCounter = (type) => {
  console.log(type);
  if (type === "increment") {
    state.value.expectedCounting++;
    return;
  }
  state.value.expectedCounting--;
};
</script>

<template>
  <AppLayout>
    <PomodoroTimer
      ref="timerRef"
      :time-remaining="state.timeRemaining"
      :initial-time="state.expectedCounting"
      :show-form-note="state.showFormNote"
      :counting="state.counting"
      @handle-show-notes="handleFormNotes"
      @handle-start-counting="handleStartCounting"
      @handle-stop-counting="handleStopCounting"
      @handle-counter="handleCounter"
    />
    <PomodoroActivity />
  </AppLayout>
</template>
