<template>
  <div>
    <b-row>
      <b-col cols="7"/>
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
      <b-col>
        <dynamic-form-creator v-model="schema" v-bind:properties="properties" v-bind:required="required"/>
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
  data() {
    return {
      properties: 'array',
      required: 'array',
      schema: {
        name: '',
        properties: [],
      }
    }
  }
}
</script>

<style scoped>

</style>
