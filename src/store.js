import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    petition: {},
    petitions: []
  },
  mutations: {
    setPetitions(state, petitions) {
      state.petitions = petitions;
    },
    setPetition(state, petition) {
      state.petition = petition;
    }
  },
  actions: {
    getPetitions({ commit }) {
      Vue.axios
        .get("http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions")
        .then(({ data }) => {
          commit("setPetitions", data);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },
    getPetition({ commit, state }) {
      commit("setPetition", {});
      let id = state && state.route && state.route.params.petitionId;
      Vue.axios
        .get(`http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/${id}`)
        .then(({ data }) => {
          commit("setPetition", data);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    }
  },
  getters: {
    petitions: (state) => state.petitions,
    petition: state => state.petition
  }
});

export default store;
