<template>
  <div id="Register">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking!
          </h1>
          <div class="mb-4">
            <TextInput
           label="Email"
           :labelColor="false"
           placeholder="john.doe@m.com"
           v-model:input="email"
           inputType="text"
           />
           </div>
            <div class="mb-4">
            <TextInput
           label="Password"
           :labelColor="false"
           placeholder="password123?"
           v-model:input="password"
           inputType="password"
           />
           </div>
          <button
            class="block w-full bg-green-500 text-white roundedn-sm py-3 text-sm tracking-wide"
            type="submit"
            @click="login"
          >
            Login
          </button>
          <p class="text-red-600" >{{invalidError}}</p>
        </div>
        <p class="text-center text-md text-gray-900">
          Don't have an account yet?
      <router-link to="register" class="text-blue-500 no-underline hover:underline">
        Register
      </router-link>
      </p>
       </div>
    
    </div>
  </div>
</template>


<script setup>
import TextInput from '@/components/global/TextInput.vue';
import axios from "axios";
import { ref } from 'vue';
import { useUserStore } from '@/store/user-storage'; // Adjust the import path
import { useRouter } from 'vue-router';
import { useResultsStore } from '@/store/result-storage';
const router = useRouter()
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
//import { setUserLocalStorage } from "@/axios.js";

const userStore = useUserStore();
const resultsStore = useResultsStore()
let errors = ref([]);
let email = ref('');
let password = ref('');
let invalidError = ref('')

const login = async () => {
  errors.value = [];

  const formData = new FormData();
  formData.append('email', email.value);
  formData.append('password', password.value);
  
  if(email.value == "" || password.value == ""){
    invalidError.value = "Please enter your credentials"
  }
 try {
    let res = await axios.post(`${apiBaseUrl}/login`, formData);
    if (res.data && res.data.user) {
      const token = res.data.token;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      userStore.setUserDetails(res.data);
      await resultsStore.fetchResults(userStore.id)
      router.push('/account/profile/')
    } else {
      console.error('Response data or user is undefined:', res);
      errors.value = res.data.message
      invalidError.value = errors.value
    }
  } catch (err) {
    errors.value = err.response.data.errors;
    invalidError.value = err.response.data.error
  }
};








</script>
