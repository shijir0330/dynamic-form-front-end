<template>
  <div class="padding">
    <template v-if="!isEdit">{{ value.name }}: string</template>
    <!--    <select ref="columns" :value="value.columns" @change="updateValue">-->
    <!--      <option v-for="i in 12" :value="i">{{ i }}</option>-->
    <!--    </select>-->
    <input :hidden="!isEdit" v-model="value.name"/>
    <input :hidden="!isValidation" type="checkbox" v-model="value.required"/>
    <input :hidden="!isValidation" v-model="value.minLength"/>
    <input :hidden="!isValidation" v-model="value.maxLength"/>
    <!--    <input type="text" :hidden="!isEdit" ref="name" :value="value.name" @input="updateValue"/>-->
    <!--    <input type="checkbox" :hidden="!isValidation" v-model="value.required" :disabled="!value.name">-->
    <!--    <input type="number" :hidden="!isValidation" ref="minLength" :value="value.minLength" @input="updateValue"/>-->
    <!--    <input ref="maxLength" :hidden="!isValidation" :value="value.maxLength" type="number" @input="updateValue"/>-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CreateString',
  props: ['value', 'isEdit', 'isValidation'],
  // data() {
  //   return {
  //     edit: true,
  //   }
  // },
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
