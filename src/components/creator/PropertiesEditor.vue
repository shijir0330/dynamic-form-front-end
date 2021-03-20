<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name</label>
              <b-form-input v-model="componentValue.name" class="mr-2"/>
              <b-button @click="addProperty">PLUS</b-button>
            </b-form>
          </template>
          <b-row>
            <b-col v-for="(item, index) in componentValue.properties" v-bind:key="index" cols="12">
<!--              <div class="property-div">-->
                <create-components v-model="componentValue.properties[index]" v-on:remove-property="removeProperty(index)"/>
<!--              </div>-->
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON">
          <pre>{{ value | jsonFormat }}</pre>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CreateComponents from "@/components/creator/CreateComponents";

export default {
  name: "PropertiesEditor",
  components: {CreateComponents},
  props: {
    value: Object,
    properties: {
      type: String,
      default: function () {
        return 'array'
      },
      validator: function(value) {
        return ['array', 'object'].indexOf(value) !== -1
      }
    },
    required: {
      type: String,
      default: function () {
        return 'array'
      },
      validator: function(value) {
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
      componentValue: {
        name: '',
        properties: [],
        required: []
      }
    }
  },
  mounted() {
    // this.componentValue = this.value
  },
  computed: {
    getPropertiesArray() {
      let schemaFormat = {name: this.componentValue.name, properties: [], required: []};
      this.componentValue.properties.forEach((x) => {
        const {required, ...others} = x;
        if (required) schemaFormat.required.push(x.name);
        const objectArray = Object.entries(others);
        const object = {};
        objectArray.forEach(([key, value]) => {
          if (value) object[key] = value
        });
        schemaFormat.required = [...new Set(schemaFormat.required)];
        schemaFormat.properties.push(object);
      })
      return schemaFormat;
    },
    getPropertiesObject() {
      let schemaFormat = {name: this.componentValue.name, properties: {}, required: []};
      this.componentValue.properties.forEach((x) => {
        const {name, required, ...others} = x;
        if (required) schemaFormat.required.push(name);
        const objectArray = Object.entries(others);
        const object = {};
        objectArray.forEach(([key, value]) => {
          if (value) object[key] = value
        });
        schemaFormat.required = [...new Set(schemaFormat.required)];
        schemaFormat.properties[name] = {type: x.type, ...object};
      })
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
        column: 12
      });
    },
    removeProperty(index) {
      this.componentValue.properties.splice(index, 1);
    },
    updateValue() {
      if (this.properties === 'array')
        this.$emit('input', this.getPropertiesArray)
      else if (this.properties === 'object')
        this.$emit('input', this.getPropertiesObject)
    }
  },
  watch: {
    'componentValue': {
      deep: true,
      handler: 'updateValue'
    }
  }
}
</script>

<style scoped>

</style>