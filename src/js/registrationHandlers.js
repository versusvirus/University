var registrationButton = document.querySelector('.standart-button.registrate-button'),
    registrationPopup = document.querySelector('.registration-popup');

registrationButton.addEventListener('click', openRegistrationPopupWindow);

function openRegistrationPopupWindow() {
    registrationPopup.style.display = 'flex';
}


