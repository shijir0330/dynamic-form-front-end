<template>
  <div>
    <div>
      <template>{{ 'Type: ' + item.type }}</template>
      <label>Name:
        <input v-model="item.name"/>
      </label>
      <label>Label:
        <input v-model="item.label"/>
      </label>
    </div>
    <div>
      <create-string v-if="item.type === 'string'" v-model="item"/>
    </div>
  </div>
</template>

<script>
import CreateString from '@/components/creator/CreateString'
import CreateNumber from "@/components/creator/CreateNumber";

export default {
  name: "CreateComponents",
  components: {
    CreateString,
    CreateNumber
  },
  props: ['item']
}
</script>

<style scoped>
label {
  margin-left: 20px;
}
</style>