<template>
  <div class="categories">
    <h2 class="subtitle is-3">Browse categories</h2>
    <div class="columns is-multiline">
      <div
        v-for="category in categories"
        :category="category"
        :key="category.categoryId"
        class="column is-one-third"
      >
        <router-link :to="'/petitions'">
          <CategoryCard :category="category" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from "./CategoryCard";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoriesList",
  components: {
    CategoryCard
  },
  mounted: function() {
    this.getCategories();
  },
  methods: {
    ...mapActions(["getCategories"])
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>
<style lang="scss" scoped>
.categories {
  margin-top: 100px;
  text-align: center;
}
</style>