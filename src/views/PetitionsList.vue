<template>
  <div class="petitions">
    <h1 class="title">View petitions</h1>
    <div class="search">
      <h3>
        <strong>Refine search</strong>
      </h3>
      <input v-model="search" placeholder="Search titles" @keypress="resetPage" />
      <select
        class="dropdown is-active"
        v-model="category"
        placeholder="category"
        @change="resetPage"
      >
        <option value>All categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <select class="dropdown is-active" v-model="sort" placeholder="Sort" @change="resetPage">
        <option value="ALPHABETICAL_ASC">Title A to Z</option>
        <option value="ALPHABETICAL_DESC">Title Z to A</option>
        <option value="SIGNATURES_ASC">Signatures Low to High</option>
        <option value="SIGNATURES_DESC">Signatures High to Low</option>
      </select>
    </div>
    <div v-if="currentPetitions && currentPetitions.length > 0">
      <div class="petitions-list">
        <div v-for="petition in currentPetitions" :key="petition.petitionId" class="petition">
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
    <div v-if="currentPetitions && currentPetitions.length == 0">
      <div class="empty-petitions">
        <div class="subtitle is-size-2">
          <strong>We can't find any petitions.</strong>
        </div>
        <div class="subtitle">Is there something you want to change?</div>
        <router-link class="tag is-danger is-large" to="/start-a-petition">Start a petition</router-link>
      </div>
    </div>
    <div class="pagination">
      <button class="button is-outlined" @click="updateIndex(0)" :disabled="!canGoPrevious">First</button>
      <button class="button is-outlined" @click="previous" :disabled="!canGoPrevious">Previous</button>
      <a v-for="(page, index) in pagedPetitions" :key="index" @click="updateIndex(index)">
        <button class="button is-link is-outlined" v-if="index === pageIndex">
          <b>{{ index + 1}}</b>
        </button>
        <button class="button is-outlined" v-else>{{ index + 1}}</button>
      </a>
      <button class="button is-outlined" @click="next" :disabled="!canGoNext">Next</button>
      <button
        class="button is-outlined"
        @click="updateIndex(getLastPage)"
        :disabled="!canGoNext"
      >Last</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "../api";
import PetitionCard from "./../components/PetitionCard";

const CHUNK_FACTOR = 10;

export default {
  components: {
    PetitionCard
  },
  data() {
    return {
      sort: "",
      search: "",
      category: "",
      pageIndex: 0
    };
  },
  async mounted() {
    await this.loadPetitions();
    this.category = this.$route.query.category || "";
    this.search = this.$route.query.search || "";
    this.sort = this.$route.query.sort || "SIGNATURES_DESC";
    try {
      let parsed = Number.parseInt(this.$route.query.pageIndex);
      this.pageIndex = isNaN(parsed) ? 0 : parsed;
    } catch (e) {
      this.pageIndex = 0;
    }
  },
  methods: {
    ...mapActions(["loadPetitions"]),
    updateQueryString() {
      let query = {
        pageIndex: this.pageIndex
      };
      if (this.category) {
        query.category = this.category;
      }
      if (this.search) {
        query.search = this.search;
      }
      if (this.sort) {
        query.sort = this.sort;
      }
      this.$router.replace({ query });
    },
    previous() {
      this.pageIndex -= 1;
      this.updateQueryString();
    },
    next() {
      this.pageIndex += 1;
      this.updateQueryString();
    },
    updateIndex(i) {
      this.pageIndex = i;
      this.updateQueryString();
    },
    resetPage() {
      this.pageIndex = 0;
    }
  },
  watch: {
    category(newVal, oldVal) {
      this.updateQueryString();
    },
    search() {
      this.updateQueryString();
    },
    sort() {
      this.updateQueryString();
    }
  },
  computed: {
    ...mapGetters(["petitions"]),
    petitionId() {
      return this.$route.params.petitionId;
    },
    canGoPrevious() {
      return this.pageIndex > 0;
    },
    canGoNext() {
      return this.pageIndex < this.pagedPetitions.length - 1;
    },
    getLastPage() {
      return this.pagedPetitions.length - 1;
    },
    filteredPetitions() {
      var reduced = this.petitions;
      if (this.search) {
        let lowerCaseSearch = this.search.toLowerCase();
        reduced = reduced.filter(p =>
          p.title.toLowerCase().includes(lowerCaseSearch)
        );
      }
      if (this.category) {
        reduced = reduced.filter(p => p.category === this.category);
      }
      return reduced;
    },
    currentPetitions() {
      return this.pagedPetitions[this.pageIndex];
    },
    pagedPetitions() {
      let pages = [];
      let page = [];

      for (var i = 0; i < this.sortedPetitions.length; i++) {
        if (page.length < CHUNK_FACTOR) {
          page.push(this.sortedPetitions[i]);
        } else {
          pages.push(page);
          page = [this.sortedPetitions[i]];
        }
      }

      if (page.length > 0) {
        pages.push(page);
      }
      return pages;
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
.petitions-list {
  height: 700px;
  overflow: auto;
  text-align: justify;
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
  border-radius: 15px;
  background-color: whitesmoke;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  justify-content: center;
  align-items: center;
}
.pagination {
  margin-top: 15px;
  justify-content: center;
  align-items: center;
}
</style>
