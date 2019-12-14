<template>
  <div class="home">
    <!-- <h1>{{ user }}</h1> -->
    <!-- <button v-on:click="changeEmail">Click me to change user.name to Bartoast</button> -->
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/1").then(response => {
      this.user = response.data;
    });
  },
  methods: {
    changeEmail: function() {
      this.user.email = "bartoast@gmail.com";
    }
  }
};
</script>