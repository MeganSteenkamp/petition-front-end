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
    <div class="category">
      <CategoriesList />
    </div>
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
  border-radius: 5px;
  background-image: url("./../assets/hero-image.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 80px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.category-subtitle {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  padding-top: 70px;
  text-align: center;
  font-size: 30px;
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