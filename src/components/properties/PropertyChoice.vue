<template>
  <div>
    <b-row>
      <b-col cols="4">
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
        <template v-if="value.format === undefined">
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
        </template>
        <b-row v-else>
          <b-col>
            <label>Stacked
              <b-form-checkbox class="float-right ml-2" switch v-model="value.stacked"/>
            </label>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center font-weight-bold">
            Validations
          </b-col>
        </b-row>
        <b-row>
          <template v-if="value.format === 'checkbox'">
            <b-col>
              <b-form-group label="Minimum">
                <b-form-input type="number" v-model="value.minLength" autocomplete="off"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Maximum">
                <b-form-input type="number" v-model="value.maxLength" autocomplete="off"/>
              </b-form-group>
            </b-col>
          </template>
          <b-col>
            <b-form-group label="Custom error text">
              <b-form-input v-model="value.errorText" autocomplete="off"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="8">
        <b-row>
          <b-col class="text-center font-weight-bold">
            Options
          </b-col>
        </b-row>
        <b-row>
          <b-col>Value</b-col>
          <b-col>Text</b-col>
        </b-row>
        <b-row v-for="index in value.options.length" :key="index">
          <b-col>
            <b-form-input size="sm" v-model="value.options[index-1].value" autocomplete="off"/>
          </b-col>
          <b-col>
            <b-form-input size="sm" v-model="value.options[index-1].text" autocomplete="off"/>
          </b-col>
          <b-col cols="auto">
            <b-link pill @click="deleteOption(index-1)" v-if="value.options.length > 1">
              <b-icon class="mr-3" icon="trash" scale="1.1"/>
            </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button variant="outline-primary" block size="sm" @click="addOption">
              <b-icon icon="plus"/>
            </b-button>
          </b-col>
        </b-row>
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
      if (!this.value.format)
        this.$emit('update-value', {
          type: this.value.type,
          name: this.value.name,
          label: this.value.label,
          column: this.value.column,
          required: this.value.required,
          labelColumn: this.value.labelColumn,
          labelAlign: this.value.labelAlign,
          format: this.value.format,
          options: this.value.options,
          errorText: this.value.errorText
        })
      else
        this.$emit('update-value', {
          type: this.value.type,
          name: this.value.name,
          label: this.value.label,
          column: this.value.column,
          required: this.value.required,
          labelColumn: this.value.labelColumn,
          labelAlign: this.value.labelAlign,
          format: this.value.format,
          options: this.value.options,
          stacked: this.value.stacked,
          errorText: this.value.errorText
        })
    },
    addOption() {
      this.value.options.push({
        value: `Option ${this.value.options.length + 1}`,
        text: `Option ${this.value.options.length + 1}`
      })
    },
    deleteOption(index) {
      this.value.options.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>