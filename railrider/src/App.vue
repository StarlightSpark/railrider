<template>
  <v-app id="app" dark>
    <v-navigation-drawer mini-variant permanent app>
      <v-avatar>
        <v-icon>mdi-train</v-icon>
      </v-avatar>
      <v-divider />
      <v-list dense nav>
        <v-list-item
          v-for="route in routes"
          :key="route.path"
          color="primary"
          :to="route.path"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import router from "./router";

export default ({
  name: "App",
  computed: {
    routes() {
      return router.getRoutes().filter(route => !!route.path);
    }
  }
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-card__title {
  display: block !important;
  padding: 8px !important;
}
</style>
