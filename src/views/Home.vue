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
      <li v-for="skill in skills">
       {{ skill.name }}
        <label class="switch-light" onclick="">
          <input :checked="user.skills.find(userSkill => userSkill.id === skill.id)" type="checkbox" @change="toggleSkill(skill)">
          <span class="alert alert-light">
            <span>Off</span>
            <span>On</span>
            <a class="btn btn-primary"></a>
          </span>
        </label>
      </li>
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
    },
    toggleSkill: function(skill) {
      if (this.user.skills.find(userSkill => userSkill.id === skill.id)) {
        var skillToDeleteIndex = (this.user.skills.findIndex(userSkills => userSkills.id === skill.id));
        this.user.skills.splice(skillToDeleteIndex, 1);
      } else {
        console.log("user skills before adding skill");
        console.log(this.user.skills);
        this.user.skills.push(skill);
        console.log("user skills after adding skill");
        console.log(this.user.skills);
      }
    }
  }
};
</script>