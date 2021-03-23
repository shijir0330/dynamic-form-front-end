<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline class="float-left">
              <label class="mr-2">Form Name</label>
              <b-form-input v-model="componentValue.name" class="mr-2"
                            :state="validated ? !!componentValue.name : null"/>
              <b-button @click="addProperty">
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
                                 v-bind:index="index-1" v-bind:validated="validated"
                                 v-on:remove-property="removeProperty(index-1)"
                                 v-on:duplicate-property="duplicateProperty"
              />
            </b-col>
          </b-row>
          <b-row v-if="state === 'positioning'">
            <b-col>
              <properties-position v-model="componentValue"/>
            </b-col>
          </b-row>
          <b-row v-if="state === 'preview'">
            <b-col>
              PREVIEW
            </b-col>
          </b-row>
          <b-row v-if="!(this.componentValue.properties.length > 0) && validated">
            <b-col class="text-danger">
              NO PROPERTY FOUND
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON SCHEMA">
          <pre>{{ value | jsonFormat }}</pre>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="primary" v-on:click="submitFormSchema">SUBMIT</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CreateProperties from "@/components/properties/CreateProperties";
import PropertiesPosition from "@/components/PropertiesPosition";

export default {
  name: "DynamicFormCreator",
  components: {CreateProperties, PropertiesPosition},
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
      default: 'array',
      validator: function (value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    }
  },
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  data() {
    return {
      componentValue: this.value,
      state: 'editing',
      validated: false,
    }
  },
  // mounted() {
  // this.componentValue = this.value
  // },
  computed: {
    getValue() {
      return this.value;
    },
    getPropertiesArray() {
      let schemaFormat = {name: this.componentValue.name, properties: []};
      if (this.required === 'array') {
        schemaFormat.required = [];
        this.componentValue.properties.forEach((x) => {
          const {required, ...others} = x;
          others.validation = undefined;
          if (required) schemaFormat.required.push(x.name);
          const objectArray = Object.entries(others);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value) object[key] = value
          });
          schemaFormat.required = [...new Set(schemaFormat.required)];
          schemaFormat.properties.push(object);
        })
      } else if (this.required === 'object') {
        this.componentValue.properties.forEach((x) => {
          const objectArray = Object.entries(x);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value !== null) object[key] = value
          });
          object.validation = undefined;
          schemaFormat.properties.push(object);
        })
      }
      return schemaFormat;
    },
    getPropertiesObject() {
      let schemaFormat = {name: this.componentValue.name, properties: {}};
      if (this.required === 'array') {
        schemaFormat.required = [];
        this.componentValue.properties.forEach((x) => {
          const {name, required, ...others} = x;
          others.validation = undefined;
          if (required) schemaFormat.required.push(name);
          const objectArray = Object.entries(others);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value) object[key] = value
          });
          schemaFormat.required = [...new Set(schemaFormat.required)];
          schemaFormat.properties[name] = {...object};
        })
      } else if (this.required === 'object') {
        this.componentValue.properties.forEach((x) => {
          const {name, ...others} = x;
          others.validation = undefined;
          const objectArray = Object.entries(others);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value !== null) object[key] = value
          });
          schemaFormat.properties[name] = {...object};
        })
      }
      return schemaFormat;
    }
  },
  methods: {
    addProperty() {
      if (!this.componentValue.properties)
        this.componentValue.properties = []
      this.componentValue.properties.push({
        type: "string",
        name: `Property-${this.componentValue.properties.length + 1}`,
        label: `Property-${this.componentValue.properties.length + 1}`,
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
      if (this.properties === 'array')
        this.$emit('input', this.getPropertiesArray)
      else if (this.properties === 'object')
        this.$emit('input', this.getPropertiesObject)
    },
    submitFormSchema() {
      this.validated = true;

      if (!this.componentValue.name) return

      if (this.componentValue.properties.length > 0) {
        for (let i = 0; i < this.componentValue.properties.length; i++)
          if (!this.componentValue.properties[i].name ||
              !this.componentValue.properties[i].label ||
              !this.componentValue.properties[i].type) {
            return
          }
      } else {
        return
      }

      this.$emit('submit')
    }
  },
  watch: {
    'componentValue': {
      deep: true,
      handler: 'updateValue'
    },
    'properties': {
      handler: 'updateValue'
    },
    'required': {
      handler: 'updateValue'
    }
  }
}
</script>

<style scoped>

</style>