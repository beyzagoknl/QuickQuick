<template>
  <div>
    <div class="mg container mx-auto sm:px-4 py-8 px-4 md:py-16 md:px-8 m">
      <div v-if="!isFinish">
        <h1 class="text-4xl text-white">
          How about playing the game by my rules? Here are the rules:
        </h1>
      </div>
      <div v-if="!isFinish">
        <div class="grid xl:grid-cols-4 text-white md:grid-cols-2">
          <div id="Awesome" class="anim750">
            <div class="reveal circle_wrapper">
              <div class="circle">Just 60 seconds!</div>
            </div>

            <div class="sticky anim750">
              <div class="front circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>

            <h4>Peel Me For</h4>
            <br />
            <h4>About Time!</h4>

            <div class="sticky anim750">
              <div class="back circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>
          </div>
          <div id="Awesome" class="anim750">
            <div class="reveal circle_wrapper">
              <div class="circle">English or Dutch</div>
            </div>

            <div class="sticky anim750">
              <div class="front circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>

            <h4>Peel Me For</h4>
            <br />
            <h4>Language Option!</h4>

            <div class="sticky anim750">
              <div class="back circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>
          </div>

          <div id="Awesome" class="anim750">
            <div class="reveal circle_wrapper">
              <div class="circle">Press spacebar</div>
            </div>

            <div class="sticky anim750">
              <div class="front circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>

            <h4>Peel Me For</h4>
            <br />
            <h4>Move to Next Word</h4>

            <div class="sticky anim750">
              <div class="back circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>
          </div>
          <div id="Awesome" class="anim750">
            <div class="reveal circle_wrapper">
              <div class="circle">Correct word: 2 points</div>
            </div>

            <div class="sticky anim750">
              <div class="front circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>

            <h4>Peel Me For</h4>
            <br />
            <h4>Point!</h4>

            <div class="sticky anim750">
              <div class="back circle_wrapper anim750">
                <div class="circle anim750"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium"
            >Remember, there's a consequence for each of your errors! Any
            slip-up will result in a deduction of 1 point from your score.</span
          >
        </div>
      </div>
      <div
        v-if="isFinish"
        class="relative px-3 py-3 mb-4 border rounded bg-image img border-blue-300 text-gray-900 mt-3"
      >
        <div class="text-align-center m-20 flex gap-4 flex-wrap">
          <div class="balloon text-xl pl-4">
            <br /><br /><br />Total words : {{ totalWord }}
          </div>
          <div class="balloon text-xl pl-4">
            <br /><br /><br />Your point: {{ totalPoint }}
          </div>
          <div class="balloon text-xl pl-4">
            <br /><br />Correct answer's percent : %{{ truePercent }}
          </div>
          <div class="balloon text-xl pl-4">
            <br /><br /><br />Total Correct Answers : {{ trueCount }}
          </div>
          <div class="balloon text-xl pl-4">
            <br /><br /><br />Total Wrong Answers : {{ falseCount }}
          </div>
        </div>
    
   <div
        class="p-4 mb-4 flex gap-2 text-m text-white rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400"
        > <i class="fas fa-gift text-green-500 text-xl"></i>
          <p>
            Based on your performance, I've prepared a surprise for you on your
            profile page. Take a moment to visit your profile and see what's in
            store!
          </p>
        </div>
        <div class="flex justify-around mt-5">
          <RouterLinkButton
            class="text-white text-center text-m mt-5 pb-1"
            btnText="New Game"
            color="red"
            url="/game"
            @click="newGame"
          />
          <RouterLinkButton
            class="text-white text-center text-m mt-5 pb-1"
            btnText="My Profile"
            color="green"
            url="/profile"
          />
        </div>
      </div>
      <div v-else>
        <div class="space-x-4 mt-4">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              id="english"
              value="English"
              v-model="picked"
              @change="getWords"
              class="form-radio text-blue-500"
            />
            <span class="ml-2 text-white">English</span>
          </label>

          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              id="dutch"
              value="Dutch"
              v-model="picked"
              @change="getWords"
              class="form-radio text-blue-500"
            />
            <span class="ml-2 text-white">Dutch</span>
          </label>
        </div>
        <hr class="my-4" />
        <div
          class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300"
        >
          <div class="flex-auto p-6 justify-between">
            <span
              v-for="(word, key) in words.filter((data, index) => index < 40)"
              :key="key"
              v-bind:class="key != 0 || writingWordControl"
              class="words ml-2"
              >{{ word }}</span
            >
          </div>
        </div>

        <div
          class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300"
        >
          <div class="flex-auto p-6 bg- mt-3 bg-black">
            <div class="relative flex items-stretch w-full input-group-lg">
              <svg
                class="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path
                  d="M8 13.5v-8a1.5 1.5 0 0 1 3 0v6.5m0 -6.5v-2a1.5 1.5 0 0 1 3 0v8.5m0 -6.5a1.5 1.5 0 0 1 3 0v6.5m0 -4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2a7 6 0 0 1 -5 -3l-2.7 -5.25a1.4 1.4 0 0 1 2.75 -2l.9 1.75"
                />
              </svg>

              <input
                type="text"
                placeholder="Let your fingers work!"
                class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                v-model="writingWord"
              /><br />
            </div>

            <RouterLinkButton
              class="w-full text-green-100 text-center text-lg mt-2"
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
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div></div>
  <div id="videoDarkOverlay"></div>
  <video autoplay muted loop id="myVideo">
    <source src="../../public/background2.mp4" type="video/mp4" />
  </video>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import wordList from "@/assets/wordlist.json";
import wordListDutch from "@/assets/wordlistDutch.json";
import RouterLinkButton from "../components/global/RouterLinkButton.vue";
import axios from "axios";
import { useUserStore } from "../store/user-storage";
import { useResultsStore } from "@/store/result-storage";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

const userStore = useUserStore();
const resultsStore = useResultsStore();
const words = ref([]);
const writingWord = ref(null);
const isTrue = ref(true);
const trueCount = ref(0);
const falseCount = ref(0);
const totalPoint = ref(0);
const timer = ref(60);
const interval = ref(null);
const isRunning = ref(false);
const isFinish = ref(false);
const wordListData = ref([]);
const picked = ref("English");

const writingWordControl = computed(() =>
  isTrue.value ? "writing-word" : "incorrect"
);
const totalWord = computed(() => 300 - words.value.length);
const truePercent = computed(() => {
  const percent = 100 / totalWord.value;
  const val = percent * trueCount.value;
  return isNaN(val) ? 0 : val.toFixed(2);
});

onMounted(() => {
  getWords("English");
});

watch(picked, (newLanguage) => {
  getWords(newLanguage);
});

watch(writingWord, (val) => {
  if (!val || val === " ") {
    writingWord.value = "";
    return;
  }
  if (!isRunning.value) toggleTimer();
  const word = words.value[0].slice(0, val.length).toUpperCase();
  const userWord = val.replace(" ", "").toUpperCase();
  isTrue.value = word === userWord;

  if (val.indexOf(" ") !== -1) {
    if (isTrue.value) {
      trueCount.value++;
    } else {
      falseCount.value++;
    }
    words.value.splice(0, 1);
    writingWord.value = "";
  }
});

const newGame = () => {
  getWords();
  isFinish.value = false;
  timer.value = 60;
  isTrue.value = true;
  isRunning.value = false;
  totalWord.value = 0;
  trueCount.value = 0;
  falseCount.value = 0;
};

const getWords = (defaultLanguage = null) => {

  if(isRunning.value){
    return
  }
  
  const selectedLanguage = picked.value || defaultLanguage;

  if (selectedLanguage === "English") {
    wordListData.value = wordList;
  } else if (selectedLanguage === "Dutch") {
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

const sendResultToBackend = async () => {
  const correctPointValue = 2;
  const wrongPointValue = 1;

  totalPoint.value =
    trueCount.value * correctPointValue - falseCount.value * wrongPointValue;

  if (totalPoint.value <= 0) {
    totalPoint.value = 0;
  }

  const result = {
    user_id: userStore.id,
    point: totalPoint.value,
    correct: trueCount.value,
    wrong: falseCount.value,
  };

  try {
    await axios.post(`${apiBaseUrl}/result`, result);
  } catch (err) {
    console.error("Error sending results to backend:", err);
  }

  try {
    let res = await axios.get(`${apiBaseUrl}/users/${userStore.id}/results`);
    await resultsStore.updateResults(res.data);
  } catch (error) {
    console.error("Error fetching results:", error);
  }
};

const finishGame = async () => {
  sendResultToBackend();
  clearInterval(interval.value);
  isFinish.value = true;
  timer.value = 0;
};
const timeProcess = () => {
  if (timer.value === 0) {
    sendResultToBackend();
    clearInterval(interval.value);
    isFinish.value = true;
    return;
  }
  timer.value--;
};
</script>
<style scoped>
:root {
  --light: hwb(0 4% 54%);
  --dark: #5b1a02;
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
.anim750 {
  transition: all 750ms ease-in-out;
}

#Awesome {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;

  backface-visibility: hidden;
}

#Awesome .sticky {
  transform: rotate(45deg);
}

#Awesome:hover .sticky {
  transform: rotate(10deg);
}

#Awesome .sticky {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 180px;
}

#Awesome .reveal .circle {
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.15);

  font-family: "helvetica neue", arial;
  font-weight: 200;
  line-height: 140px;
  text-align: center;

  cursor: pointer;
}

#Awesome .reveal .circle {
  background: #fafafa;
}

#Awesome .circle_wrapper {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
  overflow: hidden;
}

#Awesome .circle {
  position: absolute;
  width: 140px;
  height: 140px;
  margin: 20px;
  color: Red;

  border-radius: 999px;
}

#Awesome .back {
  height: 10px;
  top: 30px;
}

#Awesome:hover .back {
  height: 90px;
  top: 110px;
}

#Awesome .back .circle {
  margin-top: -130px;
  background-color: #fbec3f;

  background-image: -webkit-linear-gradient(
    bottom,
    rgba(251, 236, 63, 0),
    rgba(255, 255, 255, 0.8)
  );
}

#Awesome:hover .back .circle {
  margin-top: -50px;
}

#Awesome .front {
  height: 150px;
  bottom: 0;
  top: auto;

  -webkit-box-shadow: 0 -140px 20px -140px rgba(0, 0, 0, 0.3);
}

#Awesome:hover .front {
  height: 70px;

  -webkit-box-shadow: 0 -60px 10px -60px rgba(0, 0, 0, 0.1);
}

#Awesome .front .circle {
  margin-top: -10px;
  background: #fbec3f;

  background-image: -webkit-linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #f7bb37 95%
  );
  background-image: -moz-linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #f7bb37 95%
  );
  background-image: linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #f7bb37 95%
  );
}

#Awesome h4 {
  font-family: "helvetica neue", arial;
  font-weight: 200;
  text-align: center;
  position: absolute;
  width: 180px;
  height: 140px;
  line-height: 140px;
  color: #ff3121;

  transition: opacity 50ms linear 400ms;
}

#Awesome:hover h4 {
  opacity: 0;

  transition: opacity 50ms linear 300ms;
}

#Awesome:hover .front .circle {
  margin-top: -90px;
  background-color: #e2d439;
  background-position: 0 100px;
}

.balloon {
  display: flex;
  width: 170px;
  height: 195px;
  background: hsl(215, 50%, 65%);
  border-radius: 80%;
  position: relative;
  box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
  transition: transform 0.5s ease;
  z-index: 10;
  animation: balloons 4s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes balloons {
  0%,
  100% {
    transform: translateY(0) rotate(-4deg);
  }
  50% {
    transform: translateY(-25px) rotate(4deg);
  }
}

.balloon:before {
  content: "▲";
  font-size: 20px;
  color: hsl(215, 30%, 50%);
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: -12px;
  z-index: -100;
}

.balloon:nth-child(2) {
  background: hsl(245, 40%, 65%);
  animation-duration: 3.5s;
}
.balloon:nth-child(2):before {
  color: hsl(245, 40%, 65%);
}

.balloon:nth-child(3) {
  background: hsl(139, 50%, 60%);
  animation-duration: 3s;
}
.balloon:nth-child(3):before {
  color: hsl(139, 30%, 50%);
}

.balloon:nth-child(4) {
  background: hsl(59, 50%, 58%);
  animation-duration: 4.5s;
}
.balloon:nth-child(4):before {
  color: hsl(59, 30%, 52%);
}

.balloon:nth-child(5) {
  background: hsl(23, 55%, 57%);
  animation-duration: 5s;
}
.balloon:nth-child(5):before {
  color: hsl(23, 44%, 46%);
}
#myVideo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -2;
}
#videoDarkOverlay {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
