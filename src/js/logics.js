class Game {
    constructor(recipeData, button, timer, appMarkup, exp, recipeName) {
        this.recipeData = recipeData;
        this.gameName = recipeName;
        this.controlButton = button;
        this.controlTimer = timer;
        this.currentStep = 0;
        this.appMarkup = appMarkup;
        this.exp = exp;
        this.controlButton.setCaption('Начать готовку');
        let burgerMenu = document.querySelector('.burger-menu');
        components.BurgerMenuButton.getMarkup().classList.toggle('menu-opened');
        burgerMenu.classList.toggle('hidden');
        components.appRecipeHeader.setCaption(this.gameName);
        components.BurgerMenuButton.setEnabled(false);
        components.BurgerMenuButton.getMarkup().setAttribute('title', 'Во время игры меню недоступно на мобильных устройствах');
    }

    start() {
        var self = this,
            caption = this.recipeData[this.currentStep].caption;

        if (this.recipeData[this.currentStep].duration) {

        }
        this.controlButton.getMarkup().addEventListener('click', this.goToNextStep);
    }

    goToNextStep() {
        var self = curGame,
            curS = self.currentStep,
            caption = self.recipeData[curS] && self.recipeData[curS].caption,
            duration = self.recipeData[curS] && self.recipeData[curS].duration,
            minutes, //= Timer.getTimeFromSeconds(duration).minutes,
            seconds; //= Timer.getTimeFromSeconds(duration).seconds;
        if (curS === (self.recipeData.length - 1) && !duration) {
            self.appMarkup.appendChild(generateStep(`${curS + 1}. ${caption}${duration ? `. Продолжительность: ${(minutes ? minutes + ' мин ' : '') + (seconds ? seconds + ' c' : '')}` : ''}`));
            self.controlButton.setCaption('Готово');
            self.controlButton.getMarkup().removeEventListener('click', self.goToNextStep);
            self.controlButton.getMarkup().addEventListener('click', function () {
                self.appMarkup.dispatchEvent(gameClosed);
            }, {once: true});
        } else if (curS !== self.lastStep) {
            if (duration) {
                self.lastStep = curS;
                minutes = Timer.getTimeFromSeconds(duration).minutes;
                seconds = Timer.getTimeFromSeconds(duration).seconds;
                self.controlButton.setCaption('Запустить таймер');
                self.controlButton.getMarkup().addEventListener('click', function () {
                    this.control.setEnabled(false);
                    self.controlTimer.setTimerDuration(self.recipeData[curS].duration);
                    self.controlTimer.startTimer();
                    this.control.setCaption('Ожидание таймера');
                }, {once: true});
            } else {
                self.controlButton.setCaption('К следующему шагу');
                self.currentStep++;
            }
            self.appMarkup.appendChild(generateStep(`${curS + 1}. ${caption}${duration ? `. Продолжительность: ${(minutes ? minutes + ' мин ' : '') + (seconds ? seconds + ' c' : '')}` : ''}`));
            self.appMarkup.scrollTop = self.appMarkup.scrollHeight - self.appMarkup.offsetHeight;
        }
    }

    close() {
        curRecipe.markup.classList.add('recipe-done');
        this.appMarkup.innerHTML = '';
        components.BurgerMenuButton.setEnabled(true);
        components.BurgerMenuButton.getMarkup().removeAttribute('title');
        return this.exp;
    }

}





function generateStep(text) {
    var tmp = document.createElement('div');
    tmp.classList.add('appWindow-step');
    tmp.innerHTML = text;
    return tmp;
}

function getData(recipeName) {
    return [
        {
            caption: 'Варите пельмешки'
        },
        {
            caption: 'Поставьте водичку на газ'
        },
        {
            caption: 'Варите пельмени',
            duration: 2
        },
        {
            caption: 'Кушайте пожалуйста',
            duration: 2
        }

    ]
}
