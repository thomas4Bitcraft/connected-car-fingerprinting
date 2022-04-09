<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      fixed: true,
      drawer: true,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-content-save-all',
          title: 'Save Car',
          to: '/save-car',
        },
        {
          icon: 'mdi-car-connected',
          title: 'Check Car',
          to: '/check-car',
        },
        {
          icon: 'mdi-fingerprint',
          title: 'Fingerprint',
          to: '/fingerprint',
        },
      ],
      right: true,
      rightDrawer: false,
      title: 'Car Fingerprint Prototype',
    }
  },
}
</script>
