<template>
  <div>
    <h1>Raw Data</h1>
    <v-card>
      <v-data-table
        hide-default-footer
        disable-sort
        dense
        no-data-text="No Data"
        :headers="[
          {
            text: 'Key',
            value: 'key'
          },
          {
            text: 'Value',
            value: 'value'
          }
        ]"
      />
    </v-card>
  </div>
</template>
