<template>
  <div v-if="loading"></div>
  <div v-else>
    <h1 class="title">Update profile</h1>
    <form @submit.prevent="submit">
      <div class="field" for="name">
        <label>Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="user.name" />
        </div>
      </div>

      <div class="field" for="email">
        <label>Email address</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email address" v-model="user.email" />
        </div>
      </div>

      <div class="field" for="city">
        <label>City</label>
        <div class="control">
          <input class="input" type="text" placeholder="City" v-model="user.city" />
        </div>
      </div>

      <div class="field" for="country">
        <label>Country</label>
        <div class="control">
          <input class="input" type="text" placeholder="Country" v-model="user.country" />
        </div>
      </div>

      <div class="field" for="image">
        <label>Profile picture</label>
        <img
          class="image"
          :src="getImageUrl()"
          onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'"
        />
        <div class="control">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            @change="bindImage"
            id="profile-picture"
          />
        </div>
      </div>

      <div>
        <button type="button" class="button is-link" @click="showPasswordUpdate()">Update password</button>
      </div>

      <div v-if="!!this.editingPassword" class="field" for="password">
        <label>Current password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="currentPassword" />
        </div>
      </div>

      <div v-if="!!this.editingPassword" class="field" for="password">
        <label>New password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="newPassword" />
        </div>
      </div>

      <div v-if="!!this.editingPassword" class="field" for="password_confirmation">
        <label>Confirm new password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
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
        <button class="button is-link" type="submit">Submit</button>
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
      loading: true,
      image: null,
      originalEmail: "",
      editingPassword: false,
      emailChanged: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  async mounted() {
    this.loading = true;
    await this.loadUser();
    this.originalEmail = this.user.email;
    this.loading = false;
  },
  methods: {
    ...mapActions(["loadUser", "updateUser"]),
    showPasswordUpdate() {
      this.editingPassword = !this.editingPassword;
    },
    getImageUrl() {
      const userId = api.getUserId();
      return api.endpoint(`users/${userId}/photo`);
    },
    bindImage() {
      this.image = event.target.files[0];
    },
    validateForm() {
      this.errors = [];

      if (this.newPassword !== this.confirmPassword) {
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

      let data = {
        name: this.user.name
      };

      if (this.user.email != this.originalEmail) {
        data.email = this.user.email;
      }

      if (this.user.city) {
        data.city = this.user.city;
      }

      if (this.user.country) {
        data.country = this.user.country;
      }

      console.log(data);

      try {
        await this.updateUser(data);
        if (!!this.image) {
          await api.uploadFile(`users/${userId}/photo`, this.image);
        }
        this.$router.push("/account");
      } catch (e) {
        this.errors.push(e);
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style>
.image {
  max-height: 200px;
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
.button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>