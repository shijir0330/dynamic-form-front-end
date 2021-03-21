<template>
  <b-row>
    <b-col v-for="(item, index) in value.properties" v-bind:key="index" :cols="item.column">
      <b-card draggable="true" border-variant="primary" class="mb-2 p-0"
              @dragstart="startDrag($event, index)"
              @drop="onDrop($event, index)"
              @dragenter.prevent="dragEnter($event)"
              @dragleave.prevent="dragLeave($event)"
              @dragover.prevent>
        <label>{{ item.name }}
        <select v-model="item.column">
          <option v-for="i in 12" :value="i">{{ i }}</option>
        </select>
        </label>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "PropertiesPosition",
  props: ['value'],
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  computed: {
    getProperties() {
      return this.value.properties.map(x => {
        return {
          name: x.name,
          column: x.column
        }
      })
    }
  },
  methods: {
    startDrag(event, index) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemIndex', index);
    },
    onDrop(event, index) {
      event.target.style.background = "";
      const _index = event.dataTransfer.getData('itemIndex')
      let _item = this.value.properties[_index]
      this.value.properties.splice(_index, 1);
      this.value.properties.splice(index, 0, _item);
    },
    dragEnter(event) {
      event.target.style.background = "lightgray";
    },
    dragLeave(event) {
      event.target.style.background = "";
    },
  },
}
</script>

<style scoped>
.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 10px;
  margin: 10px 0;
}
</style>