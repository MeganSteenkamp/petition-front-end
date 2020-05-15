<template>
  <div>
    <h2>
      Already have an account?
      <router-link to="/login">Log In</router-link>
    </h2>
    <br />
    <h1 class="title">Register</h1>
    <form @submit.prevent="submit">
      <div class="field" for="name">
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="name" required autofocus />
        </div>
      </div>

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

      <div class="field" for="password_confirmation">
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Confirm Password"
            v-model="password_confirmation"
            required
            autofocus
          />
        </div>
      </div>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      <div>
        <button type="submit">Register</button>
      </div>
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
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    ...mapActions(["register", "login"]),
    validateForm() {
      this.errors = [];

      if (this.password !== this.password_confirmation) {
        this.errors.push("Passwords do not match.");
        return;
      }

      return this.errors.length === 0;
    },
    async submit(e) {
      let isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      let user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        await this.register(user);
        await this.login(user);
        this.$router.push("/");
      } catch (e) {
        this.errors.push(e.message);
      }
    }
  }
};
</script>
