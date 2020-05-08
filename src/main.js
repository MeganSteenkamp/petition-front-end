import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync'
import App from './App';
import Home from './Home';
import Petition from './Petition';
import Petitions from './Petitions';
import store from './store';

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
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
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