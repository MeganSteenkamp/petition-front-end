import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync'
import App from './App';
import Home from './views/Home';
import Petition from './views/PetitionSingle';
import Petitions from './views/PetitionsList';
import Login from './components/Login';
import Register from './components/Register';
import store from './store';
import './../node_modules/bulma/css/bulma.css';

Vue.use(VueAxios, Axios);
Vue.use(VueRouter);

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['X-Authorization'] = token
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
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
    component: Petitions,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
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