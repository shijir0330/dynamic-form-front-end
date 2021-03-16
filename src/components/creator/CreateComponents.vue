<template>
  <div>
    <div v-if="!editing">
      <template>{{ item.common.name }}: string</template>
      <label>Columns:
        <select v-model="item.common.columns">
          <option v-for="i in 12" :value="i">{{ i }}</option>
        </select>
      </label>
    </div>
    <div v-else>
      <template>{{ 'Type: ' + item.type }}</template>
      <label>Name:
        <input v-model="item.common.name"/>
      </label>
      <label>Label:
        <input v-model="item.common.label"/>
      </label>
    </div>
    <div v-if="editing">Validations:
      <create-string v-if="item.type === 'string'" v-model="item.properties"
                     :is-validation="item.edit && editing">
        <!--                  <label v-if="!editing" class="mr-2 ml-2">columns: </label>-->
        <!--        <button v-if="editing" @click="item.edit = !item.edit">validation</button>-->
        <!--        <button v-if="!editing" class="button-x" @click="remove(index)">x</button>-->
      </create-string>
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
  props: {
    item: Object,
    editing: Boolean
  }
}
</script>

<style scoped>
label {
  margin-left: 20px;
}
</style>