<script setup>
import Layer from './components/Layer.vue'
import BackgroundImage from './components/BackgroundImage.vue';
import Canvass from './components/Canvass.vue';
import Headers from './components/Headers.vue';
</script>

<template>

  <main>
    <Headers/>
    <Canvass/>
    <Layer/>

  </main>
</template>

<style>



body {
  background-image: url("@/assets/images/theme/cookie_run.jpg");
  background-color: #333;
  background-size: cover;
  color: #fff;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
}


</style>
