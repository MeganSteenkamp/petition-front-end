<template>
  <div>
    <div>
      <h1>{{ petition.title }}</h1>
    </div>
    <ul>
        <li><b>Description: </b>{{ petition.description }}</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  mounted: function () {
    this.getPetition();
  },
  methods: {
    ...mapActions(["getPetition"]),
  },
  computed: {
    ...mapGetters(["petition"])
  }
};
</script>

<style lang="scss" scoped>
// Custom css here
</style>
