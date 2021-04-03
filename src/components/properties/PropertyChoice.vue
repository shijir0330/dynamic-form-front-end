<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Format">
          <b-form-select v-model="value.format" @change="updateValue">
            <b-form-select-option :value="undefined">select</b-form-select-option>
            <b-form-select-option value="radio">radio</b-form-select-option>
            <b-form-select-option value="checkbox">checkbox</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="value.format === undefined">
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
                               :value="true" :unchecked-value="undefined"/>
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
                               :value="true" :unchecked-value="undefined"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Options
      </b-col>
    </b-row>
    <b-row v-for="(item, index) in value.options" :key="index">
      <b-col>
        <b-form-group label="Value">
          <b-form-input v-model="value.options[index].value" autocomplete="off"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Text">
          <b-form-input v-model="value.options[index].text" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Validations
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PropertyChoice",
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

</style>