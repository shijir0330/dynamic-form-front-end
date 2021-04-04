<template>
  <div>
    <b-row class="mb-2 text-center">
      <b-col>
        <b-button-group>
          <b-button :variant="state === 'editing' ? 'primary' : 'light'"
                    v-on:click="state = 'editing'"
          >EDIT
          </b-button>
          <b-button :variant="state === 'positioning' ? 'primary' : 'light'"
                    v-on:click="state = 'positioning'"
          >POSITIONING
          </b-button>
<!--          <b-button :variant="state === 'preview' ? 'primary' : 'light'"-->
<!--                    v-on:click="state = 'preview'"-->
<!--          >PREVIEW-->
<!--          </b-button>-->
        </b-button-group>
      </b-col>
    </b-row>
    <b-row v-if="state === 'editing'">
      <b-col v-for="index in value.properties.length" v-bind:key="index" cols="12">
        <create-properties class="mb-2"
                           v-model="value.properties[index-1]"
                           v-bind:index="index-1" v-bind:validated="validated"
                           v-on:remove-property="removeProperty(index-1)"
                           v-on:duplicate-property="duplicateProperty"
        />
      </b-col>
      <b-col cols="12">
        <b-button variant="outline-primary" block size="sm" @click="addProperty">
          <b-icon icon="plus"/>
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="state === 'positioning'">
      <b-col>
        <properties-position v-model="value"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PropertiesPosition from "@/components/PropertiesPosition";

export default {
  name: "PropertyObject",
  components: {PropertiesPosition},
  props: ['value', 'validated'],
  data() {
    return {
      state: 'editing'
    }
  },
  methods: {
    addProperty() {
      if (!this.value.properties)
        this.value.properties = []
      this.value.properties.push({
        type: "string",
        name: `property${this.value.properties.length + 1}`,
        label: `property${this.value.properties.length + 1}`,
        column: 12,
        required: false
      });
    },
    duplicateProperty(item, index) {
      this.value.properties.splice(index, 0, item);
    },
    removeProperty(index) {
      this.value.properties.splice(index, 1);
    },
  }
}
</script>

<style scoped>

</style>