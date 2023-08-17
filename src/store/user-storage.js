//import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null, 
    token: null,
    firstName: null,
    lastName:null,
    email:null,
    location: null,
    image:null,
    description:null,
  }),
  actions: {
   async setUserDetails(res){
    this.$state.id = res.user.id
    this.$state.token = res.token
    this.$state.firstName = res.user.first_name
    this.$state.lastName = res.user.last_name
    this.$state.email = res.user.email
    this.$state.location = res.user.location
    this.$state.description = res.user.description
   },
  //  async fetchUser() {
  //   try {
  //     let res = await axios.get('http://127.0.0.1:8000/api/users/' + this.$state.id);
  //     if (res.data && res.data.user) {
  //       this.$state.id = res.data.user.id;
  //       this.$state.firstName = res.data.user.first_name;
  //       this.$state.lastName = res.data.user.last_name;
  //       this.$state.location = res.data.user.location;
  //      this.$state.description = res.data.user.description;
  //     } else {
  //       console.error('Response data is undefined:', res);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // },
  
   clearUser(){
    this.$state.id = null
    this.$state.token = null
    this.$state.firstName = null
    this.$state.lastName = null
    this.$state.email = null
    this.$state.location = null
    this.$state.description = null
   },
},
persist: true
})