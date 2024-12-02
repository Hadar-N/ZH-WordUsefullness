<template>
  <span v-if="isWordFound" >
  <VocabTabs />
  <VocabData />
  <br />
  <VocabRelated title="Word Breakdown" :isallowlink="false" property_name="chars" />
  <VocabRelated title="Related Variants" :isallowlink="false" property_name="variants" />
  <VocabRelated title="Related Vocabulary" :isallowlink="true" property_name="including" />
</span><span v-else>
        <h3>no word</h3>
    </span v-else>
</template>

<script setup>
import { watch, computed } from 'vue';
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
const isWordFound = computed(() => store.getters.getCurrWord && Object.keys(store.getters.getCurrWord.specific).length > 0);

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