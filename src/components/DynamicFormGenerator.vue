<template>
  <div>
    <b-row>
      <b-col v-for="(item, index) in getSchema.properties" v-bind:key="index" :cols="item.column">
        <b-form-group :label="item.label">
          <template v-if="item.type === 'string'">{{ value[item.name] }}{{ validator[item.name] }}
            <b-form-input v-if="!item.format" v-model="value[item.name]" autocomplete="off"
                          :state="validated ? validator[item.name] : null"/>
            <b-form-datepicker v-if="item.format === 'date'" v-model="value[item.name]"/>
            <b-form-timepicker v-if="item.format === 'time'" v-model="value[item.name]" locale="en"/>
            <b-form-input v-if="item.format === 'email'" :type="item.format" v-model="value[item.name]"
                          autocomplete="off"/>
            <b-form-input v-if="item.format === 'uri'" :type="item.format" v-model="value[item.name]"
                          autocomplete="off"/>
          </template>
          <template v-if="item.type === 'number'">
            <b-form-input v-model="value[item.name]" autocomplete="off" type="number"/>
          </template>
          <b-form-invalid-feedback>
            NG
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    {{ value }}
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
      validated: false,
      // validator: {}
    }
  },
  computed: {
    getSchema() {
      return this.schema;
    },
    validator() {
      let validator = {};
      this.schema.properties.forEach((item) => {
        if (item.validation) {
          switch (item.type) {
            case 'string':
              if (item.required && !this.value[item.name]) {
                validator[item.name] = false;
                break;
              }
              if (item.minLength && this.value[item.name] && this.value[item.name].length < item.minLength) {
                validator[item.name] = false;
                break;
              }
              if (item.maxLength && this.value[item.name] && this.value[item.name].length > item.maxLength) {
                validator[item.name] = false;
                break;
              }
              if (item.pattern) {
                const regex = new RegExp(item.pattern);
                if (!regex.test(this.value[item.name])) {
                  this.validator[item.name] = false;
                  break;
                }
              }
              validator[item.name] = true;
              break;
            case 'number':

              break;
            default:
              validator[item.name] = null;
          }
        } else {
          validator[item.name] = null;
        }
      })
      return validator;
    }
  },
  methods: {
    submitForm() {
      this.validated = true;

    }
  }
}
</script>

<style scoped>

</style>