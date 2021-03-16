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
            String
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="8">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name</label>
              <!--              <b-form-group label="Form Name" class="mr-2">-->
              <b-form-input v-model="formName" class="mr-2"/>
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
              <!--            <div v-if="drag" class="drop-div"-->
              <!--                 @drop="onDrop($event, index)"-->
              <!--                 @dragenter.prevent-->
              <!--                 @dragover.prevent/>-->
              <div :draggable="!editing" class="property-div"
                   @dragstart="startDragPosition($event, index)"
                   @drop="onDrop($event, index)"
                   @dragenter.prevent="dragEnter($event)"
                   @dragleave.prevent="dragLeave($event)"
                   @dragover.prevent>
                <button v-if="!editing" class="button-x" @click="remove(index)">x</button>
                <create-components :item="item" :editing="editing"/>
              </div>
            </b-col>
          </b-row>
          <div v-if="drag" class="drop-div" @drop="onDrop($event, properties.length)"
               @dragenter.prevent="dragEnter($event)"
               @dragleave.prevent="dragLeave($event)"
               @dragover.prevent/>
        </b-card>
        {{ properties }}
      </b-col>
      <b-col cols="4">
        <b-card header="JSON">
          <pre>{{ getJson | jsonFormat }}</pre>
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

import CreateComponents from "@/components/creator/CreateComponents";

export default {
  name: 'DynamicFormCreator',
  components: {CreateComponents},
  data() {
    return {
      schema: null,
      components: [
        {
          type: 'string',
          edit: false,
          properties: {name: '', label: '', columns: '12'}
        },
      ],
      drag: false,
      editing: false,

      formName: '',
      properties: [],
      required: []
    }
  },
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
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
      // return 'sss';
    }
  },
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemType', item.type);
      this.drag = true;
    },
    endDrag() {
      this.drag = false;
    },
    add(item) {
      const {type, edit, properties: {columns, name, label, ...properties}} = item;
      this.properties.push({
        type: type,
        edit: edit,
        properties: {
          name: name ? name : type + this.properties.length,
          label: label ? label : type + this.properties.length,
          columns: columns,
          ...properties
        },
        // properties: properties
      });
    },
    startDragPosition(event, index) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemIndex', index);
    },
    onDrop(event, index) {
      event.target.style.background = "";
      if (this.drag) {
        const _type = event.dataTransfer.getData('itemType')
        const {type, edit, properties: {columns, name, label, ...properties}} = this.components.find((item) => item.type === _type);
        this.properties.splice(index, 0, {
          type: type,
          edit: edit,
          properties: {
            name: name ? name : type + this.properties.length,
            label: label ? label : type + this.properties.length,
            columns: columns,
            ...properties
          },
        });
        this.drag = false;
      } else {
        const _index = event.dataTransfer.getData('itemIndex')
        const {type, edit, properties} = this.properties[_index];
        this.properties.splice(_index, 1);
        this.properties.splice(index, 0, {type: type, edit: edit, properties: properties});
      }
    },
    dragEnter(event) {
      event.target.style.background = "lightgray";
    },
    dragLeave(event) {
      event.target.style.background = "";
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
