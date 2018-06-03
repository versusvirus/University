define([
    'Controls/Control',
    'text!./App.html'
        ], function (Control, tpl) {
    class App extends Control {
        constructor(node, options) {
            super(node, tpl);
        }
    }
    return App
});