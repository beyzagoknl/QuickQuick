<template>
  <div>
    <h1>Top 5 Results</h1>
    <ul>
      <li v-for="(result, index) in results" :key="index">
        {{ result.user.first_name }} {{ result.user.last_name }} |  Points: {{ result.point }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const results = ref([]);

const fetchTopResults = () => {
  axios.get('http://127.0.0.1:8000/api/users/results/topResults')
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