var errorsPlace = document.querySelector('.validate-place');

class Validator {
    constructor(inputMarkup, regExp, error) {
        this.input = inputMarkup;
        this.regExp = new RegExp(regExp);
        this.errorMessage = error;
        this.errorBlock = document.createElement('div');
        this.errorBlock.classList.add('validateWindow');
        this.errorBlock.innerHTML = error;
        errorsPlace.appendChild(this.errorBlock);
    }

    validate() {
        let inputedText = this.input.value;
        if (inputedText.match(this.regExp) || !inputedText.length) {
            this.input.classList.add('validation-error');
            this.input.removeAttribute('validated');
            this.showMessage();
            return false;
        }
        else {
            this.input.classList.remove('validation-error');
            this.input.setAttribute('validated', true);
            this.hideMessage();
            return true;
        }
    }

    showMessage() {
        this.errorBlock.style.display = 'block';
    }

    hideMessage() {
        this.errorBlock.style.display = 'none';
    }
}