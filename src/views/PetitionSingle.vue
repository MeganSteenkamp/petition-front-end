<template>
  <div class="petition-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <img class="container__image" :src="getImageUrl(petition)" />
          <div class="container__text">
            <h1 class="title">{{ petition.title }}</h1>
            <br />
            <h2 class="subtitle">
              <strong>Category:</strong>
              {{ petition.category }}
              <br />
              <strong>Author:</strong>
              {{ petition.authorName }}
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="petition-content">
      <div class="container">
        <p class="is-size-5 description">
          <strong>Description:</strong>
          {{ petition.description }}
        </p>
        <p class="is-size-5">
          <strong>Signatures:</strong>
          {{ petition.signatureCount }}
        </p>
        <p class="is-size-5">
          <strong>Start date:</strong>
          {{ petition.createdDate | moment }}
        </p>
        <p class="is-size-5">
          <strong>Closing date:</strong>
          {{ petition.closingDate | moment}}
        </p>
        <br>
        <h2><Strong>Signatories:</strong></h2>
        <div v-if="signatures && signatures.length > 0">
          <div id="signatures">
            <div v-for="signature in signatures" :key="signature.signatoryId" class="petition">
              <li>{{ signature.name }}</li>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Moment from "moment";
import api from "./../api";

export default {
  mounted: function() {
    this.loadPetition(this.petitionId);
    this.loadSignatures(this.petitionId);
  },
  methods: {
    ...mapActions(["loadPetition", "loadSignatures"]),
    getImageUrl(p) {
      return api.endpoint(`petitions/${p.petitionId}/photo`);
    }
  },
  filters: {
    moment(date) {
      if (date) {
        return Moment(date).format("LL");
      }
      return "No closing date set";
    }
  },
  computed: {
    ...mapGetters(["petition"]),
    ...mapGetters(["signatures"]),
    petitionId() {
      return this.$route && this.$route.params.petitionId;
    }
  }
};
</script>

<style lang="scss" scoped>
.petition-single {
  margin-top: 30px;
}
.hero {
  margin-bottom: 70px;
}
.container {
  &__image {
    max-height: 200px;
    max-width: 380px;
    float: right;
  }
  &__text {
    display: inline;
  }
  margin-bottom: 70px;
}
.image {
  margin-top: 50px;
}
.description {
  margin-bottom: 30px;
}
</style>