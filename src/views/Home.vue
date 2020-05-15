<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">A platform for change</h1>
          <h2 class="subtitle">Join us and take action today</h2>
        </div>
      </div>
    </section>
    <h2 class="category-subtitle">Browse categories</h2>
    <CategoriesList />
  </div>
</template>

<script>
import CategoriesList from "../components/CategoriesList";
export default {
  name: "home",
  components: {
    CategoriesList
  }
};
</script>
<style lang="scss" scoped>
.hero {
  text-align: center;
  border-radius: 25px;
  background-color: hsl(171, 100%, 41%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 60px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.category-subtitle {
  padding-top: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #2c3e50;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
}
.is-xl {
  font-size: 1.7rem;
}
</style>