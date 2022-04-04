<template>
  <div class="container pa-0">
    <div id="map" />
    <v-card elevation="3" tile class="overview">
      <v-card-text class="text-center">
        <div class="text-subtitle-1 font-weight-bold">{{ from.name }} <v-icon style="vertical-align: sub">mdi-chevron-right</v-icon> {{ to.name }}</div>
        <div class="text-subtitle-2 font-weight-bold green--text">{{ totalDistance | m2mi(0, false) }}</div>
        <v-divider class="my-2" />
        <route-overview class="steps" v-if="instructions" :instructions="instructions" />
        <v-skeleton-loader v-else type="list-item-avatar@7" />
      </v-card-text>
      <v-card-actions>
        <v-btn text to="/"><v-icon left>mdi-chevron-left</v-icon>Back</v-btn>
        <v-spacer />
        <v-btn color="primary" to="/app/dashboard">Let's Fucking Go</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
import { getRoutes } from "../services/RailRouting";
import { getCoordiniatesForPlace } from '@/services/GoogleMaps';
import RouteOverview from "@/components/RouteOverview.vue";

useGeographic();

@Component({
  components: {
    RouteOverview
  }
})
export default class Routes extends Vue {
  map: Map | null = null;
  routeLayer = new VectorLayer({
    style: new Style({
      stroke: new Stroke({
        color: "#5188F5",
        width: 5
      })
    }),
    source: new VectorSource({
      format: new GeoJSON()
    })
  });
  instructions: any[] | null = null;
  totalDistance: number | null = null;

  mounted() {
    this.loadMap();
    this.showRoutes();
  }

  loadMap() {
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
          this.routeLayer
        ],
        view: new View({
          center: [-105.119096, 39.944109],
          zoom: 12,
        }),
        target: 'map'
    });
  }

  async showRoutes() {
    const { latitude: fromLat, longitude: fromLon } = this.currentPosition.coords;
    const toCoords = await getCoordiniatesForPlace(this.to.id);

    getRoutes([fromLat, fromLon], toCoords)
      .then(paths => {
        const firstRoute = paths[0];
        this.routeLayer.getSource()?.addFeatures(new GeoJSON().readFeatures(firstRoute.points));
        this.map?.getView().fit(firstRoute.bbox, { padding: [50, 50, 50, 50] });
        this.instructions = firstRoute.instructions;
        this.totalDistance = firstRoute.distance;
      });
  }

  get from() { return this.$store.state.trip.from; }
  get to() { return this.$store.state.trip.to; }

  get currentPosition(): GeolocationPosition {
    return this.$store.state.position.currentPosition;
  }
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

.overview {
  flex-grow: 1;
}

.steps {
  height: 320px;
  overflow: scroll;
}
</style>
