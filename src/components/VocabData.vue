<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  worddata: Object,
  isloading: Boolean
})
</script>

<template>
    <div v-if="isloading">
        <h3>loading...</h3>
    </div>
    <div v-else-if="worddata">
        <h3>found: {{ JSON.stringify(worddata) }}</h3>
    </div>
    <div v-else>
        <h3>no word</h3>
    </div v-else>
</template>

<style>
</style>