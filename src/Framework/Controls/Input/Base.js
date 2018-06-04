define([
        'Core/Control',
        'Core/Data/Model',
        'css!Controls/Input/Base/Base.css'
    ],
    function (Control, BaseModel) {

        /**
         * Класс BaseInput
         * Базовый класс для всех полей ввода
         * Привязывает к контролу модель, также добавляет подписки обновляющие связанную модель
         * Реализует собственный плэйсхолдер
         */

        class BaseInput extends Control {
            constructor(node, options, tpl) {
                super(node, options, tpl);
            }

            _modifyOptions(options, node) {
                super._modifyOptions(options, node);
                this.inputModel = new BaseModel({
                    value: options.value
                });
            }

            init() {
                let input = this._children.input;
                input.addEventListener('input', this._inputHandler.bind(this));
                input.addEventListener('focusOut', this._focusOutHandler.bind(this));
                input.addEventListener('focusIn', this._focusInHandler.bind(this));
            }

            _inputHandler(event) {
                let value = event.target.value;
                this.inputModel.updateField('value', value);
                this._checkPlaceHolder(value);
                this._notify('valueChanged', [value], event);
            }

            _focusOutHandler(event) {
                this._notify('focusOut', [], event);
            }

            _focusInHandler(event) {
                this._notify('focusIn', [], event);
            }

            _checkPlaceHolder(value) {
                if (this._options.placeholder) {
                    if (value !== '') {
                        this._children.placeholder.hide();
                    } else {
                        this._children.placeholder.show();
                    }
                }
            }

            setValue(newValue) {
                this.inputModel.updateField('value', newValue);
                this._children.input.value = newValue;
                this._checkPlaceHolder(newValue);
            }

            getValue() {
                return this.inputModel.getField('value');
            }
        }

        return BaseInput;
    });
