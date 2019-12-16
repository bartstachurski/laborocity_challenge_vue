<template>
  
  <div class="home">
    <div class="container">
      <div class="row d-flex justify-content-around">
        <div class="col" id="skills" v-on:click="setView('skills')">Skills</div>
        <div class="col" id="equipment" v-on:click="setView('equipment')">Equipment</div>
        <div class="col" id="Certifications" v-on:click="setView('certifications')">Certifications</div>
      </div>

      <div v-if="view === 'skills'">
        <div class="row d-flex justify-content-around">
          <img src="../assets/skills_header_image_1.svg">
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col">
            <div class="instruction">
              Here you can select your interests and experiences
            </div>
          </div>
        </div>
        
        <div v-for="skill in skills" class="skillMenuItem">
          <div class="row d-flex justify-content-start">
            <div class="col-9">
              {{ skill.name }}
            </div>
            <div class="col-3">
              <label class="switch-light" onclick="">
              <input :checked="user.skills.find(userSkill => userSkill.id === skill.id)" type="checkbox" @change="toggleSkill(skill)">
              <span class="alert alert-light">
                <span>No</span>
                <span>Yes</span>
                <a class="btn btn-primary"></a>
              </span>
              </label>
            </div>
          </div>
          <div v-if="user.skills.find(userSkill => userSkill.id === skill.id)">
            <div v-for="skillSubcategory in skill.skill_subcategories">
              <div class="row">
                <div class="col-1">
                  <input type="checkbox" :checked="user.skill_experiences.find(userSkillExperience => userSkillExperience.skill_subcategory_id === skillSubcategory.id)" @change="toggleSkillExperience(skillSubcategory)">
                </div>
                <div class="col-3">
                  {{ skillSubcategory.name }}
                </div>
                <div class="col-6 experienceHeading text-right">
                  My Experience:
                </div>
                <div class="col-2 experienceYears text-left" v-if="user.skill_experiences.find(userSkillExperience => userSkillExperience.skill_subcategory_id === skillSubcategory.id)">
                  <!-- 5 Years -->
                  {{ user.skill_experiences[user.skill_experiences.findIndex(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)].years_experience }} Years
                </div>
              </div>
              <div class="row" v-if="user.skill_experiences.find(userSkillExperience => userSkillExperience.skill_subcategory_id === skillSubcategory.id)">
                <div class="col-12">
                  <vue-slider v-bind="vueSliderOptions" v-model="user.skill_experiences[user.skill_experiences.findIndex(skillExperience => skillExperience.skill_subcategory_id === skillSubcategory.id)].years_experience">
                    <template v-slot:dot>
                      <img class ="sliderSquare" src="../assets/slider_square.png">
                    </template>
                  </vue-slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="view === 'equipment'">
        <div>Hello from the equipment page</div>
      </div>

    </div>
  </div>
</template>

<style>
.sliderSquare {
  height: 20px;
  width: 27px;
}
.skillMenuItem {
  min-height: 47px;
  left: 15px;
}
.container {
  align-content: center;
}
.experienceHeading {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: #787878;
}
.experienceYears {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #787878;
}

</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      view: 'skills',
      user: {},
      skills: [],
      skillSubcategories: [],
      vueSliderOptions: {
        min: 0,
        max: 10
      }
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
    setView: function(view) {
      console.log(view);
      this.view = view;
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