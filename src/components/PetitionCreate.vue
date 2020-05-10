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
            <select id="categories" name="dropdown" required autofocus>
              <option value="0" selected>Select dropdown</option>
              <option value="1">Animals</option>
              <option value="2">Environment</option>
              <option value="3">Entertainment</option>
              <option value="4">Human rights</option>
              <option value="5">Immigration</option>
              <option value="6">Justice</option>
              <option value="7">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Closing date</label>
        <v-date-picker v-model="closingDate" type="date" />
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
import Moment from "moment";

// TODO: Allow photo uploads
// TODO: Prevent submission when checks are not valid
// TODO: Iterate to get categories

export default {
  data() {
    return {
      errors: [],
      title: "",
      description: "",
      closingDate: null
    };
  },
  methods: {
    createPetition: function(e) {
      const today = new Date();
      const closingDate = Moment(this.closingDate).format("YYYY-MM-DD");

      var category = document.getElementById("categories");
      var categoryId = parseInt(category.options[category.selectedIndex].value);

      let data = {
        title: this.title,
        description: this.description,
        categoryId: categoryId
      };

      if (closingDate) {
        data.closingDate = closingDate;
      }

      if (data.closingDate < today) {
        this.errors.push("Closing date must be in the future.");
      }

      if (data.categoryId == 0) {
        this.errors.push("A category must be selected.");
      }

      e.preventDefault();

      this.$store
        .dispatch("createPetition", data)
        .then(res => {
          let petitionId = res.data.petitionId;
          this.$router.push({
            name: "petition",
            params: { petitionId: petitionId }
          });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  }
};
</script>

<style>
  .required:after {
    content:" *";
    color: red;
  }
</style>