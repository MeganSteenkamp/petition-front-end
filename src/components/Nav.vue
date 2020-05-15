<template>
  <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand .is-$primary">
      <a class="navbar-item" href="/">
        <strong class="is-size-3">Petition</strong>
      </a>
    </div>
    <div id="navbar-main" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/petitions" class="navbar-item">Browse</router-link>
        <router-link to="/start-a-petition" class="navbar-item" v-if="this.user">Start a petition</router-link>
      </div>
      <div class="navbar-end">
        <router-link
          v-if="this.user"
          :to="{ name: 'my-petitions' }"
          class="navbar-item"
        >My petitions</router-link>
        <router-link v-if="this.user" to="/account" class="navbar-item">Account</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <span v-if="this.user">
              <a class="button is-dark" @click="signOut">
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
  mounted: function() {
    this.loadUser();
  },
  methods: {
    ...mapActions(["loadUser", "logout"]),
    async signOut() {
      await this.logout();
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};

</script>
<style lang="scss" scoped>
@import "./../../node_modules/bulma/css/bulma.css";
a {
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: hsl(171, 100%, 41%);
  }
}
</style>
