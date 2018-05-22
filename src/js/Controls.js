class Control {
    constructor(node) {
        this._options = Control.getNodeOptions(node);
        this._container = node;
        this._buildMarkup(this._options);
        this._options.enabled = this._options.enabled !== "false";
        this.setEnabled(this._options.enabled);
        this.getContainer().setAttribute('init', true);
    }

    getContainer() {
        return this._container;
    }

    getOptions() {
        return this._options;
    }

    /**
     * Получить опцию по имени
     * @param optionName
     * @returns {*}
     */
    getOption(optionName) {
        return this._options[optionName];
    }

    /**
     * Проставить в опцию значение
     * @param optionName
     * @param value
     */
    setOption(optionName, value) {
        this._options[optionName] = value;
    }

    /**
     * Перерисовать контрол
     */
    redraw() {
        this._buildMarkup(this._options);
    }

    setEnabled(state) {
        if (state) {
            this.getContainer().classList.remove('control-disabled');
            this.getContainer().classList.add('control-enabled');
        } else {
            this.getContainer().classList.add('control-disabled');
            this.getContainer().classList.remove('control-enabled');
        }
        this.setOption('enabled', state);
    }

    isEnabled() {
        return this._options.enabled;
    }

    /**
     * Получить дочерний контрол по имени
     * @param (String) controlName
     */
    getChildControlByName(controlName) {
        let childrenControl = this.getContainer().querySelector(`[data-component][data-name="${controlName}"]`);
        if (childrenControl) {
            return childrenControl.control;
        } else {
            console.error(`Контрола с именем ${controlName} нет в данном компоненте`);
        }
    }

    static reviveNodeControls(node) {
        let controls = node.querySelectorAll('[data-component]');

        controls.forEach(function (controlNode) {
            new CONTROLS_NAMES[controlNode.getAttribute('data-component')](controlNode);
        });
    }

    static getNodeOptions(node) {
        let options = {};
        for (let i = 0, len = node.attributes.length; i < len; i++) {
            options[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
        }
        return options;
    }

    static getOption(option, isAttr, attrName) {
        if (option) {
            if (!isAttr) {
                return option;
            } else {
                return `${attrName}="${option}"`;
            }
        } else {
            return '';
        }
    }

    static getNodeControls(node) {
        let childrenControlsDom = node.querySelectorAll('[data-component][init]'),
            childrenControlsArr = [];
        childrenControlsDom.forEach(function (node) {
            childrenControlsArr.push(node.control);
        });
        if (node.control) {
            childrenControlsArr.push(node.control);
        }
        return childrenControlsArr;
    }

    _buildMarkup(options) {
        let markup = this._prepareMarkup(options),
            tmpNode = document.createElement('div'),
            pNode = this._container.parentNode,
            nNode;
        tmpNode.innerHTML = markup;
        nNode = tmpNode.firstChild;
        pNode.replaceChild(nNode, this._container);
        this._container = nNode;
        this._container.control = this;
    }
}

class ButtonBase extends Control {
    constructor(node) {
        super(node);
        this._clickEvent = new Event('activated', {bubbles: true});
    }

    _changeEvent(node) {
        node.addEventListener('click', function (event) {
            event.preventDefault();
            node.dispatchEvent(this.control._clickEvent);
        })
    }
}

class Button extends ButtonBase {
    constructor(node) {
        super(node);
        this._changeEvent(this.getContainer());
    }

    setCaption(newCaption) {
        this.getContainer().innerText = newCaption;
        this.setOption('caption', newCaption);
    }

    getCaption() {
        return this._options.caption;
    }

    setEnabled(state) {
        super.setEnabled(state);
        this.getContainer().setEnabled(state);
    }

    _prepareMarkup(opts) {
        return `<button data-component="Button"
                        class="controls-Button ${Control.getOption(opts.className)}"
                        data-name="${Control.getOption(opts.name)}"/>
                            ${Control.getOption(opts.caption)}
                </button>`;
    }
}

class InputBase extends Control {
    constructor(node) {
        super(node);
        this.placeholder = this.getContainer().querySelector('.controls-Input__placeholder');
        this.setValue(this.getOption('value'));
        this.inputControl.addEventListener('input', function (event) {
            this.setValue(event.target.value);
        }.bind(this))
    }

    getValue() {
        return this._options.value;
    }

    setValue(value) {
        let newValue = value || '';
        this._checkPlaceHolder(newValue);
        this.inputControl.value = newValue;
        this.setOption('value', newValue);
    }

    setEnabled(state) {
        super.setEnabled(state);
        this.inputControl.setEnabled(state);
        if (this.placeholder) {
            this._checkPlaceHolder(this.getValue());
        }
    }

    _checkPlaceHolder(value) {
        if ((value === '' || value === undefined) && this.isEnabled()) {
            this.placeholder.style.display = 'block';
        } else {
            this.placeholder.style.display = 'none';
        }
    }

    _buildMarkup(opts) {
        super._buildMarkup(opts);
        this.inputControl = this.getContainer().firstChild;
    }
    _prepareMarkup(opts) {
        let outPutMarkup = `<div class="controls-Input controls-Input${opts.type} ${Control.getOption(opts.className)}" data-component="Input${opts.type}" data-name="${Control.getOption(opts.name)}">`;
        switch (opts.type) {
            case 'Area':
                outPutMarkup = `${outPutMarkup}<textarea/></textarea>
                                <div class="controls-Input__placeholder">${Control.getOption(opts.placeholder)}</div>
                        </div>`;
                break;
            default:
                outPutMarkup = `${outPutMarkup}<input type="${Control.getOption(opts.type)}"/>
                                <div class="controls-Input__placeholder">${Control.getOption(opts.placeholder)}</div>
                        </div>`;
                break;
        }
        return outPutMarkup;
    }

}

class NumberBox extends InputBase {
    constructor(node) {
        super(node);
        this.getContainer().setAttribute('data-component', 'NumberBox');
        this.inputControl.addEventListener('keydown', this._keyDownHandler);
        this.inputControl.addEventListener('keyup', this._keyUpHandler);
        this.inputControl.addEventListener('focusout', this._focusOutHandler);
    }
    _keyDownHandler(event) {
        if(event.key === 'Shift') {
            this._SHIFT_PRESS = true;
        }
        if(event.key === 'a' && event.ctrlKey) {
            event.target.selectionStart = 0;
            event.target.selectionEnd = event.target.value.length;
            return;
        }
        if(event.key === 'Tab') {
            return;
        }
        if (!((!(this._SHIFT_PRESS) && (event.keyCode >= 48 && event.keyCode <= 57)) || event.key === 'Delete' || event.key === 'Backspace')) {
            event.preventDefault();
        }
    }
    _keyUpHandler(event) {
        this._SHIFT_PRESS = false;
    }
    _focusOutHandler(event) {
        this._SHIFT_PRESS = false;
    }
}

class App extends Control {
    constructor(node) {
        super(node);
        this._reviveComponents();
    }

    _prepareMarkup(opts) {
        return `<div data-component="App" data-name=${Control.getOption(opts.name)}>${this.getContainer().innerHTML}</div>`;
    }

    _reviveComponents() {
        let components = this.getContainer().querySelectorAll('[data-component]');

        components.forEach(function (control) {
            new CONTROLS_NAMES[control.getAttribute('data-component')](control);
        });
    }
}

const CONTROLS_NAMES = {
    Input: InputBase,
    Button: Button,
    NumberBox: NumberBox
};

HTMLElement.prototype.toggleClass = function (className, state) {
    if(state === undefined) {
        this.classList.toggle(className);
    } else {
        if (state) {
            this.classList.add(className);
        } else {
            this.classList.remove(className);
        }
    }
};

HTMLElement.prototype.setEnabled = function (state) {
    if (state) {
        this.removeAttribute('disabled');
    } else {
        this.setAttribute('disabled', true);
    }
};