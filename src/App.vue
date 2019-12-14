<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-left"><img class="logo" src="../src/assets/laborocity_logo_main.png"></router-link>
      <span class="navbar-toggler-icon">
        <i class="fas fa-bars"></i>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Neuton', serif;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
}
.navbar-toggler-icon{
  color: #2C7DFA;
  font-size:25px;
}
.navbar-light .navbar-toggler-icon {
    background-image: none;
}
.logo {
  position: absolute;
  width: 154.78px;
  height: 29.3px;
  left: 25px;
  top: 15.52px;
}

</style>
