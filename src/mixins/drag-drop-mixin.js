const dragDropMixin = {
    filters: {
        jsonFormat: function (value) {
            if (!value) return '';
            return JSON.stringify(value, null, '\t');
        }
    },
    methods: {
        startDrag(event, item) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemType', item.type);
            this.drag = true;
        },
        startDragPosition(event, index) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemIndex', index);
        },
        endDrag() {
            this.drag = false;
        },
        onDrop(event, index) {
            event.target.style.background = "";
            if (this.drag) {
                const _type = event.dataTransfer.getData('itemType')
                const {type, edit, properties: {columns, name, label, ...properties}} = this.components.find((item) => item.type === _type);
                this.properties.splice(index, 0, {
                    type: type,
                    edit: edit,
                    properties: {
                        name: name ? name : type + this.properties.length,
                        label: label ? label : type + this.properties.length,
                        columns: columns,
                        ...properties
                    },
                });
                this.drag = false;
            } else {
                const _index = event.dataTransfer.getData('itemIndex')
                const {type, edit, properties} = this.properties[_index];
                this.properties.splice(_index, 1);
                this.properties.splice(index, 0, {type: type, edit: edit, properties: properties});
            }
        },
        dragEnter(event) {
            event.target.style.background = "lightgray";
        },
        dragLeave(event) {
            event.target.style.background = "";
        },
    },
};

export {dragDropMixin};
