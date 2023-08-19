<template >
  <div>
    <div class="ms-auto py-4 ml-4">
      <div class="flex flex-wrap font-bold text-gray-900">
        <div class="text-gray-900 text-xl">Game Results</div>
        <div class="w-full mt-4">
          <div>
          <h1>{{message}}</h1>
          <table class="text-gray-900 text-l w-full">
            <tr>
              <th>No</th>
              <th>Date & Time</th>
              <th>Point</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Delete</th>
            </tr>
            <tr  v-for='(result, index) in results' :key='result.id' >
              <td>{{index + 5}}</td>
              <td>{{result.created_at}}</td>
              <td>{{result.point}}</td>
              <td>{{result.correct}}</td>
              <td>{{result.wrong}}</td>
              <td>Delete</td>
            </tr>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios';
// import { ref} from 'vue';

// import RouterLinkButton from "../../global/RouterLinkButton.vue";
// //import {useResultsStore} from "@/store/result-storage"
// import {useUserStore} from '@/store/user-storage';
// const userStore = useUserStore();

// //const resultStore = useResultsStore()

// const results = ref([])


// const getResult = async() => {
//   try{
//     let res = await axios.get(`http://127.0.0.1:8000/api/users/${userStore.id}/results`)

//      if (res) {
//      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
//       results.value = await res.data
   
//     } else {
//       console.error('We cannot record your result', res);
//     }

//   }catch(err) {
//       console.error('Response data is undefined:');

//   }
// }

import { defineProps, toRefs } from 'vue'

const props = defineProps({
  results: String,
  message: String

})
const { results} = toRefs(props)

</script>