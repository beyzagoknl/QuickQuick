<template>
  <div class="container max-w-4xl mx-auto flex mt-10">
   <div class="w-1/3">
      <img
        class="w-full rounded-lg h-auto shadow-lg"
        src="userStore.image"
        alt="Profile Picture"
      />
    </div>
    <div class="w-full pl-4">
      <div class="flex">
        <div class="w-1/2">
          <h1 class="text-2xl md:text-4xl text-left text-gray-900">{{firstName}} {{lastName}}</h1>
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            btnText="Edit Profile"
            color="green"
            url="/account/edit-profile"
          >
          </RouterLinkButton>
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            btnText="Play Game"
            color="red"
            url="/game"
          >
          </RouterLinkButton>
          </div>
          <div class="w-1/2 mt-2">
          <RouterLinkButton
            btnText="My Results"
            color="blue"
            @click="getResult"
          >
          </RouterLinkButton>
          </div>
      </div>
      <ProfileAboutSection />
    </div>
  </div>
  <div v-if="showResult">
   <div >
    <div class="ms-auto py-4 ml-4">
      <div class="flex flex-wrap font-bold text-gray-900">
        <div class="text-gray-900 text-xl">Game Results</div>
        <div class="w-full mt-4">{{useResults}}
          <div class="relative overflow-x-auto">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">Date & Time</th>
              <th scope="col" class="px-6 py-3">Point</th>
              <th scope="col" class="px-6 py-3">Correct</th>
              <th scope="col" class="px-6 py-3">Wrong</th>
            </tr>
            </thead>
            <tbody>
            <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for='(result, index) in results' :key='result.id' >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{index + 1}}</th>
              <td class="px-6 py-4">{{result.created_at}}</td>
              <td class="px-6 py-4">{{result.point}}</td>
              <td  class="px-6 py-4"> {{result.correct}}</td>
              <td>{{result.wrong}}</td>
            </tr>
            </tbody>

          </table>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import RouterLinkButton from "../../components/global/RouterLinkButton.vue";
import ProfileAboutSection from "../../components/partials/profile/ProfileAboutSection.vue";
//import GameInfo from "../../components/partials/profile/GameInfo.vue"
import { useUserStore } from '@/store/user-storage'; 
import axios from 'axios';
import { ref} from 'vue';

const userStore = useUserStore()
const firstName = userStore.firstName
const lastName = userStore.lastName

console.log("here is " + userStore.token)

const results = ref([])
const showResult = ref(false)
const getResult = async() => {
showResult.value = true
  try{
    let res = await axios.get(`http://127.0.0.1:8005/api/users/${userStore.id}/results`)

     if (res) {
     // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
      results.value = await res.data
      console.log(results.value)
    } else {
      console.error('We cannot record your result', res);
    }

  }catch(err) {
      console.error('Response data is undefined:');

  }
}
</script>