<template>
  <div>
    <div>
      <h1>Petitions Page</h1>
    </div>

    <div v-if="errorFlag" style="color: red;">{{ error }}</div>

    <div v-if="$route.params.petitionId">
      <div id="petition">
        <router-link :to="{ name: 'petitions'}">Back to Petitions</router-link>
        <br />
        <br />
        <table>
          <tr>
            <td>Petition ID</td>
            <td>Title</td>
          </tr>
          <tr>
            <td>{{ $route.params.petitionId }}</td>
            <td>{{ getSinglePetition($route.params.petitionId).title }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div v-else>
      <div id="petitions">
        <table>
          <tr v-for="petition in petitions" :key="petition">
            <td>{{ petition.title }}</td>
            <td>
              <router-link
                :to="{ name: 'petition', params: { petitionId: petition.petitionId}}"
              >View</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: "",
      errorFlag: false,
      petitions: []
    };
  },
  mounted: function() {
    this.getPetitions();
  },
  methods: {
    getPetitions: function() {
      this.$http
        .get("http://localhost:4941/api/v1/petitions")
        .then(response => {
          this.petitions = response.data;
        })
        .catch(error => {
          this.error = error;
          this.errorFlag = true;
        });
    },
    getSinglePetition: function(id) {
      for (var i = 0; i < this.petitions.length; i++) {
        if (this.petitions[i].petitionId == id) {
          return this.petitions[i];
        }
      }
    }
  }
};
</script>
