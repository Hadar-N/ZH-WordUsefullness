<template>
    <div id="tabscont">
        <div class="tab" v-for="(w, i) of words" @click="changeIndex" :index="i" :class="{active: active === i}">{{ w.traditional }}<span v-if="w.traditional !== w.simplified"> / {{ w.simplified }}</span></div>
    </div>
</template>

<script>
export default {
    props: {words: Array, active: Number},
    methods: {
        changeIndex(e) {
            this.$emit('changeIndex', {index: e.currentTarget.getAttribute('index')});
        }
    },
    // setup:{}
}

</script>

<style>
#tabscont {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: stretch;
    row-gap: 5px;
}
#tabscont:after {
    content: "";
    flex: 99999 1 auto;
}
.tab {
    border: 1px solid darkgray;
    flex-grow: 1;
    padding: 2px 10px;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    text-align: center;
}
.tab:hover {
    background-color: gray;
}
.active {
        background-color:lightgray;
    }

</style>