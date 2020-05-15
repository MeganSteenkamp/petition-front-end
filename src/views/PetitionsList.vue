<template>
  <div class="petitions">
    <div class="title">
      <h3><strong>View Petitions</strong></h3>
    </div>
    <div class="search">
      <h3>Refine search</h3>
      <input v-model="search" placeholder="Search titles" />
      <select class="dropdown is-active" v-model="filter" placeholder="filter">
        <option value>All categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <select v-model="sort" placeholder="Sort">
        <option value="ALPHABETICAL_ASC">Title A to Z</option>
        <option value="ALPHABETICAL_DESC">Title Z to A</option>
        <option value="SIGNATURES_ASC">Signatures Low to High</option>
        <option value="SIGNATURES_DESC">Signatures High to Low</option>
      </select>
    </div>

    <div v-if="petitions && petitions.length > 0">
      <div id="petitions">
        <div v-for="petition in sortedPetitions" :key="petition.petitionId" class="petition">
          <router-link
            :to="{
              name: 'petition',
              params: { petitionId: petition.petitionId }
            }"
          >
            <PetitionCard :petition="petition" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "../api";
import PetitionCard from "./../components/PetitionCard";

export default {
  components: {
    PetitionCard
  },
  data() {
    return {
      sort: "SIGNATURES_DESC",
      search: "",
      filter: this.$route.query.category || "",
      authorFilter: this.$route.query.author || ""
    };
  },
  mounted() {
    this.loadPetitions();
  },
  methods: {
    ...mapActions(["loadPetitions"])
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
      if (this.author) {
        reduced = reduced.filter(p => p.authorName === this.author);
      }
      return reduced;
    },
    sortedPetitions() {
      if (!this.sort || this.sort == "SIGNATURES_DESC") {
        return this.filteredPetitions.sort((a, b) =>
          a.signatureCount < b.signatureCount
            ? 1
            : a.signatureCount === b.signatureCount
            ? a.title > b.title
              ? 1
              : -1
            : -1
        );
      }
      if (this.sort == "SIGNATURES_ASC") {
        return this.filteredPetitions.sort((a, b) =>
          a.signatureCount > b.signatureCount
            ? 1
            : a.signatureCount === b.signatureCount
            ? a.title > b.title
              ? 1
              : -1
            : -1
        );
      }
      if (this.sort === "ALPHABETICAL_ASC") {
        return this.filteredPetitions.sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      }
      if (this.sort === "ALPHABETICAL_DESC") {
        return this.filteredPetitions.sort((a, b) =>
          a.title < b.title ? 1 : -1
        );
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
.title {
  padding-left: 60px;
  font-weight: bold;
  color: #2c3e50;
}
.search {
  padding-left: 60px;
}
.petition {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 280px;
  padding-right: 280px;
}
</style>
