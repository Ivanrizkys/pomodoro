<script setup>
import dayjs from "dayjs";
import TrashIcon from "./icons/TrashIcon.vue";
import DownloadIcon from "./icons/DownloadIcon.vue";

defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

defineEmits(["handleDeleteActivity"]);

const getActivityDuration = (start, end) => {
  if (!start || !end) {
    return null;
  }
  const startedAt = new Date(start);
  const finishedAt = new Date(end);
  const ms = finishedAt - startedAt;
  const totalSeconds = ms / 1000;
  const minutes = Math.round(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const format2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  return `${format2Digits(minutes)}:${format2Digits(seconds)}`;
};

const differenceCreatedAt = (created) => {
  const difference = new Date() - new Date(created);
  return Math.floor(difference / 1000);
};
</script>
<template>
  <div class="grow flex items-end flex-col-reverse mt-[151px]">
    <div class="mt-[27px] w-full flex justify-end">
      <div
        id="table"
        class="w-full max-w-[704px] sm:min-w-[452px] rounded-md border-[1px] border-solid overflow-hidden"
      >
        <table class="w-full h-[494px]">
          <tr class="border-b-[1px] border-solid">
            <th
              class="w-1/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            >
              #
            </th>
            <th
              class="w-4/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            >
              Started at
            </th>
            <th
              class="w-3/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            >
              Duration
            </th>
            <th class="w-4/12 py-7 px-4 text-start text-[#555555]">Notes</th>
          </tr>
          <tr
            v-for="(activity, index) in activities"
            :key="activity.id"
            class="text-xs"
          >
            <td
              class="w-1/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            >
              {{ index + 1 }}
            </td>
            <td
              class="w-4/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555] relative"
            >
              <p class="">
                {{
                  dayjs(activity?.attributes?.started_at).format(
                    "HH:mm:ss, MMM M, ddd"
                  )
                }}
              </p>
              <p
                v-if="differenceCreatedAt(activity.attributes.started_at) < 60"
                class="absolute"
              >
                ({{ differenceCreatedAt(activity.attributes.started_at) }} sec
                ago)
              </p>
            </td>
            <td
              class="w-3/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            >
              <span class="font-semibold">{{
                getActivityDuration(
                  activity.attributes.started_at,
                  activity.attributes.finished_at
                )
              }}</span>
              / {{ activity?.attributes?.expected_duration }} min.
            </td>
            <td class="w-4/12 py-6 px-4 text-start text-[#555555]">
              {{ activity.attributes?.notes }}
            </td>
          </tr>
          <tr v-if="activities.length < 7" class="h-full">
            <td
              class="w-1/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555] h-full"
            ></td>
            <td
              class="w-4/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            ></td>
            <td
              class="w-3/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"
            ></td>
            <td class="w-4/12 py-6 px-4 text-start text-[#555555]"></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="w-full flex justify-end gap-2">
      <button
        v-print="'#table'"
        class="py-1 px-4 rounded-[58px] bg-success shadow-md flex items-center gap-2"
      >
        <DownloadIcon />
        <p class="text-[#555555] text-xs font-semibold mt-[2px]">
          Download logs
        </p>
      </button>
      <button
        @click="$emit('handleDeleteActivity')"
        class="py-1 px-4 rounded-[58px] bg-primary-100 flex items-center gap-2"
      >
        <TrashIcon />
        <p class="text-[#555555] text-xs mt-[2px]">Delete all sessions</p>
      </button>
    </div>
  </div>
</template>
