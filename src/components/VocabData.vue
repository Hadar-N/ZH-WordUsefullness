<template>
    <div v-if="props.isloading">
        <h3>loading...</h3>
    </div>
    <div v-else-if="isWordFound">
        <br />
        <div id="worddata">
            <div class="mainword">{{ worddata.traditional }}<span v-if="worddata.traditional !== worddata.simplified"> / {{ worddata.simplified }}</span></div>
            <div class="pinyin">{{ worddata.pinyin }}</div>
            <div class="meaning">{{ fixDef(worddata.meaning) }}</div>
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
                    <td><span v-if="worddata.frequency">{{ worddata.frequency }}</span></td>
                    <td>
                        <span v-if="worddata.hsk2">HSK2.0: {{ worddata.hsk2 }} <br /></span>
                        <span v-if="worddata.hsk3">HSK3.0: {{ worddata.hsk3 }}</span>
                        
                    </td>
                    <td><span v-if="worddata.tocfl">{{ worddata.tocfl }}({{ TOCFL_LEVEL_MAP[worddata.tocfl] }})</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <h3>no word</h3>
    </div v-else>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TOCFL_LEVEL_MAP } from '../assets/consts.js'
import { fixDef } from '../assets/utils.mjs'

const props = defineProps({
    worddata: Object,
    isloading: Boolean
})

const isWordFound = computed(() => props.worddata && props.worddata?.simplified)

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