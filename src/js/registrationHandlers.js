components.registrateButton.setFunc(function () {
    components[this.getAttribute('data-popup-name')].open();
});

components.RegistrationForm.submitBtn.getMarkup().addEventListener('click', collectDataAndSign.bind(components.RegistrationForm, 'registrate'));
components.RegistrationForm.getMarkup().addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        collectDataAndSign.call(this.control, 'registrate');
    }
});
components.SignInForm.submitBtn.getMarkup().addEventListener('click', collectDataAndSign.bind(components.SignInForm, 'trySignIn'));
components.SignInForm.getMarkup().addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        collectDataAndSign.call(this.control, 'trySignIn');
    }
});

function collectDataAndSign(mode) {
    if (this.isValidated()) {
        let tmpData = this.getInputedData(),
            userObj = {
                username: tmpData[0],
                password: tmpData[1],
                nickname: tmpData[2],
                lvl: 1,
                experience: 0
            };
        socket.emit(mode, userObj);
    }
}

socket.on('registration-success', function (msg) {
    showInfoMessage(msg);
    components.RegistratePopup.close({}, true);
});

socket.on('registration-fail', function (msg) {
    showErrorMessage(msg);
});