<template>
  <div>
    <b-row>
      <b-col cols="4">
        <b-form-group label="Format">
          <b-form-select v-model="value.format" @change="updateValue">
            <b-form-select-option :value="undefined">text</b-form-select-option>
            <b-form-select-option :value="null">pattern</b-form-select-option>
            <b-form-select-option value="date-time">date-time</b-form-select-option>
            <b-form-select-option value="date">date</b-form-select-option>
            <b-form-select-option value="time">time</b-form-select-option>
            <b-form-select-option value="email">email</b-form-select-option>
            <b-form-select-option value="uri">uri</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <template v-if="value.format === undefined">
        <b-col>
          <b-form-group label="Minimum character count">
            <b-form-input type="number" ref="minLength" v-model="value.minLength" autocomplete="off"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Maximum character count">
            <b-form-input type="number" ref="maxLength" v-model="value.maxLength" autocomplete="off"/>
          </b-form-group>
        </b-col>
      </template>
      <b-col v-if="value.format === null">
        <b-form-group label="Pattern">
          <b-form-input type="text" ref="pattern" v-model="value.pattern" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
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
        validation: this.value.validation,
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
