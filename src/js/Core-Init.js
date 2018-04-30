class App extends Component {
    constructor(markup, name) {
        super(markup, name);
        this.initControls();
    }

    initControls() {
        let controls = document.querySelectorAll('[data-component]:not([data-init])');
        controls.forEach(function(item) {
            let controlName = item.getName(),
                controlType = item.getControlType();
            switch (controlType) {
                case 'Button':
                    components[controlName] = new Button(item, controlName);
                    break;
                case 'MenuButton':
                    components[controlName] = new MenuButton(item, controlName);
                    break;
                case 'Popup':
                    components[controlName] = new Popup(item, controlName);
                    break;
                case 'Form':
                    components[controlName] = new Form(item, controlName);
                    break;
                case 'Input':
                    components[controlName] = new Input(item, controlName, item.getAttribute('data-regExp'), item.getAttribute('data-error'));
                    break;
                case 'ProgressBar':
                    components[controlName] = new ProgressBar(item, controlName);
                    break;
                case 'Caption':
                    components[controlName] = new Caption(item, controlName);
                    break;
                case 'Timer':
                    components[controlName] = new Timer(item, controlName);
                    break;
                case 'ScrollContainer':
                    components[controlName] = new ScrollContainer(item, controlName);
                    break
            }
        })
    }
}


var appMarkup = document.querySelector('[data-component="App"]'),
    app = new App(appMarkup, appMarkup.getAttribute('data-name'));

