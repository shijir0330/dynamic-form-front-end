<template>
  <b-form-group :label-cols="item.labelColumn" :label-align="item.labelAlign">
    <template v-slot:label v-if="!(item.type === 'object' && !item.showLabel)">
      {{ item.label }} <span v-if="item.required" class="text-danger">*</span>
    </template>
    <template v-if="item.type === 'string'">
      <b-input-group>
        <b-input-group-prepend v-if="item.prepend">
          <b-input-group-text>
            <b-icon v-if="item.prependIcon" :icon="item.prepend"/>
            <template v-else>{{ item.prepend }}</template>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-datepicker v-if="item.format === 'date'" v-model="value[item.name]"
                           :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
        <b-form-timepicker v-else-if="item.format === 'time'" v-model="value[item.name]" locale="en"
                           :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
        <b-form-input v-else :type="item.format" v-model="value[item.name]" autocomplete="off"
                      :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
        <b-input-group-append v-if="item.append">
          <b-input-group-text>
            <b-icon v-if="item.appendIcon" :icon="item.append"/>
            <template v-else>{{ item.append }}</template>
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
        {{ item.errorText }}
      </b-form-invalid-feedback>
    </template>
    <template v-else-if="item.type === 'number'">
      <b-input-group>
        <b-input-group-prepend v-if="item.prepend">
          <b-input-group-text>
            <b-icon v-if="item.prependIcon" :icon="item.prepend"/>
            <template v-else>{{ item.prepend }}</template>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input v-model="value[item.name]" type="number" autocomplete="off"
                      :state="validated ? validator[item.name] : null" :placeholder="item.placeholder"/>
        <b-input-group-append v-if="item.append">
          <b-input-group-text>
            <b-icon v-if="item.appendIcon" :icon="item.append"/>
            <template v-else>{{ item.append }}</template>
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
        {{ item.errorText }}
      </b-form-invalid-feedback>
    </template>
    <template v-else-if="item.type === 'choice'">
      <b-input-group>
        <b-input-group-prepend v-if="item.prepend">
          <b-input-group-text>
            <b-icon v-if="item.prependIcon" :icon="item.prepend"/>
            <template v-else>{{ item.prepend }}</template>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-radio-group v-if="item.format === 'radio'" v-model="value[item.name]"
                            :options="item.options" :stacked="!!item.stacked"
                            :state="validated ? validator[item.name] : null"/>
        <b-form-checkbox-group v-else-if="item.format === 'checkbox'" v-model="value[item.name]"
                               :options="item.options" :stacked="item.stacked"
                               :state="validated ? validator[item.name] : null"/>
        <b-form-select v-else v-model="value[item.name]"
                       :options="item.options"
                       :state="validated ? validator[item.name] : null"/>
        <b-input-group-append v-if="item.append">
          <b-input-group-text>
            <b-icon v-if="item.appendIcon" :icon="item.append"/>
            <template v-else>{{ item.append }}</template>
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
        {{ item.errorText }}
      </b-form-invalid-feedback>
    </template>
    <template v-else-if="item.type === 'boolean'">
      <b-form-checkbox v-if="item.format === 'checkbox'" v-model="value[item.name]"
                       :value="item.trueValue" :unchecked-value="item.falseValue"
                       :state="validated ? validator[item.name] : null"
      >{{ item.trueText }}
      </b-form-checkbox>
      <b-form-checkbox v-else-if="item.format === 'switch'" switch v-model="value[item.name]"
                       :value="item.trueValue" :unchecked-value="item.falseValue"
                       :state="validated ? validator[item.name] : null"
      >{{ item.trueText }}
      </b-form-checkbox>
      <b-form-radio-group v-else v-model="value[item.name]"
                          :stacked="item.stacked"
                          :state="validated ? validator[item.name] : null"
      >
        <b-form-radio :value="item.trueValue">{{ item.trueText }}</b-form-radio>
        <b-form-radio :value="item.falseValue">{{ item.falseText }}</b-form-radio>
      </b-form-radio-group>
      <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
        {{ item.errorText }}
      </b-form-invalid-feedback>
    </template>
    <template v-else-if="item.type === 'file'">
      <b-input-group>
        <b-input-group-prepend v-if="item.prepend">
          <b-input-group-text>
            <b-icon v-if="item.prependIcon" :icon="item.prepend"/>
            <template v-else>{{ item.prepend }}</template>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-file v-model="value[item.name]"
                     :placeholder="item.placeholder"
                     :drop-placeholder="item.dropPlaceholder"
                     :accept="item.accept"
                     :state="validated ? validator[item.name] : null"/>
        <b-input-group-append v-if="item.append">
          <b-input-group-text>
            <b-icon v-if="item.appendIcon" :icon="item.append"/>
            <template v-else>{{ item.append }}</template>
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback v-if="item.errorText" :state="validated ? validator[item.name] : null">
        {{ item.errorText }}
      </b-form-invalid-feedback>
    </template>
    <template v-else-if="item.type === 'object'">
      <b-row>
        <b-col v-for="(_item, index) in item.properties" v-bind:key="index" :cols="_item.column">
          <generate-properties v-model="value[item.name]" :item="_item" :validated="validated"
                               :validator="validator[item.name]" :custom-properties="customProperties">
            <template :slot="`property(${c.value})`" slot-scope="{value, item, name}" v-for="c in customProperties">
              <slot :name="`property(${c.value})`" v-bind:value="value" v-bind:item="item" v-bind:name="name"></slot>
            </template>
          </generate-properties>
        </b-col>
      </b-row>
    </template>
    <div v-else v-for="c in customProperties" :key="c.value">
      <slot v-if="item.type === c.value" :name="`property(${c.value})`"
            v-bind:value="value" v-bind:item="item" v-bind:name="item.name">
        {{ `property(${c.value})` }}
      </slot>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: "GenerateProperties",
  props: ['value', 'item', 'validated', 'validator', 'customProperties']
}
</script>

<style scoped>

</style>