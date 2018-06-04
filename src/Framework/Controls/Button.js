define([
    'Core/Control',
    'text!Controls/Button/Button.tpl',
    'css!Controls/Button/Button.css'
    ],
    function (Control, tpl) {
        class Button extends Control {
            constructor(node, options) {
                super(node, options, tpl);
            }

            init() {
                super.init();
                let self = this;
                this._container.addEventListener('click', function () {
                    self._notify('click', []);
                });
            }
        }

        return Button;
    });