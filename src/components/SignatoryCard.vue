<template>
  <div class="card is-horizontal">
    <div class="card-image">
      <img
        class="image"
        :src="getImageUrl(signatory)"
        onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'"
      />
    </div>
    <div class="card-content">
      <div class="name is-size-5">{{ signatory.name | capitalize }}</div>
      <p v-if="signatory.city">City: {{ signatory.city }}</p>
      <p v-if="signatory.country">Country: {{ signatory.country }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "../api";

export default {
  props: ["signatory"],
  methods: {
    getImageUrl(p) {
      return api.endpoint(`users/${p.signatoryId}/photo`);
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.card.is-horizontal {
  background-color: whitesmoke;
  border-radius: 15px;
  flex-direction: row;
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  box-shadow: none;
}
.card.is-horizontal .card-image {
  justify-content: right;
}
.card.is-horizontal .image {
  border-radius: 15px;
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.card.is-horizontal .card-content {
  flex: 1;
  justify-content: left;
  padding-left: 1em;
  padding-top: 20px;
  padding-bottom: 0;
  font-size: 0.8em;
}
</style>