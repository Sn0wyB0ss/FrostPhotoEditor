<script setup>

</script>

<template>
    <div id="layer-container"class="layer-div-section"></div>
</template>

<style scoped>
.layer-div-section {
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20%;
    height: 45%;
    background-color: #222;
    opacity: 0.6;
    overflow-y: scroll;
    pointer-events: none;

}

.layer-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 20%;
    width: 100%;
    padding: 10px;
}
.layer-info-img {
    max-width: 50px;
    max-height: 100px;
}

.layer-info-name {
    padding: 50px;
}

.layer-info-visibility { 
    transform: scale(2);
}

.layer-info-delete-icon {
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
}

.layer-info-delete-button {
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    margin-left: 15%;
}

</style>
