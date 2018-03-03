var validateWindow = document.querySelector('.validateWindow');

function inputValidateRegistration (input) {
    let self = input,
        userRegExp = new RegExp('[0-9]');
    if (userRegExp.test(self.value)) {
        self.classList.add('validation-error');
        validateWindow.innerHTML = 'Некорректно заполнены обязательные поля!';
        validateWindow.style.display = 'inline-block';
    }
    else {
        self.classList.remove('validation-error');
        validateWindow.style.display = 'none';
    }
}