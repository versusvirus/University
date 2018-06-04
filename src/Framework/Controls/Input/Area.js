define(['Controls/Input/Base', 'text!Controls/Input/Area/Area.tpl'], function (BaseInput, tpl) {
    class TextArea extends BaseInput {
        constructor(node, options) {
            super(node, options, tpl);
        }
    }

    return TextArea;
});