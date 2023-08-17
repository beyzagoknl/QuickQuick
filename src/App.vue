<!-- <template>
  <MainPage />
</template>

<script>
import MainPage from "@/components/MainPage.vue";

export default {
  name: "App",
  components: {
    MainPage,
  },
};
</script> -->
<template>
 <TopNavigation />
  <router-view/>
</template>

<script setup>
  import TopNavigation from "../src/components/structure/TopNavigation.vue"
</script>
<style>

</style>

 