<template>
  <div>
    <b-row>
      <b-col>
        <b-card header="Components">
          <div v-for="item in components"
               class="component-div"
               draggable="true"
               @dragstart="startDrag($event, item)"
               @dragend="endDrag($event, item)"
               v-on:click="add(item)">
            {{ item.type }}
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name</label>
              <!--              <b-form-group label="Form Name" class="mr-2">-->
              <b-form-input v-model="schema.formName" class="mr-2"/>
              <!--              </b-form-group>-->
              <!--              <label class="mr-2">Column number</label>-->
              <!--              <b-form-group label="Column number" class="mr-2">-->
              <!--                <b-form-input v-model="formColumn" type="number"></b-form-input>-->
              <!--              </b-form-group>-->
              <button @click.prevent="editing = !editing">EDITING</button>
            </b-form>
          </template>
          <b-row>
            <b-col v-for="(item, index) in properties"
                   v-bind:key="index" :cols="!editing ? item.properties.columns : 12">
              <div class="drop-div" v-if="drag"
                   @drop="onDrop($event, index)"
                   @dragenter.prevent="dragEnter($event)"
                   @dragleave.prevent="dragLeave($event)"
                   @dragover.prevent/>

              <div :draggable="!editing" class="property-div"
                   @dragstart="startDragPosition($event, index)">
<!--                   @drop="onDrop($event, index)"-->
<!--                   @dragenter.prevent="dragEnter($event)"-->
<!--                   @dragleave.prevent="dragLeave($event)"-->
<!--                   @dragover.prevent>-->
                <button v-if="!editing" class="button-x" @click="remove(index)">x</button>
                <create-components :item="item" :editing="editing" :drag="drag"/>
              </div>
            </b-col>
          </b-row>
          <div v-if="drag" class="drop-div" @drop="onDrop($event, properties.length)"
               @dragenter.prevent="dragEnter($event)"
               @dragleave.prevent="dragLeave($event)"
               @dragover.prevent/>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON">
          <pre>{{ properties | jsonFormat }}</pre>
        </b-card>
      </b-col>
    </b-row>
    <!--    <b-row class="mt-2">-->
    <!--      <b-col>-->
    <!--        <b-button v-on:click="createJson()">Create Json</b-button>-->
    <!--        <b-card>-->
    <!--          <pre>{{ getJson | jsonFormat }}</pre>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
  </div>
</template>

<script>
import {dragDropMixin} from "@/mixins/drag-drop-mixin";
import CreateComponents from "@/components/creator/CreateComponents";

export default {
  name: 'DynamicFormCreator',
  mixins: [dragDropMixin],
  components: {CreateComponents},
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
.drop-div {
  height: 40px;
  /*margin-bottom: 10px;*/
  border-width: 2px;
  border-style: dashed;
  border-color: black;
}

.component-div {
  cursor: pointer;
  background: gray;
  color: white;
  text-align: center;
  padding: 10px;
  width: 150px;
  float: left;
  margin-right: 10px;
}

.button-x {
  float: right;
}

.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  margin: 10px 0;
}
</style>
