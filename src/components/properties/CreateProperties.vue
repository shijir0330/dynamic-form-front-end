<template>
  <b-card class="property-div"
          border-variant="primary"
          footer-border-variant="primary">
    <b-row>
      <b-col>
        <b-form-group label="Name">
          <b-form-input v-model="value.name" autocomplete="off" :state="validated ? !!value.name : null"
                        v-on:input="eraseWhiteSpace"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Label">
          <b-form-input v-model="value.label" autocomplete="off" :state="validated ? !!value.label : null"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Type">
          <b-form-select v-model="value.type" @change="updateValue" :state="validated ? !!value.type : null">
            <b-form-select-option value="string">string</b-form-select-option>
            <b-form-select-option value="number">number</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-modal :id="'property'+index" :title="value.name">
      <string-property v-if="value.type === 'string'" v-model="value" v-on:update-value="updateValue2"/>
      <number-property v-if="value.type === 'number'" v-model="value" v-on:update-value="updateValue2"/>
    </b-modal>
    <template #footer>
      <div class="float-right text-primary">
        <b-link pill @click="duplicateProperty">
          <b-icon class="mr-3" icon="files" scale="1.1"/>
        </b-link>
        <b-link pill @click="removeProperty">
          <b-icon class="mr-3" icon="trash" scale="1.1"/>
        </b-link>
        |
        <label class="ml-3">Required
          <b-form-checkbox class="float-right ml-2" switch v-model="value.required"/>
        </label>
        <b-link v-b-modal="'property'+index" v-text="'More'"/>
      </div>
    </template>
  </b-card>
</template>

<script>
import StringProperty from '@/components/properties/StringProperty'
import NumberProperty from "@/components/properties/NumberProperty";

export default {
  name: "CreateComponents",
  components: {
    NumberProperty,
    StringProperty,
  },
  props: {
    value: Object,
    index: Number,
    validated: Boolean
  },
  methods: {
    updateValue() {
      this.$emit('input', {
        type: this.value.type,
        name: this.value.name,
        label: this.value.label,
        column: this.value.column,
        required: this.value.required,
        // validation: this.value.validation
      });
    },
    updateValue2(values) {
      this.$emit('input', values);
    },
    updateValueValidation() {
      if (!this.value.validation)
        this.updateValue();
    },
    eraseWhiteSpace() {
      this.$emit('input', {
        ...this.value,
        name: this.value.name.replaceAll(' ', ''),
      });
    },
    removeProperty() {
      this.$emit('remove-property');
    },
    duplicateProperty() {
      const {name, ...values} = this.value
      this.$emit('duplicate-property', {name: name + '-1', ...values}, this.index + 1);
    }
  }
}
</script>

<style scoped>

</style>