<template>
  <div>
    <h2>
      Already have an account?
      <router-link to="/login">Log In</router-link>
    </h2>
    <br />
    <h1 class="title">Register</h1>
    <form @submit.prevent="register">
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

      <div class="field" for="city">
        <div class="control">
          <input class="input" type="text" placeholder="City" v-model="city" autofocus />
        </div>
      </div>

      <div class="field" for="country">
        <div class="control">
          <input class="input" type="text" placeholder="Country" v-model="country" autofocus />
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
      if (this.password != this.password_confirmation) {
        this.errors.push("Passwords do not match.");
        e.preventDefault();
      }

      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

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