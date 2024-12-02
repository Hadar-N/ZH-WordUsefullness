<template>
    <!-- <div v-if="props.isloading">
        <h3>loading...</h3>
    </div>
    <div v-else-if="isWordFound"> -->
    <div v-for="v of Object.values(store.getters.getCurrWord.specific)">
        <br />
        <div id="worddata">
            <div class="mainword">{{ v.traditional }}<span v-if="v.traditional !== v.simplified"> / {{ v.simplified }} </span></div>
            <br />
            <span v-for="w of v.data">
                <div class="pinyin">{{ w.pinyin }}</div>
                <div class="meaning">{{ fixDef(w.meaning) }}</div>
                <br />
            </span>
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
                    <td><span v-if="v.frequency">{{ v.frequency }}</span></td>
                    <td>
                        <span v-if="v.hsk2">HSK2.0: {{ v.hsk2 }} <br /></span>
                        <span v-if="v.hsk3">HSK3.0: {{ v.hsk3 }}</span>
                    </td>
                    <td><span v-if="v.tocfl">{{ v.tocfl }}({{ TOCFL_LEVEL_MAP[v.tocfl] }})</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { TOCFL_LEVEL_MAP } from '../assets/consts.js'
import { fixDef } from '../assets/utils.mjs'
import { useStore } from 'vuex';

const store = useStore()

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