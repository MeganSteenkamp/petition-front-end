<template>
  <div class="category-card">
    <div class="dot">
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
.dot {
  height: 250px;
  width: 250px;
  background-color: #ff3860;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
</style>