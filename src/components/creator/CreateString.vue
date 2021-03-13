<template>
  <div class="padding">
    <template>String: {{ value.name }}</template>
    <select ref="columns" :value="value.columns" @change="updateValue">
      <option v-for="i in 12" :value="i">{{ i }}</option>
    </select>
    <input type="checkbox" :hidden="edit" v-model="value.required" :disabled="!value.name">
    <input type="text" :hidden="edit" ref="name" :value="value.name" @input="updateValue"/>
    <input type="number" :hidden="edit" ref="minLength" :value="value.minLength" @input="updateValue"/>
    <input ref="maxLength" :hidden="edit" :value="value.maxLength" type="number" @input="updateValue"/>
    <button @click="edit = !edit">edit</button>
<!--  </div>-->
<!--  <div v-else class="padding">-->
<!--    String: {{ value.name }}-->
<!--    <button @click="edit = !edit">edit</button>-->
  </div>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value'],
  data() {
    return {
      edit: false
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', {
        name: this.$refs.name.value,
        required: this.value.required,
        columns: this.$refs.columns.value,
        minLength: this.$refs.minLength.value,
        maxLength: this.$refs.maxLength.value,
      })
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 10px;
}
</style>
