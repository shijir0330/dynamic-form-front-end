<template>
  <div>
    <div class="tab">
      <button class="tablinks" @click="changeTap($event, 'Editor')">Editor</button>
      <button class="tablinks" @click="changeTap($event, 'Position')">Position</button>
      <button class="tablinks" @click="changeTap($event, 'Preview')">Preview</button>
    </div>

    <div id="Editor" class="tabcontent">
      <h3>Editor</h3>
      <properties-editor v-model="schema"/>
    </div>

    <div id="Position" class="tabcontent">
      <h3>Position</h3>
      <properties-position v-model="schema"/>
    </div>

    <div id="Preview" class="tabcontent">
      <h3>Preview</h3>
      <p>Preview of form.</p>
    </div>
  </div>
</template>

<script>

import PropertiesEditor from "@/components/creator/PropertiesEditor";
import PropertiesPosition from "@/components/creator/PropertiesPosition";

export default {
  name: 'DynamicFormCreator',
  components: {PropertiesPosition, PropertiesEditor},
  data() {
    return {
      schema: {
        formName: '',
        properties: [],
        required: []
      }
    }
  },
  methods: {
    changeTap(event, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      event.currentTarget.className += " active";
    }
  }
}
</script>

<style scoped>
/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
