<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-button @click="change">change</b-button>
      </b-col>
      <b-col>
        <b-form inline>
          <label class="mr-sm-2">Properties</label>
          <b-form-select v-model="properties" class="mb-2 mr-sm-5 mb-sm-0">
            <b-form-select-option value="array">array</b-form-select-option>
            <b-form-select-option value="object">object</b-form-select-option>
          </b-form-select>
          <label class="mr-sm-2">Required</label>
          <b-form-select v-model="required" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select-option value="array">array</b-form-select-option>
            <b-form-select-option value="object">object</b-form-select-option>
          </b-form-select>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="7">
        <dynamic-form-creator v-model="schema" v-bind:properties="properties" v-bind:required="required"
                              v-on:submit="submitSchema">

        </dynamic-form-creator>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON SCHEMA">
          <pre>{{ schema | jsonFormat }}</pre>
          <pre>{{ schema | unquotedJsonFormat}}</pre>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DynamicFormCreator from "@/components/DynamicFormCreator";

export default {
  name: "Home",
  components: {
    DynamicFormCreator
  },
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    },
    unquotedJsonFormat: function (value) {
      return JSON.stringify(value, null, '\t').replace(/"([^"]+)":/g, '$1:');
    }
  },
  data() {
    return {
      properties: 'array',
      required: 'array',
      schema: {
        name: '',
        properties: [],
      },
      example: {
        "name": "",
        "properties": {
          "prop.name": {
            "type": "string",
            "label": "Property-1",
            "column": 12
          }
        },
        "required": []
      }
    }
  },
  methods: {
    change() {
      if (this.properties === 'array')
        this.schema = {
          name: 'changed',
          properties: [
            {
              type: "string",
              name: "changed-1",
              label: "changed-1",
              column: 12
            }
          ],
        }
      else if (this.properties === 'object')
        this.schema = {
          name: 'changed',
          properties: {
            Changed: {
              type: "string",
              label: "Changed",
              column: 12
            }
          },
        }
    },
    submitSchema() {
      alert('JSON SCHEMA submitted');
      console.log('schema', this.schema);
    }
  }
}
</script>

<style scoped>

</style>
