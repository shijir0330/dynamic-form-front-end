<template>
  <div>
    <b-row>
      <b-col>
        <b-form inline>
          <label class="mr-sm-2">Properties</label>
          <b-form-select v-model="properties" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select-option value="array">array</b-form-select-option>
            <b-form-select-option value="object">object</b-form-select-option>
          </b-form-select>
          <label class="mr-sm-2">Required</label>
          <b-form-select v-model="required" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select-option value="array">array</b-form-select-option>
            <b-form-select-option value="object">object</b-form-select-option>
          </b-form-select>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <properties-editor v-model="schema" :properties="properties" :required="required"/>
      </b-col>
    </b-row>
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
      properties: 'array',
      required: 'array',
      schema: {
        name: '',
        properties: [],
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
