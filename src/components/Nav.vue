<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong class="is-size-4">Petition</strong>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar-main" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/petitions" class="navbar-item">Browse</router-link>
        <router-link to="/start-a-petition" class="navbar-item">Start a petition</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
          <span v-if="isLoggedIn" >
          <a class="button is-dark" @click="logout">
            <strong>Logout</strong>
          </a>
          </span>
          <span v-else>
          <router-link to="/login">
              <a class="button is-dark">
                <strong>Sign In</strong>
              </a>
            </router-link>
          </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #d88d00;
    }
  }
}
</style>