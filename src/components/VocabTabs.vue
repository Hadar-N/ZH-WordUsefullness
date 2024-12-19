<template>
    <div class="tabscont">
        <div class="tabborder" v-for="(w, i) of tabnames" @click="changeIndex" :index="i"
            :class="{ active: $store.state.currview == i }">
            <div class="tab">
                <div>
                    {{ w.traditional }}
                    <span v-if="w.traditional !== w.simplified"> / {{ w.simplified }}</span>
                </div>
                <div class="onopen">
                    {{ w.meaning }}
                </div>
                <div class="onopen">
                    {{ w.importancescore }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { calcimportance } from '../assets/utils.mjs'
export default {
    methods: {
        changeIndex(e) {
            this.$store.dispatch('updateViewedIndex', e.currentTarget.getAttribute('index'))
        }
    },
    computed: {
        tabnames() {
            let spec, meaning;
            return this.$store.state.founddata?.map(i => {
                spec = Object.values(i.specific)[0] // TODO: what happens if there's more than one
                meaning = spec.data?.map(i => i.meaning).join('/ ')
                return {
                    traditional: spec.traditional,
                    simplified: spec.simplified,
                    meaning: meaning,
                    importancescore: Math.round(calcimportance(spec) * 100) / 100,
                }
            })
        }
    }
}

</script>

<style></style>