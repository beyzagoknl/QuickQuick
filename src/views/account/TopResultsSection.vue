<template>
  <div>
  <div>
    <p class="text-[#1da1f2] bg-white" >How about pushing the limits? Grab your spray and write your name on the top 5 results wall, can you make it? Then kick the start button!</p>
    </div>
    <div class="ms-auto py-4 ml-4">
    <div class="font-bold text-gray-900">
    <div class="mt-4">
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-green-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">#</th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Last name</th>
                  <th scope="col" class="px-6 py-3">Point</th>
                </tr>
     
      </thead>
      <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for='(result, index) in results' :key='index'>
        <td class="px-6 py-4"># </td>
        <td class="px-6 py-4">{{ result.user.first_name }} </td>
        <td class="px-6 py-4">{{ result.user.last_name }} </td>
        <td class="px-6 py-4">{{ result.point }} </td>
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
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user-storage'; 
const results = ref([]);
const userStore = useUserStore()


const fetchTopResults = () => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token;

  axios.get('http://127.0.0.1:8002/api/users/results/topResults')
    .then(response => {
      results.value = response.data;
      console.log(results.value)
    })
    .catch(error => {
      console.error('Error fetching top results:', error);
    });
};

onMounted(() => {
  fetchTopResults();
});
</script>