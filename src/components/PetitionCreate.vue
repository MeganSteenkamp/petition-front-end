<template>
  <div>
    <h1 class="title">Start a petition</h1>
    <form @submit.prevent="createPetition">
      <div class="field" for="title">
        <label class="required">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="title" required autofocus />
        </div>
      </div>

      <div class="field" for="description">
        <label class="required">Description</label>
        <div class="control">
          <input
            class="textarea"
            type="text"
            placeholder="Description"
            v-model="description"
            required
            autofocus
          />
        </div>
      </div>

      <div class="field" for="category">
        <label class="required">Category</label>
        <div class="control">
          <div class="select">
            <select id="categories" name="dropdown" v-model="selectedCategory" required autofocus>
              <option disabled value="0">Select a category</option>
              <option
                v-for="category in categories"
                :key="category.categoryId"
                :value="category.categoryId"
              >{{category.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Closing date</label>
        <v-date-picker v-model="closingDate" type="date" />
      </div>

      <div class="hero-image">
        <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/gif" />
      </div>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Moment from "moment";

// TODO: Allow photo uploads

export default {
  data() {
    return {
      errors: [],
      title: "",
      description: "",
      selectedCategory: 0,
      closingDate: null,
      image: null
    };
  },
  mounted: function() {
    this.getCategories();
  },
  methods: {
    ...mapActions(["getCategories"]),
    validateForm: function() {
      this.errors = [];

      const today = new Date();
      const closingDate = Moment(this.closingDate).format("YYYY-MM-DD");

      if (closingDate < today) {
        this.errors.push("Closing date must be in the future.");
        return;
      }

      if (this.selectedCategory == 0) {
        this.errors.push("A category must be selected.");
        return;
      }
      return this.errors.length === 0;
    },
    createPetition: function(e) {
      e.preventDefault();

      let isValid = this.validateForm();
      console.log(isValid);
      if (!isValid) {
        return;
      }

      let data = {
        title: this.title,
        description: this.description,
        categoryId: this.selectedCategory
      };

      console.log(data);

      if (this.closingDate) {
        data.closingDate = Moment(this.closingDate).format("YYYY-MM-DD");
      }

      this.$store
        .dispatch("createPetition", data)
        .then(res => {
          let petitionId = res.data.petitionId;

          /*
          if (file) {
              // TODO FIX THIS
            console.log("in here with file")
            this.$store.dispatch("uploadHeroImage", file);
          }
          */

          this.$router.push({
            name: "petition",
            params: { petitionId: petitionId }
          });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>

<style>
.required:after {
  content: " *";
  color: red;
}
</style>