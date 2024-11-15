<template>
    <div id="searchbar">
        <input v-model="text" v-on:keyup.enter="addtoroute">
        <button @click="addtoroute">search</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        addtoroute(e) {
            e.preventDefault();
            this.$router.push({ query: { word: this.text.trim() } })
        }
    },
}
</script>

<style scoped>
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