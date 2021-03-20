<template>
  <div class="property-div">
    <div>
      <label>Name:
        <input v-model="value.name"/>
      </label>
      <label>Label:
        <input v-model="value.label"/>
      </label>
      <label>Type:
        <select v-model="value.type" @change="updateValue">
          <option value="string">string</option>
          <option value="number">number</option>
        </select>
      </label>
    </div>
    <div class="marTop">
      <create-string v-if="value.type === 'string'" v-model="value" v-on:update-value="updateValue2"/>
    </div>
    <div class="control-panel">
      <label class="switch">Required
        <input type="checkbox" v-model="value.required"/>
        <span class="slider round"></span>
      </label>

      <b-button pill @click="removeProperty">
        <b-icon icon="trash"/>
      </b-button>
    </div>
  </div>
</template>

<script>
import CreateString from '@/components/creator/CreateString'
import CreateNumber from "@/components/creator/CreateNumber";

export default {
  name: "CreateComponents",
  components: {
    CreateString,
    CreateNumber
  },
  props: {
    value: Object
  },
  methods: {
    updateValue() {
      this.$emit('input', {
        type: this.value.type,
        name: this.value.name,
        label: this.value.label,
        column: this.value.column,
        required: this.value.required,
      });
    },
    updateValue2(values) {
      this.$emit('input', values);
    },
    removeProperty() {
      this.$emit('remove-property');
    }
  }
}
</script>

<style scoped>
.control-panel {
  border-top: #cccccc;
  border-width: 1px 0 0 0;
  border-style: solid;
  padding-top: 10px;
  text-align: right;
}

.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 10px;
  margin: 10px 0;
}

label {
  margin: 0 20px 0 0;
}

.marTop {
  margin-top: 10px;
}
</style>