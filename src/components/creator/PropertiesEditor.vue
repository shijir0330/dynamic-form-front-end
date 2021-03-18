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
                <button class="button-x" @click="remove(index)">x</button>
                <create-components :item="item"/>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON">
          <pre>{{ value.properties | jsonFormat }}</pre>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import {dragDropMixin} from "@/mixins/drag-drop-mixin";
import CreateComponents from "@/components/creator/CreateComponents";

export default {
  name: "PropertiesEditor",
  // mixins: [dragDropMixin],
  components: {CreateComponents},
  props: ['value'],
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  computed: {
    getJson() {
      let schemaFormat = {name: this.formName, properties: {}, required: []};
      this.schema.properties.forEach((x) => {
        const {name, required, ...others} = x.properties;
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
        columns: 12
      });
    },
    remove(index) {
      this.value.properties.splice(index, 1);
    },
  }
}
</script>

<style scoped>
.drop-div {
  height: 40px;
  /*margin-bottom: 10px;*/
  border-width: 2px;
  border-style: dashed;
  border-color: black;
}

.component-div {
  cursor: pointer;
  background: gray;
  color: white;
  text-align: center;
  padding: 10px;
  width: 150px;
  float: left;
  margin-right: 10px;
}

.button-x {
  float: right;
}

.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  margin: 10px 0;
}
</style>