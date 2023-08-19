<template>
<div class="bg-image img">  
  
  <div class="
  container
   mx-auto
   sm:px-4 
   py-8 
   px-4 
   md:py-16 
   md:px-8 
   mb-8 
   bg-gray-100 
   rounded
   "
   >
    <h1 class="text-4xl">
    Fast Typing</h1>
    <div v-if="isFinish" class="
    relative 
    px-3 
    py-3
    mb-4 
    border 
    rounded 
    bg-purple-200 
    border-blue-300 
    text-gray-900
    "
    >
      <h3>Game has finished</h3>
      <p class="text-4xl"> You wrote : {{totalWord}} words</p>
      <p class="text-4xl"> You got : {{totalPoint}} points</p>
      <span>Your correct answer's percent: %{{truePercent}}</span><br>
     <span>Correct Answer : {{trueCount}}</span><br>
     <span>Wrong Answer : {{falseCount}}</span><br>
     <div class="flex justify-between mt-5">
           <RouterLinkButton
        class="text-red-900 text-center text-m mt-5 pb-1"
        btnText="New Game"
        color="red"
        url="/game"
        @click="newGame"
        />
           <RouterLinkButton
        class="text-red-900 text-center text-m mt-5 pb-1"
        btnText="My Profile"
        color="green"
        url="/account/profile"
        />
    </div>
     </div>
    <div v-else>
    <p class="text-xl font-light">  
Are you fast in the "Fast and Furious?". How many words can you type a minute? Write the highlighted word and press the spacebar.Show your speed to everyone!!! </p>
<input type="radio" id="english" value="English" v-model="picked" />
<label for="english">English</label>

<input type="radio" id="dutch" value="Dutch" v-model="picked" />
<label for="dutch">Dutch</label>
    <hr class="my-4" />
      <div class="
      relative 
      flex 
      flex-col 
      min-w-0 
      rounded
      break-words 
       border
        bg-white 
        border-1 
        border-gray-300
        "
        >
        <div class="flex-auto p-6 justify-between">
          <span
            v-for="(word, key) in words.filter((data, index) => index < 40)"
            :key="key"
v-bind:class="key!=0 || writingWordControl " class="words ml-2">{{ word }}</span
          >
        </div>
      </div>

      <div class="
      relative
      flex 
      flex-col 
      min-w-0 
      rounded 
      break-words 
      border 
      bg-white 
      border-1 
      border-gray-300
      "
      >
        <div class="flex-auto p-6 bg-gray-600 mt-3">
          <div class="relative flex items-stretch w-full input-group-lg">
            <input type="text" class="
            block 
            appearance-none 
            w-full
            py-1 
            px-2 
            mb-1 
            text-base 
            leading-normal 
            bg-white 
            text-gray-800 
            border 
            border-gray-200 
            rounded" v-model="writingWord" /><br>
          </div>
          
            <RouterLinkButton
            class="w-full text-green-100 text-center text-lg mt-2 "
            :btnText="`Your time : ${timer} seconds`"
            color="red"
            :disabled="isRunning"
            />
            <RouterLinkButton
            @click="getWords"
             class="w-full text-green-100 text-center text-lg mt-2"
             btnText="Refresh"
            color="red"
            :disabled="isRunning"
            />
            <RouterLinkButton
            @click="finishGame"
            class="w-full text-green-100 text-center text-lg mt-2"
            btnText="Finish The Game"
            color="red"
            />
          <br>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import wordList from "@/assets/wordlist.json";
import wordListDutch from "@/assets/wordlistDutch.json";
import  RouterLinkButton  from "../components/global/RouterLinkButton.vue";
import axios from 'axios';
//import { useRouter } from 'vue-router';
import {useUserStore} from '../store/user-storage';
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

//const router = useRouter()
const userStore = useUserStore();

const words = ref([]);
const writingWord = ref(null);
const isTrue = ref(true);
const trueCount = ref(0);
const falseCount = ref(0);
const totalPoint = ref(0)
const timer = ref(60);
const interval = ref(null);
const isRunning = ref(false);
const isFinish = ref(false);
const wordListData = ref([]);
const picked = ref('English')

const writingWordControl = computed(() => (isTrue.value ? 'writing-word' : 'incorrect'));
const totalWord = computed(() => 300 - words.value.length);
const truePercent = computed(() => {
  const percent = 100 / totalWord.value;
  const val = percent * trueCount.value;
  return isNaN(val) ? 0 : val.toFixed(2);
});

onMounted(() => {
  getWords();
});


watch(writingWord, (val) => {
  if (!val || val === ' ') {
    writingWord.value = '';
    return;
  }
  if (!isRunning.value) toggleTimer();
  const word = words.value[0].slice(0, val.length).toUpperCase();
  const userWord = val.replace(' ', '').toUpperCase();
  isTrue.value = word === userWord;

  if (val.indexOf(' ') !== -1) {
    if (isTrue.value) {
      trueCount.value++;
    } else {
      falseCount.value++;
    }
    words.value.splice(0, 1);
    writingWord.value = '';
  }
});

const newGame = () => {
  getWords();
  isFinish.value = false;
  timer.value = 60;
  isTrue.value = true;
  isRunning.value = false;
  totalWord.value= 0;
  trueCount.value = 0;
  falseCount.value = 0;
};

const getWords = () => {
  if (picked.value === "English") {
    wordListData.value = wordList;
  } else if (picked.value === "Dutch") {
    wordListData.value = wordListDutch;
  }

  const shuffledWords = wordListData.value
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 300);

  words.value = shuffledWords;
};

const toggleTimer = () => {
  isRunning.value = true;
  interval.value = setInterval(timeProcess, 1000);
};

const timeProcess = () => {
  if (timer.value === 0) {
    clearInterval(interval.value);
    isFinish.value = true;
    return;
  }
  timer.value--;
};

const finishGame = async() => {

  const correctPointValue = 3
  const wrongPointValue = 1

  totalPoint.value = (trueCount.value * correctPointValue ) - (falseCount.value * wrongPointValue) 

  if (totalPoint.value <= 0 ){
    totalPoint.value = 0
  }


  const result = {
    'user_id':userStore.id,
    'point': totalPoint.value,
    'correct': trueCount.value,
    'wrong': falseCount.value
  }
  try{
    await axios.post(`${apiBaseUrl}/result`, result)
  }catch(err) {
      console.error('Response data is undefined:');
  }
  clearInterval(interval.value);
  isFinish.value = true;
  timer.value = 0;
};

 
</script>



<style>
:root {
  --light: hwb(0 4% 54%);
  --dark: #5b1a02;
}
.img { 
  background-image: url('~@/assets/image.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
.words {
  font-size: 25px;
  font-weight: 400;
  margin-left: 4px;
  min-width: 100%;
  max-height: 100%;
}

.writing-word {
  background-color: gray;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
.incorrect {
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>