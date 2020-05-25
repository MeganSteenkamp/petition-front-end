<template>
  <div class="petition-container">
    <div class="header">
      <h1 class="title">Start a petition</h1>
    </div>
    <form @submit.prevent="submit">
      <div class="field" for="title">
        <label class="required">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="title" required autofocus />
        </div>
      </div>

      <div class="field" for="description">
        <label class="required">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Description"
            v-model="description"
            required
            autofocus
          ></textarea>
        </div>
      </div>

      <div class="field" for="category">
        <label class="required">Category</label>
        <div class="control">
          <div class="select">
            <select id="categories" name="dropdown" v-model="selectedCategory" required autofocus>
              <option
                v-for="category in categories"
                :key="category.categoryId"
                :value="category.categoryId"
              >{{ category.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field" for="closingDate">
        <label>Closing date</label>
        <div class="control">
          <date-picker v-model="closingDate" type="date" />
        </div>
      </div>

      <div class="field" for="image">
        <label class="required">Hero image</label>
        <div class="control">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            @change="bindImage"
            id="hero-image"
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
        <li class="error" v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <router-link to="/petitions" class="button is-link is-light">Cancel</router-link>
        </div>
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
      title: "",
      description: "",
      selectedCategory: 1,
      closingDate: null,
      image: null
    };
  },
  async mounted() {
    await this.loadCategories();
  },
  methods: {
    ...mapActions(["loadCategories", "createPetition"]),
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
    ...mapGetters(["categories", "petition"])
  }
};
</script>

<style>
.petition-container {
  margin-right: auto;
  margin-left: auto;
  width: 500px;
}
.header {
  margin-top: 50px;
  text-align: center;
}
.required:after {
  content: " *";
  color: red;
}
.error {
  border: 1px solid red;
  color: red;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 15px;
}
.label {
  text-align: left;
}
</style>
