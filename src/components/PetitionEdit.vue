<template>
  <div v-if="loading"></div>
  <div v-else>
    <h1 class="title">Edit petition</h1>
    <form @submit.prevent="submit">
      <div class="field" for="title">
        <label class="required">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="petition.title" autofocus />
        </div>
      </div>

      <div class="field" for="description">
        <label class="required">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Description"
            v-model="petition.description"
            autofocus
          ></textarea>
        </div>
      </div>

      <div class="field" for="category">
        <label class="required">Category</label>
        <div class="control">
          <div class="select">
            <select id="categories" name="dropdown" v-model="petition.category" autofocus>
              <option
                v-for="category in categories"
                :key="category.name"
                :value="category.name"
              >{{ category.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field" for="closingDate">
        <label>Closing date</label>
        <div class="control">
          <date-picker v-model="petition.closingDate" type="date" />
        </div>
      </div>

      <div class="field" for="image">
        <label class="required">Hero image</label>
        <img class="image" :src="getImageUrl(petition)" />
        <div class="control">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            @change="bindImage"
            id="hero-image"
            autofocus
          />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>

      <div class="field">
        <ul>
          <li class="error" v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import api from "../api";

export default {
  components: { DatePicker },
  data() {
    return {
      errors: [],
      loading: true,
      title: "",
      description: "",
      selectedCategory: 1,
      image: null
    };
  },
  async mounted() {
    this.loading = true;
    await this.loadUser();
    await this.loadPetition(this.petitionId);
    await this.loadCategories();
    this.loading = false;
  },
  methods: {
    ...mapActions(["loadPetition", "loadCategories", "loadUser"]),
    getImageUrl(p) {
      return api.endpoint(`petitions/${p.petitionId}/photo`);
    },
    validateForm: function() {
      this.errors = [];

      const today = Moment();
      const closingDate = Moment(this.closingDate);

      if (closingDate < today) {
        this.errors.push("Closing date must be in the future.");
      }

      if (this.selectedCategory == 0) {
        this.errors.push("A category must be selected.");
      }

      return this.errors.length === 0;
    },
    async submit(e) {
      let isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      let data = {
        title: this.title,
        description: this.description,
        categoryId: this.selectedCategory
      };

      if (this.closingDate) {
        data.closingDate = Moment(this.closingDate).format("YYYY-MM-DD");
      }
      try {
        let petitionId = await this.createPetition(data);
        await api.uploadFile(`petitions/${petitionId}/photo`, this.image);
        await api.post(`petitions/${petitionId}/signatures`, {});
        this.$router.push(`/petition/${petitionId}`);
      } catch (e) {
        this.errors.push(e.message);
      }
    },
    bindImage() {
      this.image = event.target.files[0];
    }
  },
  computed: {
    ...mapGetters(["petition", "categories", "user"]),
    petitionId() {
      return this.$route && this.$route.params.petitionId;
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
</style>