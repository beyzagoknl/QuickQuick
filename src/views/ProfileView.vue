<template>
<div>
 <div id="videoDarkOverlay"></div>
    <video autoplay muted loop id="myVideo">
    <source src="../../public/background2.mp4"> type="video/mp4" />
  </video>
</div>
    <div class="container min-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row">
        <div class="md:w-1/2">
        <div class="flex flex-col justify-center items-center">
         <h1
            class="m-2 text-2xl md:text-4xl text-white text-center"
          >
            {{ firstName }} {{ lastName }}
          </h1>
            <img
              :src="getImageBasedOnPoint(lastPoint)"
              alt="User Image"
              class="rounded-full h-auto max-w-xs m-5"
            />
          
        </div>
        </div>
        <div class="md:w-1/3 s:w-1/2">
          <TopResultsSection :imageSource="getImageBasedOnPoint"/>
        </div>
      </div>
      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            btnText="Play Game"
            class="text-white w-40 text-center mt-3"
            color="green"
            url="/game"
          />
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            :btnText="chartVisible ? 'Hide Chart' : 'Show Chart'"
            class="text-white w-40 text-center mt-3"
            color="yellow"
            @click="toggleChart"
            v-if="results.length != 0"
          />
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            btnText="Delete Results"
            class="text-white w-40 text-center mt-3"
            color="red"
            @click="confirmDeleteAll"
            v-if="results.length != 0"
          />
        </div>
      </div>
    </div>
    <div v-if="results.length === 0">
      <h1 class="text-white mt-2 text-center">There is no result! Play a game!</h1>
    </div>
    <div>
      <div class="bg-[#F5d300] h-60xl" v-if="chartVisible && results.length > 0">
        <div class="container h-80 max-w-20xl mx-auto mt-4">
          <Line :data="data" :options="options" />
        </div>
      </div>
    </div>
    <div v-if="showResult && results.length > 0">
      <div class="ms-auto py-4 ml-4">
        <div class="font-bold text-gray-100">
          <div class="mt-4">
            <div class="relative overflow-x-auto bg-white">
              <table
                class="w-full text-sm text-left text-red-500 dark:text-white"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">No</th>
                    <th scope="col" class="px-6 py-3">Date & Time</th>
                    <th scope="col" class="px-6 py-3">Point</th>
                    <th scope="col" class="px-6 py-3">Correct</th>
                    <th scope="col" class="px-6 py-3">Wrong</th>
                    <th scope="col" class="px-6 py-3">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    v-for="(result, index) in results"
                    :key="result.id"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                      {{
                        moment(result.created_at).format("DD-MM-YYYY HH:mm:ss")
                      }}
                    </td>
                    <td class="px-6 py-4">{{ result.point }}</td>
                    <td class="px-6 py-4">{{ result.correct }}</td>
                    <td class="px-6 py-4">{{ result.wrong }}</td>
                    <td
                      class="px-6 py-4 text-red-900 cursor-pointer"
                      @click="deleteResult(result.id)"
                    >
                      X
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


</div>
</template>


<script setup>
import RouterLinkButton from "../components/global/RouterLinkButton.vue";
import TopResultsSection from "../components/structure/TopResultsSection.vue";
import { useUserStore } from "@/store/user-storage";
import { useResultsStore } from "@/store/result-storage";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { ref } from "vue";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const userStore = useUserStore();
const resultStore = useResultsStore();
const firstName = userStore.firstName;
const lastName = userStore.lastName;

console.log("here is " + userStore.token);

const results = ref([]);
results.value = resultStore.results;

const showResult = ref(true);
const chartVisible = ref(false);

const createChart = () => {
  const formattedLabels = results.value.map((result) =>
    moment(result.created_at).format("DD-MM-YYYY HH:mm:ss")
  );
  const formattedData = results.value.map((result) => result.point);
  const reversedLabels = formattedLabels.slice().reverse();
  const reversedData = formattedData.slice().reverse();

  data.value = {
    labels: reversedLabels,
    datasets: [
      {
        label: "Points",
        backgroundColor: "red",
        data: reversedData,
      },
    ],
  };
  options.value = {
    responsive: true,
    maintainAspectRatio: false,
  };
};
const toggleChart = () => {
  chartVisible.value = !chartVisible.value;
  if (chartVisible.value) {
    createChart();
  }
};

const data = ref({
  labels: [],
  datasets: [
    {
      label: "Points",
      backgroundColor: "#f87979",
      data: [],
    },
  ],
});
const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const deleteResult = async (resultId) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + userStore.token;

    const res = await axios.delete(
      `${apiBaseUrl}/users/${userStore.id}/results/${resultId}`
    );
    // if (res.status === 204) {
    //   results.value = results.value.filter((result) => result.id !== resultId);
    //   console.log(resultId + " deleted");
    //   createChart();
    // } else {
    //   console.error("Failed to delete result", res);
    // }
if(res.status ===204) {
  try {
    let res = await axios.get(`${apiBaseUrl}/users/${userStore.id}/results`);
    await resultStore.updateResults(res.data);
    results.value = resultStore.results
    createChart();

  } catch (error) {
    console.error("Error fetching results:", error);
  }
}

  } catch (err) {
    console.error("Error deleting result:", err);
  }
};

const deleteAllResults = async () => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + userStore.token;

    await axios.delete(`${apiBaseUrl}/users/${userStore.id}/deleteAll/results`);
    results.value = [];
    showResult.value = false;
    await resultStore.updateResults(results.value);
  } catch (err) {
    console.error("Error deleting results:", err);
  }
};

const confirmDeleteAll = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d9534f",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete all results!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await deleteAllResults();
    createChart();
    results.value = [];
    Swal.fire("Deleted!", "All results have been deleted.", "success");
  }
};

const lastResult = results.value[0];
const lastPoint = lastResult ? lastResult.point : undefined;

console.log("The highest point value is:", lastPoint);

const getImageBasedOnPoint = (point) => {
  switch (true) {
    case point === 0 || point === undefined:
      return require("@/assets/baby.jpg");
    case point <= 20:
      return require("@/assets/turtle.jpg");
    case point <= 50:
      return require("@/assets/rabbit.jpg");
    case point <= 80:
      return require("@/assets/eagle.jpg");
    case point <= 110:
      return require("@/assets/panther.jpg");
    case point <= 140:
      return require("@/assets/cheetah.jpg");
    default:
      return require("@/assets/flash.jpg");
  }
};
</script>

<style scoped>
#myVideo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -2;
}
#videoDarkOverlay {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>