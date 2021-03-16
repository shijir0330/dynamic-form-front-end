<template>
  <div>
    <div v-if="!editing">
      <template>{{ item.properties.name + ':' + item.type }}</template>
      <label>Columns:
        <select v-model="item.properties.columns">
          <option v-for="i in 12" :value="i">{{ i }}</option>
        </select>
      </label>
    </div>
    <div v-else>
      <template>{{ 'Type: ' + item.type }}</template>
      <label>Name:
        <input v-model="item.properties.name"/>
      </label>
      <label>Label:
        <input v-model="item.properties.label"/>
      </label>
    </div>
    <div>
      <create-string v-if="editing && item.type === 'string'" v-model="item.properties"/>
      <create-container v-if="item.type === 'container'" v-model="item.properties" :editing="editing" :drag="drag"/>
    </div>
  </div>
</template>

<script>
import CreateString from '@/components/creator/CreateString'
import CreateNumber from "@/components/creator/CreateNumber";
import CreateContainer from "@/components/creator/CreateContainer";

export default {
  name: "CreateComponents",
  components: {
    CreateContainer,
    CreateString,
    CreateNumber
  },
  props: {
    item: Object,
    editing: Boolean,
    drag: Boolean
  }
}
</script>

<style scoped>
label {
  margin-left: 20px;
}
</style>