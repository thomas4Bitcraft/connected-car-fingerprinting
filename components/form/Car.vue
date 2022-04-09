<template>
  <div>
    <v-form v-if="!success" v-model="valid" @submit.prevent="submit">
      <v-select
        v-model="data.vendor"
        :items="vendors"
        :rules="requiredRule"
        label="Vendor"
        data-vv-name="Vendor"
        required
      ></v-select>
      <v-select
        v-model="data.model"
        :items="models"
        item-text="display_title"
        item-value="id"
        :rules="requiredRule"
        label="Model"
        data-vv-name="Model"
        required
      ></v-select>
      <v-text-field
        v-model="data.softwareVersion"
        label="Software Version (Optional)"
      ></v-text-field>
      <v-checkbox
        v-model="data.checkbox"
        :rules="requiredRule"
        label="I agree to use the entered data for research purposes"
        type="checkbox"
        required
      ></v-checkbox>
      <div class="d-flex justify-end">
        <v-btn
          class="mt-2 px-12"
          color="primary"
          type="submit"
          :disabled="!valid"
          :loading="loading"
        >
          submit
        </v-btn>
      </div>
    </v-form>
    <div v-else class="pt-2 pb-6">
      <h2 class="text-center">
        <u>Thank you for your contribution!</u>
      </h2>
    </div>
    <v-snackbar v-model="snackbar" color="red accent-2" top centered>
      Error occured
    </v-snackbar>
  </div>
</template>

<script>
import fingerprint from '~/utils/fingerprint'

export default {
  props: {
    cars: {
      type: Array,
      required: true,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {
        vendor: '',
        model: '',
        softwareVersion: '',
        checkbox: false,
      },
      success: false,
      snackbar: false,
      loading: false,
      valid: false,
      requiredRule: [(v) => !!v || 'Field is required'],
    }
  },
  computed: {
    vendors() {
      return [...new Set(this.cars.map((car) => car.vendor_title))].sort()
    },
    models() {
      return this.sorted(
        this.cars.filter((car) => car.vendor_title === this.data.vendor),
        'display_title'
      )
    },
  },
  created() {
    this.data.vendor = this.vendors[0]
  },
  methods: {
    sorted(array, key) {
      return array.sort(function (a, b) {
        if (a[key] < b[key]) {
          return -1
        }
        if (a[key] > b[key]) {
          return 1
        }
        return 0
      })
    },
    async submit() {
      this.loading = true

      try {
        const fingerprintData = await fingerprint({
          httpData: this.$store.state.httpData,
          debug: true,
        })
        if (this.isTest) {
          this.$api.fingerprint.testResult({
            car_model_id: this.data.model,
            software_version: this.data.softwareVersion,
            fingerprint: fingerprintData.fingerprint,
            fingerprint_data: fingerprintData.data,
            success: 0,
          })
        } else {
          this.$api.fingerprint.save({
            car_model_id: this.data.model,
            software_version: this.data.softwareVersion,
            fingerprint: fingerprintData.fingerprint,
            fingerprint_data: fingerprintData.data,
          })
        }

        this.success = true
      } catch (e) {
        this.snackbar = true
      }

      this.loading = false
    },
  },
}
</script>
