<template>
  <div id="app">
    <people />
  </div>
</template>
<script>
import People from "@/components/People";
import {mapActions} from "vuex";
export default {
  components: {People},
  methods: {
    ...mapActions(['fetchData'])
  },
  mounted() {
    this.fetchData()
  },
}
</script>
