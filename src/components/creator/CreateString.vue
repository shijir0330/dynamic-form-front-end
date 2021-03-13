<template>
  <div class="padding">
    <template>{{ value.name }}: String</template>
    <select ref="columns" :value="value.columns" @change="updateValue">
      <option v-for="i in 12" :value="i">{{ i }}</option>
    </select>
    <input type="checkbox" :hidden="isEdit" v-model="value.required" :disabled="!value.name">
    <input type="text" :hidden="isEdit" ref="name" :value="value.name" @input="updateValue"/>
    <input type="number" :hidden="isEdit" ref="minLength" :value="value.minLength" @input="updateValue"/>
    <input ref="maxLength" :hidden="isEdit" :value="value.maxLength" type="number" @input="updateValue"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value', 'isEdit'],
  // data() {
  //   return {
  //     edit: true,
  //   }
  // },
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
