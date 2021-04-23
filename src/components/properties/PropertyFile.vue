<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Prepend">
          <b-input-group>
            <b-input-group-prepend v-if="value.prependIcon">
              <b-input-group-text>
                <b-icon :icon="value.prepend"/>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.prepend" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.prependIcon"
                               :value="true" :unchecked-value="undefined"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Append">
          <b-input-group>
            <b-input-group-prepend v-if="value.appendIcon">
              <b-input-group-text>
                <b-icon :icon="value.append"/>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.append" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.appendIcon"
                               :value="true" :unchecked-value="undefined"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Placeholder">
          <b-form-input v-model="value.placeholder" autocomplete="off"/>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Drop placeholder">
          <b-form-input v-model="value.dropPlaceholder" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Validations
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Accept">
          <b-form-input v-model="value.accept" autocomplete="off"/>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Custom error text">
          <b-form-input v-model="value.errorText" autocomplete="off"/>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PropertyFile",
  props: ['value']
}
</script>

<style scoped>

</style>