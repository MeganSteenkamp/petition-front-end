<template>
  <div class="category-card">
    <div class="card">
      <h2 class="title is-size-4 has-text-weight-bold">{{ category.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"]
};
</script>

<style lang="scss" scoped>
.card {
  height: 200px;
  background-color:hsl(0, 0%, 86%);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  text-shadow: 1px 1px 1x rgba(0, 0, 0, 0.7);
  color:white;
  justify-content: center;
  align-self: center;
}
</style>