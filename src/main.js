import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/petitions/:petitionId",
    name: "petition",
    component: Petitions
  },
  {
    path: "/petitions",
    name: "petitions",
    component: Petitions
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
