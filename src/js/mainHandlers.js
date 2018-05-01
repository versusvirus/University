for (let key in components) {
    if (components[key].getMarkup().getControlType() === 'MenuButton') {
        components[key].setFunc(function () {
            components[components[key].getPopupName()].open(
                components[key].getPopupInfo().caption,
                components[key].getPopupInfo().info
            );
        })
    }
}
components.BurgerMenuButton.setFunc(function () {
    let burgerMenu = document.querySelector('.burger-menu');
    this.classList.toggle('menu-opened');
    burgerMenu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', showRandomHint);

function showRandomHint() {
    components.headerHint.setCaption(`<div class="header-hint-triangle"></div>${hints[randomInteger(0,hints.length)]}`);
    components.headerHint.getMarkup().classList.remove('hidden');
    $(components.headerHint.getMarkup()).fadeIn('slow');
    setTimeout(function () {
        $(components.headerHint.getMarkup()).fadeOut('slow', function () {
            components.headerHint.getMarkup().classList.add('hidden');
        });

    }, 5000);
    setTimeout(showRandomHint, 15000);
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}