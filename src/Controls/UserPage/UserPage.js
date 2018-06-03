class UserPage extends Control {
    constructor(node, additionalOptions) {
        super(node,additionalOptions);
    }

    _prepareMarkup(options) {
        return `<div ${Parser.createAttr('data-component', 'UserPage')} ${Parser.createAttr('name', options.name)}>
                ${this.getContainer().innerHTML}</div>`
    }

    init() {
        let self = this;
        super.init();
        this._children.ToggleButton.subscribe('activated', function () {
            self.setEnabled(!self.isEnabled());
            if (self._children.ToggleButton.getCaption() === 'Изменить') {
                self._children.ToggleButton.setCaption('Сохранить');
            } else {
                self._children.ToggleButton.setCaption('Изменить');
            }
        });
        this._children.ToggleButton.subscribe('destroy', function () {
            console.log(this);
        });
        this._children.NameTextBox.subscribe('valueChanged', function (event, value) {
            self._children.BlackBox.innerHTML = value;
        });
        this._children.MyListView.subscribe('itemClick', function (event, itemValue) {
            console.log(itemValue);
        });
    }

    _setEnabled() {
        this._children.ToggleButton.setEnabled(true);
    }
}

CONSTRUCTORS.UserPage = UserPage;
