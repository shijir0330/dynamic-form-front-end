<template>
  <div>
    <b-row>
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
            </b-form>
          </template>
          <div v-for="(component, index) in properties" v-bind:key="index">
            <div v-if="drag" class="drop-div" @drop="onDrop($event, index)" @dragenter.prevent @dragover.prevent/>
<!--            <div @dragstart="startDrag($event, component)">-->
            <div>
              <button class="float-right" @click="remove(index)">X</button>
              <create-string v-model="component.properties" :required="required" v-if="component.type === 'string'"/>
<!--              <create-number v-model="component.object" v-if="component.type === 'number'"/>-->
            </div>
          </div>
          <div v-if="drag" class="drop-div" @drop="onDrop($event, properties.length)" @dragenter.prevent
               @dragover.prevent/>
        </b-card>
        <b-card class="mt-2">
          <pre>{{ getJson | jsonFormat }}</pre>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card header="Components">
          <div v-for="item in components"
               class="component-div"
               :draggable="true"
               @dragstart="startDrag($event, item)"
               @dragend="endDrag($event, item)"
               v-on:click="add(item.type, item.properties)">
            String
          </div>
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
import CreateString from '@/components/creator/CreateString'
import CreateNumber from "@/components/creator/CreateNumber";

export default {
  name: 'DynamicFormCreator',
  components: {
    CreateString,
    CreateNumber
  },
  data() {
    return {
      schema: null,
      components: [
        {type: 'string', properties: {name: '', minLength: null, maxLength: null, required: false}}
      ],
      drag: false,

      // formColumn: 1,
      formName: '',
      properties: [],
      required: []
    }
  },
  filters: {
    jsonFormat: function(value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  computed: {
    getJson() {
      let schemaFormat = {name: this.formName, properties: {}, required: []};
      this.properties.forEach((x) => {
        const {name, required, ...others} = x.properties;
        if (required)
          schemaFormat.required.push(name);
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
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemType', item.type);
      this.drag = true;
    },
    endDrag() {
      // event.dataTransfer.dropEffect = 'move'
      // event.dataTransfer.effectAllowed = 'move'
      // event.dataTransfer.setData('itemType', item.type);
      this.drag = false;
    },
    onDrop(event, index) {
      const type = event.dataTransfer.getData('itemType')
      const item = this.components.find((item) => item.type === type);
      this.properties.splice(index, 0, {type: item.type, properties: item.properties});
      this.drag = false;
    },
    add(type, object) {
      this.properties.push({type: type, properties: object});
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
  height: 20px;
  margin-bottom: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: blue;
}
.component-div {
  background: gray;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
