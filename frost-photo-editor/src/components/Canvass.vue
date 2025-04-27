<script>
    export default {
        name: "Canvass",
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
    <div class="center-div">
        <canvas class="canvas"></canvas>
    </div>
</template>

<style scoped>
.center-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: 100vh;
    width: 100vw;
}

.canvas {  
    background: #f0f0f0;
    border-radius: 5px;
    overflow-y: hide;
    overflow-x: hide;
    min-width: 500px;
    min-height: 500px;
    max-width: 500px;
    max-height: 500px;
}
</style>
