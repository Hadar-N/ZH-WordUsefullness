import { fetchcsv, findWord } from '../assets/utils.mjs'
import { createStore } from 'vuex';

export default createStore({
  state: {
    dictionary: [],
    currview: 0,
    founddata: {}
  },
  modules: {},
  actions: {
    fetchDictionary (context) {
      return new Promise((resolve, reject) => {
        fetchcsv().then(data => context.commit('setDictionary', data)).then(resolve);
        //TODO: add reject action
      })
    },
    searchInDict(context, word) {
        let res = {};
        if (word){
            res = findWord(context.state.dictionary, word);
        }
        context.commit('setCurrView', 0);
        Object.entries(res).forEach(([k,v]) => res[k] = v ? v : []);
        console.log("res:", res)
        context.commit('setFoundData', res);
    },
    updateViewedIndex(context, index) {
      context.commit('setCurrView', index)
    }
  },
  mutations: {
    setDictionary (state, dict) {
        state.dictionary = dict;
    },
    setCurrView (state, index) {
        state.currview = index;
    },
    setFoundData (state, res) {
        state.founddata = res;
    }
  },
  getters: {
    getCurrWord (state) {
      return state.founddata?.[state.currview];
    },
    isDictionaryLoaded (state) {
      return state.dictionary && state.dictionary.length;
    }
  }
});
