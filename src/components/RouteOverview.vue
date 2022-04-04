<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="(step, index) in simplifiedInstructions" :key="index">
          <td><v-icon>mdi-directions-fork</v-icon></td>
          <td>{{ step.street_name }}</td>
          <td>{{ step.distance | m2mi }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";

const WithProps = Vue.extend({
  props: {
    instructions: {
      type: Array,
      default: () => ([])
    }
  }
})

@Component
export default class Routes extends WithProps {
  get simplifiedInstructions() {
    return this.instructions.filter((step: any) => !!step.street_name);
  }
}
</script>
