<template>
  <div>
    <b-row>
      <b-col cols="8">
        <b-card header-class="">
          <template #header>
            <b-form-group label="Form Name" label-cols="4">
              <b-form-input v-model="formName"></b-form-input>
            </b-form-group>
          </template>
          <div v-for="(component, index) in properties" v-bind:key="index">
            <create-string v-model="component.object" v-if="component.type === 'string'"/>
            <create-number v-model="component.object" v-if="component.type === 'number'"/>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card header="Components">
          <b-button v-on:click="add('string', {name: null, minLength: null, maxLength: null})" block>String</b-button>
          <b-button
              v-on:click="add('number', {name: null, minLength: null, maxLength: null, minValue: null, maxValue: null})"
              block>Number
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button v-on:click="createJson()">Create Json</b-button>
        <b-card>
          {{schema}}
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CreateString from '@/components/creator/CreateString'
import CreateNumber from "@/components/creator/CreateNumber";

export default {
  name: 'DynamicFormCreator',
  components: {
    CreateString,
    CreateNumber
  },
  data() {
    return {
      formName: '',
      properties: [],
      schema: null
    }
  },
  methods: {
    add(type, object) {
      this.properties.push({type: type, object: object});
    },
    createJson() {
      let schemaFormat = {name: this.formName, object: {}};
      this.properties.forEach((x) => {
        const {name, ...others} = x.object;
        schemaFormat.object[name] = {type: x.type, ...others};
      })
      this.schema = schemaFormat;
    }
  }
}
</script>

<style scoped>

</style>
