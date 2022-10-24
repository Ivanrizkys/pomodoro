<script setup>
import { onMounted, ref } from "vue";
import AppLayout from "./components/AppLayout.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue";
import PomodoroActivity from "./components/PomodoroActivity.vue";
import {
  getAllActivity,
  addActivity,
  deleteActivity,
} from "./service/activity";
import endAudio from "./assets/audio/end.mp3";
import ErrorToast from "./components/ErrorToast.vue";

const state = ref({
  counting: false,
  showFormNote: false,
  startCounting: "",
  expectedCounting: 25,
  notes: "",
  activities: [],
  isError: false,
  errorMessage: "",
  timerKey: 0,
});
const timerRef = ref(null);

onMounted(() => {
  const request = getAllActivity();
  request
    .then((response) => {
      state.value.activities = response.data;
    })
    .catch(() => {
      state.value.isError = true;
      state.value.errorMessage = "Server api restarting..";
      setTimeout(() => {
        state.value.isError = false;
      }, 5000);
    });
});

const handleFormNotes = () => {
  state.value.showFormNote = true;
};

const handleStartCounting = () => {
  state.value.counting = true;
  state.value.notes = timerRef.value.notes;
  state.value.showFormNote = false;
  state.value.startCounting = new Date();
  timerRef.value.countDownEl.start();
};

const handleStopCounting = () => {
  timerRef.value.countDownEl.end();
};

const handleEndCounting = () => {
  document.title = "Pomodoro";
  state.value.timerKey++;
  const audio = new Audio(endAudio);
  audio.play();
  const requestData = {
    started_at: state.value.startCounting.toISOString(),
    finished_at: new Date().toISOString(),
    expected_duration: state.value.expectedCounting,
    notes: state.value.notes,
  };
  const request = addActivity(requestData);
  request
    .then(() => {
      state.value.counting = false;
      const refetchData = getAllActivity();
      refetchData
        .then((response) => {
          state.value.activities = response.data;
        })
        .catch(() => {
          state.value.isError = true;
          state.value.errorMessage = "Error when fetching data";
          setTimeout(() => {
            state.value.isError = false;
          }, 5000);
        });
    })
    .catch(() => {
      state.value.isError = true;
      state.value.errorMessage = "Error when post data";
      setTimeout(() => {
        state.value.isError = false;
      }, 5000);
    });
};

const handleDeleteActivity = () => {
  const DeleteAllActivity = () => {
    return new Promise((resolve, reject) => {
      for (let activity of state.value.activities) {
        const request = deleteActivity(activity.id);
        request.catch((err) => {
          reject(err);
        });
      }
      resolve("Delete all session succesfully");
    });
  };

  DeleteAllActivity()
    .then(() => {
      state.value.activities = [];
    })
    .catch(() => {
      state.value.isError = true;
      state.value.errorMessage = "Error when delete all sessions";
      setTimeout(() => {
        state.value.isError = false;
      }, 5000);
    });
};

const handleCounter = (type) => {
  if (type === "increment") {
    if (state.value.expectedCounting === 59) return;
    state.value.expectedCounting++;
    return;
  }
  if (state.value.expectedCounting === 1) return;
  state.value.expectedCounting--;
};
</script>

<template>
  <ErrorToast :is-error="state.isError">{{ state.errorMessage }}</ErrorToast>
  <AppLayout>
    <PomodoroTimer
      :key="state.timerKey"
      ref="timerRef"
      :initial-time="state.expectedCounting"
      :show-form-note="state.showFormNote"
      :counting="state.counting"
      @handle-show-notes="handleFormNotes"
      @handle-start-counting="handleStartCounting"
      @handle-stop-counting="handleStopCounting"
      @handle-counter="handleCounter"
      @handle-end-counting="handleEndCounting"
    />
    <PomodoroActivity
      :activities="state.activities"
      @handle-delete-activity="handleDeleteActivity"
    />
  </AppLayout>
</template>
