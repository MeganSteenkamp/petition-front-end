<template>
  <div class="login-container">
    <div class="header">
      <h1 class="title">Sign in</h1>
      <h2 class="subtitle">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </h2>
    </div>
    <br />
    <form class="login" @submit.prevent="performLogin">
      <label>Email address</label>
      <div class="field" for="email">
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="Email address"
            v-model="email"
            required
            autofocus
          />
        </div>
      </div>

      <div class="field" for="password">
        <label>Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
            required
            autofocus
          />
        </div>
      </div>

      <hr />
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <button class="button is-link" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      errors: [],
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    ...mapActions(["login"]),
    async performLogin() {
      let details = {
        email: this.email,
        password: this.password
      };
      try {
        await this.login(details);
        this.$router.push("/");
      } catch (e) {
        this.errors.push("Invalid email/password provided.");
      }
    }
  },
  watch: {
    isLoggedIn(userLoggedIn) {
      if (userLoggedIn) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  margin-right: auto;
  margin-left: auto;
  width: 500px;
}
.header {
  margin-top: 50px;
  text-align: center;
}
.control {
  max-width: 500px;
}
</style>