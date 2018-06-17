define([
    'Core/Control',
    'text!Controls/App/App.tpl'
        ], function (Control, tpl) {
    class App extends Control {
        constructor(node, options) {
            super(node, options);
        }

        _getDefaultOptions() {
            return {
                header: 'HelloWorld',
                pageName: 'App',
                name: 'Application'
            }
        }
        init() {
            super.init();
            this._children.myButton.subscribe('click', function () {
                alert('123');
            })
        }
    }

    App._template = tpl;
    return App
});