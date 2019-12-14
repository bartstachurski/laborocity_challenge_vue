<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>{{ user }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/1").then(response => {
      this.user = response.data;
    });
  },
  methods: {}
};
</script>