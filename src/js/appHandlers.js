var appWindow = document.querySelector('.appWindow'),
    recipeWindow = document.querySelector('.app-recipes'),
    stepsWindow = document.querySelector('.appWindow-stepsContent'),
    curRecipe = null,
    curGame = null;

for (var key in components) {
    if (components[key].getMarkup().getControlType() === 'Button' && components[key].getMarkup().classList.contains('app-recipe-start')) {
        components[key].setFunc(function () {
            var mode = components.recipeHeader.getMarkup().classList.contains('recipe-selected') ? 'offMode' : 'onMode';
            switch (mode) {
                case 'offMode':
                    components.recipeHeader.setCaption('Рецепты 1 уровня');
                    components.recipeHeader.getMarkup().classList.remove('recipe-selected');
                    recipeWindow.classList.remove('recipe-selected');
                    this.control.setCaption('Выбрать');
                    this.parentNode.classList.remove('selected');
                    break;
                case 'onMode':
                    var recipeName = this.getAttribute('data-recipe-name'),
                        exp = this.getAttribute('data-exp');
                    components.recipeHeader.setCaption(`Выбрано блюдо: ${recipeName}, за него вы получите ${exp} опыта`);
                    components.recipeHeader.getMarkup().classList.add('recipe-selected');
                    this.parentNode.classList.add('selected');
                    this.control.setCaption('Обратно к рецептам');
                    recipeWindow.classList.add('recipe-selected');
                    curRecipe = {
                        markup: this,
                        name: recipeName
                    }
            }
        })
    }
}

components.startButton.setFunc(function () {
    curGame = new Game(curRecipe.markup.recipeData, components.appButton, components.appTimer, stepsWindow, curRecipe.markup.getAttribute('data-exp'), curRecipe.name);
    curGame.start();
    curRecipe.markup.parentNode.classList.remove('selected');
    recipeWindow.classList.remove('recipe-selected');
    appWindow.classList.remove('hidden');

});

appWindow.addEventListener('timerGone', function () {
    curGame.currentStep++;
    components.appButton.setEnabled(true);
    if (!(curGame.currentStep == curGame.recipeData.length)) {
        components.appButton.setCaption('К следующему шагу');
    } else {
        components.appButton.setCaption('Готово');
        curRecipe.markup.classList.add('recipe-done');
        components.appButton.getMarkup().removeEventListener('click', curGame.goToNextStep);
        components.appButton.getMarkup().addEventListener('click', function () {
            curGame.appMarkup.dispatchEvent(gameClosed);
        }, {once: true});
    }

});

components.BurgerMenuButton.setFunc(function () {
    let content = document.querySelector('.content'),
        burger = document.querySelector('.burger-menu');
    if (!burger.classList.contains('hidden')) {
        content.style.height = 'calc(100% - 215px)';
    } else {
        content.style.height = 'calc(100% - 165px)';
    }
});

appWindow.addEventListener('gameClosed', function () {
    curGame.close();
    components.recipeHeader.setCaption('Рецепты 1 уровня');
    appWindow.classList.add('hidden');
});

stepsWindow.addEventListener('scroll', function () {
    if (this.scrollTop > 0) {
        this.classList.add('scrolled-up');
        this.parentNode.classList.add('scroll');
    } else {
        this.classList.remove('scrolled-up');
        this.parentNode.classList.remove('scroll');
    }
});