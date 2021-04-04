<template>
  <div>
    <b-row>
      <b-col v-for="(item, index) in getSchema.properties" v-bind:key="index" :cols="item.column">
        <b-form-group>
          <template v-slot:label>
            {{ item.label }} <span v-if="item.required" class="text-danger">*</span>
          </template>
          <b-input-group>
            <b-input-group-prepend v-if="item.prepend">
              <b-input-group-text>
                <b-icon v-if="item.prependIcon" :icon="item.prepend"/>
                <template v-else>{{ item.prepend }}</template>
              </b-input-group-text>
            </b-input-group-prepend>
            <template v-if="item.type === 'string'">
              <b-form-datepicker v-if="item.format === 'date'" v-model="value[item.name]"
                                 :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
              <b-form-timepicker v-else-if="item.format === 'time'" v-model="value[item.name]" locale="en"
                                 :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
              <b-form-input v-else :type="item.format" v-model="value[item.name]" autocomplete="off"
                            :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
            </template>
            <template v-if="item.type === 'number'">
              <b-form-input v-model="value[item.name]" type="number" autocomplete="off"
                            :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
            </template>
            <template v-if="item.type === 'choice'">
              <b-form-radio-group v-if="item.format === 'radio'" v-model="value[item.name]"
                                  :options="item.options" :stacked="item.stacked"
                                  :state="validated ? validator[item.name] : null"/>
              <b-form-checkbox-group v-else-if="item.format === 'checkbox'" v-model="value[item.name]"
                                     :options="item.options" :stacked="item.stacked"
                                     :state="validated ? validator[item.name] : null"/>
              <b-form-select v-else v-model="value[item.name]"
                             :options="item.options"
                             :state="validated ? validator[item.name] : null"/>
            </template>
            <template v-if="item.type === 'boolean'">
              <b-form-checkbox v-if="item.format === 'checkbox'" v-model="value[item.name]"
                               :value="item.trueValue" :unchecked-value="item.falseValue"
                               :state="validated ? validator[item.name] : null"
              >{{ item.trueText }}
              </b-form-checkbox>
              <b-form-checkbox v-else-if="item.format === 'switch'" switch v-model="value[item.name]"
                               :value="item.trueValue" :unchecked-value="item.falseValue"
                               :state="validated ? validator[item.name] : null"
              >{{ item.trueText }}
              </b-form-checkbox>
              <b-form-radio-group v-else v-model="value[item.name]"
                                  :stacked="item.stacked"
                                  :state="validated ? validator[item.name] : null"
              >
                <b-form-radio :value="item.trueValue">{{ item.trueText }}</b-form-radio>
                <b-form-radio :value="item.falseValue">{{ item.falseText }}</b-form-radio>
              </b-form-radio-group>
            </template>
            <template v-if="item.type === 'file'">
              <b-form-file v-model="value[item.name]"
                           :placeholder="item.placeholder"
                           :drop-placeholder="item.dropPlaceholder"
                           :accept="item.accept"
                           :state="validated ? validator[item.name] : null"/>
            </template>
            <b-input-group-append v-if="item.append">
              <b-input-group-text>
                <b-icon v-if="item.appendIcon" :icon="item.append"/>
                <template v-else>{{ item.append }}</template>
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
            {{ item.errorText }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    {{ value }} /
    {{ validator }}
    <b-row>
      <b-col class="text-center">
        <b-button @click="submitForm">SUBMIT</b-button>
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
  data() {
    return {
      validated: false
    }
  },
  computed: {
    getSchema() {
      return this.schema;
    },
    validator() {
      let validator = {};
      if (this.schema.required) {
        this.schema.required.forEach((name) => {
          if (!this.value[name]) validator[name] = false;
        })
      }
      this.schema.properties.forEach((item) => {
        if (!this.value[item.name] && this.value[item.name] !== false) {
          validator[item.name] = item.required ? false : null;
        } else {
          switch (item.type) {
            case 'string':
              validator[item.name] = this.validateString(this.value[item.name], item);
              break;
            case 'number':
              validator[item.name] = this.validateNumber(this.value[item.name], item);
              break;
            case 'choice':
              validator[item.name] = this.validateChoice(this.value[item.name], item);
              break;
            default:
              validator[item.name] = item.required ? true : null;
          }
        }
      })
      return validator;
    }
  },
  methods: {
    validateString: function (value, item) {
      return item.format === 'email' ? this.validateEmail(value) : item.format === 'url' ? this.validateUrl(value) : item.pattern ? this.validateRegex(value, item.pattern) : item.minLength || item.maxLength ? this.validateLength(value, item.minLength, item.maxLength) : item.required ? true : null;
    },
    validateNumber: function (value, item) {
      return item.multipleOf && (item.minimum || item.maximum) ? this.validateMultipleOf(value, Number(item.multipleOf)) && this.validateMinMax(value, Number(item.minimum), Number(item.maximum), item.exclusiveMinimum, item.exclusiveMaximum) : item.multipleOf ? this.validateMultipleOf(value, Number(item.multipleOf)) : item.minimum || item.maximum ? this.validateMinMax(value, Number(item.minimum), Number(item.maximum), item.exclusiveMinimum, item.exclusiveMaximum) : item.required ? true : null;
    },
    validateChoice: function (value, item) {
      return item.format === 'checkbox' ? item.minLength || item.maxLength ? this.validateLength(value, item.minLength, item.maxLength) : item.required ? !!value.length : null : item.required ? true : null;
    },

    validateMultipleOf: function (value, multiple) {
      return value % multiple === 0;
    },
    validateMinMax: function (value, minimum, maximum, exclusiveMinimum, exclusiveMaximum) {
      return !(
          (minimum && value && !exclusiveMinimum ? value < minimum : value <= minimum) ||
          (maximum && value && !exclusiveMaximum ? value > maximum : value >= maximum)
      )
    },
    validateLength: function (value, minLength, maxLength) {
      return !(
          (minLength && value && value.length < minLength) ||
          (maxLength && value && value.length > maxLength)
      );
    },
    validateRegex: function (string, pattern) {
      try {
        const _pattern = new RegExp(pattern);
        return _pattern.test(string);
      } catch (e) {
        return false;
      }
    },
    validateEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateUrl: function (url) {
      try {
        new URL(url);
      } catch (e) {
        return false;
      }
      return true;
    },

    submitForm() {
      this.validated = true;

      const validateArray = Object.values(this.validator);
      for (let i = 0; i < validateArray.length; i++)
        if (validateArray[i] === false) return;

      this.$emit('submit');
      console.log('submitted');
    }
  }
}
</script>

<style scoped>

</style>