<template>
  <v-row justify="center" align="center">
    <div id="font"></div>
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="state === states.initial">
        <v-card-title class="headline">Check my car</v-card-title>
        <v-card-text>
          <p>
            Here you can test if we already successfully created a fingerprint
            for you car model.
          </p>
          <div class="d-flex justify-end">
            <v-btn
              class="mt-2"
              color="primary"
              :loading="loading"
              @click="check"
            >
              Check my car
            </v-btn>
          </div>
          <card-footer />
        </v-card-text>
      </v-card>
      <v-card v-if="state === states.failed">
        <v-card-title class="headline">Car not detected</v-card-title>
        <v-card-text>
          <p>
            Your car could not be detected. Maybe it is not in our database. If
            you want to add your car feel free to fill the form below and help
            us in our research.
          </p>
          <form-car :cars="cars" :is-test="testFailed" />
          <card-footer />
        </v-card-text>
      </v-card>
      <v-card v-if="state === states.success">
        <v-card-title class="headline">Car detected</v-card-title>
        <v-card-text>
          <p>
            We have a fingerprint that matches your car. Please send us feedback
            if it is the right one.
          </p>
          <div class="text-center">
            <v-chip class="ma-2" color="success" outlined>
              <v-icon left> mdi-car-connected </v-icon>
              {{ detectedAttributes.car.vendor_title }}
              {{ detectedAttributes.car.display_title }}
            </v-chip>

            <v-chip class="ma-2" color="primary" outlined pill>
              <v-icon left> mdi-access-point </v-icon>
              Version: {{ detectedAttributes.softwareVersion }}
            </v-chip>
          </div>

          <div v-if="!testSuccess" class="mt-8 mb-8">
            <h2 class="text-center">Is this your car?</h2>
            <div class="d-flex justify-space-around mt-8">
              <v-btn class="px-12" color="primary" @click="testFailedPressed">
                No
              </v-btn>
              <v-btn
                class="px-12"
                :loading="loading"
                color="primary"
                @click="testSuccessPressed"
              >
                Yes
              </v-btn>
            </div>
          </div>
          <div v-else class="pt-6 pb-6">
            <h2 class="text-center">
              <u>Thank you for your contribution!</u>
            </h2>
          </div>
          <card-footer />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import fingerprint from '~/utils/fingerprint'

export default {
  async asyncData({ $api }) {
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
  },
  data() {
    return {
      loading: false,
      states: {
        initial: 'initial',
        failed: 'failed',
        success: 'success',
      },
      state: 'initial',
      detectedAttributes: {
        car: {},
        softwareVersion: '',
      },
      testFailed: false,
      testSuccess: false,
      fingerprintData: null,
    }
  },
  methods: {
    testFailedPressed() {
      this.testFailed = true
      this.state = this.states.failed
    },
    async testSuccessPressed() {
      await this.sendTestSuccess()
    },
    async check() {
      this.loading = true
      try {
        this.fingerprintData = await fingerprint({
          httpData: this.$store.state.httpData,
          debug: true,
        })
        const data = await this.$api.fingerprint.check({
          fingerprint: this.fingerprintData.fingerprint,
        })

        this.detectedAttributes = {
          car: data.car,
          softwareVersion: data.software_version,
        }
        this.state = this.states.success
      } catch (e) {
        this.state = this.states.failed
      }

      this.loading = false
    },

    async sendTestSuccess() {
      this.loading = true
      try {
        await this.$api.fingerprint.testResult({
          fingerprint: this.fingerprintData.fingerprint,
          success: 1,
        })

        this.testSuccess = true
      } catch (e) {
        this.state = this.states.failed
      }

      this.loading = false
    },
  },
}
</script>
