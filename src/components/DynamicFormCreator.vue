<template>
  <div>
    <b-card>
      <template #header>
        <b-form inline class="float-left">
          <label class="mr-2">Form Name</label>
          <b-form-input v-model="componentValue.name" class="mr-2"
                        :state="validated ? !!componentValue.name : null"/>
          <b-button @click="addProperty" v-if="state !== 'preview'">
            <b-icon icon="plus"/>
          </b-button>
        </b-form>
        <b-button-group class="float-right">
          <b-button :variant="state === 'editing' ? 'primary' : 'light'"
                    v-on:click="state = 'editing'"
          >EDIT
          </b-button>
          <b-button :variant="state === 'positioning' ? 'primary' : 'light'"
                    v-on:click="state = 'positioning'"
          >POSITIONING
          </b-button>
          <b-button :variant="state === 'preview' ? 'primary' : 'light'"
                    v-on:click="state = 'preview'"
          >PREVIEW
          </b-button>
        </b-button-group>
      </template>
      <b-row v-if="state === 'editing'">
        <b-col v-for="index in componentValue.properties.length" v-bind:key="index" cols="12">
          <create-properties class="mb-2"
                             v-model="componentValue.properties[index-1]"
                             v-bind:index="index-1" v-bind:name="componentValue.name"
                             v-bind:validated="validated" v-bind:custom-properties="customProperties"
                             v-on:remove-property="removeProperty(index-1)"
                             v-on:duplicate-property="duplicateProperty"
          >
            <template :slot="`modal(${c.value})`" slot-scope="{value, type}" v-for="c in customProperties">
              <slot :name="`modal(${c.value})`" v-bind:value="value" v-bind:type="type"></slot>
            </template>
          </create-properties>
        </b-col>
      </b-row>
      <b-row v-if="state === 'positioning'">
        <b-col>
          <properties-position v-model="componentValue"/>
        </b-col>
      </b-row>
      <b-row v-if="state === 'preview'">
        <b-col>
          <dynamic-form-generator v-model="example" :schema="componentValue" properties="array" required="object"
                                  v-on:submit="submitExample" v-bind:custom-properties="customProperties">
            <template :slot="`property(${c.value})`" slot-scope="{value, item, name}" v-for="c in customProperties">
              <slot :name="`property(${c.value})`" v-bind:value="value" v-bind:item="item" v-bind:name="name"></slot>
            </template>
            <b-row>
              <b-col class="text-center">
                <b-button type="submit">SUBMIT FORM</b-button>
              </b-col>
            </b-row>
          </dynamic-form-generator>
        </b-col>
      </b-row>
      <b-row v-if="!(componentValue.properties.length > 0) && validated">
        <b-col class="text-danger">
          NO PROPERTY FOUND
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button variant="primary" v-on:click="submitFormSchema">SUBMIT</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import CreateProperties from "@/components/properties/CreateProperties";
import PropertiesPosition from "@/components/PropertiesPosition";
import DynamicFormGenerator from "@/components/DynamicFormGenerator";

export default {
  name: "DynamicFormCreator",
  components: {DynamicFormGenerator, CreateProperties, PropertiesPosition},
  props: {
    value: Object,
    properties: {
      type: String,
      default: 'array',
      validator: function (value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    },
    required: {
      type: String,
      default: 'object',
      validator: function (value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    },
    customProperties: Array
  },
  data() {
    return {
      componentValue: this.value,
      state: 'editing',
      validated: false,
      example: {}
    }
  },
  computed: {
    getPropertiesArray() {
      let schemaFormat = {name: this.componentValue.name, properties: []};
      // if (this.required === 'array') {
      //   schemaFormat.required = [];
      //   this.componentValue.properties.forEach((x) => {
      //       const {required, ...others} = x;
      //       if (required) schemaFormat.required.push(x.name);
      //       const objectArray = Object.entries(others);
      //       const object = {};
      //       objectArray.forEach(([key, value]) => {
      //         if (value !== null) object[key] = typeof value === "string" ? value.trim() : value;
      //       });
      //       schemaFormat.required = [...new Set(schemaFormat.required)];
      //       schemaFormat.properties.push(object);
      //   })
      // } else if (this.required === 'object') {
      this.componentValue.properties.forEach((x) => {
        const objectArray = Object.entries(x);
        const object = {};
        objectArray.forEach(([key, value]) => {
          if (key === 'required') object[key] = value
          if (value !== null) object[key] = typeof value === "string" ? value.trim() : value;
        });
        schemaFormat.properties.push(object);
      })
      // }
      return schemaFormat;
    },
    // getPropertiesObject() {
    //   let schemaFormat = {name: this.componentValue.name, properties: {}};
    //   if (this.required === 'array') {
    //     schemaFormat.required = [];
    //     this.componentValue.properties.forEach((x) => {
    //       const {name, required, ...others} = x;
    //       if (required) schemaFormat.required.push(name);
    //       const objectArray = Object.entries(others);
    //       const object = {};
    //       objectArray.forEach(([key, value]) => {
    //         if (value !== null) object[key] = typeof value === "string" ? value.trim() : value;
    //       });
    //       schemaFormat.required = [...new Set(schemaFormat.required)];
    //       schemaFormat.properties[name] = {...object};
    //     })
    //   } else if (this.required === 'object') {
    //     this.componentValue.properties.forEach((x) => {
    //       const {name, ...others} = x;
    //       const objectArray = Object.entries(others);
    //       const object = {};
    //       objectArray.forEach(([key, value]) => {
    //         if (key === 'required') object[key] = value
    //         if (value !== null) object[key] = typeof value === "string" ? value.trim() : value;
    //       });
    //       schemaFormat.properties[name] = {...object};
    //     })
    //   }
    //   return schemaFormat;
    // }
  },
  methods: {
    getSlotName(name) {
      return `modal(${name})`;
    },
    // getObjectPropArray(objectProperties, required) {
    //   let propArray = [];
    //   if (required) {
    //     objectProperties.forEach(x => {
    //       x.required = undefined;
    //       propArray.push(x);
    //     })
    //   }
    //   return propArray;
    // },
    getExample(properties) {
      let exampleObject = {}
      properties.forEach((x) => {
        if (x.type === 'object') {
          exampleObject[x.name] = this.getExample(x.properties);
        } else if (x.type === 'choice' && x.format === 'checkbox') {
          exampleObject[x.name] = [];
        } else {
          exampleObject[x.name] = null;
        }
      })
      return exampleObject;
    },
    addProperty() {
      if (!this.componentValue.properties)
        this.componentValue.properties = []
      this.componentValue.properties.push({
        type: "string",
        name: `property${this.componentValue.properties.length + 1}`,
        label: `property${this.componentValue.properties.length + 1}`,
        column: 12,
        required: false
      });
    },
    duplicateProperty(item, index) {
      this.componentValue.properties.splice(index, 0, item);
    },
    removeProperty(index) {
      this.componentValue.properties.splice(index, 1);
    },
    updateValue() {
      // if (this.properties === 'array')
      this.$emit('input', this.getPropertiesArray)
      // else if (this.properties === 'object')
      //   this.$emit('input', this.getPropertiesObject)
    },

    validateProperties(properties) {
      for (let i = 0; i < properties.length; i++) {
        if (properties[i].type === 'object') {
          if (!this.validateProperties(properties[i].properties)) return false;
          if (!properties[i].name || !properties[i].label || !properties[i].type) return false;
        } else if (!properties[i].name || !properties[i].label || !properties[i].type) {
          return false;
        }
      }
      return true;
    },
    submitFormSchema() {
      this.validated = true;

      if (!this.componentValue.name) return;
      if (!this.validateProperties(this.componentValue.properties)) return;

      this.$emit('submit')
    },
    submitExample() {
      alert('FORM SUBMITTED');
    },
    isEqual(value) {
      if (value.name !== this.componentValue.name) return false;
      // if (this.properties === 'array') {
      if (value.properties.length !== this.getPropertiesArray.properties.length) return false;
      for (let i = 0; i < value.properties.length; i++) {
        const valueArray = Object.entries(value.properties[i]);
        const otherArray = Object.entries(this.getPropertiesArray.properties[i]);
        if (valueArray.length !== otherArray.length) return false;
        for (let j = 0; j < valueArray.length; j++) {
          if (valueArray[j][0] !== otherArray[j][0] || valueArray[j][1] !== otherArray[j][1]) return false;
        }
      }
      return true;
      // } else if (this.properties === 'object') {
      //   const valueArray = Object.entries(value.properties);
      //   const otherArray = Object.entries(this.getPropertiesObject.properties);
      //   if (valueArray.length !== otherArray.length) return false;
      //   for (let i = 0; i < valueArray.length; i++) {
      //     if (valueArray[i][0] !== otherArray[i][0]) return false;
      //     const valueArray2 = Object.entries(valueArray[i][1]);
      //     const otherArray2 = Object.entries(otherArray[i][1]);
      //     if (valueArray2.length !== otherArray2.length) return false;
      //     for (let j = 0; j < valueArray2.length; j++) {
      //       if (valueArray2[j][0] !== otherArray2[j][0] || valueArray2[j][1] !== otherArray2[j][1]) return false;
      //     }
      //   }
      //   return true;
      // }
    },
    // propsObjectToArray(newValue) {
    //   let schemaFormat = {name: newValue.name, properties: []};
    //   if (newValue.required)
    //     schemaFormat.required = newValue.required;
    //   const objectArray = Object.entries(newValue.properties);
    //   objectArray.forEach(([key, value]) => {
    //     schemaFormat.properties.push({name: key, ...value})
    //   })
    //   return schemaFormat;
    // },
    updateComponentValue(newValue) {
      if (!this.isEqual(newValue)) {
        // if (this.properties === 'array')
        this.componentValue = newValue;
        // else if (this.properties === 'object')
        //   this.componentValue = this.propsObjectToArray(newValue);
      }
    }
  },
  watch: {
    'componentValue': {
      deep: true,
      handler: 'updateValue'
    },
    // 'properties': {
    //   handler: 'updateValue'
    // },
    // 'required': {
    //   handler: 'updateValue'
    // },
    'value': {
      deep: true,
      handler(newValue) {
        this.updateComponentValue(newValue);
      }
    },
    'state': {
      handler(newValue) {
        if (newValue === 'preview')
          this.example = this.getExample(this.componentValue.properties)
      }
    }
  }
}
</script>

<style scoped>

</style>