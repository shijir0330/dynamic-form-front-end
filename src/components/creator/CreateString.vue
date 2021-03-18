<template>
  <div class="padding">
    <input type="number" v-model="value.minLength"/>
    <input type="number" v-model="value.maxLength"/>
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
.padding {
  padding: 10px;
}
</style>
