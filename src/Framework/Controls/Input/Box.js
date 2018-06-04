define(['Controls/Input/Base', 'text!Controls/Input/Box/Box.tpl'], function (BaseInput, tpl) {
   class TextBox extends BaseInput {
       constructor(node, options) {
           super(node, options, tpl);
       }
   }

   return TextBox;
});