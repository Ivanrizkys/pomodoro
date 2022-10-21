<template>
  <div class="grow flex items-end flex-col mt-[151px]">
    <div class="w-full flex justify-end">
      <button
        class="w-full max-w-[100px] h-[30px] rounded-[58px] bg-success shadow-md"
      ></button>
    </div>
    <div class="mt-[27px] w-full flex justify-end">
      <div class="w-full max-w-[704px] sm:min-w-[452px] rounded-md border-[1px] border-solid overflow-hidden">
        <table class="w-full h-[494px]">
          <tr class="border-b-[1px] border-solid">
            <th class="w-1/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]">#</th>
            <th class="w-4/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]">Started at</th>
            <th class="w-3/12 py-7 px-4 text-start border-r-[1px] border-solid text-[#555555]">Duration</th>
            <th class="w-4/12 py-7 px-4 text-start text-[#555555]">Notes</th>
          </tr>
          <div class="">
            <tr class="text-xs">
              <td class="w-1/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]">1</td>
              <td class="w-4/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555] relative">
                <p class="">16:18:48, Sep 1, Thu</p>
                <p class="absolute">(16 sec ago)</p>
              </td>
              <td class="w-3/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]">
                <span class="font-semibold">00:16</span> / 25 min.
              </td>
              <td class="w-4/12 py-6 px-4 text-start text-[#555555]">Notes</td>
            </tr>
            <tr class="h-full">
              <td class="w-1/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555] h-full"></td>
              <td class="w-4/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"></td>
              <td class="w-3/12 py-6 px-4 text-start border-r-[1px] border-solid text-[#555555]"></td>
              <td class="w-4/12 py-6 px-4 text-start text-[#555555]"></td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>
