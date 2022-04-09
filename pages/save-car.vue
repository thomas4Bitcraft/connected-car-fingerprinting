<template>
  <v-row justify="center" align="center">
    <div id="font"></div>
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Save public car data</v-card-title>
        <v-card-text>
          <p>
            Here you can add the public data that your car exposes to any
            website you visit to our database. This helps to analyse if it is
            possible to build unique fingerprints to detect cars like yours. If
            you want to contribute enter the vendor, model and if possible the
            software version of you car. <b>Thank you for your contribution!</b>
          </p>
          <form-car :cars="cars" />
          <card-footer />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {carsList} from "~/data/cars";

export default {
  /* async asyncData({ $api }) {
    try {
      const cars = await $api.cars.list()
      return {
        cars,
      }
    } catch (e) {
      return {
        cars: [],
      }
    }
  }, */
  data () {
    return {
      cars: carsList
    }
  }
}
</script>
