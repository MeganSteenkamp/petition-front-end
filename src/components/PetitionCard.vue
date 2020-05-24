<template>
  <div class="card is-horizontal">
    <div class="card-content">
      <div class="title is-size-4">{{ petition.title | capitalize }}</div>
      <div class="subtitle is-size-6">
        <div class="tag" :style="labelStyle(petition)">{{ petition.category }}</div>
        <p>
          <br />
        </p>
        <p class="author">Author: {{ petition.authorName }}</p>
        <p class="signatures">Signatures: {{ petition.signatureCount }}</p>
      </div>
    </div>
    <div class="card-image">
      <img class="image" :src="getImageUrl(petition)" alt="Image" />
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  props: ["petition"],
  methods: {
    getImageUrl(p) {
      return api.endpoint(`petitions/${p.petitionId}/photo`);
    },
    labelStyle(p) {
      const categoryColorMap = {
        Entertainment: "#fff6a3",
        Immigration: "#daffa3",
        Animals: "#ffc8a3",
        Environment: "#c8a3ff",
        "Human rights": "#a3acff"
      };
      return {
        backgroundColor: categoryColorMap[p.category] || "grey"
      };
    }
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
  border-radius: 5px;
  flex-direction: row;
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  box-shadow: none;
  padding-left: 20px;
}
.card.is-horizontal .card-image {
  justify-content: right;
}
.card.is-horizontal .image {
  border-radius: 5px;
  height: 200px;
  width: 300px;
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