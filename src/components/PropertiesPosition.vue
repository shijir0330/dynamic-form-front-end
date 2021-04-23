<template>
  <b-row>
    <b-col v-for="(item, index) in value.properties" v-bind:key="index" :cols="item.column">
      <b-card draggable="true" border-variant="primary" class="mb-2 p-0"
              @dragstart="startDrag($event, index)"
              @drop="onDrop($event, index)"
              @dragenter.prevent="dragEnter($event)"
              @dragleave.prevent="dragLeave($event)"
              @dragover.prevent>
        <label class="mr-1">{{ item.name }}</label>
        <select class="mr-1" v-model="item.column" v-b-tooltip.hover title="column">
          <option v-for="i in 12" :value="i">{{ i }}</option>
        </select>
        <select class="mr-1" v-model="item.labelColumn" v-b-tooltip.hover title="label column"
                v-on:change="item.labelAlign = !item.labelColumn ? undefined : item.labelAlign">
          <option :value="undefined">NA</option>
          <option v-for="i in 12" :value="i">{{ i }}</option>
        </select>
        <select v-model="item.labelAlign" v-b-tooltip.hover title="label align"
                v-if="!!item.labelColumn">
          <option :value="undefined">left</option>
          <option value="right">right</option>
        </select>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "PropertiesPosition",
  props: ['value'],
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

</style>