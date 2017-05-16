<template>
  <div id="app">
    <nav class="nav">
      <router-link class="nav-link" to="/">Budget</router-link>
      <router-link class="nav-link" to="categories">Categories</router-link>
      <a class="nav-link" href="#">Expenses</a>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
  background-color: #388E3C;
  height: 50px;
  font-size: 18px;
}

.nav-link {
  color: white;
}

.nav-link:visited {
  color: white;
}

.nav-link:hover {
  color: white;
  background-color: #2E7D32;
}

.nav-link:selected {
  color: white;
}
</style>
