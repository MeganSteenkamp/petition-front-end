<template>
  <div class="register-container">
    <div class="header">
      <h1 class="title">Register</h1>
      <h2 class="subtitle">
        Already have an account?
        <router-link to="/login">Log In</router-link>
      </h2>
    </div>
    <br />
    <form @submit.prevent="submit">
      <div class="field" for="name">
        <label class="required">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="name" required autofocus />
        </div>
      </div>

      <div class="field" for="email">
        <label class="required">Email address</label>
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

      <div class="field" for="city">
        <label>City</label>
        <div class="control">
          <input class="input" type="text" placeholder="City" v-model="city" autofocus />
        </div>
      </div>

      <div class="field" for="country">
        <label>Country</label>
        <div class="control">
          <input class="input" type="text" placeholder="Country" v-model="country" autofocus />
        </div>
      </div>

      <div class="field" for="image">
        <label>Profile picture</label>
        <div class="control">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            @change="bindImage"
            id="profile-picture"
            autofocus
          />
        </div>
      </div>

      <div class="field" for="password">
        <label class="required">Password</label>
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

      <div class="field" for="passwordConfirmation">
        <label class="required">Confirm password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Confirm Password"
            v-model="passwordConfirmation"
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

      <div>
        <button class="button is-link" type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "../api";

export default {
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      city: null,
      country: null,
      password: "",
      passwordConfirmation: "",
      image: null
    };
  },
  methods: {
    ...mapActions(["register", "login"]),
    bindImage() {
      this.image = event.target.files[0];
    },
    validateForm() {
      this.errors = [];

      if (this.password !== this.passwordConfirmation) {
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

      if (this.city) {
        user.city = this.city;
      }

      if (this.country) {
        user.country = this.country;
      }

      try {
        let userId = await this.register(user);
        await this.login(user);
        await api.uploadFile(`users/${userId}/photo`, this.image);
        this.$router.push("/");
      } catch (e) {
        this.errors.push("Email is already in use");
      }
    }
  }
};
</script>

<style>
.required:after {
  content: " *";
  color: red;
}
.error {
  border: 1px solid red;
  color: red;
  border-radius: 5px;
  padding: 5px;
}
.label {
  text-align: left;
}
.register-container {
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