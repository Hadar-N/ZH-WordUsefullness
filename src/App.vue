<template>
  <header>
    <div>
      <h1>LexiTier Chinese</h1>
      <!-- <h5>version: 1.1.0</h5> -->
    </div>
    <div>
      <a :href="GITHUB_LINK" target="_blank"><img alt="github" class="logo" :src="GitHubLogo" width="15"
          height="15" />GitHub<br />About</a>
    </div>
  </header>

  <SearchBar />
  <router-view></router-view>
</template>

<script setup>
import SearchBar from './components/SearchBar.vue';
import GitHubLogo from './assets/github.png'
import { GITHUB_LINK } from './assets/consts.js'

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;

  div:last-child {
    text-align: right;
  }
}
</style>