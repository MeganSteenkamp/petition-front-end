<template>
  <div>
    <h2>
      Already have an account?
      <router-link to="/login">Login in </router-link>
    </h2>
    <h4>Register</h4>
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
        <input id="city" type="city" v-model="city" required />
      </div>

      <label for="country">Country</label>
      <div>
        <input id="country" type="country" v-model="country" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

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
      name: "",
      email: "",
      city: null,
      country: null,
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        city: this.city,
        country: this.country,
        password: this.password
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>