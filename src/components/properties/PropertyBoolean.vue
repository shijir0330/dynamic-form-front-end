<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Format">
          <b-form-select v-model="value.format" @change="updateValue">
            <b-form-select-option :value="undefined">radio</b-form-select-option>
            <b-form-select-option value="checkbox">checkbox</b-form-select-option>
            <b-form-select-option value="switch">switch</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="True value">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.trueValue" :value="true" :unchecked-value="null"/>
            </b-input-group-prepend>
            <b-form-input :readonly="value.trueValue === true" v-model="value.trueValue" autocomplete="off"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="False value">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.falseValue" :value="false" :unchecked-value="null"/>
            </b-input-group-prepend>
            <b-form-input :readonly="value.falseValue === false" v-model="value.falseValue" autocomplete="off"/>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="True text">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-form-radio v-if="!value.format" class="mr-n2" v-model="example"
                            :value="true"/>
              <b-form-checkbox v-else-if="value.format === 'checkbox'" class="mr-n2" v-model="example"
                               :value="true" :unchecked-value="false"/>
              <b-form-checkbox v-else-if="value.format === 'switch'" switch class="mr-n2" v-model="example"
                               :value="true" :unchecked-value="false"/>
            </b-input-group-prepend>
            <b-form-input v-model="value.trueText" autocomplete="off"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <template v-if="!value.format">
        <b-col>
          <b-form-group label="False text">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-form-radio class="mr-n2" v-model="example" :value="false"/>
              </b-input-group-prepend>
              <b-form-input v-model="value.falseText" autocomplete="off"/>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <label>Stacked
            <b-form-checkbox class="float-right ml-2" switch v-model="value.stacked"/>
          </label>
        </b-col>
      </template>
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Validations
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Custom error text">
          <b-form-input v-model="value.errorText" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PropertyBoolean",
  props: ['value'],
  data() {
    return {
      example: null
    }
  },
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
        format: this.value.format,
        trueValue: this.value.trueValue,
        falseValue: this.value.falseValue,
        trueText: this.value.trueText
      })
    },
  }
}
</script>

<style scoped>

</style>