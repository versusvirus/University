class UserPage extends Control {
    constructor(node, additionalOptions) {
        super(node,additionalOptions);
    }

    _prepareMarkup(options) {
        return `<div ${Parser.createAttr('data-component', 'UserPage')} ${Parser.createAttr('name', options.name)}>
                ${this.getContainer().innerHTML}</div>`
    }

    _init() {
        let self = this;
        super._init();
        this._children.ToggleButton.getContainer().addEventListener('click', function () {
            self.setEnabled(!self.isEnabled());
            if (self._children.ToggleButton.getCaption() === 'Изменить') {
                self._children.ToggleButton.setCaption('Сохранить');
            } else {
                self._children.ToggleButton.setCaption('Изменить');
            }
        });
    }

    _setEnabled() {
        this._children.ToggleButton.setEnabled(true);
    }
}

CONSTRUCTORS.UserPage = UserPage;
