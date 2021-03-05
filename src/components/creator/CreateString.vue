<template>
  <b-card class="mb-2">
    String
    <input type="text" ref="name" :value="value.name" @input="updateValue"/>
    <b-form-checkbox ref="required" :v-model="value.required" @input="updateValue"
                     switch :value="true" :unchecked-value="false">required</b-form-checkbox>
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
        required: this.$refs.required.value,
        minLength: this.$refs.minLength.value,
        maxLength: this.$refs.maxLength.value,
      })
    }
  }
}
</script>

<style scoped>
</style>
