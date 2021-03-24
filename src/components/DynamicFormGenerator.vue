<template>
  <div>
    <b-row>
      <b-col v-for="(item, index) in schema.properties" v-bind:key="index" :cols="item.column">
        <b-form-group :label="item.label">
          <template v-if="item.type === 'string'">
            <b-form-input v-if="!item.format" v-model="value[item.name]" autocomplete="off"/>
            <b-form-datepicker v-if="item.format === 'date'" v-model="value[item.name]"/>
            <b-form-timepicker v-if="item.format === 'time'" v-model="value[item.name]" locale="en"/>
            <b-form-input v-if="item.format === 'email'" :type="item.format" v-model="value[item.name]" autocomplete="off"/>
            <b-form-input v-if="item.format === 'uri'" :type="item.format" v-model="value[item.name]" autocomplete="off"/>
          </template>
          <template v-if="item.type === 'number'">
            <b-form-input v-model="value[item.name]" autocomplete="off" type="number"/>
          </template>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "DynamicFormGenerator",
  props: {
    value: {
      type: Object,
      default: function () {
        return {}
      }
    },
    schema: {
      type: Object,
      required: true,
      // validator: function (value) {
      //   return !(!value.name || !value.properties);
      // }
    },
    properties: {
      type: String,
      default: 'array',
      validator: function (value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    },
    required: {
      type: String,
      default: 'array',
      validator: function (value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    }
  },
}
</script>

<style scoped>

</style>