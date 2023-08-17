 import axios from 'axios'
 import {defineStore} from 'pinia'

 export const useResultsStore = defineStore('results',{
     state: () => ({
        id : null,
        user_id : null,
        wrong : null,
        correct : null,
        point: null,
        created_at: null
     }),

    actions: {
      async setResultsDetails(res){
        this.$state.id = res.results.id
        this.$state.user_id = res.results.user_id
        this.$state.wrong = res.results.wrong
        this.$state.correct = res.results.correct
        this.$state.created_at = res.results.created_at
      },

                          async fetchResults() {
                            try {
                              let res = await axios.get('http://127.0.0.1:8005/api/users/' +  this.$state.user_id  + '/results');
                                console.log(res)
                              if (res.data && res.data.results) {
                                this.$state.id = res.data.results.id
                                this.$state.user_id = res.data.results.user_id
                                this.$state.wrong = res.data.results.wrong
                                this.$state.correct = res.data.results.correct
                                this.$state.created_at = res.data.results.created_at
                              } else {
                                console.error('Response data is undefined:', res);
                              }
                            } catch (error) {
                              console.error('Error fetching user:', error);
                            }
                          },
      },
    persist: true
    })

