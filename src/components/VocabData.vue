<template>
    <!-- <div v-if="props.isloading">
        <h3>loading...</h3>
    </div>
    <div v-else-if="isWordFound"> -->
    <div v-if="isWordFound">
        <br />
        <div id="worddata">
            <div class="mainword">{{ store.getters.getCurrWord.traditional }}<span v-if="store.getters.getCurrWord.traditional !== store.getters.getCurrWord.simplified"> / {{ store.getters.getCurrWord.simplified }}</span></div>
            <div class="pinyin">{{ store.getters.getCurrWord.pinyin }}</div>
            <div class="meaning">{{ fixDef(store.getters.getCurrWord.meaning) }}</div>
        </div>
        <br />
        <table id="wordextra">
            <tbody>
                <tr>
                    <th>Frequency</th>
                    <th>HSK Level</th>
                    <th>TOCFL Level</th>
                </tr>
                <tr>
                    <td><span v-if="store.getters.getCurrWord.frequency">{{ store.getters.getCurrWord.frequency }}</span></td>
                    <td>
                        <span v-if="store.getters.getCurrWord.hsk2">HSK2.0: {{ store.getters.getCurrWord.hsk2 }} <br /></span>
                        <span v-if="store.getters.getCurrWord.hsk3">HSK3.0: {{ store.getters.getCurrWord.hsk3 }}</span>
                        
                    </td>
                    <td><span v-if="store.getters.getCurrWord.tocfl">{{ store.getters.getCurrWord.tocfl }}({{ TOCFL_LEVEL_MAP[store.getters.getCurrWord.tocfl] }})</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <h3>no word</h3>
    </div v-else>
</template>

<script setup>
import { computed } from 'vue'
import { TOCFL_LEVEL_MAP } from '../assets/consts.js'
import { fixDef } from '../assets/utils.mjs'
import { useStore } from 'vuex';

const store = useStore()

const isWordFound = computed(() => store.getters.getCurrWord && store.getters.getCurrWord?.simplified);

</script>

<style>
#worddata {
    width: 100%;
    text-align: center;
}

.mainword {
    font-size: 25px;
}
.pinyin {
    font-size: 13px;
}
#wordextra {
    width: 100%;
    border: 1px solid gray;
    text-align: center;
    border-collapse: collapse;
    table-layout: fixed;

    th {
        font-weight: 600;
        border: 1px solid gray;
    }
    td {
        border: 1px solid gray;
        vertical-align: top;
    }
}

.hskbox {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>