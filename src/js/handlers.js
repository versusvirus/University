var headerMenuButtons = document.getElementsByClassName('header-Menu__item'),
    popup = document.querySelector('.popup'),
    popupCloseButton = popup.querySelector('.popup-window__clsBtn'),
    registrateButton = document.querySelector('.standart-button.registrate-button');

/*Обработчики для появления и скрытия всплывающего окна*/

for (let i = 0, len = headerMenuButtons.length; i < len ; i++){
    headerMenuButtons[i].addEventListener('click', function () {
        openPopupMenuWindow(this.getAttribute('data-id'));
    })
}

popupCloseButton.addEventListener('click', function () {
    popup.style.display = 'none';
});

function openPopupMenuWindow (id) {
    let popupWindow = popup.querySelector('.popup-window'),
        popupCaption = popupWindow.querySelector('.popup-window__caption'),
        popupInfo = popupWindow.querySelector('.popup-window__info');
    popupCaption.innerHTML = menuPopupInfo[id].caption;
    popupInfo.innerHTML = menuPopupInfo[id].info;
    popup.style.display = 'flex';
}

/*Обработчики для окна регистрации*/

registrateButton.addEventListener('click', function () {
   openPopupRegistrationWindow();
});

function openPopupRegistrationWindow() {
    let registrationPopup = document.querySelector('.popup.registration-popup'),
        registrationPopupWindow = registrationPopup.querySelector('.registration-popup-window');
    registrationPopup.style.display = 'flex';
}