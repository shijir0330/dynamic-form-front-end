<template>
  <div>
    Number
    <input type="text" ref="name" :value="value.name" @input="updateValue"/>
    <input type="number" ref="minLength" :value="value.minLength" @input="updateValue"/>
    <input type="number" ref="maxLength" :value="value.maxLength" @input="updateValue"/>
    <input type="number" ref="minValue" :value="value.minValue" @input="updateValue"/>
    <input type="number" ref="maxValue" :value="value.maxValue" @input="updateValue"/>
  </div>
</template>

<script>
export default {
  name: "CreateNumber",
  props: ['value'],
  methods: {
    updateValue() {
      this.$emit('input', {
        name: this.$refs.name.value,
        minLength: this.$refs.minLength.value,
        maxLength: this.$refs.maxLength.value,
        minValue: this.$refs.minValue.value,
        maxValue: this.$refs.maxValue.value,
      })
    }
  }
}
</script>

<style scoped>

</style>