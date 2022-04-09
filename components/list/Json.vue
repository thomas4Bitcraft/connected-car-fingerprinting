<template>
  <ul class="my-4">
    <li v-for="(title, key) in json" :key="key">{{ key }}: {{ title }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    json: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
