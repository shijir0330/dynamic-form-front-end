<template>
  <div>
    <h1>Property generator</h1>
    <dynamic-form-generator v-model="data" :schema="schema" v-on:submit="submit">
      <b-row>
        <b-col class="text-center">
          <b-button type="submit">SUBMIT FORM</b-button>
        </b-col>
      </b-row>
    </dynamic-form-generator>
  </div>
</template>

<script>
import DynamicFormGenerator from "@/components/DynamicFormGenerator";

export default {
  name: "Home",
  components: {
    DynamicFormGenerator
  },
  data() {
    return {
      data: {},
      schema: {
        name: "name",
        properties: [
          {
            type: "choice",
            name: "property1",
            label: "property1",
            column: 12,
            required: true,
            format: "checkbox",
            options: [
              {
                value: "Option 1",
                text: "Option 1"
              },
              {
                value: "Option 2",
                text: "Option 2"
              },
              {
                value: "Option 3",
                text: "Option 3"
              },
              {
                value: "Option 4",
                text: "Option 4"
              }
            ],
            errorText: "2-3",
            minLength: "2",
            maxLength: "3"
          },
          {
            type: "number",
            name: "property2",
            label: "property2",
            column: 6,
            required: false
          },
          {
            type: "string",
            name: "property3",
            label: "property3",
            column: 6,
            required: true,
            prepend: "at",
            prependIcon: true,
            format: "email",
            errorText: "email"
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      const tempData = {name: this.schema.name, properties: []};
      const values = Object.entries(this.data);
      values.forEach(([key, value]) => {
        tempData.properties.push({name: key, value: value});
      });
      console.log('tempData', tempData);
    }
  }
}
</script>