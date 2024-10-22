<template>
    <span v-if="props.words && props.words.length>0">{{ props.title }}:</span>
    <li v-for="w of props.words" :key="w.traditional">{{ w.traditional }} / {{ w. simplified }} = {{ w.meaning }}</li>
    <br />
</template>

<script setup>
import { ref, computed } from 'vue'
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  words: Array,
  title: String
})
</script>

<style>

</style>