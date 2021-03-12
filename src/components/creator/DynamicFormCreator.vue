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
            </b-form>
          </template>
          <div v-for="(item, index) in properties" v-bind:key="index">
            <div v-if="drag" class="drop-div"
                 @drop="onDrop($event, index)"
                 @dragenter.prevent
                 @dragover.prevent/>
            <div v-if="dragPosition" class="drop-div"
                 @drop="onDropPosition($event, index)"
                 @dragenter.prevent
                 @dragover.prevent/>
            <!--            <div @dragstart="startDrag($event, component)">-->
            <div draggable="true"
                 @dragstart="startDragPosition($event, index)">
<!--                 @dragend="endDragPosition($event, item)">-->
              <button class="property-div" @click="remove(index)">X</button>
              <create-string v-model="item.properties" v-if="item.type === 'string'"/>
            </div>
            <div v-if="!drag" class="mb-2"/>
          </div>
          <div v-if="drag" class="drop-div" @drop="onDrop($event, properties.length)" @dragenter.prevent
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
      dragPosition: false,

      // formColumn: 1,
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
      const _type = event.dataTransfer.getData('itemType')
      const {type, properties: {name, ...others}} = this.components.find((item) => item.type === _type);
      this.properties.splice(index, 0, {
        type: type,
        properties: {name: name ? name : type + this.properties.length, ...others}
      });
      this.drag = false;
    },
    add(item) {
      const {type, properties: {name, ...others}} = item;
      this.properties.push({type: type, properties: {name: name ? name : type + this.properties.length, ...others}});
    },

    startDragPosition(event, index) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemIndex', index);
      this.dragPosition = true;
    },
    endDragPosition() {
      this.dragPosition = false;
    },
    onDropPosition(event, index) {
      const _index = event.dataTransfer.getData('itemIndex')
      const {type, properties} = this.properties[_index];
      this.properties.splice(_index, 1);
      this.properties.splice(index, 0, {type: type, properties: properties});
      this.dragPosition = false;
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
  /*margin-bottom: 10px;*/
  border-width: 2px;
  border-style: dashed;
  border-color: blue;
}

.component-div {
  background: gray;
  color: white;
  text-align: center;
  padding: 10px;
  width: 150px;
  float: left;
}

.property-div {
  float: right;
}
</style>
