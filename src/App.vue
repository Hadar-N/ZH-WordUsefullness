<!-- template parts: 
 3. data (TRAD+SIMP, meaning, hsk+tocfl+frequency)
 4. similar words (inc. links) 
 5. links to alternatives dictionaries/purpleChinese sample sentences? -->
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
    <button @click="searchtext">search</button>
  </div>
  <VocabData :worddata="worddata" :isloading="isloading" />
</template>

<script setup>
import { ref } from 'vue';
import VocabData from './components/VocabData.vue'
import GitHubLogo from './assets/github.png'
import { GITHUB_LINK } from './assets/consts.js'
import { fetchcsv } from './assets/utils.mjs'

const text = ref('');
const isloading = ref(false);
const worddata = ref();
const dictdata = ref();

fetchcsv().then(data => dictdata.value = data)

function searchtext(e) {
  e.preventDefault();
  console.log(text.value);
  serachdictionary();
}

function serachdictionary() {
  isloading.value = true;
  const num = Math.floor(Math.random() * 120505);
  console.log(num, dictdata.value[num])
  setInterval(() => {
    worddata.value = { "please let it work": text.value }
    isloading.value = false;
  }, 2000);
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
