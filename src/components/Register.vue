<template>
  <div>
    <h2>
      Already have an account?
      <router-link to="/login">Log In</router-link>
    </h2>
    <br>
    <h1 class="title">Register</h1>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="city">City</label>
      <div>
        <input id="city" type="city" v-model="city" />
      </div>

      <label for="country">Country</label>
      <div>
        <input id="country" type="country" v-model="country" />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
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
export default {
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      city: undefined,
      country: undefined,
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register: function(e) {
      let data = {
        errors: [],
        name: this.name,
        email: this.email,
        password: this.password
      };
      if (this.city) {
        data.city = this.city;
      }
      if (this.country) {
        data.country = this.country;
      }

      if (this.password != this.password_confirmation) {
        this.errors.push("Passwords do not match.");
      }

      e.preventDefault();

      this.$store
        .dispatch("register", data)
        .then(res => {
          let email = data.email;
          let password = data.password;
          this.$store.dispatch("login", { email, password });
          this.$router.push("/");
        })
        .catch(err => {
          this.errors.push("This email address is already in use.");
        });
    }
  }
};
</script>