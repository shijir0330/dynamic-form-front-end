<template>
  <b-card class="property-div">
    <div>
      <label>Name:
        <b-form-input v-model="value.name"/>
      </label>
      <label>Label:
        <b-form-input v-model="value.label"/>
      </label>
      <label>Type:
        <b-form-select v-model="value.type" @change="updateValue">
          <b-form-select-option value="string">string</b-form-select-option>
          <b-form-select-option value="number">number</b-form-select-option>
        </b-form-select>
      </label>
    </div>
    <div class="marTop">
      <create-string v-if="value.type === 'string'" v-model="value" v-on:update-value="updateValue2"/>
    </div>
    <template #footer>
      <div class="float-right">
        <b-link pill @click="duplicateProperty">
          <b-icon class="mr-3 text-secondary" icon="files" scale="1.1"/>
        </b-link>
        <b-link pill @click="removeProperty">
          <b-icon class="mr-3 text-secondary" icon="trash" scale="1.1"/>
        </b-link> |
        <label class="ml-3">Required
          <b-form-checkbox class="float-right ml-2" switch v-model="value.required"/>
        </label>
      </div>
    </template>
  </b-card>
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
    value: Object,
    index: Number
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
    },
    duplicateProperty() {
      const {...values} = this.value
      this.$emit('duplicate-property', values, this.index);
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
  /*border-style: solid;*/
  /*border-width: 1px;*/
  /*border-color: black;*/
  /*padding: 10px;*/
  margin: 10px 0;
}

label {
  margin: 0 20px 0 0;
}

.marTop {
  margin-top: 10px;
}
</style>