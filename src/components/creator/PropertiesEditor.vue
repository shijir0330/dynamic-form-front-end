<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name</label>
              <b-form-input v-model="value.formName" class="mr-2"/>
              <b-button @click="addProperty">PLUS</b-button>
            </b-form>
          </template>
          <b-row>
            <b-col v-for="(item, index) in value.properties" v-bind:key="index" cols="12">
              <div class="property-div">
                <button class="button-x" @click="removeProperty(index)">x</button>
                <create-components :item="item"/>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON">
          <pre>{{ getPropertiesArray | jsonFormat }}</pre>
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
  props: ['value'],
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  computed: {
    getPropertiesArray() {
      let schemaFormat = {name: this.value.formName, properties: [], required: []};
      this.value.properties.forEach((x) => {
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
      let schemaFormat = {name: this.value.formName, properties: {}, required: []};
      this.value.properties.forEach((x) => {
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
      this.value.properties.push({
        type: "string",
        name: `Property-${this.value.properties.length + 1}`,
        label: `Property-${this.value.properties.length + 1}`,
        column: 12
      });
    },
    removeProperty(index) {
      this.value.properties.splice(index, 1);
    },
  }
}
</script>

<style scoped>
.button-x {
  float: right;
}

.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 10px;
  margin: 10px 0;
}
</style>