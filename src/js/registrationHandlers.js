initRegistrationControls();
var users = [{
    nickName: '123',
    password: '123',
    userName: '123'
}];

var sameUserError = document.createElement('div');
sameUserError.classList.add('validateWindow');
errorsPlace.appendChild(sameUserError);

function sameUserAlert(nickName) {
    sameUserError.innerHTML = 'Пользователь с ником "' + nickName + '" уже существует';
    sameUserError.style.display = 'block';
}
function initRegistrationControls() {
    var controls = document.querySelectorAll('[data-component]');
    controls.forEach(function (item) {
        if (!item.hasAttribute('data-init')) {
            let name = item.getAttribute('data-name');
            switch (item.getAttribute('data-component')) {
                case 'Button':
                    components[name] = new Button(item, name);
                    break;
                case 'Popup':
                    components[name] = new Popup(item, name);
                    break;
                case 'Input':
                    components[name] = new Input(item, name, '[^a-zA-Z0-9]+$', item.getAttribute('data-error'));
                    break;
                case 'Form':
                    components[name] = new Form(item, name);
                    break;
            }
        }
    });
    components.registrateButton.setFunc(function () {
        components.RegistratePopup.open();
    });
    components.RegistrationForm.submitBtn.setFunc(function () {
        let tmp = components.RegistrationForm.getInputedData(),
            userData = {
                nickName: tmp[0],
                password: tmp[1],
                userName: tmp[2]
            }
        if (components.RegistrationForm.isValidated() && !checkUsername(userData)) {
            components.RegistratePopup.close(null, true);

        }
    })
}

function checkUsername(userObj) {
    var exist = false;
    for (var i = 0; i < users.length ; i++) {
        if (users[i].nickName == userObj.nickName) {
            exist = true;
            sameUserAlert(userObj.nickName);
            break;
        }
    }
    !exist && (sameUserError.style.display = 'none');
    return exist;
}