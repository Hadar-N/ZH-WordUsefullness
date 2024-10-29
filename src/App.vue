<template>
  <header>
    <div>
      <h1>LexiTier Chinese</h1>
      <h5>version: 1.0.0</h5>
    </div>
    <div>
      <a :href="GITHUB_LINK" target="_blank"><img alt="github" class="logo" :src="GitHubLogo" width="15"
          height="15" />GitHub<br />About</a>
    </div>
  </header>

  <div id="searchbar">
    <input v-model="text" v-on:keyup.enter="serachdictionary">
    <button @click="serachdictionary">search</button>
  </div>
  <VocabTabs :words="wordlist" :active="currview" @changeIndex="changeIndex"/>
  <VocabData :worddata="wordlist[currview]" :isloading="false" />
  <br />
  <VocabRelated title="Word Breakdown" :words="breakdown"/>
  <VocabRelated title="Related Variants" :words="variantsrelated"/>
  <VocabRelated title="Related Vocabulary" :words="wordrelated"/>
</template>

<script setup>
import { ref } from 'vue';
import VocabTabs from './components/VocabTabs.vue'
import VocabData from './components/VocabData.vue'
import VocabRelated from './components/VocabRelated.vue'
import GitHubLogo from './assets/github.png'
import { GITHUB_LINK } from './assets/consts.js'
import { fetchcsv, findWord } from './assets/utils.mjs'

const text = ref('');
const dictdata = ref();
const currview = ref(0)
const wordlist = ref([]);
const wordrelated = ref([]);
const variantsrelated = ref([]);
const breakdown = ref([]);

fetchcsv().then(data => dictdata.value = data)

function serachdictionary(e) {
  e.preventDefault();
  let res = {};
  if (text.value){
    res = findWord(dictdata.value, text.value);
  }
  wordlist.value = res.specific || [];
  currview.value = 0;
  wordrelated.value = res.including || [];
  variantsrelated.value = res.variants || [];
  breakdown.value = res.chars || [];
}

function changeIndex(data) {
  currview.value = Number(data.index);
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