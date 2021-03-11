<template>
  <b-card class="mb-2">
    String
    <input type="checkbox" v-model="value.required" :disabled="!value.name">
    <input type="text" ref="name" :value="value.name" @input="updateValue"/>
    <input type="number" ref="minLength" :value="value.minLength" @input="updateValue"/>
    <input type="number" ref="maxLength" :value="value.maxLength" @input="updateValue"/>
  </b-card>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value'],
  methods: {
    updateValue() {
      this.$emit('input', {
        name: this.$refs.name.value,
        required: this.value.required,
        minLength: this.$refs.minLength.value,
        maxLength: this.$refs.maxLength.value,
      })
    }
  }
}
</script>

<style scoped>
</style>
