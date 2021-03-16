<template>
  <div class="padding">
    <b-row>
      <b-col v-for="(item, index) in getPropertiesArray"
             v-bind:key="index" :cols="!editing ? item.properties.columns : 12">
        <div :draggable="!editing" class="property-div"
             @dragstart="startDragPosition($event, index)"
             @drop="onDrop($event, index)"
             @dragenter.prevent="dragEnter($event)"
             @dragleave.prevent="dragLeave($event)"
             @dragover.prevent>
          <create-components name="s" :item="item" :editing="editing" :drag="drag"/>
        </div>
      </b-col>
    </b-row>
    <div v-if="drag" class="drop-div" @drop="onDrop($event)"
         @dragenter.prevent="dragEnter($event)"
         @dragleave.prevent="dragLeave($event)"
         @dragover.prevent/>
    <slot></slot>
  </div>
</template>

<script>
import {dragDropMixin} from "@/mixins/drag-drop-mixin";
// import CreateComponents from "@/components/creator/CreateComponents";

export default {
  name: "CreateContainer",
  mixins: [dragDropMixin],
  props: ['value', 'editing', 'drag'],
  // components: {
  //   CreateComponents
  // },
  computed: {
    getPropertiesArray: {
      get() {
        return Object.entries(this.value.properties).map(([key, value]) => {
          return {
            type: value.type,
            edit: false,
            properties: {
              name: key,
              label: value.label,
              columns: value.columns,
              ...value.properties
            }
          }
        })
      },
      set(value) {
        let schemaFormat = {};
        value.forEach((x) => {
          const {name, required, ...others} = x.properties;
          if (required) schemaFormat.required.push(name);
          const objectArray = Object.entries(others);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value) object[key] = value
          });
          schemaFormat[name] = {type: x.type, ...object};
        })
        this.value.properties = schemaFormat;
      }
    }
  },
  methods: {
    onDrop(event, index) {
      event.target.style.background = "";
      if (this.drag) {
        const _type = event.dataTransfer.getData('itemType')
        const {type, properties: {columns, name, label, ...properties}} = this.components.find((item) => item.type === _type);
        let temp = this.getPropertiesArray;
        temp.splice(index, 0, {
          type: type,
          edit: false,
          properties: {
            name: name ? name : type + this.getPropertiesArray.length,
            label: label ? label : type + this.getPropertiesArray.length,
            columns: columns,
            ...properties
          },
        });
        this.getPropertiesArray = temp;
        // this.drag = false;
      } else {
        const _index = event.dataTransfer.getData('itemIndex')
        const {type, edit, properties} = this.properties[_index];
        let temp = this.getPropertiesArray;
        temp.splice(_index, 1);
        temp.splice(index, 0, {type: type, edit: edit, properties: properties});
        // this.properties.splice(_index, 1);
        // this.properties.splice(index, 0, {type: type, edit: edit, properties: properties});
        this.getPropertiesArray = temp;
      }
    },
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
</style>