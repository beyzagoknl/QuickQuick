<template>
  <div class="container max-w-4xl mx-auto mt-10 bg-blue-100">
    <div class="flex">
      <div class="w-1/2">
        <h1 class="text-2xl md:text-4xl text-left text-gray-900">{{ firstName }} {{ lastName }}</h1>
      </div>
      <div class="w-1/2 mt-2">
        <RouterLinkButton btnText="Play Game" color="red" url="/game" />
      </div>
      <div class="w-1/2 mt-2">
        <RouterLinkButton btnText="Show Chart" color="red" @click="createChart" v-if="showResult"/>
      </div>
      <div class="w-1/2 mt-2" v-if="showResult && !showDeleteAllButton">
        <RouterLinkButton btnText="My Results" color="blue" @click="getResult" />
      </div>
      <div class="w-1/2 mt-2" v-if="showDeleteAllButton">
        <RouterLinkButton btnText="Delete Results" color="red" @click="confirmDeleteAll" />
      </div>
    </div>
  </div>
  <div>
  <div v-if="showChart">
  <div class="container max-w-4xl mx-auto mt-4">
    <Line :data="data" :options="options"/>
  </div>
  </div>
  </div>
  <div v-if="showResult">
    <div class="ms-auto py-4 ml-4">
      <div class="font-bold text-gray-900">
        <div class="text-xl">Game Results</div>
        <div class="mt-4">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for='(result, index) in results' :key='result.id'>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}</th>
                  <td class="px-6 py-4">{{ moment(result.created_at).format('DD-MM-YYYY HH:mm:ss') }}</td>
                  <td class="px-6 py-4">{{ result.point }}</td>
                  <td class="px-6 py-4">{{ result.correct }}</td>
                  <td class="px-6 py-4">{{ result.wrong }}</td>
                  <td class="px-6 py-4 text-red-900 cursor-pointer" @click="deleteResult(result.id)">X</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="results.length == 0">
          <p>
          There is no result! Click on My Results button or play a game!
          </p></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import RouterLinkButton from "../../components/global/RouterLinkButton.vue";
//import ProfileAboutSection from "../../components/partials/profile/ProfileAboutSection.vue";
//import GameInfo from "../../components/partials/profile/GameInfo.vue"
import { useUserStore } from '@/store/user-storage'; 
import {useResultsStore} from '@/store/result-storage'
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import { ref} from 'vue';
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const showDeleteAllButton = ref(false);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'

import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

const userStore = useUserStore()
const resultStore = useResultsStore()
const firstName = userStore.firstName
const lastName = userStore.lastName

console.log("here is " + userStore.token)
console.log(resultStore.results)

const results = ref([])
const showResult = ref(true)
const showChart = ref(false)

const data = ref({
  labels: [],
  datasets: [
    {
      label: 'Points',
      backgroundColor: '#f87979',
      data: []
    },
  ],
})
const options =ref({
  responsive: true,
  maintainAspectRatio: false,

})

results.value = resultStore.results


const getResult = async() => {

 showResult.value = true;
  showDeleteAllButton.value = true;
  
  // try{
  //   let res = await axios.get(`${apiBaseUrl}/users/${userStore.id}/results`)

  //    if (res) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
  
  // console.log("my token2 "+ userStore.token)

  //     results.value = await res.data
  //     console.log(results.value.length)
    
  //   } else {
  //     console.error('We cannot record your result', res);
  //   }

  // }catch(err) {
  //     console.error('Response data is undefined:', err);

  // }
}
const deleteResult = async (resultId) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token;

    const res = await axios.delete(`${apiBaseUrl}/users/${userStore.id}/results/${resultId}`);
    if (res.status === 204) {
      results.value = results.value.filter(result => result.id !== resultId);
      console.log(resultId + " deleted")
    } else {
      console.error('Failed to delete result', res);
    }
  } catch (err) {
    console.error('Error deleting result:', err);
  }
};

const deleteAllResults = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token;

    await axios.delete(`${apiBaseUrl}/users/${userStore.id}/deleteAll/results`);
    results.value = (null)
    showDeleteAllButton.value = false
    showResult.value = false
  } catch (err) {
    console.error('Error deleting results:', err);
  }
};

const confirmDeleteAll = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d9534f',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete all results!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    await deleteAllResults();
    Swal.fire('Deleted!', 'All results have been deleted.', 'success');
  }
};

const createChart =()=> {

  showChart.value = true

  data.value = {
  labels: results.value.map(result => moment(result.created_at).format('DD-MM-YYYY HH:mm:ss')),
  datasets: [
    {
      label: 'Points',
      backgroundColor: '#f87979',
      data: results.value.map(result => result.point)
    },
  ],
}
console.log(data.value.datasets.data)
options.value = {
  responsive: true,
  maintainAspectRatio: false,
};

}


</script>

