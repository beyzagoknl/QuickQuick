<template>
    <nav class="w-full px-4 bg-black relative z-20 text-white-200">
        <div class="container mx-auto max-w-4xl h-16 flex justify-between text-xs md:text-sm">
            <div class="h-full flex gap-4 items-center">
            <img class="mx-auto max-w-4xl h-12" src= "../../assets/logo.png">
                <router-link 
                v-if= !userStore.id
                to="/"                
                class="flex justify-center items-center">
                    <div class="text-white text-2xl"><b>QuickQuick</b></div>
                </router-link>
                  <router-link 
                v-else
                to="/game"                
                class="flex justify-center items-center">
                    <div class="text-white text-2xl"><b>QuickQuick</b></div>
                </router-link>
            </div>
            <div class="h-full flex items-center">
                <FullScreenModal />
            </div>
        </div>
    </nav>
</template>

<script setup>

    import FullScreenModal from './FullScreenModal.vue'
    import { useUserStore } from '@/store/user-storage'; // Adjust the import path
    //import { useRouter } from 'vue-router';
    //const router = useRouter()
    const userStore = useUserStore()
</script>