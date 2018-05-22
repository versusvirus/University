document.addEventListener('DOMContentLoaded', function () {
    socket.emit('getRecipes');
    socket.on('recipesLoaded', function (recipes) {
        let recipesPlace = document.querySelector('.app-recipes');
        for (let i = 0, len = recipes.length; i < len; i++) {
            let tmpBlock = document.createElement('div'),
                tmpImage = document.createElement('img'),
                tmpCaption = document.createElement('div'),
                tmpIngridients = document.createElement('ul'),
                tmpExp = document.createElement('div'),
                tmpButton = document.createElement('button'),
                tmpIngrHeader = document.createElement('div');
            tmpBlock.classList.add('app-recipes-block');
            tmpImage.classList.add('app-recipe');
            tmpIngridients.classList.add('app-recipe-ingridients');
            for (let j = 0, leng = recipes[i].ingridients.length; j < leng; j++) {
                let tmpIngr = document.createElement('li');
                tmpIngr.classList.add('app-recipe-ing-block');
                tmpIngr.innerText = recipes[i].ingridients[j];
                tmpIngridients.appendChild(tmpIngr);
            }
            tmpIngrHeader.innerText = 'Ингридиенты:';
            tmpIngrHeader.classList.add('app-recipe-ingr-header');
            tmpExp.classList.add('app-recipe-exp');
            tmpExp.innerText = `Опыт: ${recipes[i].exp}`;
            tmpCaption.classList.add('app-recipe-caption');
            tmpCaption.innerText = recipes[i].name;
            tmpButton.classList.add('app-recipe-start');
            tmpButton.classList.add('standart-button');
            tmpButton.innerText = 'Выбрать';
            tmpButton.setAttribute('data-component', 'Button');
            tmpButton.setAttribute('data-name', `RecipeButton${i}`);
            tmpButton.setAttribute('data-exp', recipes[i].exp);
            tmpButton.setAttribute('data-recipe-name', recipes[i].name);
            tmpImage.setAttribute('src', recipes[i].imgSrc);
            tmpButton.recipeData = recipes[i].steps;
            tmpBlock.appendChild(tmpImage);
            tmpBlock.appendChild(tmpCaption);
            tmpBlock.appendChild(tmpIngrHeader);
            tmpBlock.appendChild(tmpIngridients);
            tmpBlock.appendChild(tmpExp);
            tmpBlock.appendChild(tmpButton);
            recipesPlace.prepend(tmpBlock);
        }
        for (let i = 0, len = scripts.length; i < len; i++){
            let tmpScript = document.createElement('script');
            tmpScript.setAttribute('src', scripts[i]);
            document.body.appendChild(tmpScript);
        }
        let user = localStorage.getItem('currentUser');
        socket.emit('getUserData', user);
        socket.on('userDataAnswer', function (userData) {
            setTimeout(function () {
                let userInfoBlock = document.querySelector('.profile'),
                    userPhoto = userInfoBlock.querySelector('.profile-img'),
                    userName = userInfoBlock.querySelector('.profile-name'),
                    userLevel = userInfoBlock.querySelector('.profile-level'),
                    userBar = userInfoBlock.querySelector('.profile-level-bar.loading-bar');
                userPhoto.setAttribute('src', userData.userphoto);
                userName.innerText = userData.username;
                userLevel.innerText = userData.lvl + ' уровень';
                userBar.control.getMarkup().classList.remove('loading-bar');
                userBar.control.setPercents(userData.experience + 50);
            }, 200);
        })
    });
});