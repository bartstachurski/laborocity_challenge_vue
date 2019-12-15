<template>
  <div class="home">
    <!-- <p>{{ user }}</p> -->
    <ul class="content-navbar">
      <li>Skills</li>
      <li>Equipment</li>
      <li>Certifications</li>
    </ul>
    <div>
      <img src="../assets/skills_header_image_1.svg">
    </div>
    <div class="instruction">
      Here you can select your interests and experiences
    </div>
    <ul>
      <li v-for="skill in skills"> {{ skill.name }}</li>
    </ul>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      skills: []
    };
  },
  created: function() {
    axios.get("/api/users/1").then(response => {
      this.user = response.data;
    });
    axios.get("/api/skills").then(response => {
      this.skills = response.data;
    });
  },
  methods: {
    changeEmail: function() {
      this.user.email = "bartoast@gmail.com";
    }
  }
};
</script>