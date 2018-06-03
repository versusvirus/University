class SyntheticEvent {
    constructor(eventType, eventCaller, nativeEvent) {
        this.eventType = eventType;
        this.eventCaller = eventCaller;
        nativeEvent && (this.nativeEvent = nativeEvent);
    }
}

const Mixins = {
    NotifyControlMixin: {
        _notify: function (eventType, args, nativeEvent) {
            let event = new SyntheticEvent(eventType, this, nativeEvent),
                parentControl = this._getParentControl(),
                finalArgs = Core.coreConcat([event], args),
                fn = parentControl && parentControl._subscriptions && parentControl._subscriptions[this.getName()] && parentControl._subscriptions[this.getName()][eventType];
            if (fn) {
                fn.apply(this, finalArgs);
            }
        },
        subscribe: function (eventType, handler) {
            let parentControl = this._getParentControl();
            if (!parentControl._subscriptions) {
                parentControl._subscriptions = {};
            }
            if (!parentControl._subscriptions[this.getName()]) {
                parentControl._subscriptions[this.getName()] = {};
            }
            parentControl._subscriptions[this.getName()][eventType] = handler;
        }
    },
    DOMControlMixin: {
        getContainer: function () {
            return this._container;
        },
        redraw: function () {
            this._createMarkup();
            this.initChildControls();
            this.init();
        }
    },
    EnabledControlMixin: {
        _options: {
            enabled: null
        },
        /**
         * Публичный метод
         * Проставляет состояния enabled для контрола и его дочерних контролов
         * @param state
         */
        setEnabled: function (state) {
            this._options.enabled = state;
            Parser.toggleClass(this.getContainer(), 'controls-Disabled', !state);
            if (this._children) {
                for (let children in this._children) {
                    this._children[children].setEnabled && this._children[children].setEnabled(state);
                }
            }
            this._setEnabled && this._setEnabled(state);
        },
        isEnabled: function () {
            return this._options.enabled;
        },
        /**
         * Приватный метод который необходимо переопределять
         * Определяет кастомную логику блокировки/разблокировки компонента
         * @param state
         * @private
         */
        //_setEnabled: function(state)
    },
    ItemsControlMixin: {
        getItems: function () {
            return this._options.items;
        },
        setItems: function (items) {
            this._options.items = items;
            this.redraw();
        },
        setItemTemplate: function (itemTplFn) {
            this._options.itemTplFn = itemTplFn;
        },
        initItemsEvents: function () {
            let items = this._children.itemsContainer.childNodes,
                self = this;

            items.forEach(function (item, index) {
                item.addEventListener('click', function () {
                    self._notify('itemClick', [self._options.items[index]]);
                })
            })
        }
    }
};

/**
 * Класс Core
 * Содержит набор статических функций необходимых для настройки компонентов
 */
class Core {
    /**
     * Функция coreMerge
     * Возвращает первоначальный объект с новыми опциями из objToMerge
     * @param obj Объект источник
     * @param objToMerge Объект который нужно смерджить
     */
    static coreMerge(obj, objToMerge) {
        for (let key in objToMerge) {
            if (objToMerge[key] && typeof objToMerge[key] === 'object' && objToMerge[key].constructor.name === 'Object') {
                if (!obj[key] || typeof obj[key] !== 'object') {
                    obj[key] = {};
                }
                Core.coreMerge(obj[key], objToMerge[key]);
            } else {
                obj[key] = objToMerge[key];
            }
        }
        return obj;
    }

    static coreConcat(arr, arrToConcat) {
        if (arrToConcat && arrToConcat.constructor.name === 'Array') {
            return !!arrToConcat.length ? arr.concat(arrToConcat) : arr;
        } else {
            return arr;
        }

    }

    /**
     * Метод initApp
     * Выполняет инициализацию всего приложения
     */
    static initApp() {
        var myApp = document.querySelector('[data-component="App"]');
        myApp = new App(myApp, {});
    }
}

class Mixin {
    static mixes(base, mixins) {
        mixins.forEach(function (mixin) {
            Core.coreMerge(base, mixin);
        });
    }
}


/**
 * Класс Parser
 * Содержит набор статических методов необходимых для построения шаблона компонента
 */
class Parser {
    /**
     * Метод getNodeOptions
     * Возвращает опции заданные через атрибуты
     * @param node
     */
    static getNodeOptions(node) {
        let options = {};
        for (let i = 0, len = node.attributes.length; i < len; i++) {
            options[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
        }
        return options;
    }

    /**
     * Метод getMarkup
     * Принимает строку html-разметки, возвращает DOM объект
     * @param markupString
     * @returns {Node | null}
     */
    static getMarkup(markupString) {
        let tmpNode = document.createElement('div');
        tmpNode.innerHTML = markupString;
        return tmpNode.firstChild;
    }

    static appendControlToDOM(oldMarkup, newMarkup) {
        oldMarkup.parentNode.replaceChild(newMarkup, oldMarkup);
        return newMarkup;
    }

    /**
     * Метод createAttr
     * Принимает на вход данные о создаваем атрибуте, возвращает атрибут в формате attrName="attrValue ?attrDefault"
     * @param attrName - имя аттрибута
     * @param attrValue - значение аттрибута
     * @param attrDefault - значение по умолчанию
     * @returns {string}
     */
    static createAttr(attrName, attrValue = '', attrDefault) {
        return !attrDefault ? `${attrName}="${attrValue}"` : `${attrName}="${attrDefault} ${attrValue}"`;
    }

    static createText(textValue = '') {
        return textValue;
    }

    static setDOMEnabled(node, state) {
        if (state) {
            node.removeAttribute('disabled');
        } else {
            node.setAttribute('disabled', !state);
        }
    }

    static toggleClass(node, className, state) {
        if (state === undefined) {
            node.classList.toggle(className);
        } else {
            if (state) {
                node.classList.add(className);
            } else {
                node.classList.remove(className);
            }
        }
    }
}

/**
 * Класс AbstractControl
 * Содержит методы для взаимодействия родительских и дочерних компонентов
 */
class AbstractControl {
    /**
     * Метод reviveChildrens
     * Оживляет все дочерние компоненты
     * @param control
     */
    static reviveChildrens(control) {
        let children = control.getContainer().querySelectorAll('[name]'),
            childs = {};

        children.forEach(function (children) {
            let componentType = children.getControlType();
            childs[children.getName()] = componentType ? new CONSTRUCTORS[componentType](children) : children;
        });

        return childs;
    }

    static destroyChildrens(control) {
        let childrens = control._children;

        for (let children in childrens) {
            if (childrens[children]._container) {
                childrens[children].destroy();
            }
        }
    }


    static haveChildrens(control) {
        return !!control.getContainer().querySelector('[name]');
    }
}


class Control {
    constructor(node, additionalOptions, additionalMixin) {
        Mixin.mixes(this, Core.coreConcat([Mixins.DOMControlMixin, Mixins.EnabledControlMixin, Mixins.NotifyControlMixin], additionalMixin));
        this._modifyOptions(node, additionalOptions);
        this._createMarkup();
        this.initChildControls();
        this.init();
    }

    /**
     * Метод modifyOptions
     * Происходит перед построением компонента, в ней можно пересчитывать опции компонента, по умолчанию мерджит additionalOptions
     * @param node
     * @param additionalOptions
     * @private
     */
    _modifyOptions(node, additionalOptions) {
        this._options = Core.coreMerge(this._options, Parser.getNodeOptions(node));
        this._options = Core.coreMerge(this._options, additionalOptions);
        if (this._options.enabled === null || this._options.enabled === 'true') {
            this._options.enabled = true;
        } else {
            this._options.enabled = false;
        }
        this._container = node;
    }

    /**
     * Метод createMarkup
     * Происходит перед инициализацей компонента, компонент появляется в DOM дереве, по умолчанию строит помещает компонент в DOM и инициализирует его дочерние компоненты
     * @private
     */
    _createMarkup() {
        this._container = Parser.appendControlToDOM(this._container, Parser.getMarkup(this._prepareMarkup(this._options)));
        Parser.toggleClass(this._container, 'controls-Disabled', !this._options.enabled);
    }

    initChildControls() {
        if (AbstractControl.haveChildrens(this)) {
            this._children = AbstractControl.reviveChildrens(this) || null;
        }
    }

    /**
     * Метод init
     * Инициализация компонента, на момент его выполнения компонент уже есть в DOM, все его дочерние компоненты также построены
     * @private
     */
    init() {
        this.setEnabled(this._options.enabled);
        this._container.control = this;
        let self = this;
        this._container.addEventListener('DOMNodeRemoved', function (event) {
            if(event.target === self._container) {
                self.destroy();
            }
        });
    }

    destroy() {
        this._destroy && this._destroy();
        AbstractControl.destroyChildrens(this);
        console.log(this);
        this._notify('destroy');
        delete this;
    }

    _getParentControl() {
        let parentNode = this._container.parentNode;

        while(!parentNode.hasAttribute('data-component') && parentNode.nodeName !== 'BODY') {
            parentNode = parentNode.parentNode;
        }
        return parentNode.control;
    }

    getName() {
        return this._options.name;
    }

    /**
     * Метод prepareMarkup
     * Должен возвращать разметку в виде строки, необходимо переписывать для каждого визуального компонента
     * @private
     */
    _prepareMarkup(options) {
    }
}

class App extends Control {
    constructor(node, additionalOptions) {
        super(node, additionalOptions);
    }

    _prepareMarkup(options) {
        return `<div ${Parser.createAttr('data-component', 'App')}
                     ${Parser.createAttr('name', options.name)}
                >${this._container.innerHTML}</div>`;
    }
}

HTMLElement.prototype.getName = HTMLUnknownElement.prototype.getName = function () {
    return this.getAttribute('name');
};

HTMLElement.prototype.getControlType = HTMLUnknownElement.prototype.getControlType = function () {
    return this.getAttribute('data-component');
};

/**
 * Базовый контрол для полей ввода
 */
class BaseInput extends Control {
    constructor(node, additionalOptions) {
        super(node, additionalOptions);
    }

    getValue() {
        return this._options.value;
    }

    initChildControls() {
        super.initChildControls();
        this._inputControl = this._children.inputControl;
        this._placeholder = this._children.placeholder;
        this.setValue(this.getValue());
    }

    init() {
        super.init();
        this._inputControl.addEventListener('input', this._inputHandler.bind(this));
        this._inputControl.addEventListener('focusin', this._focusInHandler.bind(this));
        this._inputControl.addEventListener('focusout', this._focusOutHandler.bind(this));
    }

    setValue(newValue = '') {
        this._options.value = newValue;
        this._checkPlaceHolder(newValue);
        this._inputControl.value = newValue;
    }

    getValue() {
        return this._options.value;
    }

    _inputHandler(event) {
        this.setValue(event.target.value);
        this._notify('valueChanged', [this.getValue()], event);
    }

    _focusInHandler(event) {
        this._notify('focusIn', [], event);
    }

    _focusOutHandler(event) {
        this._notify('focusOut', [], event);
    }

    _checkPlaceHolder(value) {
        if ((value === '' || value === undefined) && this.isEnabled()) {
            this._placeholder.style.display = 'block';
        } else {
            this._placeholder.style.display = 'none';
        }
    }

    _setEnabled(state) {
        Parser.setDOMEnabled(this._inputControl, state);
        this._checkPlaceHolder(this.getValue());
    }
}

class TextBox extends BaseInput {
    constructor(node, additionalOptions) {
        super(node, additionalOptions);
    }

    _prepareMarkup(options) {
        return `<div ${Parser.createAttr('data-component', 'TextBox')}
                     ${Parser.createAttr('name', options.name)}
                     ${Parser.createAttr('class', options.className, 'controls-Input controls-TextBox')}>
                    <input ${Parser.createAttr('type', 'text')} ${Parser.createAttr('name', 'inputControl')} ${Parser.createAttr('value', options.value)}>
                    <div ${Parser.createAttr('class', 'controls-Input__placeholder')} ${Parser.createAttr('name', 'placeholder')}>${Parser.createText(options.placeholder)}</div>
                </div>`;
    }
}

class NumberBox extends BaseInput {
    constructor(node, additionalOptions) {
        super(node, additionalOptions);
    }

    _prepareMarkup(options) {
        return `<div ${Parser.createAttr('data-component', 'TextBox')}
                     ${Parser.createAttr('name', options.name)}
                     ${Parser.createAttr('class', options.className, 'controls-Input controls-NumberBox')}>
                    <input ${Parser.createAttr('type', 'text')} ${Parser.createAttr('name', 'inputControl')}>
                    <div ${Parser.createAttr('class', 'controls-Input__placeholder')} ${Parser.createAttr('name', 'placeholder')}>${Parser.createText(options.placeholder)}</div>
                </div>`;
    }

    setValue(newValue = '') {
        newValue = newValue.replace(/[a-zA-Zа-яА-Я ]/g, '');
        super.setValue(newValue);
    }
}

class ListView extends Control {
    constructor(node, additionalOptions) {
        super(node, additionalOptions, [Mixins.ItemsControlMixin]);
    }

    init() {
        super.init();
        this.initItemsEvents();
    }

    _prepareMarkup(options) {
        let markupString = `<div ${Parser.createAttr('data-component', 'ListView')} 
                                 ${Parser.createAttr('name', options.name)}
                                 ${Parser.createAttr('class', options.className, 'controls-ListView')}>
                            <div ${Parser.createAttr('name', 'itemsContainer')} ${Parser.createAttr('class', 'controls-ListView__itemsContainer')}>`,
            self = this;
        if (this._options.itemTplFn) {
            this.getItems().forEach(function (item) {
                markupString += self._options.itemTplFn(item);
            });
        }
        markupString += '</div></div>';

        return markupString;
    }
}

class Button extends Control {
    constructor(node, additionalOptions) {
        super(node, additionalOptions);
    }

    _prepareMarkup(options) {
        return `<button ${Parser.createAttr('data-component', 'Button')}
                        ${Parser.createAttr('name', options.name)}
                        ${Parser.createAttr('class', options.className, 'controls-Button')}>
                        ${Parser.createText(options.caption)}
                </button>`
    }

    init() {
        super.init();
        var self = this;
        this._container.addEventListener('click', function (event) {
            self._notify('activated', [], event)
        })
    }

    _setEnabled(state) {
        Parser.setDOMEnabled(this.getContainer(), state);
    }

    setCaption(newCaption) {
        this._options.caption = newCaption;
        this.getContainer().innerText = newCaption;
    }

    getCaption() {
        return this._options.caption;
    }
}

const CONSTRUCTORS = {
    TextBox: TextBox,
    Button: Button,
    ListView: ListView,
    NumberBox: NumberBox
};
