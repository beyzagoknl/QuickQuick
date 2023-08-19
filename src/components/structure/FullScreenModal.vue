<template>
  <div>
    <button
      @click="open = !open"
      class="bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded"
    >
      <i class="fa-solid fa-bars fa-xl"></i>
    </button>
    <div
      v-show="open"
      class="animated slideInDown faster fixed w-full h-full top-0 left-0 flex justify-center backdrop-blur-sm"
    >
      <div class="bg-black absolute w-full h-full opacity-75"></div>
      <div class="my-auto fixed border-white w-80 pt-16">
        <p class="text-2xl text-center text-white font-bold">Menu</p>
        <RouterLinkButton
         v-if=userStore.id
         @click="open = !open"
          class="w-full text-green-100 text-center text-lg mt-5"
          btnText="Profile"
          color="green"
          url="/account/profile"
        /> 
        <RouterLinkButton
         v-if=userStore.id
         @click="open = !open"
          class="w-full text-green-100 text-center text-lg mt-2"
          btnText="Play Game"
          color="yellow"
          url="/game"
        />

        <RouterLinkButton
          v-if=userStore.id
          @click=logout
          class="w-full text-green-100 text-center text-lg mt-2"
          btnText="Logout"
          color="blue"
        />
          <RouterLinkButton
          @click="open = !open"
          class="w-full text-green-100 text-center text-lg mt-2"
          btnText="Login"
          color="blue"
          url="/login"
        />
           <RouterLinkButton
          v-if=!userStore.id
          @click="open = !open"
          class="w-full text-green-100 text-center text-lg mt-2"
          btnText="Register"
          color="green"
          url="/register"
        />
        <RouterLinkButton
          @click="open = !open"
          class="w-full text-green-100 text-center text-lg mt-2"
          btnText="Close"
          color="red"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RouterLinkButton from "../global/RouterLinkButton.vue";
import axios from "axios";
import { useUserStore } from '@/store/user-storage'; // Adjust the import path
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore();
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

let errors = ref([]);
let open = ref(false);

const logout = async () => {

 try {
     await axios.post(`${apiBaseUrl}/logout`, {
      user_id: userStore.id,
    });
    userStore.clearUser()
      router.push('/')
      open.value = !open.value
  } catch (err) {
    errors.value = err.response.data.errors;
    console.log(err)
  }

};
</script>