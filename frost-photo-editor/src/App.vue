<script setup>
import Layer from './components/Layer.vue'
import BackgroundImage from './components/BackgroundImage.vue';
import Canvass from './components/Canvass.vue';
import Header from './components/Header.vue';
</script>

<template>

  <main>
    <Canvass/>
    <Layer/>
  </main>
</template>

<style>


main {
  display:absolute;
  width: 100;
}

body {
  background-image: url("@/assets/images/theme/cookie_run.jpg");
  background-color: #333;
  background-size: cover;
  color: #fff;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0  !important;
  margin: 0 !important;
}




* {
    box-sizing: border-box;
}
</style>
