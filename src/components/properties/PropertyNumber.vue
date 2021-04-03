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
    </b-row>
    <b-row>
      <b-col class="text-center font-weight-bold">
        Validations
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Minimum value">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text v-if="value.exclusiveMinimum">></b-input-group-text>
              <b-input-group-text v-else>>=</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.minimum" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.exclusiveMinimum"
                               :value="true" :unchecked-value="undefined"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Maximum value">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text v-if="value.exclusiveMaximum"><</b-input-group-text>
              <b-input-group-text v-else><=</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="value.maximum" autocomplete="off"/>
            <b-input-group-append is-text>
              <b-form-checkbox switch class="mr-n2" v-model="value.exclusiveMaximum"
                               :value="true" :unchecked-value="undefined"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Multiple of" label-cols="3">
          <b-input-group>
            <b-form-input v-model="value.multipleOf" autocomplete="off"/>
            <b-input-group-append>
              <b-input-group-text>1 is integer</b-input-group-text>
            </b-input-group-append>
          </b-input-group>
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
  name: "NumberProperty",
  props: ['value'],
}
</script>

<style scoped>

</style>