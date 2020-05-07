<template>
  <div class="petitions">
    <div>
      <h3>Search and Filter</h3>
      <input v-model="search" placeholder="search" />
      <select v-model="filter" placeholder="filter">
        <option value>All categories</option>
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
      <select v-model="sort" placeholder="Sort">
        <option value="ALPHABETICAL_ASC">Title A to Z</option>
        <option value="ALPHABETICAL_DESC">Title Z to A</option>
        <option value="SIGNATURES_ASC">Signatures Low to High</option>
        <option value="SIGNATURES_DESC">Signatures High to Low</option>
      </select>
    </div>

    <div>
      <h3>View Petitions</h3>
    </div>
    <div v-if="petitions && petitions.length > 0">
      <div id="petitions">
        <div v-for="petition in sortedPetitions" :key="petition.id" class="petition">
          <img class="image" :src="getImageUrl(petition)" />
          <div class="body">
            <div class="title">
              <router-link
                :to="{
                  name: 'petition',
                  params: { petitionId: petition.petitionId },
                }"
              >{{ petition.title }}</router-link>
            </div>
            <div class="subtitle">
              <div class="category" :style="labelStyle(petition)">{{ petition.category }}</div>.
              <div class="author">{{ petition.authorName }}</div>
            </div>
            <p class="signatures">Signatures: {{ petition.signatureCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      sort: "SIGNATURES_DESC",
      search: "",
      filter: ""
    };
  },
  mounted: function() {
    this.getPetitions();
  },
  methods: {
    ...mapActions(["getPetitions"]),
    getImageUrl(p) {
      return `http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/${p.petitionId}/photo`;
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
  computed: {
    ...mapGetters(["petitions"]),
    petitionId() {
      return this.$route.params.petitionId;
    },
    filteredPetitions() {
      var reduced = this.petitions;
      if (this.search) {
        let lowerCaseSearch = this.search.toLowerCase();
        reduced = reduced.filter(p =>
          p.title.toLowerCase().includes(lowerCaseSearch)
        );
      }
      if (this.filter) {
        reduced = reduced.filter(p => p.category === this.filter);
      }
      return reduced;
    },
    sortedPetitions() {
      if (!this.sort || this.sort == "SIGNATURES_DESC") {
        return this.filteredPetitions.sort((a, b) =>
          a.signatureCount < b.signatureCount ? 1 : a.signatureCount === b.signatureCount ? a.title > b.title ? 1 : -1 : -1 );
      }
      if (this.sort == "SIGNATURES_ASC") {
        return this.filteredPetitions.sort((a, b) =>
          a.signatureCount > b.signatureCount ? 1 : a.signatureCount === b.signatureCount ? a.title > b.title ? 1 : -1 : -1);
      }
      if (this.sort === "ALPHABETICAL_ASC") {
        return this.filteredPetitions.sort((a, b) => a.title > b.title ? 1 : -1);
      }
      if (this.sort === "ALPHABETICAL_DESC") {
        return this.filteredPetitions.sort((a, b) => a.title < b.title ? 1 : -1);
      }
    },
    categories() {
      const categories = this.petitions.map(p => p.category);
      return categories.filter((v, i) => categories.indexOf(v) === i);
    }
  }
};
</script>

<style lang="scss" scoped>
.petitions {
  .petition {
    display: flex;
    border: 1px solid black;
    margin: 10px;
    .image {
      width: 200px;
      height: 100px;
    }
    .body {
      margin: 5px 10px;
      .title {
        font-size: 15px;
        font-weight: 600;
      }
      .subtitle {
        display: flex;
        .category {
          width: fit-content;
          border: 1px solid gray;
          border-radius: 5px;
          padding: 3px;
          margin-right: 3px;
        }
        .author {
          padding: 3px;
          font-style: italic;
        }
      }
    }
  }
}
</style>
