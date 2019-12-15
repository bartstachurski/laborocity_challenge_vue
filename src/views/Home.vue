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
        <ul v-if="user.skills.find(userSkill => userSkill.id === skill.id)">
          <li v-for="skillSubcategory in skill.skill_subcategories">
            <input type="checkbox" :checked="user.skill_experiences.find(userSkillExperience => userSkillExperience.skill_subcategory_id === skillSubcategory.id)" @change="toggleSkillExperience(skillSubcategory)">
            {{ skillSubcategory.name }}
            <div v-if="user.skill_experiences.find(userSkillExperience => userSkillExperience.skill_subcategory_id === skillSubcategory.id)">
                <vue-slider v-model="user.skill_experiences[user.skill_experiences.findIndex(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)].years_experience"></vue-slider>
                <button v-on:click="testModel(skillSubcategory)">Test Model</button>
            </div>
          </li>
        </ul>
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
      skills: [],
      skillSubcategories: []
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
    testModel: function(skillSubcategory) {
      // console.log(this.user.skill_experiences[this.user.skill_experiences.find(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)]);
      console.log(this.user.skill_experiences[this.user.skill_experiences.findIndex(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)].years_experience);
    },
    changeEmail: function() {
      this.user.email = "bartoast@gmail.com";
    },
    toggleSkill: function(skill) {
      if (this.user.skills.find(userSkill => userSkill.id === skill.id)) {
        var skillToDeleteIndex = (this.user.skills.findIndex(userSkills => userSkills.id === skill.id));
        this.user.skills.splice(skillToDeleteIndex, 1);
      } else {
        this.user.skills.push(skill);
      }
    },
    toggleSkillExperience: function(skillSubcategory) {
      console.log(this.user.skill_experiences);
      if (this.user.skill_experiences.find(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)) {
        var skillExperienceToDeleteIndex = (this.user.skill_experiences.findIndex(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id));
        this.user.skill_experiences.splice(skillExperienceToDeleteIndex, 1);
      } else {
        this.user.skill_experiences.push({
          skill_subcategory_id: skillSubcategory.id,
          user_id: this.user.id,
          years_experience: 1
        });
        console.log(this.user);
      }
    }
  }
};
</script>