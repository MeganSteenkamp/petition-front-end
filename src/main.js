import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync'
import App from './App';
import Home from './views/Home';
import Petition from './views/PetitionSingle';
import Petitions from './views/PetitionsList';
import Login from './Login';
import Register from './Register';
import store from './store';
import './../node_modules/bulma/css/bulma.css';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/petition/:petitionId",
    name: "petition",
    component: Petition
  },
  {
    path: "/petitions",
    name: "petitions",
    component: Petitions
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkActiveClass: 'is-active'
});

sync(store, router)

const start = () => {
  App.router = router;
  App.store = store;
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
}
start()