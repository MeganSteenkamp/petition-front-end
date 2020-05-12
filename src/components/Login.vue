<template>
  <div>
    <h2>
      Don't have an account?
      <router-link to="/register">Sign up</router-link>
    </h2>
    <br />
    <form class="login" @submit.prevent="performLogin">
      <h1 class="title">Sign in</h1>

      <div class="field" for="email">
        <div class="control">
          <input class="input" type="email" placeholder="Email address" v-model="email" required autofocus/>
        </div>
      </div>

      <div class="field" for="password">
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="password" required autofocus/>
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
  methods: {
    ...mapActions(["login"]),
    async performLogin() {
      let details = {
        email: this.email,
        password: this.password
      };
      await this.login(details);
      this.$router.push("/");
    }
  }
};
</script>