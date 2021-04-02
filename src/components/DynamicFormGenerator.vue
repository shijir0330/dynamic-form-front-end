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
              <b-form-datepicker v-if="item.format === 'date'" v-model="value[item.name]"/>
              <b-form-timepicker v-else-if="item.format === 'time'" v-model="value[item.name]" locale="en"/>
              <b-form-input v-else :type="item.format" v-model="value[item.name]" autocomplete="off"
                            :state="validated ? validator[item.name] : null"/>
            </template>
            <template v-if="item.type === 'number'">
              <b-form-input v-model="value[item.name]" autocomplete="off" type="number"/>
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
      if (this.schema.required) {
        this.schema.required.forEach((name) => {
          if (!this.value[name]) validator[name] = false;
        })
      }
      this.schema.properties.forEach((item) => {
        if (!this.value[item.name]) {
          validator[item.name] = item.required ? false : null;
        } else {
          switch (item.type) {
            case 'string':
              switch (item.format) {
                case 'email':
                  validator[item.name] = this.validateEmail(this.value[item.name]);
                  break;
                case 'url':
                  validator[item.name] = this.validateUrl(this.value[item.name]);
                  break;
                default:
                  validator[item.name] = this.validateString(item);
              }
              break;
            case 'number':
              break;
            default:
              validator[item.name] = null;
          }
        }
      })
      return validator;
    }
  },
  methods: {
    validateEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    validateString: function (item) {
      if (item.required && !item.minLength && !item.maxLength && !item.pattern) {
        return true;
      } else if (!item.required && !item.minLength && !item.maxLength && !item.pattern) {
        return null;
      }
      return !(
          (item.minLength && this.value[item.name] && this.value[item.name].length < item.minLength) ||
          (item.maxLength && this.value[item.name] && this.value[item.name].length > item.maxLength)
      );
      // if (item.pattern) {
      //   const regex = new RegExp(item.pattern);
      //   if (!regex.test(this.value[item.name])) {
      //     this.validator[item.name] = false;
      //     break;
      //   }
      // }
    },

    submitForm() {
      console.log('submitted')
      this.validated = true;
    }
  }
}
</script>

<style scoped>

</style>