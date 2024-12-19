<template>
  <span v-if="store.state.fetchstatus == FETCH_DATA_STATUSES.PRE || store.state.fetchstatus == FETCH_DATA_STATUSES.ONGOING">
    <h3>loading dictionary...</h3>
  </span>
  <span v-if="store.state.fetchstatus == FETCH_DATA_STATUSES.FAILED">
    <h3>dictionary loading failed. please refresh page.</h3>
  </span>
  <span v-if="store.state.fetchstatus == FETCH_DATA_STATUSES.SUCCESS">
  <span v-if="isWordFound" :class="isTabsNeeded ? 'vocab-disp' : ''">
    <div v-if="isTabsNeeded">
      <VocabTabs />
    </div>
    <div>
      <VocabData />
      <br />
      <VocabRelated title="Word Breakdown" :isallowlink="false" property_name="chars" />
      <VocabRelated title="Related Variants" :isallowlink="false" property_name="variants" />
      <VocabRelated title="Related Vocabulary" :isallowlink="true" property_name="including" />
    </div>
  </span><span v-else>
        <h3>no word</h3>
    </span v-else>
  </span>
</template>

<script setup>
import { watch, computed } from 'vue';
import VocabTabs from './VocabTabs.vue'
import VocabData from './VocabData.vue'
import VocabRelated from './VocabRelated.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { FETCH_DATA_STATUSES } from '../assets/consts'

const store = useStore()
const route = useRoute()

watch(() => route.query.word,
  async word => {
    if (!store.getters.isDictionaryLoaded) {
      await store.dispatch('fetchDictionary');
    }
    store.dispatch('searchInDict', word)
  }, { immediate: true }
)
const isWordFound = computed(() => store.getters.getCurrWord && Object.keys(store.getters.getCurrWord.specific).length > 0);
const isTabsNeeded = computed(() => store.state.founddata.length > 1);

</script>

<style scoped>
</style>