<template>
  <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-4 lg:-mx-8">
  <h1 class="mt-2 xl:mr-40 sm:text-center lg:text-xl sm:text-xl text-white">Top 5 Results</h1>
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="text-center lg:text-l sm:text-l font-light">
          <thead class="border-b font-medium text-[#ff3131] dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">Point</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-green-500 text-[#39ff14]" v-for="(result, index) in results"
                :key="index">
              <td class="whitespace-nowrap px-6 py-4 font-medium">
                <img class="rounded w-10 h-10" :src="imageSource(result.point)" alt="">
              </td>
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                {{ result.user.first_name }} {{ result.user.last_name }}
              </td>
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                {{ result.point }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user-storage";
const results = ref([]);
const userStore = useUserStore();
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  imageSource: String,
})
const { imageSource } = toRefs(props)

const fetchTopResults = () => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + userStore.token;

  axios
    .get("http://127.0.0.1:8002/api/users/results/topResults")
    .then((response) => {
      results.value = response.data;
      console.log(results.value);
    })
    .catch((error) => {
      console.error("Error fetching top results:", error);
    });
};

onMounted(() => {
  fetchTopResults();
});
</script>
