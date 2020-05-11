<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand .is-$primary">
      <a class="navbar-item" href="/">
        <strong class="is-size-4">Petition</strong>
      </a>
    </div>
    <div id="navbar-main" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/petitions" class="navbar-item">Browse</router-link>
        <router-link to="/start-a-petition" class="navbar-item">Start a petition</router-link>
      </div>
      <div class="navbar-end">
        <router-link
          v-if="isLoggedIn"
          :to="{name: 'my-petitions', query: {author: this.user}}"
          class="navbar-item"
        >My petitions</router-link>
        <router-link v-if="isLoggedIn" to="/account" class="navbar-item">Account</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <span v-if="isLoggedIn">
              <a class="button is-dark" @click="logout">
                <strong>Logout</strong>
              </a>
            </span>
            <span v-else>
              <router-link to="/login">
                <a class="button is-danger">
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
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Nav",
  mounted: function() {
    this.getUser();
    console.log(user);
  },
  methods: {
    ...mapActions(["getUser"]),
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    ...mapGetters(["user"])
  },
};
</script>
<style lang="scss" scoped>
@import "./../../node_modules/bulma/css/bulma.css";
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: hsl(171, 100%, 41%);
    }
  }
}
</style>