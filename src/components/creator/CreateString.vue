<template>
  <div>
    <label>minLength:
      <input type="number" v-model="value.minLength"/>
    </label>
    <label>maxLength:
      <input type="number" v-model="value.maxLength"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value'],
  // methods: {
  //   updateValue() {
  //     this.$emit('input', {
  //       name: this.$refs.name.value,
  //       required: this.value.required,
  //       columns: this.value.columns,
  //       // columns: this.$refs.columns.value,
  //       minLength: this.$refs.minLength.value,
  //       maxLength: this.$refs.maxLength.value,
  //     })
  //   }
  // }
}
</script>

<style scoped>
label {
  margin-right: 20px;
}
</style>
