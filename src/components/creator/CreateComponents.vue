<template>
  <div>
    <div>
      <label>Name:
        <input v-model="item.name"/>
      </label>
      <label>Label:
        <input v-model="item.label"/>
      </label>
      <label>Type:
        <select v-model="item.type">
          <option value="string">string</option>
        </select>
      </label>
      <label>
        <input type="checkbox" v-model="item.required"/>
      </label>
    </div>
    <div>
      <create-string v-if="item.type === 'string'" v-model="item"/>
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
  props: ['item']
}
</script>

<style scoped>
label {
  margin-right: 20px;
}
</style>