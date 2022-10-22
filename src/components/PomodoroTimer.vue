<script setup>
import { ref } from "vue";
import ButtonCounter from "./ButtonCounter.vue";

defineProps({
  timeRemaining: {
    type: Number,
    required: true,
  },
  initialTime: {
    type: Number,
    required: true,
  },
  counting: {
    type: Boolean,
    required: true,
  },
  showFormNote: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  "handleShowNotes, handleStartCounting, handleStopCounting, handleCounter",
]);

const notes = ref("");
const inputNoteEl = ref(null);
const countDownEl = ref(null);

defineExpose({
  inputNoteEl,
  countDownEl,
  notes,
});

const timeFormat = (props) => {
  const formatProps = {};
  Object.entries(props).forEach(([key, value]) => {
    formatProps[key] = value < 10 ? `0${value}` : String(value);
  });
  return formatProps;
};

const handleIncrement = () => {
  emit("handleCounter", "increment");
};

const handleDecrement = () => {
  emit("handleCounter", "decrement");
};
</script>
<template>
  <div
    class="w-3/5 md:w-auto shrink basis-[340px] pt-32 md:pt-60 mx-auto md:mx-0"
  >
    <div
      class="w-full aspect-square rounded-full bg-primary-200 shadow-inner p-[22px]"
    >
      <div
        class="w-full h-full bg-gradient-to-b from-error-100 to-error-200 shadow-inner rounded-full p-[22px]"
      >
        <div
          class="w-full h-full border-4 border-primary-200/50 rounded-full flex justify-center items-center"
        >
          <p class="text-primary-0 font-light text-4xl min-[905px]:text-6xl">
            <vue-countdown
              :time="initialTime * 60000"
              v-slot="{ minutes, seconds }"
              :transform="timeFormat"
              ref="countDownEl"
              :auto-start="false"
            >
              {{ minutes }}:{{ seconds }}
            </vue-countdown>
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex justify-center md:justify-start gap-x-8 mt-11 min-[790px]:mt-14"
    >
      <div class="w-full max-w-[40px] sm:max-w-[60px]">
        <ButtonCounter @handle-click="handleDecrement"></ButtonCounter>
      </div>
      <div class="w-full max-w-[40px] sm:max-w-[60px]">
        <ButtonCounter @handle-click="handleIncrement"></ButtonCounter>
      </div>
      <button
        v-if="counting"
        class="w-full max-w-[40px] sm:max-w-[60px] min-[790px]:max-w-[155px] aspect-square min-[790px]:h-[60px] rounded-[58px] bg-success shadow-md"
        @click="$emit('handleStopCounting')"
      >
        Berhenti
      </button>
      <button
        v-else
        class="w-full max-w-[40px] sm:max-w-[60px] min-[790px]:max-w-[155px] aspect-square min-[790px]:h-[60px] rounded-[58px] bg-success shadow-md"
        @click="$emit('handleShowNotes')"
      >
        Jalan
      </button>
    </div>
    <div v-if="showFormNote" class="w-full flex mt-6">
      <form @submit.prevent="$emit('handleStartCounting')">
        <input
          v-model="notes"
          ref="inputNoteEl"
          type="text"
          class="w-9/12 py-2 px-5 rounded-l-3xl outline-none"
          placeholder="Add Note (Optional)"
        />
        <button
          type="submit"
          class="w-3/12 h-full bg-success rounded-r-3xl px-3"
        >
          Start
        </button>
      </form>
    </div>
  </div>
</template>
