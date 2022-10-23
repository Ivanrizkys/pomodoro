<script setup>
import { ref } from "vue";
import ButtonCounter from "./ButtonCounter.vue";
import PlayIcon from "./icons/PlayIcon.vue";
import StopIcon from "./icons/StopIcon.vue";

defineProps({
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
  "handleEndCounting",
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

const handleCountdownProgress = (data) => {
  const seconds = data.seconds < 10 ? `0${data.seconds}` : String(data.seconds);
  const minutes = data.minutes < 10 ? `0${data.minutes}` : String(data.minutes);
  document.title = `${minutes} : ${seconds}`;
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
              @end="emit('handleEndCounting')"
              @progress="handleCountdownProgress"
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
        <ButtonCounter v-if="!counting" @handle-click="handleDecrement">
          <p class="leading-[24px] text-5xl mt-[-2px]">-</p>
        </ButtonCounter>
        <ButtonCounter v-else>
          <p class="leading-[24px] text-5xl mt-[-2px]">-</p>
        </ButtonCounter>
      </div>
      <div class="w-full max-w-[40px] sm:max-w-[60px]">
        <ButtonCounter v-if="!counting" @handle-click="handleIncrement">
          <p class="leading-[24px] text-4xl mt-[-2px]">+</p>
        </ButtonCounter>
        <ButtonCounter v-else>
          <p class="leading-[24px] text-4xl mt-[-2px]">+</p>
        </ButtonCounter>
      </div>
      <button
        v-if="counting"
        class="w-full max-w-[40px] sm:max-w-[60px] min-[790px]:max-w-[155px] aspect-square min-[790px]:h-[60px] rounded-[58px] bg-success shadow-md flex items-center justify-center hover:bg-[#D6EA84] active:bg-[#CDE46E]"
        @click="$emit('handleStopCounting')"
      >
        <StopIcon class="w-[17px] h-[17px] sm:w-[24px] ml-[2px] sm:h-[24px]" />
      </button>
      <button
        v-else
        class="w-full max-w-[40px] sm:max-w-[60px] min-[790px]:max-w-[155px] aspect-square min-[790px]:h-[60px] rounded-[58px] bg-success shadow-md flex items-center justify-center hover:bg-[#D6EA84] active:bg-[#CDE46E]"
        @click="$emit('handleShowNotes')"
      >
        <PlayIcon class="w-[17px] h-[17px] sm:w-[24px] ml-[2px] sm:h-[24px]" />
      </button>
    </div>
    <div v-if="showFormNote" class="w-full flex mt-6 justify-center">
      <form @submit.prevent="$emit('handleStartCounting')">
        <input
          v-model="notes"
          ref="inputNoteEl"
          type="text"
          class="w-full md:w-9/12 py-3 px-5 rounded-r-2xl md:rounded-r-none rounded-l-2xl outline-none text-secondary-200 block md:inline"
          placeholder="Add Note (Optional)"
        />
        <button
          type="submit"
          class="md:w-3/12 md:h-full rounded-l-2xl md:rounded-l-none bg-success rounded-r-2xl px-5 py-2 sm:py-3 md:py-0 md:px-3 hover:bg-[#D6EA84] active:bg-[#CDE46E] mx-auto md:mx-0 block md:inline mt-3 md:mt-0"
        >
          Start
        </button>
      </form>
    </div>
  </div>
</template>
