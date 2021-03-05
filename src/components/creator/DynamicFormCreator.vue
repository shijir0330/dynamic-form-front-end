<template>
  <div>
    <b-row>
      <b-col cols="8">
        Form
        <div v-for="(component, index) in schema" v-bind:key="index">
          <create-string v-if="component.type === 'string'"></create-string>
        </div>
      </b-col>
      <b-col cols="4">
        Components
        <b-button v-on:click="add('string')" block>String</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CreateString from '@/components/creator/CreateString'

export default {
  name: 'DynamicFormCreator',
  components: {
    CreateString
  },
  data() {
    return {
      schema: []
    }
  },
  methods: {
    add(type) {
      this.schema.push({type: type})
    }
  }
}
</script>

<style scoped>

</style>
