/**
 * Базовый компонент для остальных
 * markup - разметка
 * name - имя компонента
 */
var components = {};

class Component {
    constructor(markup, name) {
        this.markup = markup;
        this.markup.control = this;
        this.name = name;
        this.markup.setAttribute('data-init', true);
        components[name] = this;
    }

    getName() {
        return this.name;
    }

    getMarkup() {
        return this.markup;
    }

    getChildControlByName(name) {
        var childControl = this.markup.querySelector('[data-name="' + name + '"]');
        if (childControl) {
            return components[name];
        } else {
            return null;
        }
    }

    getAllChildsControls() {
        var childControls = this.markup.querySelectorAll('[data-component]'),
            childControlsArr = [];
        childControls.forEach(function (item) {
            childControlsArr.push(components[item.getAttribute('data-name')]);
        });
        return childControlsArr;
    }
}

/**
 * Компонент полоса прогресса
 */
class ProgressBar extends Component {
    constructor(markup, name) {
        super(markup, name);
        this.fill = this.markup.querySelector('.profile-level-bar-fill');
        this.percents = this.markup.querySelector('.profile-level-bar-percents');
    }

    getPercents() {
        return parseFloat(this.percents.innerHTML);
    }

    /**
     * Функция проставки процентов в прогресс бар
     * @param percents
     */
    setPercents(percents) {

        var modifiedPercents = parseFloat(percents).toFixed(1),
            difInPercents = this.getPercents() - modifiedPercents,
            interval = null,
            shift = difInPercents / 20,
            self = this,
            fillBar = [{
                width: getComputedStyle(this.fill).width,
            }, {
                width: modifiedPercents + '%'
            }
            ];
        this.fill.animate(fillBar, {
            duration: 400,
            fill: 'forwards'
        });
        if (shift > 0) {
            interval = setInterval(function () {
                if (self.getPercents() - shift <= modifiedPercents) {
                    self.percents.innerHTML = modifiedPercents + '%';
                    clearInterval(interval);
                } else {
                    self.percents.innerHTML = parseFloat(self.getPercents() - shift).toFixed(1) + '%';
                }
            }, 20)
        } else {
            interval = setInterval(function () {
                if (self.getPercents() - shift >= modifiedPercents) {
                    self.percents.innerHTML = modifiedPercents + '%';
                    clearInterval(interval);
                } else {
                    self.percents.innerHTML = parseFloat(self.getPercents() - shift).toFixed(1) + '%';
                }
            }, 20)
        }
    }
}

/**
 * Базовый компонент кнопка для остальных кнопок
 */
class Button extends Component {
    constructor(markup, name) {
        super(markup, name);
        this.enabled = true;
    }

    setCaption(caption) {
        this.markup.innerHTML = caption;
    }

    getCaption() {
        return this.markup.innerHTML;
    }

    setFunc(func) {
        this.markup.addEventListener('click', func);
    }

    isEnabled() {
        return this.markup.hasAttribute('disabled');
    }

    setEnabled(state) {
        if (state) {
            this.markup.removeAttribute('disabled');
        } else {
            this.markup.setAttribute('disabled', true);
        }
    }
}

/**
 * Компонент кнопка-меню для работы со всплывающими окнами
 */
class MenuButton extends Button {
    constructor(markup, name) {
        super(markup, name);
    }

    getPopupName() {
        return this.markup.getAttribute('data-popup-name');
    }

    getPopupInfo() {
        return {
            caption: menuPopupInfo[this.markup.getAttribute('data-id')].caption,
            info: menuPopupInfo[this.markup.getAttribute('data-id')].info
        }
    }
}

/**
 * Компонент всплывающее окно
 */
class Popup extends Component {
    constructor(markup, name) {
        super(markup, name);
        this.caption = markup.querySelector('.popup-window__caption');
        this.info = markup.querySelector('.popup-window__info');
        this.markup.addEventListener('click', this.close);
    }

    open(caption, info) {
        caption && this.setCaption(caption);
        info && this.setInfo(info);
        this.markup.style.display = 'flex';
    }

    close(event, hardClose) {

        if (hardClose) {
            this.control.checkChildControl();
            this.style.display = 'none'

        } else if (event.target == this) {
            this.control.checkChildControl();
            this.style.display = 'none';
        }
    }

    checkChildControl() {
        let form = document.querySelector('[data-component="Form"');
        form && form.control.closeForm();
    }

    getInfo() {
        return this.info.innerHTML;
    }

    getCaption() {
        return this.caption.innerHTML;
    }

    setCaption(caption) {
        this.caption.innerHTML = caption;
    }

    setInfo(info) {
        this.info.innerHTML = info;
    }
}

/**
 * Компонент поле ввода
 */
class Input extends Component {
    constructor(markup, name, regExp, errorMsg) {
        super(markup, name);
        regExp && (this.validator = new Validator(this.markup, regExp, errorMsg)) && (this.needValidate = true);
        this.needValidate && (this.markup.addEventListener('blur', this.validator.validate.bind(this.validator)));
    }

    getCaption() {
        return this.markup.value;
    }

    setCaption(caption) {
        this.markup.value = caption;
    }

    setToBase() {
        this.setCaption('');
        this.validator.hideMessage();
        this.markup.classList.remove('validation-error');
    }
}

class Form extends Component {
    constructor(markup, name) {
        super(markup, name);
        let submitBtn = this.markup.querySelector('.submit-button');
        this.submitBtn = new Button(submitBtn, submitBtn.getAttribute('data-name'));
        this.inputs = this.markup.querySelectorAll('input');
        this.validationBlock = document.createElement('div');
        this.validationBlock.innerHTML = 'Не все поля заполнены корректно';
        this.validationBlock.classList.add('validateWindow');
        errorsPlace.appendChild(this.validationBlock);
    }

    isValidated() {
        let validated = true;
        this.inputs.forEach(function (item) {
            if (!item.control.validator.validate()) {
                validated = false;
            }
        });
        if (!validated) {
            this.validationBlock.style.display = 'block';
        } else {
            this.validationBlock.style.display = 'none';
        }
        return validated;
    }

    closeForm() {
        this.validationBlock.style.display = 'none';
        this.inputs.forEach(function (item) {
            item.control.setToBase();
        });
    }

    getInputedData() {
        let data = [];
        this.inputs.forEach(function (item) {
            data.push(item.value);
        });
        return data;
    }
}