<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10" lg="8">
    <div id="font"></div>
    <div v-if="fingerprintData === null"></div>
    <div class="mt-6" v-else>
      <h2 class="pb-4 font-weight-medium">
        My Fingerprint: {{ fingerprintData.fingerprint }}
      </h2>
      <v-simple-table class="data-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Attribute</th>
              <th class="text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, key) in fingerprintData.data">
              <template v-if="key === 'webGL'">
                <tr v-for="(webGlItem, webGLKey) in item" :key="webGLKey">
                  <td>{{ webGLKey }}</td>
                  <td>
                    <list-json
                      v-if="typeof webGlItem === 'object'"
                      :json="webGlItem"
                    />
                    <img
                      v-else-if="
                        typeof webGlItem === 'string' &&
                        webGlItem.includes('image')
                      "
                      :src="webGlItem"
                      class="pt-4"
                    />
                    <span v-else>{{ webGlItem }}</span>
                  </td>
                </tr>
              </template>

              <tr v-else :key="key">
                <td>{{ key }}</td>
                <td>
                  <list-json v-if="typeof item === 'object'" :json="item" />
                  <img
                    v-else-if="typeof item === 'string'"
                    :src="item"
                    class="pt-4"
                  />
                  <span v-else>{{ item }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    </v-col>
  </v-row>
</template>

<script>
import fingerprint from '~/utils/fingerprint'

export default {
  data() {
    return {
      loading: true,
      fingerprintData: null,
    }
  },

  async mounted() {
    this.fingerprintData = await fingerprint({
      httpData: this.$store.state.httpData,
      debug: true,
    })
  },
}
</script>
