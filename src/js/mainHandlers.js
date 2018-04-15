var headerMenuButtons = document.getElementsByClassName('header-Menu__item'),
    burgerMenuBtn = document.querySelector('.header-Menu-burger'),
    burgerMenu = document.querySelector('.burger-menu'),
    header = document.querySelector('.header'),
    headerBurgerButtons = document.getElementsByClassName('burger-menu-item'),
    popup = document.querySelector('.popup'),
    inputs = document.getElementsByTagName('input');


/*Обработчики для появления и скрытия всплывающего окна*/

for (let i = 0, len = headerMenuButtons.length; i < len; i++) {
    headerMenuButtons[i].addEventListener('click', function () {
        openPopupMenuWindow(this.getAttribute('data-id'));
    });
    headerBurgerButtons[i].addEventListener('click', function () {
        openPopupMenuWindow(this.getAttribute('data-id'));
    })
}

burgerMenuBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('menu-opened');
    this.classList.toggle('menu-opened')
});

popup.addEventListener('click', function () {
    if (event.target == this) {
        this.style.display = 'none';
    }
});

function openPopupMenuWindow(id) {
    let popupWindow = popup.querySelector('.popup-window'),
        popupCaption = popupWindow.querySelector('.popup-window__caption'),
        popupInfo = popupWindow.querySelector('.popup-window__info');
    popupCaption.innerHTML = menuPopupInfo[id].caption;
    popupInfo.innerHTML = menuPopupInfo[id].info;
    popup.style.display = 'flex';
}

/*Обработчики для окна регистрации*/


// switch (pageName) {
//     case "index.html" :
//         let registrateButton = document.querySelector('.standart-button.registrate-button');
//
//         registrateButton.addEventListener('click', function () {
//             openPopupRegistrationWindow();
//         });
//
//     function openPopupRegistrationWindow() {
//         let registrationPopup = document.querySelector('.popup.registration-popup'),
//             registrationPopupWindow = registrationPopup.querySelector('.registration-popup-window'),
//             registrationPopupEndButton = registrationPopup.querySelector('.registration-popup-button');
//         registrationPopup.style.display = 'flex';
//         registrationPopupEndButton.addEventListener('click', closeRegistrationPopup);
//         registrationPopup.addEventListener('click', function () {
//             if (event.target == this) {
//                 this.style.display = 'none';
//             }
//         });
//
//         function closeRegistrationPopup() {
//             registrationPopup.style.display = 'none';
//             this.removeEventListener('click', closeRegistrationPopup);
//         }
//     }
//
//         break;
// }