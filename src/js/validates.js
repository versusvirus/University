var error = {
    markup: document.querySelector('.validateWindow'),
    show: function (message) {
        this.markup.innerHTML = message;
        this.markup.style.display = 'inline-block';
    },
    hide: function () {
      this.markup.style.display = 'none';
    }
};

class validateInput {
    constructor(inputMarkup, regExp) {
        this.input = inputMarkup;
        this.regExp = new RegExp(regExp);
        this.errorMessage = error;
    }

    validate() {
        let inputedText = this.input.value;
        if (inputedText.match(this.regExp)) {
            this.input.classList.add('validation-error');
            this.errorMessage.show('Некорректно заполнены обязательные поля!');
        }
        else {
            this.input.classList.remove('validation-error');
            this.errorMessage.hide();
        }
    }
}