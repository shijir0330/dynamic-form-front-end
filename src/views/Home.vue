<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-button @click="change">change</b-button>
      </b-col>
<!--      <b-col>-->
<!--        <b-form inline>-->
<!--          <label class="mr-sm-2">Properties</label>-->
<!--          <b-form-select v-model="properties" class="mb-2 mr-sm-5 mb-sm-0">-->
<!--            <b-form-select-option value="array">array</b-form-select-option>-->
<!--            <b-form-select-option value="object">object</b-form-select-option>-->
<!--          </b-form-select>-->
<!--          <label class="mr-sm-2">Required</label>-->
<!--          <b-form-select v-model="required" class="mb-2 mr-sm-2 mb-sm-0">-->
<!--            <b-form-select-option value="array">array</b-form-select-option>-->
<!--            <b-form-select-option value="object">object</b-form-select-option>-->
<!--          </b-form-select>-->
<!--        </b-form>-->
<!--      </b-col>-->
    </b-row>
    <b-row class="mt-2">
      <b-col cols="7">
        <dynamic-form-creator v-model="schema" v-bind:custom-properties="customProperties"
                              v-bind:custom-example="customExample" v-on:submit="submitSchema">
          <template v-slot:modal(fullName)="{value, type}">
            ERROR MESSAGE:
            <b-form-input v-model="value.errorText"/>
          </template>
          <template v-slot:property(address)="{value, item, name}">
            <b-row>
              <b-col>
                <b-form-input v-model="value[name].aimag" placeholder="Аймаг/Нийслэл"/>
              </b-col>
              <b-col>
                <b-form-input v-model="value[name].soum" placeholder="Сум/Дүүрэг"/>
              </b-col>
              <b-col>
                <b-form-input v-model="value[name].bagKhoroo" placeholder="Баг хороо/Хороо"/>
              </b-col>
              <b-col>
                <b-form-input v-model="value[name].street" placeholder="Гудамж, хаяг"/>
              </b-col>
            </b-row>
          </template>
          <template v-slot:property(fullName)="{value, item, name}">
            <b-input-group>
              <b-form-input v-model="value[name].lastName" placeholder="lastName"/>
              <b-form-input v-model="value[name].firstName" placeholder="firstName"/>
            </b-input-group>
          </template>
        </dynamic-form-creator>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON SCHEMA">
          <pre>{{ schema | jsonFormat }}</pre>
          <pre>{{ schema | unquotedJsonFormat }}</pre>
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
      customProperties: [
        {value: 'address', text: 'Address'},
        {value: 'fullName', text: 'Full Name'},
      ],
      customExample: {
        address: {
          aimag: "", soum: "", bagKhoroo: "", street: ""
        },
        fullName: {
          lastName: "", firstName: ""
        }
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
