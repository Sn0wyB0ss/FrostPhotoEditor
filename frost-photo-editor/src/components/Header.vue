<script>
    export default {
        name: "Header",
        data() {
            return {
            };
        },
        methods: {
 
        },
        beforeCreate() {
        },
    }

</script>

<template>
    <div class="button-div-section">
        <button class="button-div" id="button-new">New</button>
        <button class="button-div" id="button-save">Save</button>
        <button class="button-div" id="button-load">Load</button>
        <button class="button-div" id="button-theme">Theme</button>
    </div>
</template>

<style scoped>

#app {
    padding: 0;
}

.button-div-section {
    width: 100vw;
    height: 5%;
    box-sizing: border-box;
    background-color: #444;
    display: flex;
    flex-direction: row;
}

.button-div {
    background-color: #555;
    padding: 5px;
}

</style>
