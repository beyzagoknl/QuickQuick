<template>
  <div id="Register">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking!
          </h1>

          <div class="mb-4">
           <text-input
           label="First Name"
           :labelColor="false"
           placeholder="John"
           v-model:input="firstName"
           inputType="text"
           :error="errors.first_name ? errors.first_name[0] : ''"
           />
          </div>
          <div class="mb-4">
           <text-input
           label="Last Name"
           :labelColor="false"
           placeholder="Doe"
           v-model:input="lastName"
           inputType="text"
           :error="errors.last_name ? errors.last_name[0] : ''"
           />
          </div>
            <div class="mb-4">
           <text-input
           label="Email"
           :labelColor="false"
           placeholder="john.doe@m.com"
           v-model:input="email"
           inputType="text"
           :error="errors.email ? errors.email[0] : ''"
           />
          </div>
            <div class="mb-4">
           <text-input
           label="Password"
           :labelColor="false"
           placeholder="password123?"
           v-model:input="password"
           inputType="password"
           :error="errors.password ? errors.password[0] : ''"/>
          </div>
            <div class="mb-4">
           <text-input
           label="Confirm Password"
           :labelColor="false"
           placeholder="password123?"
           v-model:input="confirmPassword"
           inputType="password"
          :error="passwordMismatch ? 'Passwords do not match' : ''"
           />
          </div>
       
         <button
            class="block w-full bg-green-500 text-white roundedn-sm py-3 text-sm tracking-wide"
            type="submit"
            :disabled= "passwordMismatch"
            @click= "register"
          >
            Register
          </button>
      </div>
        <p class="text-center text-md text-gray-900">
          Already have an account?
     
      <router-link to="login" class="text-blue-500 no-underline hover:underline">
        Login
      </router-link>
      </p>
       </div>
      
    </div>
  </div>
</template>


<script setup>
import TextInput from '@/components/global/TextInput.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

import {useUserStore} from '../store/user-storage';
import { useResultsStore } from '@/store/result-storage';

const router = useRouter()

const userStore = useUserStore();
const resultsStore = useResultsStore()


let errors = ref([])
let passwordMismatch = ref(false)
let firstName =ref(null)
let lastName =ref(null)
let email =ref(null)
let password =ref(null)
let confirmPassword =ref(null)


const register = async () => {
  errors.value = []
  if(password.value !== confirmPassword.value) {
    passwordMismatch.value = true
    return
  }
  passwordMismatch.value = false;
  const formData = new FormData();
  formData.append('first_name', firstName.value);
  formData.append('last_name', lastName.value);
  formData.append('email', email.value);
  formData.append('password', password.value);


  try{
    let res = await axios.post(`${apiBaseUrl}/register`, formData)

     if (res.data && res.data.user) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
      userStore.setUserDetails(res.data);
      await resultsStore.fetchResults(userStore.id)
      router.push('/game')

    } else {
      console.error('Response data or user is undefined:', res);
    }

  }catch(err) {
    errors.value = err.response.data.errors

  }
}

</script>
<style>
</style>