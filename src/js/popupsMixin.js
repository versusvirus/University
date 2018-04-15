var menuPopupInfo = [{
        caption: 'О программе',
        info: 'Данная программа была написана для ЯрГУ\n Версия: beta 0.1'
    }, {
        caption: 'Справка',
        info: 'В разработке'
    }, {
        caption: 'Авторство',
        info: 'Вадим Волоцкой 2018 год'
    }],
    popup = document.querySelector('.popup'),
    popups = document.querySelectorAll('.popup');

popups.forEach(function (item) {
    item.addEventListener('click', function () {
        if (event.target == this) {
            this.style.display = 'none';
        }
    });
});


function openPopupWindow() {
    let
        popupId = this.getAttribute('data-id'),
        popupWindow = popup.querySelector('.popup-window'),
        popupCaption = popupWindow.querySelector('.popup-window__caption'),
        popupInfo = popupWindow.querySelector('.popup-window__info');
    popupCaption.innerHTML = menuPopupInfo[popupId].caption;
    popupInfo.innerHTML = menuPopupInfo[popupId].info;

    popup.style.display = 'flex';
}