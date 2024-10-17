<template>
  <header>
    <div>
      <h1>LexiTier Chinese</h1>
      <h5>version: 0.1</h5>
    </div>
    <div>
      <a :href="GITHUB_LINK" target="_blank"><img alt="github" class="logo" :src="GitHubLogo" width="15"
          height="15" />GitHub<br />About</a>
    </div>
  </header>

  <div id="searchbar">
    <input v-model="text" v-on:keyup.enter="searchtext">
    <button @click="serachdictionary">search</button>
  </div>
  <VocabData :worddata="worddata" :isloading="false" />
</template>

<script setup>
import { ref } from 'vue';
import VocabData from './components/VocabData.vue'
import GitHubLogo from './assets/github.png'
import { GITHUB_LINK } from './assets/consts.js'
import { fetchcsv, findWord } from './assets/utils.mjs'

const text = ref('');
// const isloading = ref(false);
const worddata = ref();
const dictdata = ref();

fetchcsv().then(data => dictdata.value = data)

async function serachdictionary(e) {
  e.preventDefault();
  // isloading.value = true;
  const {specific, including} = findWord(dictdata.value, text.value);
  worddata.value = specific[0];
  // isloading.value = false;
}

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;

  div:last-child {
    text-align: right;
  }
}

#searchbar {
  line-height: 3;

  input {
    width: 80%;
    padding: 5px;
    outline: none;
  }

  button {
    width: 20%;
    padding: 5px;
  }
}
</style>

<!--
TODO:
- present data well on VocabData
- present related words
- present multiple words (tobs? )
- add links to other dictionaries/purplechinese sample sentences
- README.md
-->