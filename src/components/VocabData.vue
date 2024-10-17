<template>
    <div v-if="props.isloading">
        <h3>loading...</h3>
    </div>
    <div v-else-if="isWordFound">
        <h3>found: {{ JSON.stringify(props.worddata) }}</h3>
    </div>
    <div v-else>
        <h3>no word</h3>
    </div v-else>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  worddata: Object,
  isloading: Boolean
})

const isWordFound = computed(() => props.worddata && props.worddata?.simplified)

</script>

<style>
</style>