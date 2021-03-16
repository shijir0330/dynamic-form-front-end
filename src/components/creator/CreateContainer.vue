<template>
  <div class="padding">
    <input type="checkbox" v-model="value.properties"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CreateContainer",
  props: ['value'],
}
</script>

<style scoped>

</style>