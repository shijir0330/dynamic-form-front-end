<template>
  <b-card v-if="edit">
    String
    <input type="checkbox" v-model="value.required" :disabled="!value.name">
    <input type="text" ref="name" :value="value.name" @input="updateValue"/>
    <input type="number" ref="minLength" :value="value.minLength" @input="updateValue"/>
    <input type="number" ref="maxLength" :value="value.maxLength" @input="updateValue"/>
    <button @click="edit = !edit">edit</button>
  </b-card>
  <b-card v-else>
    String: {{ value.name }}
    <button @click="edit = !edit">edit</button>
  </b-card>
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
        minLength: this.$refs.minLength.value,
        maxLength: this.$refs.maxLength.value,
      })
    }
  }
}
</script>

<style scoped>
</style>
