<template>
  <div class="categories">
    <div class="columns is-multiline">
      <div
        v-for="category in categories.slice(0,6)"
        :category="category"
        :key="category.categoryId"
        class="column is-one-third"
      >
        <router-link :to="{name: 'petitions', query: {category: category.name}}">
          <CategoryCard :category="category" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Remove hard coding of category

import CategoryCard from "./CategoryCard";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoriesList",
  components: {
    CategoryCard
  },
  data() {
    return {
      selectedCategory: ""
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    ...mapActions(["loadCategories"])
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>
<style lang="scss" scoped>
.categories {
  margin-top: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>