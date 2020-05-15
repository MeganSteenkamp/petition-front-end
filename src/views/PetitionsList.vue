<template>
  <div class="petitions">
    <h1 class="title">View petitions</h1>
    <div class="search">
      <h3><strong>Refine search</strong></h3>
      <input v-model="search" placeholder="Search titles" />
      <select class="dropdown is-active" v-model="filter" placeholder="filter">
        <option value>All categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <select class="dropdown is-active" v-model="sort" placeholder="Sort">
        <option value="ALPHABETICAL_ASC">Title A to Z</option>
        <option value="ALPHABETICAL_DESC">Title Z to A</option>
        <option value="SIGNATURES_ASC">Signatures Low to High</option>
        <option value="SIGNATURES_DESC">Signatures High to Low</option>
      </select>
    </div>

    <div v-if="petitions && sortedPetitions.length > 0">
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
    <div v-if="petitions && sortedPetitions.length == 0">
      <div class="empty-petitions">
        <div class="subtitle is-size-2">
          <strong>We currently have no petitions.</strong>
        </div>
        <div class="subtitle">Is there something you want to change?</div>
        <router-link class="tag is-danger is-large" to="/start-a-petition">Start a petition</router-link>
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
      filter: this.$route.query.category || ""
    };
  },
  mounted: function() {
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
.search {
  padding-bottom: 30px;
  line-height: 19px;
}
.petition {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 240px;
  padding-right: 240px;
}
.empty-petitions {
  padding: 10px 10px 10px 10px;
  text-align: center;
  border-radius: 25px;
  background-color: whitesmoke;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  justify-content: center;
  align-items: center;
}
</style>
