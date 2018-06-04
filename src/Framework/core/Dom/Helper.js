define([], function () {
    return {
        getNodeOptions: function (node) {
            let options = {};
            for (let i = 0, len = node.attributes.length; i < len; i++) {
                if (node.attributes[i].name !== 'class' && node.attributes[i].name !== 'id') {
                    options[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
                }
            }
            return options;
        },
        getControlName: function (nodeTagName) {
            let controlName = nodeTagName.split('.');
            for (let i = 0; i < controlName.length; i++) {
                controlName[i] = controlName[i][0].toUpperCase() + controlName[i].slice(1, controlName[i].length).toLowerCase();
            }

            controlName = controlName.join('/');

            return controlName;
        }
    }
});