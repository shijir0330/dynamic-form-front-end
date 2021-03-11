<template>
  <div>
    <b-row>
      <b-col cols="8">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name</label>
              <!--              <b-form-group label="Form Name" class="mr-2">-->
              <b-form-input v-model="formName" class="mr-2"></b-form-input>
              <!--              </b-form-group>-->
              <!--              <label class="mr-2">Column number</label>-->
              <!--              <b-form-group label="Column number" class="mr-2">-->
              <!--                <b-form-input v-model="formColumn" type="number"></b-form-input>-->
              <!--              </b-form-group>-->
            </b-form>
          </template>
          <div v-for="(component, index) in properties" v-bind:key="index">
            <div @drop="onDrop($event, index)" @dragenter.prevent @dragover.prevent="changeStyle" :style="style"/>
<!--            <div @dragstart="startDrag($event, component)">-->
              <create-string v-model="component.object" v-if="component.type === 'string'"/>
              <!--            <create-number v-model="component.object" v-if="component.type === 'number'"/>-->
<!--            </div>-->
          </div>
          <div @drop="onDrop($event, properties.length)" @dragenter.prevent @dragover.prevent
               style="height: 10px; background-color: red; border-width: 2px; border-style: solid; border-color: black"/>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card header="Components">
          <div v-for="item in components"
               :draggable="true"
               @dragstart="startDrag($event, item)"
               v-on:click="add(item.type, item.properties)">
            String
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button v-on:click="createJson()">Create Json</b-button>
        <b-card>
          {{ schema }}
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
      components: [
        {type: 'string', properties: {name: null, minLength: null, maxLength: null, required: false}}
      ],
      style: 'height: 10px; background-color: blue',
      formName: '',
      formColumn: 1,
      properties: [],
      schema: null
    }
  },
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemType', item.type);
    },
    onDrop(event, index) {
      const type = event.dataTransfer.getData('itemType')
      const item = this.components.find((item) => item.type === type);
      this.properties.splice(index, 0, {type: item.type, object: item.properties});
    },
    changeStyle() {
      this.style = 'border-width: 2px; border-style: solid; border-color: black'
    },
    add(type, object) {
      this.properties.push({type: type, object: object});
    },
    createJson() {
      let schemaFormat = {name: this.formName, properties: {}};
      this.properties.forEach((x) => {
        const {name, ...others} = x.object;
        schemaFormat.properties[name] = {type: x.type, ...others};
      })
      this.schema = schemaFormat;
    }
  }
}
</script>

<style scoped>

</style>
