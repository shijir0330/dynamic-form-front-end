<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline class="float-left">
              <label class="mr-2">Form Name</label>
              <b-form-input v-model="componentValue.name" class="mr-2"/>
              <b-button @click="addProperty">PLUS</b-button>
            </b-form>
            <b-button-group class="float-right">
              <b-button :variant="editing ? 'secondary' : 'light'"
                        v-on:click="editing = ! editing"
              >EDIT
              </b-button>
              <b-button :variant="!editing ? 'secondary' : 'light'"
                        v-on:click="editing = ! editing"
              >POSITIONING
              </b-button>
            </b-button-group>
          </template>
          <b-row v-if="editing">
            <b-col v-for="(item, index) in componentValue.properties" v-bind:key="index" cols="12">
              <create-components v-model="componentValue.properties[index]" v-bind:index="index"
                                 v-on:remove-property="removeProperty(index)"
                                 v-on:duplicate-property="duplicateProperty"
              />
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col>
              <properties-position v-model="componentValue"/>
<!--                <template v-slot:default="{item}">-->
                  <!--            {{ item.name }}-->
                  <!--            <select v-model="item.column">-->
                  <!--              <option v-for="i in 12" :value="i">{{ i }}</option>-->
                  <!--            </select>-->
<!--                </template>-->
<!--              </properties-position>-->
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
import PropertiesPosition from "@/components/creator/PropertiesPosition";

export default {
  name: "PropertiesEditor",
  components: {CreateComponents, PropertiesPosition},
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
      editing: true
    }
  },
  mounted() {
    // this.componentValue = this.value
  },
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
            if (value) object[key] = value
          });
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
          const objectArray = Object.entries(others);
          const object = {};
          objectArray.forEach(([key, value]) => {
            if (value) object[key] = value
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
        column: 12
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