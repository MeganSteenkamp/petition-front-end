<template>
  <div class="petitions">
    <div>
      <h1>{{ petition.title }}</h1>
    <img class="image" :src="getImageUrl(petition)" />
    <ul>
        <li><b>Description: </b>{{ petition.description }}</li>
        <li><b>Signatures: </b>{{ petition.signatureCount }}</li>
        <li><b>Category: </b>{{ petition.category }}</li>
        <li><b>Created date: </b>{{ petition.createdDate | moment }}</li>
        <li><b>Closing date: </b>{{ petition.closingDate | moment }}</li>
    </ul>
    <br>
    <h1>Signatories</h1>
    <div v-if="signatures && signatures.length > 0">
      <div id="signatures">
        <div v-for="signature in signatures" :key="signature" class="petition">
          <li>{{ signature.name }}</li>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Moment from "moment";

export default {
  mounted: function () {
    this.getPetition();
    this.getSignatures();
  },
  methods: {
    ...mapActions(["getPetition"]),
    ...mapActions(["getSignatures"]),
    getImageUrl(p) {
      return `http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/${p.petitionId}/photo`;
    }
  },
  filters: {
    moment: function (date) {
      if (date) {
        return Moment(date).format('LL');
      }
      return "No closing date set"
    }
  },
  computed: {
    ...mapGetters(["petition"]),
    ...mapGetters(["signatures"])
  }
};
</script>

<style lang="scss" scoped>
// Custom css here
</style>
