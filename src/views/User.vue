<template>
  <div>
    <div v-if="loading"></div>
    <div v-else class="user-profile">
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <img
              class="container__image"
              :src="getImageUrl()"
              onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'"
            />
            <div class="container__text">
              <h1 class="title">{{ user.name }}</h1>
              <p v-if="!!user.city" class="is-size-8">
                <strong>City:</strong>
                {{ user.city }}
              </p>
              <p v-if="!!user.country" class="is-size-8">
                <strong>Country:</strong>
                {{ user.country }}
              </p>
              <p class="is-size-8">
                <strong>Email:</strong>
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div class="columns">
        <div class="column is-two-thirds"></div>
        <div class="column is-one-third">
          <router-link :to="{name: 'edit-account'}">
            <button class="button is-info is-light is-medium is-fullwidth">Edit account</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "./../api";

export default {
  data() {
    return {
      loading: true
    };
  },
  async mounted() {
    this.loading = true;
    await this.loadUser();
    this.loading = false;
  },
  methods: {
    ...mapActions(["loadUser"]),
    getImageUrl() {
      const userId = api.getUserId();
      return api.endpoint(`users/${userId}/photo`);
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss" scoped>
.hero {
  margin-bottom: 30px;
  border-radius: 5px;
}
.title {
  line-height: 40px;
}
.container {
  &__image {
    max-height: 300px;
    max-width: 500px;
    float: right;
  }
  &__text {
    display: inline;
  }
}
.image {
  margin-top: 50px;
}
.button {
  margin-right: 10px;
  float: right;
}
</style>