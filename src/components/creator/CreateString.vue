<template>
  <div>
    <label>format:
      <select v-model="value.format" @change="updateValue">
        <option :value="undefined">text</option>
        <option :value="null">pattern</option>
        <option value="date-time">date-time</option>
        <option value="date">date</option>
        <option value="time">time</option>
        <option value="email">email</option>
        <option value="uri">uri</option>
      </select>
    </label>
    <label v-if="value.format === null">pattern:
      <input type="number" ref="minLength" v-model="value.pattern"/>
    </label>
    <label v-if="value.format === undefined">minLength:
      <input type="number" ref="minLength" v-model="value.minLength"/>
    </label>
    <label v-if="value.format === undefined">maxLength:
      <input type="number" ref="maxLength" v-model="value.maxLength"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value'],
  methods: {
    updateValue() {
      this.$emit('update-value', {
        type: this.value.type,
        name: this.value.name,
        label: this.value.label,
        column: this.value.column,
        required: this.value.required,

        format: this.value.format,
      })
    }
  }
}
</script>

<style scoped>
label {
  margin: 0 20px 0 0;
}
</style>
