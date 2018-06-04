define([
    'Core/Control',
    'text!Controls/App/App.tpl'
        ], function (Control, tpl) {
    class App extends Control {
        constructor(node, options) {
            super(node, options, tpl);
        }

        _getDefaultOptions() {
            return {
                header: 'HelloWorld',
                pageName: 'App',
                name: 'Application'
            }
        }
    }
    return App
});