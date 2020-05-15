import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import VueAxios from "vue-axios";
import { sync } from "vuex-router-sync";
import App from "./App";
import Home from "./views/Home";
import Petition from "./views/PetitionSingle";
import Petitions from "./views/PetitionsList";
import MyPetitions from "./views/MyPetitions";
import PetitionCreate from "./components/PetitionCreate";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import babelPolyfill from "babel-polyfill";
import "./../node_modules/bulma/css/bulma.css";

Vue.use(VueAxios, Axios);
Vue.use(VueRouter);

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["X-Authorization"] = token;
}

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
    path: "/my-petitions",
    name: "my-petitions",
    component: MyPetitions
  },
  {
    path: "/start-a-petition",
    name: "petition-create",
    component: PetitionCreate
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
  }
];

const router = new VueRouter({
  routes: routes,
  mode: "history",
  linkActiveClass: "is-active"
});

sync(store, router);

const start = () => {
  App.router = router;
  App.store = store;
  new Vue({
    el: "#app",
    template: "<App/>",
    components: { App }
  });
};
start();
