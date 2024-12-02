<template>
    <span class="title" v-if="store.getters.getCurrWord?.[props.property_name] && store.getters.getCurrWord?.[props.property_name].length>0">{{ props.title }}:</span>
    <ul class="relatedtable">
    <li class="relateddata" v-for="(w, i) of store.getters.getCurrWord?.[props.property_name]" :key="i">
      <div>{{ w.traditional }}
        <span v-if="w.traditional !== w. simplified">/ {{ w. simplified }}</span>
        <router-link v-if="isallowlink" :to="{query: {word: w.traditional}}" target="_blank">
          <img alt="open in new tab" class="img" :src="OpenTab" />
        </router-link>
      </div>
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
import OpenTab from './../assets/opentab.png';

const store = useStore()

defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  title: String,
  isallowlink: Boolean,
  property_name: String
})
</script>

<style>
.img {
  margin-left: 5px;
  height: 12px;
  width: 12px
}
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