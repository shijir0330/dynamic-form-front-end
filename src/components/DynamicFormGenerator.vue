<template>
  <b-form @submit.prevent="submitForm">
    <b-row>
      <b-col v-for="(item, index) in getSchema.properties" v-bind:key="index" :cols="item.column">
        <generate-properties v-model="value" :item="item" :validated="validated" :validator="validator"
                             :custom-properties="customProperties">
          <template :slot="`property(${c.value})`" slot-scope="{value, item, name}" v-for="c in customProperties">
            <slot :name="`property(${c.value})`" v-bind:value="value" v-bind:item="item" v-bind:name="name"></slot>
          </template>
        </generate-properties>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        value:{{ value }}
      </b-col>
      <b-col>
        validator:{{ validator }}
      </b-col>
    </b-row>
    <slot></slot>
  </b-form>
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
    customProperties: Array,
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
      this.getSchema.properties.forEach((item) => {
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
            case 'boolean':
              validator[item.name] = this.validateRequired(this.value[item.name], item);
              break;
            case 'file':
              validator[item.name] = this.validateRequired(this.value[item.name], item);
              break;
            case 'object':
              validator[item.name] = this.validateObject(this.value[item.name], item);
              break;
            default:
              validator[item.name] = undefined;
          }
        }
      })
      return validator;
    }
  },
  methods: {
    validateObject: function (value, item) {
      let validator = {};
      item.properties.forEach((_item) => {
        if (!value) {
          validator[_item.name] = _item.required ? false : null;
        } else if (!value[_item.name] && value[_item.name] !== false) {
          validator[_item.name] = _item.required ? false : null;
        } else {
          switch (_item.type) {
            case 'string':
              validator[_item.name] = this.validateString(value[_item.name], _item);
              break;
            case 'number':
              validator[_item.name] = this.validateNumber(value[_item.name], _item);
              break;
            case 'choice':
              validator[_item.name] = this.validateChoice(value[_item.name], _item);
              break;
            case 'boolean':
              validator[_item.name] = this.validateRequired(value[_item.name], _item);
              break;
            case 'file':
              validator[_item.name] = this.validateRequired(value[item.name], _item);
              break;
            case 'object':
              validator[_item.name] = this.validateObject(value[item.name], _item);
              break;
            default:
              validator[_item.name] = undefined;
          }
        }
      })
      return validator;
    },
    validateString: function (value, item) {
      return item.format === 'email' ? this.validateEmail(value) : item.format === 'url' ? this.validateUrl(value) : item.pattern ? this.validateRegex(value, item.pattern) : item.minLength || item.maxLength ? this.validateLength(value, item.minLength, item.maxLength) : item.required ? true : null;
    },
    validateNumber: function (value, item) {
      return item.multipleOf && (item.minimum || item.maximum) ? this.validateMultipleOf(value, Number(item.multipleOf)) && this.validateMinMax(value, Number(item.minimum), Number(item.maximum), item.exclusiveMinimum, item.exclusiveMaximum) : item.multipleOf ? this.validateMultipleOf(value, Number(item.multipleOf)) : item.minimum || item.maximum ? this.validateMinMax(value, Number(item.minimum), Number(item.maximum), item.exclusiveMinimum, item.exclusiveMaximum) : item.required ? true : null;
    },
    validateChoice: function (value, item) {
      return item.format === 'checkbox' ? item.minLength || item.maxLength ? this.validateLength(value, item.minLength, item.maxLength) : item.required ? !!value.length : null : item.required ? true : null;
    },
    validateRequired: function (value, item) {
      return item.required ? value !== null : null
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
    validateRegex: function (value, pattern) {
      try {
        const _pattern = new RegExp(pattern);
        return _pattern.test(value);
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

    checkValidations(validateArray) {
      for (let i = 0; i < validateArray.length; i++) {
        if (validateArray[i] !== null && validateArray[i] !== undefined)
          if (typeof validateArray[i] === 'object') {
            if (!this.checkValidations(Object.values(validateArray[i]))) return false;
          } else if (validateArray[i] === false) return false;
      }
      return true;
    },

    submitForm() {
      this.validated = true;

      const array = Object.values(this.validator)
      if (!this.checkValidations(array)) return;

      this.$emit('submit');
    }
  }
}
</script>

<style scoped>

</style>