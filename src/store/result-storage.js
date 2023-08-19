import axios from "axios";
import { defineStore } from "pinia";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: null,
  }),

  actions: {
   
    async fetchResults(userId) {
      try {
        let res = await axios.get(`${apiBaseUrl}/users/${userId}/results`)

        if (res.data) {
          this.$state.results = res.data

        } else {
          console.error("Response data is undefined:", res);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  },
  persist: true,
});
