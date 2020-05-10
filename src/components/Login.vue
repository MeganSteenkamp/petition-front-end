<template>
  <div>
    <h2>
      Don't have an account?
      <router-link to="/register">Sign up</router-link>
    </h2>
    <br />
    <form class="login" @submit.prevent="login">
      <h1 class="title">Sign in</h1>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" placeholder="Email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" placeholder="Password" v-model="password" required />
      </div>

      <hr />
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.errors.push("Invalid email/ password provided.");
        });
    }
  }
};
</script>