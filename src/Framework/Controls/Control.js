define(['Core/Abstract'], function(Abstract) {
    class Control extends Abstract {
        constructor(node, template) {
            super();
            this._modifyOptions(node, template);
        }

        _modifyOptions(node, template) {
            this._container = node;
            this._container.innerHTML = template;
        }

        _constructor() {

        }

        _initChildControls() {

        }

        init() {

        }
    }

    return Control;
});
