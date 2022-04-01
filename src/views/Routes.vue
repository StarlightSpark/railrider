<template>
  <div class="container">
    <div id="map" />
    <v-card flat tile>
      <v-card-text class="text-center">
        <v-card-title>Proposed Route</v-card-title>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileJSON from "ol/source/TileJSON";
import { useGeographic } from "ol/proj";
import { defaults } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke } from "ol/style";

useGeographic();

@Component
export default class Routes extends Vue {
  map: Map | null = null

  mounted() {
    this.map = new Map({
      controls: defaults({
        attribution: false,
        rotate: false,
        zoom: false,
      }),
      layers: [
          new TileLayer({source: new TileJSON({
            url: 'https://api.maptiler.com/maps/topo/tiles.json?key=iY2tvV7T1MzlGDvLS9WX',
            tileSize: 512,
            crossOrigin: 'anonymous'
          }) }),
          new VectorLayer({
            style: new Style({
              stroke: new Stroke({
                color: "#5188F5",
                width: 5
              })
            }),
            source: new VectorSource({
              format: new GeoJSON(),
              url: "/sample-route.json"
            })
          })
        ],
        view: new View({
          center: [-105.119096, 39.944109],
          zoom: 12,
        }),
        target: 'map'
    });

    this.map?.getView().fit([-105.124598, 39.489404, -104.989432, 39.941139], { padding: [20, 20, 20, 20] });
  }

  get from() { return this.$store.state.trip.from; }
  get to() { return this.$store.state.trip.to; }
}
</script>

<style scoped>
.container {
  display: flex;
}

#map {
  width: 47%;
  height: 100vh;
}

.page-title {
  text-align: center;
}
</style>
