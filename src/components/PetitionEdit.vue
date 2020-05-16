<template>
  <div>
    <h1 class="title">Edit petition</h1>

    <table class="table">
      <tr>
        <td><strong>Title</strong></td>
        <td>{{petition.title}}</td>
        <td><button class="button is-info">Edit</button></td>
      </tr>
      <tr>
        <td><strong>Description</strong></td>
        <td>{{petition.description}}</td>
        <td><button class="button is-info">Edit</button></td>
      </tr>
      <tr>
        <td><strong>Category</strong></td>
        <td>{{petition.category}}</td>
        <td><button class="button is-info">Edit</button></td>
      </tr>
      <tr>
        <td><strong>Hero image</strong></td>
        <td><img class="image" :src="getImageUrl(petition)" /></td>
        <td><button class="button is-info">Edit</button></td>
      </tr>
    </table>
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
      title: this.title,
      description: "",
      selectedCategory: 1,
      closingDate: null,
      image: null
    };
  },
  mounted: function() {
    this.loadPetition(this.petitionId || this.$route.params.petitionId);
    this.loadCategories();
  },
  methods: {
    ...mapActions(["loadCategories", "loadPetition"]),
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
    ...mapGetters(["categories", "petition"])
  }
};
</script>

<style>
.table {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
.image {
  max-height: 200px;
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
}
.label {
  text-align: left;
}
</style>
