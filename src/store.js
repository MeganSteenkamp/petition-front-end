import Vue from "vue";
import Vuex from "vuex";
import api, { getUserId } from "./api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    error: null,
    petition: {},
    petitions: [],
    signatures: [],
    categories: []
  },
  mutations: {
    setPetitions(state, petitions) {
      state.petitions = petitions;
    },
    setPetition(state, petition) {
      state.petition = petition;
    },
    setUser(state, user) {
      state.user = user;
    },
    setSignatures(state, signatures) {
      state.signatures = signatures;
    },
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async register({ }, user) {
      const result = await api.post("users/register", user);
      return result.userId;
    },
    async login({ dispatch }, user) {
      let result = await api.post("users/login", user);
      api.setUserAndToken(result.userId, result.token);
      dispatch("loadUser");
    },
    async logout({ commit }) {
      api.clearUserAndToken();
      commit("setUser", null);
    },
    async loadPetitions({ commit }) {
      const petitions = await api.get("petitions");
      commit("setPetitions", petitions);
    },
    async loadPetition({ commit }, id) {
      const petition = await api.get(`petitions/${id}`);
      commit("setPetition", petition);
    },
    async loadUser({ commit }) {
      const userId = getUserId();
      if (userId) {
        const user = await api.get(`users/${userId}`);
        commit("setUser", user);
      }
    },
    async createPetition({ commit, dispatch }, petition) {
      const result = await api.post("petitions", petition);
      return result.petitionId;
    },
    async loadSignatures({ commit }, id) {
      const signatures = await api.get(`petitions/${id}/signatures`);
      commit("setSignatures", signatures);
    },
    async loadCategories({ commit }) {
      const categories = await api.get(`petitions/categories`);
      commit("setCategories", categories);
    }
  },
  getters: {
    petitions: state => state.petitions,
    petition: state => state.petition,
    user: state => state.user,
    signatures: state => {
      return state.signatures.slice().reverse();
    },
    categories: state => state.categories
  }
});

export default store;
