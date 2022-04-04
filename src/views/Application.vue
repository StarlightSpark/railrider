<template>
  <div id="application">
    <v-navigation-drawer v-if="$route.path !== '/'" mini-variant permanent app class="text-center">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";

export default Vue.extend({
  name: "Application",
  computed: {
    routes() {
      return router.getRoutes().filter(route => !!route.name);
    }
  }
})
</script>
