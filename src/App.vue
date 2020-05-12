<template>
  <div class="app" id="app">
    <Nav />
    <router-view />
  </div>
</template>
<script>
import Nav from "./components/Nav.vue";
export default {
  name: "app",
  components: {
    Nav
  },
  methods: {
    created: function() {
      this.$http.interceptors.response.use(undefined, function(err) {
        return new Promise(function(resolve, reject) {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch(logout);
          }
          throw err;
        });
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
