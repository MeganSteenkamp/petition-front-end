import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    petition: {},
    petitions: [],
    signatures: []
  },
  mutations: {
    setPetitions(state, petitions) {
      state.petitions = petitions;
    },
    setPetition(state, petition) {
      state.petition = petition;
    },
    setSignatures(state, signatures) {
      state.signatures = signatures
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
    },
    getSignatures({ commit, state }) {
      commit("setSignatures", {});
      let id = state && state.route && state.route.params.petitionId;
      Vue.axios
        .get(`http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions/${id}/signatures`)
        .then(({ data }) => {
          commit("setSignatures", data);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },
  },
  getters: {
    petitions: state => state.petitions,
    petition: state => state.petition,
    signatures: state => state.signatures
  }
});

export default store;
