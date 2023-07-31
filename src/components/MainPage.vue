<template>
  <div class="container jumbotron">
    <h1 class="display-4">Fast Typing</h1>
    <p class="lead">
QuickTyper is a web application that measures how quickly you can type words within a given time limit. </p>
    <hr class="my-4" />
    <div v-if="isFinish" class="alert alert-primary">
      <h3>Game has finished</h3>
      <p class="display-4">{{totalWord}}</p>
      <span>Your correct answer: %{{truePercent}}</span><br>
     <span>Correct Answer : {{trueCount}}</span><br>
     <span>Wrong Answer : {{falseCount}}</span><br>
     <button @click="newGame" class="btn btn-success mt-5 btn-lg btn-block"  type="button">
                New Game
              </button>

    </div>
    <div v-else>
      <div class="card">
        <div class="card-body">
          <span
            v-for="(word, key) in words.filter((data, index) => index < 20)"
            :key="key"
            v-bind:class="key!= 0 || writingWordControl"
            class="words ml-2"
            >{{ word }}</span
          >
        </div>
      </div>

      <div class="card">
        <div class="card-body bg-secondary">
          <div class="input-group input-group-lg">
            <input type="text" class="form-control" v-model="writingWord" /><br>
            <div class="input-group-append">
              <button class="btn btn-light" disabled type="button">
                {{timer}} seconds
              </button>
              <button :disabled="isRunning" class="btn btn-light" type="button" @click="getWords" >Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordList from "@/assets/wordlist.json";

export default {
  data() {
    return {
      words: [],
      writingWord: null,
      isTrue: true,
      trueCount: 0,
      falseCount: 0,
      timer: 60,
      interval: false,
      isRunning: false,
      isFinish: false,
      wordList: wordList,
    };
  },

  watch: {
    writingWord(val) {
      if (!val || val === " ") {
        this.writingWord = "";
        return;
      }
      if (!this.isRunning) this.toggleTimer();
      const word = this.words[0].slice(0, val.length).toUpperCase();
      const userWord = val.replace(" ", "").toUpperCase();
      this.isTrue = word === userWord;

      if (val.indexOf(" ") !== -1) {
        this.isTrue ? this.trueCount++ : this.falseCount++;
        this.words.splice(0, 1);
        this.writingWord = "";
      
      }
    },
  },

  computed: {
    writingWordControl() {
      return this.isTrue ? "writing-word" : "writing-word bg-danger";
    },
    totalWord(){
     return 300-this.words.length;
    },
    truePercent(){
      const percent = (100/this.totalWord);
      const val=(percent*this.trueCount);
      return isNaN(val) ? 0 : val;
    }
  },

  mounted() {
    this.getWords();
  },

  methods: {

    newGame(){
      this.getWords();
      this.isFinish=false;
      this.timer=60;
      this.isTrue=true;
      this.isRunning=false;
    },
    getWords() {
      this.words = this.wordList.sort(() => Math.random() - 0.5).splice(0, 300);
    },
    toggleTimer() {
      this.isRunning = true;
      this.interval = setInterval(this.timeProcess, 1000);
    },
    timeProcess() {
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.isFinish = true;
        return;
      }
      this.timer--;
    },
  },
};
</script>


<style>
.words {
  font-size: 25px;
  font-weight: 400;
  margin-left: 4px;
}

.writing-word {
  background-color: gray;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>