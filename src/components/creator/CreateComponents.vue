<template>
  <div>
    <div>
      <label>Name:
        <input v-model="value.name"/>
      </label>
      <label>Label:
        <input v-model="value.label"/>
      </label>
      <label>Type:
        <select v-model="value.type" @change="updateValue($event)">
          <option value="string">string</option>
          <option value="email">email</option>
        </select>
      </label>
      <label>
        <input type="checkbox" v-model="value.required"/>
      </label>
    </div>
    <div class="marTop">
      <create-string v-if="value.type === 'string'" v-model="value"/>
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
  props: ['value'],
  methods: {
    updateValue() {
      this.$emit('input', {
        type: this.value.type,
        name: this.value.name,
        label: this.value.label,
        columns: this.value.columns,
        required: this.value.required,
      })
    }
  }
}
</script>

<style scoped>
label {
  margin: 0 20px 0 0;
}
.marTop {
  margin-top: 10px;
}
</style>