var headerMenuButtons = document.getElementsByClassName('header-Menu__item'),
    burgerMenuBtn = document.querySelector('.header-Menu-burger'),
    burgerMenu = document.querySelector('.burger-menu'),
    header = document.querySelector('.header'),
    headerBurgerButtons = document.getElementsByClassName('burger-menu-item'),
    inputs = document.getElementsByTagName('input'),
    components = {};


/*Обработчики для появления и скрытия всплывающего окна*/


burgerMenuBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('menu-opened');
    this.classList.toggle('menu-opened')
});

initMainControls();

function initMainControls() {
   var controls = document.querySelectorAll('[data-component]');
   controls.forEach(function (item) {
      switch (item.getAttribute('data-component')) {
         case 'MenuButton':
             components[item.getAttribute('data-name')] = new MenuButton(item, item.getAttribute('data-name'), function (){
                components[item.getAttribute('data-popup-name')].open(menuPopupInfo[this.getAttribute('data-id')].caption, menuPopupInfo[this.getAttribute('data-id')].info);
             });
             break;
         case 'Popup':
             components[item.getAttribute('data-name')] = new Popup(item, item.getAttribute('data-name'));
             break;
      }
   });
}

/*Обработчики для окна регистрации*/
