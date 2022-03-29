<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script lang="ts">

export default ({
  name: "App",
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.v-card__title {
  display: block !important;
  padding: 8px !important;
}
</style>
