<template>
    <span class="title" v-if="store.state.founddata?.[props.property_name] && store.state.founddata?.[props.property_name].length>0">{{ props.title }}:</span>
    <ul class="relatedtable">
    <li class="relateddata" v-for="w of store.state.founddata?.[props.property_name]" :key="w.traditional">
      <div>{{ w.traditional }} / {{ w. simplified }}</div>
      <div>{{ fixDef(w.meaning) }}</div>
      <div>
        <span v-if="w.frequency">f: {{ w.frequency }}<span v-if="w.hsk3 || w.tocfl">, </span></span>
        <span v-if="w.hsk3">HSK: {{ w.hsk3 }}<span v-if="w.tocfl">, </span></span>
        <span v-if="w.tocfl">tocfl: {{ w.tocfl }}</span>
      </div>
    </li>
  </ul>
    <br />
</template>

<script setup>
import { fixDef } from '../assets/utils.mjs'
import { useStore } from 'vuex';

const store = useStore()

defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  title: String,
  property_name: String
})
</script>

<style>
.title {
  text-decoration: underline;
}

.relatedtable {
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-items: start;
  gap: 0 20px;
}

.relateddata {
  display: contents;
}

</style>