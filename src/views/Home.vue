<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">A platform for change</h1>
          <h2 class="subtitle">Join us to take action</h2>
          <router-link to="/register">
            <div class="button-block">
              <button class="button is-xl is-dark">Sign Up to Sign a Petition</button>
            </div>
          </router-link>
        </div>
      </div>
    </section>
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
  background-image: url("./../assets/banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
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