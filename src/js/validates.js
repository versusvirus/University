var errorsPlace = document.querySelector('.validate-place');

class Validator {
    constructor(inputMarkup, regExp, error) {
        this.input = inputMarkup;
        this.regExp = new RegExp(regExp);
        this.errorMessage = error;
    }

    validate() {
        let inputedText = this.input.value;
        if (inputedText.match(this.regExp) || !inputedText.length) {
            this.input.classList.add('validation-error');
            this.input.removeAttribute('validated');
            showErrorMessage(this.errorMessage);
            return false;
        }
        else {
            this.input.classList.remove('validation-error');
            this.input.setAttribute('validated', true);
            return true;
        }
    }
}