class Component {
    constructor(markup) {
        this.markup = markup;
    }
}

class Input extends Component {
    getCaption () {
        return this.markup.innerText;
    }
    setCaption (caption) {
        this.markup.innerText = caption;
    }
}

debugger;