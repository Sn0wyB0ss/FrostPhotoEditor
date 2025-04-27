<script>
    export default {
        name: "Headers",
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


.button-div-section {
    width: 100%;
    height: 5%;
    box-sizing: border-box;
    background-color: #444;
    display: absolute;
    flex-direction: row;
}

.button-div {
    background-color: #555;
    padding: 5px;
}

</style>
