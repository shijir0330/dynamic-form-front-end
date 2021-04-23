<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Prepend">
          <b-input-group>
            <b-input-group-prepend v-if="value.prependIcon">
              <b-input-group-text>
                <b-icon :icon="value.prepend"/>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.prepend" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.prependIcon"
                               :value="true" :unchecked-value="null"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Append">
          <b-input-group>
            <b-input-group-prepend v-if="value.appendIcon">
              <b-input-group-text>
                <b-icon :icon="value.append"/>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.append" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.appendIcon"
                               :value="true" :unchecked-value="null"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Placeholder">
          <b-form-input v-model="value.placeholder" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Validations
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Format">
          <b-form-select v-model="value.format" @change="updateValue">
            <b-form-select-option :value="undefined">text</b-form-select-option>
            <b-form-select-option :value="null">pattern</b-form-select-option>
<!--            <b-form-select-option value="date-time">date-time</b-form-select-option>-->
            <b-form-select-option value="date">date</b-form-select-option>
            <b-form-select-option value="time">time</b-form-select-option>
            <b-form-select-option value="email">email</b-form-select-option>
            <b-form-select-option value="url">url</b-form-select-option>
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
      <template v-if="value.format === null">
        <b-col>
          <b-form-group label="Pattern">
            <b-form-input v-model="value.pattern" autocomplete="off"/>
          </b-form-group>
        </b-col>
      </template>
      <b-col cols="12">
        <b-form-group label="Custom error text">
          <b-form-input v-model="value.errorText" autocomplete="off"/>
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
        labelColumn: this.value.labelColumn,
        labelAlign: this.value.labelAlign,
        prepend: this.value.prepend,
        prependIcon: this.value.prependIcon,
        append: this.value.append,
        appendIcon: this.value.appendIcon,
        placeholder: this.value.placeholder,
        format: this.value.format,
        errorText: this.value.errorText
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
