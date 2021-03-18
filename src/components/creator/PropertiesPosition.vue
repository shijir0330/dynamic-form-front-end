<template>
  <div>
    <b-row class="mt-2">
      <b-col cols="7">
        <b-card header-class="">
          <template #header>
            <b-form inline>
              <label class="mr-2">Form Name:</label>
              {{ value.formName }}
            </b-form>
          </template>
          <b-row>
            <b-col v-for="(item, index) in value.properties" v-bind:key="index" :cols="item.column">
              <div draggable="true" class="property-div"
                   @dragstart="startDrag($event, index)"
                   @drop="onDrop($event, index)"
                   @dragenter.prevent="dragEnter($event)"
                   @dragleave.prevent="dragLeave($event)"
                   @dragover.prevent>
                {{ `${item.name} : ${item.type}` }}
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="JSON">
          <pre>{{ getJson | jsonFormat }}</pre>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PropertiesPosition",
  props: ['value'],
  filters: {
    jsonFormat: function (value) {
      if (!value) return '';
      return JSON.stringify(value, null, '\t');
    }
  },
  computed: {
    getJson() {
      return this.value.properties.map(x => {
        return {
          name: x.name,
          column: x.column
        }
      })
    }
  },
  methods: {
    startDrag(event, index) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemIndex', index);
    },
    onDrop(event, index) {
      event.target.style.background = "";
      const _index = event.dataTransfer.getData('itemIndex')
      let _item = this.value.properties[_index]
      this.value.properties.splice(_index, 1);
      this.value.properties.splice(index, 0, _item);
    },
    dragEnter(event) {
      event.target.style.background = "lightgray";
    },
    dragLeave(event) {
      event.target.style.background = "";
    },
  },
}
</script>

<style scoped>
.drop-div {
  height: 40px;
  /*margin-bottom: 10px;*/
  border-width: 2px;
  border-style: dashed;
  border-color: black;
}

.component-div {
  cursor: pointer;
  background: gray;
  color: white;
  text-align: center;
  padding: 10px;
  width: 150px;
  float: left;
  margin-right: 10px;
}

.button-x {
  float: right;
}

.property-div {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  margin: 10px 0;
}
</style>