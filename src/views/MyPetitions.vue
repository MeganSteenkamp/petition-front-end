<template>
  <div class="petitions">
    <div class="title">
      <h3>
        <strong>My Petitions</strong>
      </h3>
    </div>

    <div v-if="user && petitions && sortedPetitions.length > 0">
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
    <div v-if="user && petitions && sortedPetitions.length == 0">
      <div class="empty-petitions">
        <div class="subtitle is-size-2"><strong>You have no petitions.</strong></div>
        <div class="subtitle">Is there something you want to change?</div>
        <router-link class="tag is-danger is-large" to="/start-a-petition">Start a petition</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import PetitionCard from "./../components/PetitionCard";

export default {
  components: {
    PetitionCard
  },
  mounted: function() {
    this.loadUser();
    this.loadPetitions();
  },
  methods: {
    ...mapActions(["loadUser", "loadPetitions"])
  },
  computed: {
    ...mapGetters(["user", "petitions"]),
    petitionId() {
      return this.$route.params.petitionId;
    },
    filteredPetitions() {
      var reduced = this.petitions;
      reduced = reduced.filter(p => p.authorName === this.user.name);
      return reduced;
    },
    sortedPetitions() {
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
