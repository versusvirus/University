var burgerMenuBtn = document.querySelector('.header-Menu-burger'),
    burgerMenu = document.querySelector('.burger-menu');


/*Обработчики для появления и скрытия всплывающего окна*/


burgerMenuBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('menu-opened');
    this.classList.toggle('menu-opened')
});

initMainControls();

function initMainControls() {
    var controls = document.querySelectorAll('[data-component]');
    controls.forEach(function (item) {
        let name = item.getAttribute('data-name');
        switch (item.getAttribute('data-component')) {
            case 'MenuButton':
                components[name] = new MenuButton(item, name);
                break;
            case 'Popup':
                components[name] = new Popup(item, name);
                break;
        }
    });
    for (var key in components) {
        if (components[key].constructor.name === 'MenuButton') {
            let cmpntName = key;
            components[key].setFunc(function () {
                components[components[cmpntName].getPopupName()].open(components[cmpntName].getPopupInfo().caption, components[cmpntName].getPopupInfo().info);
            });
        }
    }
}


/*Обработчики для окна регистрации*/
