<template>
  <div>
    <!--    <b-row>-->
    <!--      <b-col>-->
    <!--        <b-card header="Components">-->
    <!--          <div v-for="item in components"-->
    <!--               class="component-div"-->
    <!--               draggable="true"-->
    <!--               @dragstart="startDrag($event, item)"-->
    <!--               @dragend="endDrag($event, item)"-->
    <!--               v-on:click="add(item)">-->
    <!--            {{ item.type }}-->
    <!--          </div>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
    <!--    <b-row class="mt-2">-->
    <!--      <b-col cols="7">-->
    <!--        <b-card header-class="">-->
    <!--          <template #header>-->
    <!--            <b-form inline>-->
    <!--              <label class="mr-2">Form Name</label>-->
    <!--              &lt;!&ndash;              <b-form-group label="Form Name" class="mr-2">&ndash;&gt;-->
    <!--              <b-form-input v-model="schema.formName" class="mr-2"/>-->
    <!--              &lt;!&ndash;              </b-form-group>&ndash;&gt;-->
    <!--              &lt;!&ndash;              <label class="mr-2">Column number</label>&ndash;&gt;-->
    <!--              &lt;!&ndash;              <b-form-group label="Column number" class="mr-2">&ndash;&gt;-->
    <!--              &lt;!&ndash;                <b-form-input v-model="formColumn" type="number"></b-form-input>&ndash;&gt;-->
    <!--              &lt;!&ndash;              </b-form-group>&ndash;&gt;-->
    <!--              <button @click.prevent="editing = !editing">EDITING</button>-->
    <!--            </b-form>-->
    <!--          </template>-->
    <!--          <b-row>-->
    <!--            <b-col v-for="(item, index) in schema.properties"-->
    <!--                   v-bind:key="index" :cols="!editing ? item.properties.columns : 12">-->
    <!--              <div class="drop-div" v-if="drag"-->
    <!--                   @drop="onDrop($event, index)"-->
    <!--                   @dragenter.prevent="dragEnter($event)"-->
    <!--                   @dragleave.prevent="dragLeave($event)"-->
    <!--                   @dragover.prevent/>-->

    <!--              <div :draggable="!editing" class="property-div"-->
    <!--                   @dragstart="startDragPosition($event, index)">-->
    <!--&lt;!&ndash;                   @drop="onDrop($event, index)"&ndash;&gt;-->
    <!--&lt;!&ndash;                   @dragenter.prevent="dragEnter($event)"&ndash;&gt;-->
    <!--&lt;!&ndash;                   @dragleave.prevent="dragLeave($event)"&ndash;&gt;-->
    <!--&lt;!&ndash;                   @dragover.prevent>&ndash;&gt;-->
    <!--                <button v-if="!editing" class="button-x" @click="remove(index)">x</button>-->
    <!--                <create-components :item="item" :editing="editing" :drag="drag"/>-->
    <!--              </div>-->
    <!--            </b-col>-->
    <!--          </b-row>-->
    <!--          <div v-if="drag" class="drop-div" @drop="onDrop($event, properties.length)"-->
    <!--               @dragenter.prevent="dragEnter($event)"-->
    <!--               @dragleave.prevent="dragLeave($event)"-->
    <!--               @dragover.prevent/>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--      <b-col cols="5">-->
    <!--        <b-card header="JSON">-->
    <!--          <pre>{{ properties | jsonFormat }}</pre>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
    <!--    <b-row class="mt-2">-->
    <!--      <b-col>-->
    <!--        <b-button v-on:click="createJson()">Create Json</b-button>-->
    <!--        <b-card>-->
    <!--          <pre>{{ getJson | jsonFormat }}</pre>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
    <div class="tab">
      <button class="tablinks" @click="openCity($event, 'Editor')">Editor</button>
      <button class="tablinks" @click="openCity($event, 'Position')">Position</button>
      <button class="tablinks" @click="openCity($event, 'Preview')">Preview</button>
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
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
    </div>
  </div>
</template>

<script>
import {dragDropMixin} from "@/mixins/drag-drop-mixin";
import CreateComponents from "@/components/creator/CreateComponents";

import PropertiesEditor from "@/components/creator/PropertiesEditor";
import PropertiesPosition from "@/components/creator/PropertiesPosition";

export default {
  name: 'DynamicFormCreator',
  mixins: [dragDropMixin],
  components: {PropertiesPosition, CreateComponents, PropertiesEditor},
  data() {
    return {
      schema: {
        formName: '',
        properties: [],
        required: []
      },
      drag: false,
      editing: false,
    }
  },
  computed: {
    getJson() {
      let schemaFormat = {name: this.formName, properties: {}, required: []};
      this.properties.forEach((x) => {
        const {name, required, ...others} = x.properties;
        if (required) schemaFormat.required.push(name);
        const objectArray = Object.entries(others);
        const object = {};
        objectArray.forEach(([key, value]) => {
          if (value) object[key] = value
        });
        schemaFormat.required = [...new Set(schemaFormat.required)];
        schemaFormat.properties[name] = {type: x.type, ...object};
      })
      return schemaFormat;
    }
  },
  methods: {
    openCity(evt, cityName) {
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
      evt.currentTarget.className += " active";
    },
    add(item) {
      const {type, properties: {columns, name, label, ...other}} = item;
      this.properties.push({
        type: type,
        edit: false,
        properties: {
          name: name ? name : type + this.properties.length,
          label: label ? label : type + this.properties.length,
          columns: columns,
          ...other
        },
      });
    },
    remove(index) {
      this.properties.splice(index, 1);
    },
    // createJson() {
    //   this.schema = null;
    //   let schemaFormat = {name: this.formName, properties: {}, required: []};
    //   this.properties.forEach((x) => {
    //     const {name, required, ...others} = x.properties;
    //     if (required)
    //       schemaFormat.required.push(name);
    //     const objectArray = Object.entries(others);
    //     const object = {};
    //     objectArray.forEach(([key, value]) => {
    //       if (value) object[key] = value
    //     });
    //     schemaFormat.properties[name] = {type: x.type, ...object};
    //   })
    //   this.schema = schemaFormat;
    // }
  }
}
</script>

<style scoped>
body {
  font-family: Arial;
}

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
