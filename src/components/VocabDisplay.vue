<template>
  <VocabTabs />
  <VocabData />
  <br />
  <VocabRelated title="Word Breakdown" property_name="chars" />
  <VocabRelated title="Related Variants" property_name="variants" />
  <VocabRelated title="Related Vocabulary" property_name="including" />
</template>

<script setup>
import { watch } from 'vue';
import VocabTabs from './VocabTabs.vue'
import VocabData from './VocabData.vue'
import VocabRelated from './VocabRelated.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

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