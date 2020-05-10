import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    petition: {},
    petitions: [],
    signatures: [],
    categories: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, {token, user}) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    setPetitions(state, petitions) {
      state.petitions = petitions;
    },
    setPetition(state, petition) {
      state.petition = petition;
    },
    setSignatures(state, signatures) {
      state.signatures = signatures;
    },
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:4941/api/v1/users/register', data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:4941/api/v1/users/login', data: user, method: 'POST' })
          .then(resp => {
            console.log(resp);
            const token = resp.data.token
            const user = resp.data.userId
            localStorage.setItem('token', token)
            axios.defaults.headers.common['X-Authorization'] = token
            commit('auth_success', {token, user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['X-Authorization']
        resolve()
      })
    },
    getPetitions({ commit }) {
      Vue.axios
        .get("http://localhost:4941/api/v1/petitions")
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
        .get(`http://localhost:4941/api/v1/petitions/${id}`)
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
        .get(`http://localhost:4941/api/v1/petitions/${id}/signatures`)
        .then(({ data }) => {
          commit("setSignatures", data);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },
    getCategories({ commit }) {
      Vue.axios
        .get("http://localhost:4941/api/v1/petitions/categories")
        .then(({ data }) => {
          commit("setCategories", data);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    petitions: state => state.petitions,
    petition: state => state.petition,
    signatures: state => state.signatures,
    categories: state => state.categories
  }
});

export default store;
