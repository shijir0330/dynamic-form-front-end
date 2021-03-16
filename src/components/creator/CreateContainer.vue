<template>
  <div class="padding">
    <b-row>
      <b-col v-for="(item, index) in value.properties"
             v-bind:key="index" :cols="!editing ? item.properties.columns : 12">
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
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CreateContainer",
  props: ['value'],
}
</script>

<style scoped>

</style>