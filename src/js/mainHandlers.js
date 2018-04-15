var headerMenuButtons = document.getElementsByClassName('header-Menu__item'),
    burgerMenuBtn = document.querySelector('.header-Menu-burger'),
    burgerMenu = document.querySelector('.burger-menu'),
    header = document.querySelector('.header'),
    headerBurgerButtons = document.getElementsByClassName('burger-menu-item'),
    inputs = document.getElementsByTagName('input');


/*Обработчики для появления и скрытия всплывающего окна*/

for (let i = 0, len = headerMenuButtons.length; i < len; i++) {
    headerMenuButtons[i].addEventListener('click', openPopupWindow);
    headerBurgerButtons[i].addEventListener('click', openPopupWindow);
}

burgerMenuBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('menu-opened');
    this.classList.toggle('menu-opened')
});



/*Обработчики для окна регистрации*/
